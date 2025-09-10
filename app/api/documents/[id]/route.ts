import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { supabaseAdmin } from '@/lib/supabase';
import { validateRequestBody, documentUpdateSchema } from '@/lib/validations';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/documents/[id] - Get specific document
export const GET = (request: NextRequest, { params }: RouteParams) => {
  return withAuth(async (req: NextRequest, user) => {
    try {
      const resolvedParams = await params;
      const { data: document, error } = await supabaseAdmin
        .from('documents')
        .select('id, title, content, type, jurisdiction, metadata, created_at, updated_at')
        .eq('id', resolvedParams.id)
        .eq('user_id', user.id)
        .single();

      if (error || !document) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: document,
      });
    } catch (error) {
      console.error('Document fetch error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  })(request);
};

// PUT /api/documents/[id] - Update document
export const PUT = (request: NextRequest, { params }: RouteParams) => {
  return withAuth(async (req: NextRequest, user) => {
    try {
      const resolvedParams = await params;
      const body = await request.json();
      const validatedData = validateRequestBody(documentUpdateSchema, body);

      // First check if document exists and belongs to user
      const { data: existingDoc } = await supabaseAdmin
        .from('documents')
        .select('id, title')
        .eq('id', resolvedParams.id)
        .eq('user_id', user.id)
        .single();

      if (!existingDoc) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }

      const { data: updatedDocument, error } = await supabaseAdmin
        .from('documents')
        .update({
          ...validatedData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', resolvedParams.id)
        .eq('user_id', user.id)
        .select('id, title, content, type, jurisdiction, metadata, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error updating document:', error);
        return NextResponse.json(
          { error: 'Failed to update document' },
          { status: 500 }
        );
      }

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'DOCUMENT_UPDATED',
          description: `Updated document: ${existingDoc.title}`,
          metadata: {
            documentId: resolvedParams.id,
            changes: validatedData,
          },
        });

      return NextResponse.json({
        success: true,
        data: updatedDocument,
        message: 'Document updated successfully',
      });
    } catch (error) {
      console.error('Document update error:', error);
      
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
  })(request);
};

// DELETE /api/documents/[id] - Delete document
export const DELETE = (request: NextRequest, { params }: RouteParams) => {
  return withAuth(async (req: NextRequest, user) => {
    try {
      const resolvedParams = await params;
      // First check if document exists and belongs to user
      const { data: existingDoc } = await supabaseAdmin
        .from('documents')
        .select('id, title')
        .eq('id', resolvedParams.id)
        .eq('user_id', user.id)
        .single();

      if (!existingDoc) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }

      const { error } = await supabaseAdmin
        .from('documents')
        .delete()
        .eq('id', resolvedParams.id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
          { error: 'Failed to delete document' },
          { status: 500 }
        );
      }

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'DOCUMENT_DELETED',
          description: `Deleted document: ${existingDoc.title}`,
          metadata: {
            documentId: resolvedParams.id,
          },
        });

      return NextResponse.json({
        success: true,
        message: 'Document deleted successfully',
      });
    } catch (error) {
      console.error('Document deletion error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  })(request);
};
