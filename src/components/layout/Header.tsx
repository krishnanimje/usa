"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import styles from './Header.module.css';
import { SITE_CONFIG } from '@/data/config';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Make asynchronous to prevent synchronous setState in effect error
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 0);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Service Areas', href: '/areas' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Emergency / Contact Top Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.topBarText}>
            Professional HVAC Service in Glendale, Arizona
          </div>
          <div className={styles.topBarAction}>
            <span>Need HVAC Service?</span>
            <a href={SITE_CONFIG.phone.link} className={styles.topBarPhone}>
              Call {SITE_CONFIG.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.headerContainer}`}>
          
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>Corazon</span>
            <span className={styles.logoAccent}>Air</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className={styles.headerActions}>
            <Link href="/request-service" className="btn-action" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
              Request Service <ArrowRight size={16} />
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className={styles.mobileToggle} 
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuContent}>
            <ul className={styles.mobileNavList}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.mobileMenuFooter}>
              <a href={SITE_CONFIG.phone.link} className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                <Phone size={18} /> {SITE_CONFIG.phone.display}
              </a>
              <p className={styles.mobileHours}>Available {SITE_CONFIG.hours}</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Sticky Bottom Conversion Bar for Mobile */}
      <div className={styles.mobileBottomBar}>
        <a href={SITE_CONFIG.phone.link} className={styles.bottomBarPhone}>
          <Phone size={16} /> CALL NOW
        </a>
        <Link href="/request-service" className={styles.bottomBarCta}>
          REQUEST SERVICE
        </Link>
      </div>
    </>
  );
}
