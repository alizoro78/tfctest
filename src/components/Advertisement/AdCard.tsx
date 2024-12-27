import React from 'react';

interface AdCardProps {
  imageUrl: string;
  link: string;
  className?: string;
}

export function AdCard({ imageUrl, link, className = '' }: AdCardProps) {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 h-full ${className}`}
    >
      <img 
        src={imageUrl} 
        alt="تبلیغات"
        className="w-full h-full object-cover"
      />
    </a>
  );
}