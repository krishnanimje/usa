import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Users, CheckCircle, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import styles from './Dashboard.module.css';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch summary stats
  const { count: newCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'NEW');

  const { count: contactedCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'CONTACTED');

  const { count: scheduledCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'SCHEDULED');

  const { count: totalCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });

  // Fetch recent leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('id, name, service, city, created_at, status')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back. Here&apos;s what&apos;s happening with your service requests.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{newCount || 0}</span>
            <span className={styles.statLabel}>New Leads</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{contactedCount || 0}</span>
            <span className={styles.statLabel}>Contacted</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#f3e8ff', color: '#8b5cf6' }}>
            <Calendar size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{scheduledCount || 0}</span>
            <span className={styles.statLabel}>Scheduled</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{totalCount || 0}</span>
            <span className={styles.statLabel}>Total Leads</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Inquiries</h2>
          <Link href="/admin/leads" className={styles.viewAllBtn}>View All</Link>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Location</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads && recentLeads.length > 0 ? (
                recentLeads.map(lead => (
                  <tr key={lead.id}>
                    <td className={styles.cellPrimary}>{lead.name}</td>
                    <td style={{ textTransform: 'capitalize' }}>{lead.service.replace('-', ' ')}</td>
                    <td>{lead.city || 'N/A'}</td>
                    <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`${styles.badge} ${styles['badge' + lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/leads/${lead.id}`} className={styles.actionLink}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>No service requests yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
