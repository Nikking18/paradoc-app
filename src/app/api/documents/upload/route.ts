import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { supabase } from '@/lib/supabase';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Get user ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, subscription_status, trial_ends_at')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check subscription status
    const isTrialActive = user.subscription_status === 'trial' && 
      user.trial_ends_at && 
      new Date(user.trial_ends_at) > new Date();
    
    const isSubscribed = user.subscription_status === 'active' || isTrialActive;

    if (!isSubscribed) {
      return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${user.id}_${timestamp}.${fileExtension}`;
    const filePath = join(uploadsDir, fileName);

    // Save file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Create document record in database
    const { data: document, error: docError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        title: name,
        template_type: 'uploaded',
        jurisdiction: 'auto-detect',
        status: 'uploaded',
        file_path: filePath,
        file_size: file.size,
        file_type: file.type,
        metadata: {
          originalName: name,
          uploadedAt: new Date().toISOString(),
          processingStatus: 'pending'
        }
      })
      .select()
      .single();

    if (docError) {
      console.error('Error creating document record:', docError);
      return NextResponse.json({ error: 'Failed to create document record' }, { status: 500 });
    }

    return NextResponse.json({
      documentId: document.id,
      fileName: name,
      fileSize: file.size,
      fileType: file.type,
      status: 'uploaded'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
