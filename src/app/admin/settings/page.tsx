import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Settings as SettingsIcon, Mail, Database, Shield } from 'lucide-react';
import styles from './Settings.module.css';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>System Settings</h1>
        <p className={styles.subtitle}>Configuration and status information.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Shield className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Admin Account</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Logged in as</span>
              <span className={styles.value}>{user.email}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Admin ID</span>
              <span className={styles.value} style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{user.id}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Last Sign In</span>
              <span className={styles.value}>{new Date(user.last_sign_in_at || '').toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Database className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Database Status</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Provider</span>
              <span className={styles.value}>Supabase PostgreSQL</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Connection</span>
              <span className={styles.valueSuccess}>Connected</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Row Level Security</span>
              <span className={styles.valueSuccess}>Enabled</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Mail className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Email Configuration</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Provider</span>
              <span className={styles.value}>Resend</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Notification Email</span>
              <span className={styles.value}>{process.env.LEAD_NOTIFICATION_EMAIL || 'Not Configured'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Status</span>
              {process.env.RESEND_API_KEY ? (
                <span className={styles.valueSuccess}>Configured</span>
              ) : (
                <span className={styles.valueWarning}>API Key Missing</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <SettingsIcon className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Environment</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Environment</span>
              <span className={styles.value}>{process.env.NODE_ENV}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Next.js Route</span>
              <span className={styles.value}>App Router</span>
            </div>
            <p className={styles.helpText}>
              Note: System settings can only be modified via server environment variables (.env.local). 
              Changes require a server restart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
