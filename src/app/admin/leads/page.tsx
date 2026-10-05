import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Phone, Mail, MapPin } from 'lucide-react';
import styles from './LeadsList.module.css';

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  // Await searchParams in Next.js 16/15 
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q || '';
  const statusFilter = resolvedSearchParams?.status || 'ALL';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (statusFilter !== 'ALL') {
    query = query.eq('status', statusFilter);
  }

  if (q) {
    query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  const { data: leads } = await query.limit(50);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lead Management</h1>
        <p className={styles.subtitle}>View, filter, and manage customer service inquiries.</p>
      </header>

      <div className={styles.controls}>
        <form className={styles.searchForm}>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              name="q"
              placeholder="Search leads by name, email, or phone..." 
              defaultValue={q}
            />
          </div>
          <div className={styles.filterWrapper}>
            <Filter size={18} className={styles.filterIcon} />
            <select name="status" defaultValue={statusFilter}>
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0.625rem 1rem' }}>
            Search
          </button>
        </form>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Location</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads && leads.length > 0 ? (
              leads.map(lead => (
                <tr key={lead.id} className={lead.status === 'NEW' ? styles.rowNew : ''}>
                  <td>
                    <span className={`${styles.badge} ${styles['badge' + lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.cellPrimary}>{lead.name}</div>
                    <div className={styles.contactLinks}>
                      <a href={`tel:${lead.phone}`} title={lead.phone}><Phone size={12}/></a>
                      {lead.email && <a href={`mailto:${lead.email}`} title={lead.email}><Mail size={12}/></a>}
                    </div>
                  </td>
                  <td>
                    <div className={styles.cellPrimary} style={{ textTransform: 'capitalize' }}>
                      {lead.service.replace('-', ' ')}
                    </div>
                    {lead.urgency === 'emergency' && (
                      <span className={styles.badgeUrgent}>EMERGENCY</span>
                    )}
                  </td>
                  <td>
                    <div className={styles.cellPrimary}>{lead.city || 'N/A'}</div>
                  </td>
                  <td>
                    <div className={styles.cellPrimary}>{new Date(lead.created_at).toLocaleDateString()}</div>
                    <div className={styles.cellSecondary}>{new Date(lead.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td>
                    <Link href={`/admin/leads/${lead.id}`} className={styles.actionBtn}>
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyState}>No leads match your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
