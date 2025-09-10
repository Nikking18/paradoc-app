import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { supabaseAdmin } from '@/lib/supabase';
import { validateRequestBody, userUpdateSchema } from '@/lib/validations';

// GET /api/user/profile - Get user profile
export const GET = withAuth(async (request: NextRequest, user) => {
    try {
      const { data: profile, error } = await supabaseAdmin
        .from('users')
        .select('id, name, email, image, role, subscription_status, trial_ends_at, created_at, updated_at')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json(
          { error: 'Failed to fetch profile' },
          { status: 500 }
        );
      }

      if (!profile) {
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      console.error('Profile fetch error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
});

// PUT /api/user/profile - Update user profile
export const PUT = withAuth(async (request: NextRequest, user) => {
    try {
      const body = await request.json();
      const validatedData = validateRequestBody(userUpdateSchema, body);

      const { data: updatedProfile, error } = await supabaseAdmin
        .from('users')
        .update({
          ...validatedData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select('id, name, email, image, role, subscription_status, trial_ends_at, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json(
          { error: 'Failed to update profile' },
          { status: 500 }
        );
      }

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'PROFILE_UPDATED',
          description: 'User profile updated',
          metadata: validatedData,
        });

      return NextResponse.json({
        success: true,
        data: updatedProfile,
        message: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Profile update error:', error);
      
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
