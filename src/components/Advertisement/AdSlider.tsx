import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Ad {
  id: string;
  imageUrl: string;
  link: string;
}

const ADS: Ad[] = [
  {
    id: 'discord',
    imageUrl: 'https://yt3.googleusercontent.com/2bDio6fWhiXYTPym0WMU-XUgKnoqcAu3Gg3lIcJBWd6ql6cJmj1pAGcUSojv5b2wwSRuGinmow=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    link: 'https://www.youtube.com/@TwitchFarsiClips'
  },
  {
    id: 'telegram',
    imageUrl: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop',
    link: 'https://t.me/twitchfarsi'
  }
];

export function AdSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ADS.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + ADS.length) % ADS.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % ADS.length);
  };

  return (
    <div className="relative h-[200px] mb-8 overflow-hidden rounded-lg">
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ 
          width: `${ADS.length * 100}%`,
          transform: `translateX(${-currentIndex * (100 / ADS.length)}%)`
        }}
      >
        {ADS.map((ad) => (
          <div 
            key={ad.id}
            className="relative"
            style={{ width: `${100 / ADS.length}%` }}
          >
            <a
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={ad.imageUrl}
                alt="Advertisement"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </a>
          </div>
        ))}
      </div>

      {ADS.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {ADS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}