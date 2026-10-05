"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';
import styles from './FAQ.module.css';

const FAQ_DATA = [
  {
    id: 'q1',
    question: 'How do I request HVAC service?',
    answer: `You can request service by calling us directly at ${SITE_CONFIG.phone.display} or by filling out our online Request Service form. We prioritize emergency calls and will dispatch a technician as quickly as possible.`,
    category: 'Service',
  },
  {
    id: 'q2',
    question: 'Do you provide emergency service?',
    answer: `Yes, we offer 24/7 emergency HVAC repair services for critical heating and cooling failures. If you are experiencing a complete system breakdown during extreme temperatures, please call us immediately rather than using the online form.`,
    category: 'Service',
  },
  {
    id: 'q3',
    question: 'What areas do you serve?',
    answer: `Our primary service area is ${SITE_CONFIG.location}. We also serve select surrounding communities in the Valley. If you are outside Glendale, please call us to confirm if your specific address falls within our service radius.`,
    category: 'General',
  },
  {
    id: 'q4',
    question: 'What HVAC services are available?',
    answer: 'We provide a full suite of HVAC services including AC Repair, AC Installation & Replacement, AC Preventative Maintenance, Heating Repair & Installation, and Air Duct Cleaning.',
    category: 'Service',
  },
  {
    id: 'q5',
    question: 'What should I do if my AC stops cooling?',
    answer: 'First, check your thermostat to ensure it is set to "cool" and the temperature is set below room temperature. Next, check your air filter—a severely clogged filter can cause the system to freeze. If neither of these solves the issue, turn the system off to prevent further damage and call us for a professional diagnosis.',
    category: 'Technical',
  },
  {
    id: 'q6',
    question: 'What information should I provide when calling?',
    answer: 'Please provide your name, address, phone number, the type of system you have (if known), and a brief description of the problem (e.g., "blowing warm air," "making a loud grinding noise," "thermostat is blank").',
    category: 'General',
  },
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>('q1');

  const filteredFaqs = FAQ_DATA.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services and policies.</p>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.faqContainer}`}>
          
          <div className={styles.searchSection}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={20} />
              <input 
                type="text" 
                placeholder="Search questions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.accordionContainer}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(faq => (
                <div 
                  key={faq.id} 
                  className={`${styles.accordionItem} ${openId === faq.id ? styles.open : ''}`}
                >
                  <button 
                    className={styles.accordionHeader}
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    aria-expanded={openId === faq.id}
                  >
                    <span>{faq.question}</span>
                    {openId === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <div className={styles.accordionContent}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No questions found matching &quot;{searchTerm}&quot;.</p>
                <button onClick={() => setSearchTerm('')} className="btn-outline">Clear Search</button>
              </div>
            )}
          </div>

          <div className={styles.contactCard}>
            <h3>Still have questions?</h3>
            <p>Our team is ready to help you with any specific inquiries you might have.</p>
            <div className={styles.contactActions}>
              <a href={SITE_CONFIG.phone.link} className="btn-primary">
                <Phone size={18} /> {SITE_CONFIG.phone.display}
              </a>
              <Link href="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
