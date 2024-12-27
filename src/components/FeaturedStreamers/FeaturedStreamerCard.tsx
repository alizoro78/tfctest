import React from 'react';
import { Users } from 'lucide-react';
import type { TwitchStream } from '../../types/twitch';

interface FeaturedStreamerCardProps {
  stream: TwitchStream;
  isActive: boolean;
  isPrevious: boolean;
  isNext: boolean;
}

export function FeaturedStreamerCard({ stream, isActive, isPrevious, isNext }: FeaturedStreamerCardProps) {
  return (
    <a 
      href={`https://www.twitch.tv/${stream.login}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-full flex-shrink-0"
    >
      <div className="relative w-full h-full">
        <img
          src={stream.thumbnailUrl}
          alt={stream.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={stream.profileImage}
              alt={stream.displayName}
              className="w-12 h-12 rounded-full border-2 border-purple-500"
            />
            <div>
              <h3 className="text-xl font-bold">{stream.displayName}</h3>
              <p className="text-sm text-gray-300">{stream.gameName}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-red-500 px-2 py-1 rounded text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              پخش زنده
            </div>
          </div>
          <p className="text-lg mb-2 line-clamp-1">{stream.title}</p>
          <div className="flex items-center gap-2 text-purple-400 text-sm">
            <Users size={16} />
            <span>{stream.viewersCount.toLocaleString('fa-IR')} بیننده</span>
          </div>
        </div>
      </div>
    </a>
  );
}