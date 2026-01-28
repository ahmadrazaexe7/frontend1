import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={`w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer ${className}`}
          {...props}
        />
        {label && <label className="ml-2 text-sm text-gray-700 cursor-pointer">{label}</label>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
