import { Music, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export function Logo({ size = 'small', className = '' }: LogoProps) {
  const iconSize = size === 'large' ? 'w-12 h-12' : 'w-6 h-6';
  const textSize = size === 'large' ? 'text-4xl' : 'text-xl';
  
  return (
    <Link 
      to="/" 
      className={`inline-flex items-center space-x-3 text-purple-600 hover:text-purple-700 ${className}`}
    >
      <Music className={iconSize} />
      <span className={`font-bold ${textSize}`}>Beat or Bot</span>
      <Brain className={iconSize} />
    </Link>
  );
}