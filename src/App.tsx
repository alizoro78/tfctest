import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StreamCard } from './components/StreamCard';
import { Footer } from './components/Footer';
import { Carousel } from './components/FeaturedStreamers/Carousel';
import { AdCard } from './components/Advertisement/AdCard';
import { useStreamData } from './hooks/useStreamData';
import { useSearch } from './hooks/useSearch';
import { Twitch, Video } from 'lucide-react';

export function App() {
  const { streams, loading, error } = useStreamData();
  const { searchQuery, setSearchQuery, filteredStreams } = useSearch(streams);
  const liveStreams = streams.filter(stream => stream.isLive);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4">
        <div className="text-purple-500 animate-pulse">
          <Twitch size={48} />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
          توییچفا
        </h1>
      </div>
    );
  }

  const streamsWithAds = filteredStreams.reduce((acc, stream, index) => {
    acc.push(stream);
    if ((index + 1) % 10 === 0) { // Changed from 8 to 10 to align with 5 cards per row
      acc.push({ type: 'ad' as const });
    }
    return acc;
  }, [] as Array<typeof filteredStreams[0] | { type: 'ad' }>);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Sidebar streams={filteredStreams} />

      <main className="ml-60 pt-[60px] pb-16 p-6">
        <Carousel streams={streams} />
        
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-lg font-medium">پخش زنده</h2>
          <div className="flex items-center gap-2 text-purple-500 dark:text-purple-400">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <Video className="h-4 w-4" />
            <span className="text-sm">{liveStreams.length}</span>
          </div>
        </div>

        {error ? (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {streamsWithAds.map((item, index) => 
              'type' in item && item.type === 'ad' ? (
                <AdCard 
                  key={`ad-${index}`}
                  imageUrl="https://yt3.googleusercontent.com/2bDio6fWhiXYTPym0WMU-XUgKnoqcAu3Gg3lIcJBWd6ql6cJmj1pAGcUSojv5b2wwSRuGinmow=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
                  link="https://discord.gg/twitchfarsi"
                  className="h-full"
                />
              ) : (
                <StreamCard key={item.login} stream={item} />
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}