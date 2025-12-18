import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // نئے بٹن کے variants - آپ کے color scheme کے مطابق
        default:
          "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-600 dark:text-white dark:hover:bg-primary-700",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
        outline:
          "border border-primary-300 bg-transparent hover:bg-primary-50 text-primary-700 dark:border-primary-500 dark:text-primary-300 dark:hover:bg-primary-900/30",
        secondary:
          "bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-600 dark:text-white dark:hover:bg-secondary-700",
        ghost:
          "hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-300",
        link: "text-primary-600 underline-offset-4 hover:underline dark:text-primary-400",
        primary:
          "bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 text-white hover:from-primary-600 hover:via-primary-700 hover:to-secondary-700 shadow-sm hover:shadow transition-shadow",
        
        // پرانے بٹن کے variants (compatibility کے لیے)
        "old-default": "bg-primary text-primary-foreground hover:bg-primary/90",
        "old-destructive": "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        "old-outline": "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "old-secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "old-ghost": "hover:bg-accent hover:text-accent-foreground",
        "old-link": "text-primary underline-offset-4 hover:underline",
        
        // Additional variants
        tertiary: "bg-accent-blue hover:bg-accent-blue/80 text-white focus:ring-accent-blue",
        success: "bg-accent-green hover:bg-accent-green/80 text-white focus:ring-accent-green",
        grey: "bg-neutral-200 hover:bg-neutral-300 text-neutral-800 focus:ring-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100",
      },
      size: {
        // نئے بٹن کے sizes
        default: "h-10 px-4 py-2 text-sm rounded-lg",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-11 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg font-semibold",
        icon: "h-10 w-10 rounded-lg",
        
        // پرانے بٹن کے sizes (compatibility کے لیے)
        "old-default": "h-10 px-4 py-2 text-sm rounded-lg",
        "old-sm": "h-9 px-3 text-sm rounded-lg",
        "old-lg": "h-11 px-8 text-lg rounded-lg",
        "old-md": "px-4 py-2.5 text-base rounded-lg",
        "old-xl": "px-8 py-4 text-xl rounded-lg",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        fit: "w-fit",
      },
      rounded: {
        default: "rounded-lg",
        lg: "rounded-lg",
        md: "rounded-md",
        xl: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    compoundVariants: [
      // Focus rings for different variants
      {
        variant: ["default", "secondary", "primary"],
        className: "focus-visible:ring-primary-300 dark:focus-visible:ring-primary-400",
      },
      {
        variant: ["outline", "ghost", "link"],
        className: "focus-visible:ring-primary-200 dark:focus-visible:ring-primary-700",
      },
      {
        variant: "destructive",
        className: "focus-visible:ring-red-300 dark:focus-visible:ring-red-400",
      },
      {
        variant: ["tertiary", "success", "grey"],
        className: "focus-visible:ring-2 focus-visible:ring-offset-2",
      },
      {
        variant: "success",
        className: "focus-visible:ring-accent-green/50",
      },
      {
        variant: "grey",
        className: "focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-600",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "auto",
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    width,
    rounded,
    loading = false,
    disabled,
    icon,
    iconPosition = "left",
    children,
    asChild = false,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Loading state کے لیے icon کو handle کرنا
    const showLeftIcon = !loading && icon && iconPosition === "left"
    const showRightIcon = !loading && icon && iconPosition === "right"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, width, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        {showLeftIcon && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {showRightIcon && (
          <span className="ml-2">{icon}</span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

// Helper function for backward compatibility
export function mapOldVariant(oldVariant: string): string {
  const variantMap: Record<string, string> = {
    'primary': 'primary',
    'secondary': 'secondary',
    'tertiary': 'tertiary',
    'outline': 'outline',
    'danger': 'destructive',
    'success': 'success',
    'grey': 'grey',
    'default': 'default',
    'destructive': 'destructive',
    'link': 'link',
    'ghost': 'ghost',
  }
  
  return variantMap[oldVariant] || 'default'
}

export function mapOldSize(oldSize: string): string {
  const sizeMap: Record<string, string> = {
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg',
    'xl': 'xl',
    'default': 'default',
    'icon': 'icon',
  }
  
  return sizeMap[oldSize] || 'default'
}

// Alias exports for compatibility
export { Button as OldButton }