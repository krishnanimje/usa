import Link from 'next/link';
import { Compass, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <Compass size={64} />
          </div>
          
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Looks Like You Took a Wrong Turn.</h2>
          <p className={styles.text}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className={styles.actions}>
            <Link href="/" className="btn-primary">
              GO HOME
            </Link>
            <Link href="/request-service" className="btn-action">
              REQUEST SERVICE
            </Link>
            <a href={SITE_CONFIG.phone.link} className="btn-outline">
              <Phone size={18} /> CALL NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
