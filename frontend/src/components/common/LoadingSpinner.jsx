import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

export const LoadingSpinner = ({ size = 'md', text = 'Chargement...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 className={`${sizes[size]} animate-spin text-primary-600`} />
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  );
};
