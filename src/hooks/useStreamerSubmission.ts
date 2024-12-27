import { useState, useCallback } from 'react';
import { DISCORD_CONFIG } from '../config/discord';

interface StreamerSubmission {
  timestamp: number;
}

export function useStreamerSubmission() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const getRecentSubmissions = (): StreamerSubmission[] => {
    const stored = localStorage.getItem('streamer_submissions');
    return stored ? JSON.parse(stored) : [];
  };

  const addSubmission = () => {
    const submissions = getRecentSubmissions();
    submissions.push({ timestamp: Date.now() });
    localStorage.setItem('streamer_submissions', JSON.stringify(submissions));
  };

  const canSubmit = useCallback(() => {
    const submissions = getRecentSubmissions();
    const windowMs = DISCORD_CONFIG.RATE_LIMIT.WINDOW_MINUTES * 60 * 1000;
    const now = Date.now();
    const recentSubmissions = submissions.filter(
      sub => now - sub.timestamp < windowMs
    );
    return recentSubmissions.length < DISCORD_CONFIG.RATE_LIMIT.MAX_SUBMISSIONS;
  }, []);

  const submitStreamer = async (streamerName: string) => {
    if (!canSubmit()) {
      setError(`Please wait ${DISCORD_CONFIG.RATE_LIMIT.WINDOW_MINUTES} minutes between submissions`);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(DISCORD_CONFIG.STREAMER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `New streamer submission: ${streamerName}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit streamer');

      addSubmission();
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to submit streamer. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    loading,
    error,
    success,
    submitStreamer,
    canSubmit: canSubmit()
  };
}