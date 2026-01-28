import React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", className = "", ...props }, ref) => {
    const baseStyles =
      orientation === "horizontal" ? "w-full h-px bg-gray-200" : "h-full w-px bg-gray-200";

    return <div ref={ref} className={`${baseStyles} ${className}`} {...props} />;
  }
);

Separator.displayName = "Separator";
