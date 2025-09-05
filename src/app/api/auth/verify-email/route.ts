import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailToken, updateUserEmailVerification } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Verify the email token
    const { success, error } = await verifyEmailToken(token);

    if (!success) {
      return NextResponse.json(
        { error: error || 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Send welcome email
    // Note: In a real implementation, you'd get user info from verifyEmailToken
    // For now, we'll send a generic welcome email
    const emailResult = await sendWelcomeEmail(
      'user@example.com', // This would be the actual user email
      'User' // This would be the actual user name
    );

    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error);
      // Don't fail verification if welcome email fails
    }

    return NextResponse.json({
      message: 'Email verified successfully! Welcome to ParaDoc.app.',
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
