import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

export const Logo = ({ size = 'md', animated = false }) => {
  const sizes = {
    sm: { container: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-base' },
    md: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-xl' },
    lg: { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-2xl' },
  };

  const sizeClasses = sizes[size] || sizes.md;

  const LogoIcon = animated ? motion.div : 'div';

  return (
    <div className="flex items-center gap-3">
      <LogoIcon
        {...(animated && {
          initial: { rotate: 0 },
          animate: { rotate: [0, 5, -5, 0] },
          transition: { duration: 2, repeat: Infinity, repeatDelay: 3 }
        })}
        className={`${sizeClasses.container} bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg`}
      >
        <Car className={`${sizeClasses.icon} text-white`} />
      </LogoIcon>
      <div>
        <h1 className={`${sizeClasses.text} font-bold text-gray-900 leading-tight`}>
          Fleet Manager
        </h1>
        <p className="text-xs text-gray-600 font-medium">
          Professional System
        </p>
      </div>
    </div>
  );
};
