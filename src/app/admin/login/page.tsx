"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import styles from './Login.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data?.session) {
        router.push('/admin/dashboard');
        router.refresh(); // Force a refresh to ensure middleware picks up the cookie correctly
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <div className={styles.logoContainer}>
          <Lock size={40} className={styles.authIcon} />
        </div>
        <h1 className={styles.title}>CORAZON AIR</h1>
        <h2 className={styles.subtitle}>ADMIN PORTAL</h2>
        
        {error && (
          <div className={styles.errorBox}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="admin@corazonair.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            disabled={loading}
          >
            {loading ? <Loader2 size={18} className={styles.spinner} /> : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
}
