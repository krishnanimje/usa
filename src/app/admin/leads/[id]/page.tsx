import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, MapPin, Wrench, Phone, Mail, Calendar, Clock, AlertTriangle } from 'lucide-react';
import styles from './LeadDetail.module.css';
import LeadActions from './LeadActions';

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = await params;
  const leadId = resolvedParams.id;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch lead data
  const { data: lead } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (!lead) {
    return (
      <div className={styles.notFound}>
        <h2>Lead Not Found</h2>
        <p>The lead you are looking for does not exist or has been deleted.</p>
        <Link href="/admin/leads" className="btn-primary" style={{marginTop: '1rem', display: 'inline-block'}}>Back to Leads</Link>
      </div>
    );
  }

  // Fetch activities
  const { data: activities } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/admin/leads" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Leads
        </Link>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{lead.name}</h1>
          <span className={`${styles.badge} ${styles['badge' + lead.status]}`}>
            {lead.status}
          </span>
        </div>
        <p className={styles.subtitle}>Submitted on {new Date(lead.created_at).toLocaleString()}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          {/* Customer Info */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><User size={18} /> Customer Information</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Full Name</span>
                <span className={styles.infoValue}>{lead.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>
                  {lead.phone}
                  <a href={`tel:${lead.phone}`} className={styles.quickAction}><Phone size={14}/> Call</a>
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>
                  {lead.email || 'N/A'}
                  {lead.email && <a href={`mailto:${lead.email}`} className={styles.quickAction}><Mail size={14}/> Email</a>}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Pref. Contact</span>
                <span className={styles.infoValue}>{lead.contact_method || 'Phone'}</span>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><Wrench size={18} /> Service Requested</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Service</span>
                <span className={styles.infoValue} style={{ textTransform: 'capitalize' }}>{lead.service.replace('-', ' ')}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Urgency</span>
                <span className={styles.infoValue}>
                  {lead.urgency === 'emergency' ? (
                    <span className={styles.urgentText}><AlertTriangle size={14}/> Emergency</span>
                  ) : (
                    <span style={{ textTransform: 'capitalize' }}>{lead.urgency || 'Normal'}</span>
                  )}
                </span>
              </div>
              <div className={styles.infoItemFull}>
                <span className={styles.infoLabel}>Problem Description</span>
                <div className={styles.messageBox}>{lead.message || 'No description provided.'}</div>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><MapPin size={18} /> Location Details</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>{lead.address || 'N/A'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>City, State, Zip</span>
                <span className={styles.infoValue}>
                  {lead.city || 'N/A'}, {lead.state || 'AZ'} {lead.zip || ''}
                </span>
              </div>
              <div className={styles.infoItemFull}>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${lead.address} ${lead.city} AZ ${lead.zip}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  <MapPin size={14} /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>
          
          {/* Appointment Preferences */}
          {(lead.preferred_date || lead.preferred_time) && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}><Calendar size={18} /> Appointment Preferences</h2>
              <div className={styles.infoList}>
                {lead.preferred_date && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Preferred Date</span>
                    <span className={styles.infoValue}>{lead.preferred_date}</span>
                  </div>
                )}
                {lead.preferred_time && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Preferred Time</span>
                    <span className={styles.infoValue}>{lead.preferred_time}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.sideCol}>
          <LeadActions leadId={lead.id} currentStatus={lead.status} />
          
          <div className={styles.activityCard}>
            <h3 className={styles.cardTitle}><Clock size={18}/> Activity History</h3>
            <div className={styles.timeline}>
              {activities && activities.length > 0 ? (
                activities.map(activity => (
                  <div key={activity.id} className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineMeta}>
                        <span className={styles.timelineType}>{activity.activity_type.replace('_', ' ')}</span>
                        <span className={styles.timelineDate}>{new Date(activity.created_at).toLocaleString()}</span>
                      </div>
                      {activity.note && <div className={styles.timelineNote}>{activity.note}</div>}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineMeta}>
                      <span className={styles.timelineType}>LEAD CREATED</span>
                      <span className={styles.timelineDate}>{new Date(lead.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
