import React from 'react';
import { Users } from 'lucide-react';
import type { TwitchStream } from '../../types/twitch';

interface CarouselSlideProps {
  stream: TwitchStream;
  isActive: boolean;
  isPrevious: boolean;
  isNext: boolean;
}

export function CarouselSlide({ stream, isActive, isPrevious, isNext }: CarouselSlideProps) {
  const getSlideStyles = () => {
    if (isActive) {
      return 'w-[480px] h-[280px] z-10 scale-100 opacity-100';
    }
    if (isPrevious || isNext) {
      return 'w-[280px] h-[200px] opacity-40 blur-[1px]';
    }
    return 'w-[240px] h-[180px] opacity-30 blur-[2px]';
  };

  return (
    <div className={`flex items-center ${getSlideStyles()} transform transition-all duration-500`}>
      <a
        href={`https://www.twitch.tv/${stream.login}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full ${isActive ? 'hover:scale-[1.02] transition-transform duration-300' : ''}`}
      >
        <div className="rounded-lg overflow-hidden border-0 bg-card shadow-md">
          <div className="relative aspect-video">
            <img
              src={stream.thumbnailUrl}
              alt={stream.displayName}
              className="absolute inset-0 w-full h-full object-cover"
              loading={isActive ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{stream.viewersCount.toLocaleString('fa-IR')}</span>
            </div>
          </div>
          <div className={`p-3 ${isActive ? 'bg-gradient-to-t from-black/40' : ''}`}>
            <div className="flex items-center gap-2">
              <img
                src={stream.profileImage}
                alt={`${stream.displayName} profile`}
                className={`rounded-full ring-2 ring-purple-500 ${isActive ? 'w-10 h-10' : 'w-8 h-8'}`}
                loading="lazy"
              />
              <div>
                <h3 className={`font-medium line-clamp-1 ${isActive ? 'text-base' : 'text-sm'}`}>
                  {stream.displayName}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-1">{stream.gameName}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}