export const Card = ({ children, className = '', hoverable = false }) => {
  return (
    <div className={`card ${hoverable ? 'hover:scale-[1.02]' : ''} ${className}`}>
      {children}
    </div>
  );
};
