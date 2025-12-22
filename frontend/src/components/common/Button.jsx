import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

export const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false, 
  icon: Icon,
  size = 'md',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
  };

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} flex items-center gap-2 justify-center`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  loading: PropTypes.bool,
  icon: PropTypes.elementType,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
};
