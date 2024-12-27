import type { TwitchStream } from '../../types/twitch';

export interface AdSlide {
  type: 'ad';
  id: string;
  imageUrl: string;
  link: string;
}

export type CarouselSlide = TwitchStream | AdSlide;

export interface FeaturedStreamerCardProps {
  stream: TwitchStream;
  isActive: boolean;
  isPrevious: boolean;
  isNext: boolean;
}