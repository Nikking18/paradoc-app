import { NextRequest, NextResponse } from 'next/server';
import { withAuth, withSubscriptionAuth } from '@/lib/middleware';
import { supabaseAdmin } from '@/lib/supabase';
import { 
  validateRequestBody, 
  documentCreateSchema, 
  paginationSchema,
  documentFilterSchema 
} from '@/lib/validations';

// GET /api/documents - List user documents
export const GET = withAuth(async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const queryParams = Object.fromEntries(searchParams.entries());
      
      const paginationResult = paginationSchema.parse(queryParams);
      const { page, limit } = paginationResult;
      const filterResult = documentFilterSchema.parse(queryParams);
      const { type, jurisdiction, search } = filterResult;

      let query = supabaseAdmin
        .from('documents')
        .select('id, title, content, type, jurisdiction, metadata, created_at, updated_at', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Apply filters
      if (type) {
        query = query.eq('type', type);
      }
      if (jurisdiction) {
        query = query.eq('jurisdiction', jurisdiction);
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%, content.ilike.%${search}%`);
      }

      // Apply pagination
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      const { data: documents, error, count } = await query;

      if (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
          { error: 'Failed to fetch documents' },
          { status: 500 }
        );
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return NextResponse.json({
        success: true,
        data: {
          documents,
          pagination: {
            page,
            limit,
            total: count || 0,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          },
        },
      });
    } catch (error) {
      console.error('Documents fetch error:', error);
      
      if (error instanceof Error && error.message.includes('validation error')) {
        return NextResponse.json(
          { error: 'Invalid query parameters', details: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
});

// POST /api/documents - Create new document
export const POST = withSubscriptionAuth(['active', 'trial'], async (request: NextRequest, user) => {
    try {
      const body = await request.json();
      const validatedData = validateRequestBody(documentCreateSchema, body);

      const { data: document, error } = await supabaseAdmin
        .from('documents')
        .insert({
          user_id: user.id,
          ...validatedData,
        })
        .select('id, title, content, type, jurisdiction, metadata, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error creating document:', error);
        return NextResponse.json(
          { error: 'Failed to create document' },
          { status: 500 }
        );
      }

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'DOCUMENT_CREATED',
          description: `Created document: ${validatedData.title}`,
          metadata: {
            documentId: document.id,
            type: validatedData.type,
            jurisdiction: validatedData.jurisdiction,
          },
        });

      return NextResponse.json({
        success: true,
        data: document,
        message: 'Document created successfully',
      }, { status: 201 });
    } catch (error) {
      console.error('Document creation error:', error);
      
      if (error instanceof Error && error.message.includes('Validation error')) {
        return NextResponse.json(
          { error: 'Invalid input data', details: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
});
