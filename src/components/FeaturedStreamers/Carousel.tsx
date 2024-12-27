import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TwitchStream } from '../../types/twitch';
import { CarouselSlide } from './CarouselSlide';
import { getRandomLiveStreamers } from '../../utils/streamHelpers';

interface CarouselProps {
  streams: TwitchStream[];
}

export function Carousel({ streams }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState<TwitchStream[]>([]);

  useEffect(() => {
    const liveStreamers = getRandomLiveStreamers(streams, 5);
    if (liveStreamers.length > 0) {
      setSlides(liveStreamers);
      setCurrentIndex(0);
    }
  }, [streams]);

  const moveToNextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(moveToNextSlide, 15000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, moveToNextSlide, slides.length]);

  const handlePrevious = () => {
    if (slides.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    moveToNextSlide();
    setIsAutoPlaying(false);
  };

  if (slides.length === 0) return null;

  const getVisibleSlides = () => {
    const visibleIndexes = [-2, -1, 0, 1, 2].map(offset => {
      const index = (currentIndex + offset + slides.length) % slides.length;
      return index;
    });

    return visibleIndexes.map((index, arrayIndex) => ({
      stream: slides[index],
      isActive: index === currentIndex,
      isPrevious: index === ((currentIndex - 1 + slides.length) % slides.length),
      isNext: index === ((currentIndex + 1) % slides.length),
      // Create a unique key combining the stream login and position
      key: `${slides[index].login}-${arrayIndex}-${index}`
    }));
  };

  return (
    <div 
      className="relative h-[400px] mb-8 overflow-hidden rounded-lg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative h-full flex items-center justify-center gap-4">
        {getVisibleSlides().map(({ stream, isActive, isPrevious, isNext, key }) => (
          <CarouselSlide
            key={key}
            stream={stream}
            isActive={isActive}
            isPrevious={isPrevious}
            isNext={isNext}
          />
        ))}
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors z-30"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors z-30"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}