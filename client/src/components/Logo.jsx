import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', variant = 'full', className = '' }) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl'
  };

  const logoImage = (
    <>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <svg viewBox="0 0 200 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#A855F7', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#EC4899', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <text x="10" y="40" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="url(#logoGrad)">
            N
          </text>
        </svg>
      </div>
    </>
  );

  if (variant === 'icon-only') {
    return (
      <Link to="/" className={`flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
        {logoImage}
      </Link>
    );
  }

  return (
    <Link to="/" className={`flex items-center gap-2 transition-all hover:opacity-80 ${className}`}>
      {logoImage}
      {variant === 'full' && (
        <span className={`${textSizeClasses[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 whitespace-nowrap`}>
          NEXORA
        </span>
      )}
    </Link>
  );
}
