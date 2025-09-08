import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Test basic connection
    const { error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: {
          code: error.code,
          hint: error.hint,
          details: error.details
        }
      }, { status: 500 });
    }

    // Test table structure
    const { data: tableInfo, error: tableError } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name, last_name, created_at')
      .limit(1);

    if (tableError) {
      return NextResponse.json({
        success: false,
        error: 'Table structure issue: ' + tableError.message,
        connection: 'OK'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      details: {
        connection: 'OK',
        tableStructure: 'OK',
        sampleData: tableInfo || 'No users found (this is normal for new setup)'
      }
    });

  } catch (error) {
    console.error('Supabase test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Connection failed: ' + (error as Error).message
    }, { status: 500 });
  }
}
