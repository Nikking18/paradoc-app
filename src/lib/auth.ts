import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { supabaseAdmin } from './supabase';

// Password hashing utilities
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Token generation for email verification and password reset
export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const generateExpiryDate = (hours: number = 24): Date => {
  const now = new Date();
  return new Date(now.getTime() + hours * 60 * 60 * 1000);
};

// User management functions
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const createUser = async (userData: CreateUserData): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', userData.email)
      .single();

    if (existingUser) {
      return { user: null, error: 'User with this email already exists' };
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Create user
    const { data: newUser, error: createError } = await supabaseAdmin
      .from('users')
      .insert({
        email: userData.email,
        password: hashedPassword,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating user:', createError);
      return { user: null, error: 'Failed to create user account' };
    }

    // Create email verification token
    const verificationToken = generateToken();
    const tokenExpiry = generateExpiryDate(24); // 24 hours

    const { error: tokenError } = await supabaseAdmin
      .from('verification_tokens')
      .insert({
        user_id: newUser.id,
        token: verificationToken,
        type: 'email_verification',
        expires_at: tokenExpiry.toISOString(),
        created_at: new Date().toISOString(),
      });

    if (tokenError) {
      console.error('Error creating verification token:', tokenError);
      // Don't fail user creation if token creation fails
    }

    const user: User = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      emailVerified: newUser.email_verified,
      createdAt: newUser.created_at,
      updatedAt: newUser.updated_at,
    };

    return { user, error: null };
  } catch (error) {
    console.error('Unexpected error creating user:', error);
    return { user: null, error: 'An unexpected error occurred' };
  }
};

export const authenticateUser = async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Get user with password
    const { data: userData, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !userData) {
      return { user: null, error: 'Invalid email or password' };
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, userData.password);
    if (!isValidPassword) {
      return { user: null, error: 'Invalid email or password' };
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      emailVerified: userData.email_verified,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    };

    return { user, error: null };
  } catch (error) {
    console.error('Unexpected error authenticating user:', error);
    return { user: null, error: 'An unexpected error occurred' };
  }
};

export const getUserById = async (userId: string): Promise<{ user: User | null; error: string | null }> => {
  try {
    const { data: userData, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !userData) {
      return { user: null, error: 'User not found' };
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      emailVerified: userData.email_verified,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    };

    return { user, error: null };
  } catch (error) {
    console.error('Unexpected error fetching user:', error);
    return { user: null, error: 'An unexpected error occurred' };
  }
};

export const updateUserEmailVerification = async (userId: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        email_verified: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating email verification:', error);
      return { success: false, error: 'Failed to verify email' };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected error updating email verification:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

export const createPasswordResetToken = async (email: string): Promise<{ token: string | null; error: string | null }> => {
  try {
    // Check if user exists
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      // Don't reveal if email exists or not
      return { token: null, error: null };
    }

    // Generate reset token
    const resetToken = generateToken();
    const tokenExpiry = generateExpiryDate(1); // 1 hour

    // Delete any existing reset tokens for this user
    await supabaseAdmin
      .from('verification_tokens')
      .delete()
      .eq('user_id', userData.id)
      .eq('type', 'password_reset');

    // Create new reset token
    const { error: tokenError } = await supabaseAdmin
      .from('verification_tokens')
      .insert({
        user_id: userData.id,
        token: resetToken,
        type: 'password_reset',
        expires_at: tokenExpiry.toISOString(),
        created_at: new Date().toISOString(),
      });

    if (tokenError) {
      console.error('Error creating password reset token:', tokenError);
      return { token: null, error: 'Failed to create reset token' };
    }

    return { token: resetToken, error: null };
  } catch (error) {
    console.error('Unexpected error creating password reset token:', error);
    return { token: null, error: 'An unexpected error occurred' };
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    // Get token and user
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .from('verification_tokens')
      .select(`
        *,
        users!inner(*)
      `)
      .eq('token', token)
      .eq('type', 'password_reset')
      .single();

    if (tokenError || !tokenData) {
      return { success: false, error: 'Invalid or expired reset token' };
    }

    // Check if token is expired
    const now = new Date();
    const tokenExpiry = new Date(tokenData.expires_at);
    if (now > tokenExpiry) {
      return { success: false, error: 'Reset token has expired' };
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ 
        password: hashedPassword,
        updated_at: new Date().toISOString(),
      })
      .eq('id', tokenData.user_id);

    if (updateError) {
      console.error('Error updating password:', updateError);
      return { success: false, error: 'Failed to update password' };
    }

    // Delete the used token
    await supabaseAdmin
      .from('verification_tokens')
      .delete()
      .eq('id', tokenData.id);

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected error resetting password:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

export const verifyEmailToken = async (token: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    // Get token and user
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .from('verification_tokens')
      .select(`
        *,
        users!inner(*)
      `)
      .eq('token', token)
      .eq('type', 'email_verification')
      .single();

    if (tokenError || !tokenData) {
      return { success: false, error: 'Invalid or expired verification token' };
    }

    // Check if token is expired
    const now = new Date();
    const tokenExpiry = new Date(tokenData.expires_at);
    if (now > tokenExpiry) {
      return { success: false, error: 'Verification token has expired' };
    }

    // Update user email verification status
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ 
        email_verified: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', tokenData.user_id);

    if (updateError) {
      console.error('Error updating email verification:', updateError);
      return { success: false, error: 'Failed to verify email' };
    }

    // Delete the used token
    await supabaseAdmin
      .from('verification_tokens')
      .delete()
      .eq('id', tokenData.id);

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected error verifying email:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};
