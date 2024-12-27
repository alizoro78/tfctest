import type { TwitchStream } from '../types/twitch';

export function getRandomLiveStreamers(streams: TwitchStream[], count: number): TwitchStream[] {
  // Filter live streamers and ensure unique entries
  const uniqueLiveStreamers = streams.filter(stream => stream.isLive)
    .filter((stream, index, self) => 
      index === self.findIndex(s => s.login === stream.login)
    );
  
  // If we don't have enough live streamers, return all of them
  if (uniqueLiveStreamers.length <= count) return uniqueLiveStreamers;
  
  // Shuffle and get random streamers
  const shuffled = [...uniqueLiveStreamers]
    .sort((a, b) => b.viewersCount - a.viewersCount) // Sort by viewers first
    .slice(0, Math.floor(count * 1.5)) // Take more than needed for better randomization
    .sort(() => Math.random() - 0.5) // Shuffle
    .slice(0, count); // Take exactly what we need
    
  return shuffled;
}