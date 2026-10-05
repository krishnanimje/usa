import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// We use the service role key for API routes to bypass RLS for inserting leads
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'admin@corazonair.com';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.fullName || !data.phone || !data.serviceNeeded) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let leadId = Date.now().toString();

    // Database Insertion
    if (supabase) {
      const { data: insertedLead, error: dbError } = await supabase
        .from('leads')
        .insert([{
          name: data.fullName,
          phone: data.phone,
          email: data.email || null,
          address: data.address || null,
          city: data.city || null,
          zip: data.zipCode || null,
          service: data.serviceNeeded,
          contact_method: data.contactMethod || null,
          preferred_date: data.date || null,
          preferred_time: data.time || null,
          urgency: data.urgency || null,
          message: data.description || null,
          status: 'NEW',
          source: 'Website Form'
        }])
        .select('id')
        .single();

      if (dbError) {
        console.error('Supabase Error:', dbError);
        return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
      }

      leadId = insertedLead.id;

      // Log initial activity
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'LEAD_CREATED',
        note: 'Lead submitted via website request form'
      });
    } else {
      console.warn('Supabase not configured. Mocking database insertion.', data);
    }

    // Email Notification
    if (resend) {
      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        
        await resend.emails.send({
          from: 'Corazon Air Leads <onboarding@resend.dev>', // Update this when you add a custom domain to Resend
          to: notificationEmail,
          subject: `New Service Request — ${data.serviceNeeded.replace('-', ' ')} — ${data.fullName}`,
          html: `
            <h2>CORAZON AIR - NEW SERVICE REQUEST</h2>
            <p><strong>Customer:</strong> ${data.fullName}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
            <p><strong>Service:</strong> ${data.serviceNeeded.replace('-', ' ')}</p>
            <p><strong>Urgency:</strong> ${data.urgency || 'Normal'}</p>
            <p><strong>Location:</strong> ${data.address || ''}, ${data.city || ''} ${data.zipCode || ''}</p>
            <p><strong>Preferred Contact:</strong> ${data.contactMethod || 'Phone'}</p>
            <p><strong>Preferred Date:</strong> ${data.date || 'Any'}</p>
            <p><strong>Preferred Time:</strong> ${data.time || 'Any'}</p>
            <p><strong>Problem:</strong> ${data.description || 'None provided'}</p>
            <br/>
            <p><a href="${siteUrl}/admin/leads/${leadId}">View Lead in Admin Dashboard</a></p>
          `
        });
      } catch (emailError) {
        // Log email failure, but do not fail the request because DB insertion succeeded
        console.error('Email sending failed:', emailError);
      }
    } else {
      console.warn('Resend API key missing. Email notification skipped.');
    }

    return NextResponse.json(
      { message: 'Request submitted successfully', id: leadId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
