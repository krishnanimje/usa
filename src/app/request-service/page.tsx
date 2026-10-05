"use client";

import { useState } from 'react';
import { Phone, CheckCircle, AlertCircle, Shield, Clock, Star } from 'lucide-react';
import styles from './RequestService.module.css';
import { SITE_CONFIG } from '@/data/config';

export default function RequestService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/request-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request. Please try again or call us directly.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <div className={styles.successCard}>
          <CheckCircle size={80} className={styles.successIcon} />
          <h1>Service Request Received</h1>
          <p>Thank you! Your HVAC inquiry has been successfully sent to our dispatch team.</p>
          <div className={styles.successSteps}>
            <div className={styles.step}>
              <strong>What happens next?</strong>
              <p>A customer service representative will review your details and contact you shortly to confirm your appointment time.</p>
            </div>
          </div>
          <div className={styles.successActions}>
            <span>Need immediate emergency help instead?</span>
            <a href={SITE_CONFIG.phone.link} className="btn-action">
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.splitLayout}`}>
        
        {/* Left Side: Context & Trust */}
        <div className={styles.leftColumn}>
          <h1>Request HVAC Service</h1>
          <p className={styles.subtitle}>
            Fill out the form to schedule a service visit or request a free quote for installation in {SITE_CONFIG.location}.
          </p>
          
          <div className={styles.contactBlock}>
            <span>Need immediate emergency service?</span>
            <a href={SITE_CONFIG.phone.link} className={styles.phoneLink}>
              <Phone size={24} />
              {SITE_CONFIG.phone.display}
            </a>
          </div>

          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><Star size={20} fill="currentColor" /></div>
              <div>
                <strong>{SITE_CONFIG.rating.score} Google Rating</strong>
                <span>Verified customer satisfaction</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><Clock size={20} /></div>
              <div>
                <strong>Fast Response Time</strong>
                <span>We respect your time and comfort</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><Shield size={20} /></div>
              <div>
                <strong>Professional Technicians</strong>
                <span>Expert diagnosis and honest pricing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Form */}
        <div className={styles.rightColumn}>
          <div className={styles.formContainer}>
            {error && (
              <div className={styles.errorMessage} role="alert">
                <AlertCircle size={20} />
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">Full Name <span className={styles.required}>*</span></label>
                  <input type="text" id="fullName" name="fullName" required placeholder="John Doe" aria-required="true" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone <span className={styles.required}>*</span></label>
                  <input type="tel" id="phone" name="phone" required placeholder="(602) 555-0123" aria-required="true" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Service Address</label>
                <input type="text" id="address" name="address" placeholder="123 Main St" />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" name="city" placeholder="Glendale" defaultValue="Glendale" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input type="text" id="zipCode" name="zipCode" placeholder="85301" />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="serviceNeeded">Service Needed <span className={styles.required}>*</span></label>
                  <select id="serviceNeeded" name="serviceNeeded" required defaultValue="" aria-required="true">
                    <option value="" disabled>Select a service...</option>
                    <option value="ac-repair">AC Repair</option>
                    <option value="ac-install">AC Installation / Replacement</option>
                    <option value="ac-maintenance">AC Maintenance</option>
                    <option value="heating">Heating</option>
                    <option value="duct-cleaning">Air Duct Cleaning</option>
                    <option value="other">Other / Unsure</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="urgency">Urgency</label>
                  <select id="urgency" name="urgency">
                    <option value="standard">Standard (Next Available)</option>
                    <option value="urgent">Urgent (Within 24 Hours)</option>
                    <option value="emergency">Emergency (As Soon As Possible)</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="contactMethod">Preferred Contact</label>
                  <select id="contactMethod" name="contactMethod">
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="time">Preferred Time</label>
                  <select id="time" name="time">
                    <option value="any">Anytime</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Problem Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows={4} 
                  placeholder="E.g., My AC is running but blowing warm air..."
                ></textarea>
              </div>
              
              {/* Optional Photo Upload (UI Mock for now, requires multipart form handling in API) */}
              <div className={styles.formGroup}>
                <label htmlFor="photo">Optional Photo (e.g. thermostat or unit)</label>
                <input type="file" id="photo" name="photo" accept="image/*" className={styles.fileInput} />
              </div>

              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="consent" name="consent" required aria-required="true" />
                <label htmlFor="consent">
                  I consent to being contacted by Corazon Air regarding my request.
                </label>
              </div>

              {/* Honeypot for spam protection */}
              <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending Request...' : 'SEND SERVICE REQUEST →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
