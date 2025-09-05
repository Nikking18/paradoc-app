import { NextRequest, NextResponse } from 'next/server';
import { resetPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Reset password
    const { success, error } = await resetPassword(token, password);

    if (!success) {
      return NextResponse.json(
        { error: error || 'Failed to reset password' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Password reset successfully. You can now sign in with your new password.',
    });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
