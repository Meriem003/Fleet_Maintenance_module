import PropTypes from 'prop-types';

export const Input = ({ label, error, icon: Icon, helperText, variant = 'light', ...props }) => {
  const isDark = variant === 'dark';
  
  const labelColorClass = isDark 
    ? 'text-white/90 group-hover:text-white' 
    : 'text-gray-700 group-hover:text-gray-900';
  
  const iconColorClass = isDark 
    ? 'text-white/40 group-hover:text-white/60' 
    : 'text-gray-400 group-hover:text-gray-600';
  
  const darkInputClass = `bg-white/5 backdrop-blur-sm border ${
    error 
      ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20' 
      : 'border-white/20 focus:border-white/50 hover:border-white/30'
  } text-white placeholder-white/40 focus:ring-white/10 hover:bg-white/10`;
  
  const lightInputClass = `bg-white border ${
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
  } text-gray-900 placeholder-gray-400 focus:ring-blue-500/10 hover:bg-gray-50`;
  
  return (
    <div className="space-y-2 group">
      {label && (
        <label className={`block text-sm font-semibold transition-colors duration-300 ${labelColorClass}`}>
          {label}
          {props.required && <span className={isDark ? 'text-red-400 ml-1' : 'text-red-500 ml-1'}>*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${iconColorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={`w-full px-4 py-3.5 ${Icon ? 'pl-12' : ''} rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 ${
            isDark ? darkInputClass : lightInputClass
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className={`text-sm flex items-center gap-1 animate-in slide-in-from-left-2 duration-300 ${
          isDark ? 'text-red-300' : 'text-red-600'
        }`}>
          <span className="font-medium">⚠</span> {error}
        </p>
      )}
      {helperText && !error && (
        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{helperText}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.elementType,
  helperText: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  required: PropTypes.bool,
};
