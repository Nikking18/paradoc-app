import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<{ success: boolean; error: string | null }> => {
  try {
    const mailOptions = {
      from: `"ParaDoc.app" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
};

export const sendVerificationEmail = async (email: string, firstName: string, verificationToken: string): Promise<{ success: boolean; error: string | null }> => {
  const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/verify-email?token=${verificationToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - ParaDoc.app</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #000; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
        .button { display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
        .footer { text-align: center; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">ParaDoc.app</div>
        </div>
        
        <div class="content">
          <h2>Welcome to ParaDoc.app, ${firstName}!</h2>
          <p>Thank you for signing up. To complete your registration and start creating legal documents, please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          
          <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          
          <p><strong>This verification link will expire in 24 hours.</strong></p>
          
          <p>If you didn't create an account with ParaDoc.app, you can safely ignore this email.</p>
        </div>
        
        <div class="footer">
          <p>© 2024 ParaDoc.app. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Welcome to ParaDoc.app, ${firstName}!
    
    Thank you for signing up. To complete your registration and start creating legal documents, please verify your email address by visiting this link:
    
    ${verificationUrl}
    
    This verification link will expire in 24 hours.
    
    If you didn't create an account with ParaDoc.app, you can safely ignore this email.
    
    © 2024 ParaDoc.app. All rights reserved.
  `;

  return await sendEmail({
    to: email,
    subject: 'Verify Your Email - ParaDoc.app',
    html,
    text,
  });
};

export const sendPasswordResetEmail = async (email: string, firstName: string, resetToken: string): Promise<{ success: boolean; error: string | null }> => {
  const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - ParaDoc.app</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #000; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
        .button { display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
        .footer { text-align: center; color: #666; font-size: 14px; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">ParaDoc.app</div>
        </div>
        
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>Hello ${firstName},</p>
          <p>We received a request to reset your password for your ParaDoc.app account. Click the button below to create a new password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          
          <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          
          <div class="warning">
            <p><strong>Important:</strong></p>
            <ul>
              <li>This link will expire in 1 hour for security reasons</li>
              <li>If you didn't request this password reset, please ignore this email</li>
              <li>Your password will remain unchanged until you create a new one</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>© 2024 ParaDoc.app. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Reset Your Password - ParaDoc.app
    
    Hello ${firstName},
    
    We received a request to reset your password for your ParaDoc.app account. Visit this link to create a new password:
    
    ${resetUrl}
    
    Important:
    - This link will expire in 1 hour for security reasons
    - If you didn't request this password reset, please ignore this email
    - Your password will remain unchanged until you create a new one
    
    © 2024 ParaDoc.app. All rights reserved.
  `;

  return await sendEmail({
    to: email,
    subject: 'Reset Your Password - ParaDoc.app',
    html,
    text,
  });
};

export const sendWelcomeEmail = async (email: string, firstName: string): Promise<{ success: boolean; error: string | null }> => {
  const dashboardUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ParaDoc.app</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #000; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
        .button { display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
        .footer { text-align: center; color: #666; font-size: 14px; }
        .feature { margin: 20px 0; padding: 15px; background: #fff; border-radius: 6px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">ParaDoc.app</div>
        </div>
        
        <div class="content">
          <h2>Welcome to ParaDoc.app, ${firstName}!</h2>
          <p>Your email has been verified and your account is now active. You're ready to start creating professional legal documents with AI assistance.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
          </div>
          
          <h3>What you can do now:</h3>
          <div class="feature">
            <strong>📄 Generate Legal Documents</strong><br>
            Create contracts, agreements, and other legal documents in minutes
          </div>
          <div class="feature">
            <strong>🤖 AI-Powered Analysis</strong><br>
            Get intelligent insights and suggestions for your documents
          </div>
          <div class="feature">
            <strong>💾 Secure Storage</strong><br>
            All your documents are safely stored in the cloud
          </div>
          <div class="feature">
            <strong>📤 Export Options</strong><br>
            Download your documents as PDF, DOCX, or share via Google Docs
          </div>
          
          <p>If you have any questions, feel free to reach out to our support team.</p>
        </div>
        
        <div class="footer">
          <p>© 2024 ParaDoc.app. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Welcome to ParaDoc.app, ${firstName}!
    
    Your email has been verified and your account is now active. You're ready to start creating professional legal documents with AI assistance.
    
    Go to your dashboard: ${dashboardUrl}
    
    What you can do now:
    - Generate Legal Documents: Create contracts, agreements, and other legal documents in minutes
    - AI-Powered Analysis: Get intelligent insights and suggestions for your documents
    - Secure Storage: All your documents are safely stored in the cloud
    - Export Options: Download your documents as PDF, DOCX, or share via Google Docs
    
    If you have any questions, feel free to reach out to our support team.
    
    © 2024 ParaDoc.app. All rights reserved.
  `;

  return await sendEmail({
    to: email,
    subject: 'Welcome to ParaDoc.app - Your Account is Ready!',
    html,
    text,
  });
};
