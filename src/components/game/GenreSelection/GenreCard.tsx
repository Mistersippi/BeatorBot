import { motion } from 'framer-motion';
import { Genre } from './types';
import * as Icons from 'lucide-react';
import React from 'react';

interface GenreCardProps {
  genre: Genre;
  isSelected: boolean;
  onSelect: (genre: Genre) => void;
  className?: string;
}

const getIconColor = (genreId: string): string => {
  const colors: { [key: string]: string } = {
    all: '#FF6B6B',     // Coral Red
    edm: '#4ECDC4',     // Turquoise
    country: '#FFD93D',  // Golden Yellow
    classical: '#95A5A6', // Silver
    jazz: '#6C5CE7',    // Purple
    pop: '#FF78C4',     // Pink
    rock: '#E84393',    // Hot Pink
    hiphop: '#00B894',  // Green
    ambient: '#74B9FF', // Light Blue
    rb: '#A8E6CF',      // Mint
  };
  return colors[genreId] || '#FFFFFF';
};

export function GenreCard({ genre, isSelected, onSelect, className = '' }: GenreCardProps) {
  const isAllGenres = genre.id === 'all';
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => onSelect(genre)}
      className={`
        group relative cursor-pointer p-4 rounded-xl
        ${isSelected ? 'bg-white/5' : 'bg-white/5'}
        ${className}
        hover:bg-white/15 transition-colors
        flex flex-col items-center justify-center
        min-w-[140px] min-h-[160px]
        overflow-hidden
      `}
    >
      {isSelected && (
        <motion.div
          layoutId="selectedGenre"
          className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-indigo-500/30 to-violet-600/30 backdrop-blur-sm"
          initial={false}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6
          }}
        />
      )}
      
      <motion.div 
        className={`
          relative z-10
          w-10 h-10 rounded-lg flex items-center justify-center mb-3
          ${isSelected ? 'bg-white/20' : 'bg-white/10'}
          ${isAllGenres ? 'w-12 h-12' : ''}
          group-hover:[&>div]:rotate-[360deg] [&>div]:transition-transform [&>div]:duration-700 [&>div]:ease-in-out
        `}
      >
        {Icons[genre.iconName as keyof typeof Icons] && (
          <div>
            {React.createElement(Icons[genre.iconName as keyof typeof Icons] as React.ComponentType<any>, {
              size: isAllGenres ? 28 : 24,
              className: `${isSelected ? 'opacity-100' : 'opacity-90'}`,
              style: { color: getIconColor(genre.id) }
            })}
          </div>
        )}
      </motion.div>
      <h3 className={`relative z-10 text-lg font-semibold mb-1 ${isSelected ? 'text-white' : 'text-white'}`}>
        {genre.name}
      </h3>
      <p className={`relative z-10 text-sm ${isSelected ? 'text-purple-100' : 'text-purple-100/90'}`}>
        {genre.description}
      </p>
      
      {isSelected && (
        <motion.div
          layoutId="selectedBorder"
          className="absolute inset-0 rounded-xl border-2 border-purple-400/50"
          initial={false}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6
          }}
        />
      )}
    </motion.div>
  );
}