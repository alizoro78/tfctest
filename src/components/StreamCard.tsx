import React from 'react';
import { Users } from 'lucide-react';
import type { TwitchStream } from '../types/twitch';

interface StreamCardProps {
  stream: TwitchStream;
}

export function StreamCard({ stream }: StreamCardProps) {
  return (
    <a 
      href={`https://www.twitch.tv/${stream.login}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-purple-500/10 hover:shadow-xl"
    >
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img 
          src={stream.thumbnailUrl} 
          alt={stream.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm z-20 flex items-center gap-1">
          <Users className="h-3 w-3" /> {stream.viewersCount}
        </div>
      </div>
      <div className="p-3 flex">
        <img 
          src={stream.profileImage} 
          alt={stream.displayName} 
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <h3 className="text-gray-900 dark:text-white font-medium text-sm line-clamp-2">{stream.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs">{stream.displayName}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{stream.gameName}</p>
        </div>
      </div>
    </a>
  );
}