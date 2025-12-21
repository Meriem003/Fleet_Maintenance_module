export const Input = ({ label, error, icon: Icon, helperText, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={`input-field ${Icon ? 'pl-12' : ''} ${
            error ? 'input-error' : ''
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="font-medium">⚠</span> {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
