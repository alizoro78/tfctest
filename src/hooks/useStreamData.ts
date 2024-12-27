import { useState, useEffect } from 'react';
import { StreamerService } from '../services/twitchApi';
import type { TwitchStream } from '../types/twitch';
import { CACHE_CONFIG } from '../config/cache';

export function useStreamData() {
  const [streams, setStreams] = useState<TwitchStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const data = await StreamerService.fetchAllStreamers();
        if (mounted) {
          setStreams(data);
          setError(null);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          console.error('Failed to load streams:', error);
          setError('Unable to load streams. Please try again later.');
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for periodic refresh
    intervalId = setInterval(fetchData, CACHE_CONFIG.REFRESH_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return { streams, loading, error };
}