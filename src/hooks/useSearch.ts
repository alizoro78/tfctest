import { useState, useCallback } from 'react';
import type { TwitchStream } from '../types/twitch';

export function useSearch(streams: TwitchStream[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStreams = useCallback(() => {
    if (!searchQuery.trim()) return streams;
    
    const query = searchQuery.toLowerCase();
    return streams.filter(stream => 
      stream.displayName.toLowerCase().includes(query) ||
      stream.gameName.toLowerCase().includes(query) ||
      (stream.title?.toLowerCase().includes(query))
    );
  }, [streams, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredStreams: filteredStreams()
  };
}