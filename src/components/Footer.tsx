import React from 'react';
import { Instagram, Youtube } from 'lucide-react';

// Custom Discord icon component to match Discord's logo style
function DiscordIcon({ size = 20, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 -28.5 256 256" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36zM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/twitchfarsiclips/',
      label: 'Instagram'
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/@TwitchFarsiClips',
      label: 'YouTube'
    },
    {
      icon: DiscordIcon,
      href: 'https://discord.com/invite/vVz9EkbnuX',
      label: 'Discord'
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white dark:bg-[#080808] border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] flex items-center px-4 text-sm text-gray-600 dark:text-gray-400 z-50">
      <div className="flex-1 flex items-center">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors mr-4"
            aria-label={label}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
      <div className="flex-1 text-center">
        <p>ساخته شده با <span className="text-purple-500">💜</span> توسط مستر ام کی و تیم تی اف سی</p>
      </div>
      <div className="flex-1" />
    </footer>
  );
}