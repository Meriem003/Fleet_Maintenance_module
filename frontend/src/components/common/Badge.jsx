import PropTypes from 'prop-types';

export const Badge = ({ children, variant = 'info' }) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
  };

  return (
    <span className={`badge ${variants[variant]}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['success', 'warning', 'danger', 'info']),
};
