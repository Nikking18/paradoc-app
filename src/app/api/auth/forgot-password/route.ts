import { NextRequest, NextResponse } from 'next/server';
import { createPasswordResetToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create password reset token
    const { token, error } = await createPasswordResetToken(email);

    if (error) {
      return NextResponse.json(
        { error },
        { status: 500 }
      );
    }

    // Send password reset email (always return success for security)
    if (token) {
      const emailResult = await sendPasswordResetEmail(
        email,
        'User', // In a real implementation, you'd get the user's first name
        token
      );

      if (!emailResult.success) {
        console.error('Failed to send password reset email:', emailResult.error);
        // Don't reveal if email sending failed for security
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      message: 'If an account with that email exists, we\'ve sent you a password reset link.',
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
