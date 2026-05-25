import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";

export const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  isLoading, 
  children, 
  disabled, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary text-white shadow-md hover:bg-primary-dark",
    secondary: "bg-secondary text-white shadow-md hover:bg-[#3db8af]",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    danger: "bg-red-500 text-white shadow-md hover:bg-red-600",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg rounded-2xl",
    icon: "h-11 w-11",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";
