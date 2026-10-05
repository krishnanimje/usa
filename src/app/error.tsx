"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Phone, RotateCcw } from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';
import styles from './error.module.css';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <AlertTriangle size={64} />
          </div>
          
          <h1 className={styles.title}>Something Went Wrong</h1>
          <p className={styles.text}>
            We apologize, but an unexpected error occurred. Our technical team has been notified.
            In the meantime, if you need immediate HVAC assistance, please call us directly.
          </p>
          
          <div className={styles.actions}>
            <button onClick={() => reset()} className="btn-primary">
              <RotateCcw size={18} /> TRY AGAIN
            </button>
            <Link href="/" className="btn-outline">
              GO HOME
            </Link>
            <a href={SITE_CONFIG.phone.link} className="btn-action">
              <Phone size={18} /> CALL NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
