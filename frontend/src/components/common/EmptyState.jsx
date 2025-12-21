import { motion } from 'framer-motion';
import { Button } from './Button';

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  actionLabel,
  actionIcon 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 animate-float">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">{description}</p>
      
      {action && (
        <Button onClick={action} icon={actionIcon}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
