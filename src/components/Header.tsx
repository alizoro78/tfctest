import React from 'react';
import { Twitch } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ClipSubmitter } from './ClipSubmitter';
import { StreamerSubmitter } from './StreamerSubmitter';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#080808] dark:bg-[#080808] bg-white shadow-lg shadow-black/50 flex items-center px-4 z-50">
      <div className="flex items-center space-x-2 w-60">
        <Twitch className="text-purple-500" size={32} />
        <span className="text-xl font-bold text-black dark:text-white">TwitchFA</span>
      </div>
      
      <div className="flex-1 flex justify-center px-4">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="w-60 flex items-center justify-end space-x-2">
        <StreamerSubmitter />
        <ClipSubmitter />
        <ThemeToggle />
      </div>
    </header>
  );
}