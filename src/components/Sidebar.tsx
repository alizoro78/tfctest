import React, { useState } from 'react';
import { Users } from 'lucide-react';
import type { TwitchStream } from '../types/twitch';

interface SidebarProps {
  streams: TwitchStream[];
}

export function Sidebar({ streams }: SidebarProps) {
  const [showAll, setShowAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const uniqueStreams = streams.filter((stream, index, self) => 
    index === self.findIndex(s => s.login === stream.login)
  );
  const displayedStreams = showAll ? uniqueStreams : uniqueStreams.slice(0, 10);

  return (
    <aside 
      className="w-60 bg-white dark:bg-[#0A0A0A] text-gray-600 dark:text-[#adadb8] fixed top-[60px] left-0 bottom-12 overflow-y-auto border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <h3 className="text-gray-900 dark:text-white text-sm mb-4">به ترتیب بیننده (زیاد به کم)</h3>
        
        <div className="space-y-2">
          {displayedStreams.map(stream => (
            <a
              key={stream.login}
              href={`https://www.twitch.tv/${stream.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-[#26262C] rounded transition-all duration-200 group"
            >
              <img 
                src={stream.profileImage} 
                alt={stream.displayName} 
                className="w-9 h-9 rounded-full transition-transform duration-200 group-hover:scale-110"
              />
              <div className="ml-3 flex-1 min-w-0">
                <div className="text-gray-900 dark:text-white text-sm truncate">{stream.displayName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{stream.gameName}</div>
              </div>
              {stream.isLive && (
                <div className="text-xs text-purple-500 dark:text-purple-400 flex items-center gap-1 ml-2">
                  <Users className="h-3 w-3" />
                  <span>{stream.viewersCount}</span>
                </div>
              )}
            </a>
          ))}
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-[#26262C] h-9 rounded-md px-3 mt-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 w-full"
        >
          {showAll ? 'نمایش کمتر' : 'نمایش بیشتر'}
        </button>
      </div>
    </aside>
  );
}