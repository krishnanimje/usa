"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from './LeadDetail.module.css';
import { Save, Loader2, Plus } from 'lucide-react';

export default function LeadActions({ leadId, currentStatus }: { leadId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleStatusChange = async () => {
    if (status === currentStatus) return;
    
    setIsUpdatingStatus(true);
    setMessage('');

    try {
      // Get current user id
      const { data: { user } } = await supabase.auth.getUser();

      const { error: updateError } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId);

      if (updateError) throw updateError;

      // Log activity
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'STATUS_CHANGED',
        note: `Status changed from ${currentStatus} to ${status}`,
        created_by: user?.id
      });

      setMessage('Status updated successfully');
      router.refresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
      setStatus(currentStatus); // revert
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsAddingNote(true);
    setMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'NOTE_ADDED',
        note: note.trim(),
        created_by: user?.id
      });

      if (error) throw error;

      setNote('');
      setMessage('Note added successfully');
      router.refresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsAddingNote(false);
    }
  };

  return (
    <div className={styles.actionsContainer}>
      <div className={styles.actionCard}>
        <h3 className={styles.cardTitle}>Update Status</h3>
        <div className={styles.statusControls}>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className={styles.statusSelect}
          >
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CLOSED">Closed</option>
          </select>
          <button 
            className="btn-primary" 
            onClick={handleStatusChange}
            disabled={status === currentStatus || isUpdatingStatus}
            style={{ padding: '0.5rem 1rem' }}
          >
            {isUpdatingStatus ? <Loader2 size={16} className={styles.spin} /> : <Save size={16} />} 
            <span style={{marginLeft: '0.5rem'}}>Save</span>
          </button>
        </div>
      </div>

      <div className={styles.actionCard}>
        <h3 className={styles.cardTitle}>Internal Notes</h3>
        <form onSubmit={handleAddNote} className={styles.noteForm}>
          <textarea 
            placeholder="Add a private note about this lead..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={styles.noteTextarea}
            rows={3}
            required
          />
          <button 
            type="submit" 
            className="btn-action" 
            disabled={isAddingNote || !note.trim()}
            style={{ alignSelf: 'flex-end', padding: '0.5rem 1rem' }}
          >
            {isAddingNote ? <Loader2 size={16} className={styles.spin} /> : <Plus size={16} />}
            <span style={{marginLeft: '0.5rem'}}>Add Note</span>
          </button>
        </form>
      </div>

      {message && (
        <div className={message.includes('Error') ? styles.errorMsg : styles.successMsg}>
          {message}
        </div>
      )}
    </div>
  );
}
