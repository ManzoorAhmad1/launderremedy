import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-primary-400",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600",
        secondary:
          "border-transparent bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-700 dark:hover:bg-secondary-600",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:text-white dark:hover:bg-red-800",
        outline:
          "text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800",
        success:
          "border-transparent bg-accent-green text-white hover:bg-accent-green/90 dark:bg-accent-green/80 dark:text-white dark:hover:bg-accent-green",
        warning:
          "border-transparent bg-accent-yellow text-neutral-900 hover:bg-accent-yellow/90 dark:bg-accent-yellow/80 dark:text-neutral-900 dark:hover:bg-accent-yellow",
        info:
          "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/40",
        premium:
          "border-transparent bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 text-white hover:from-primary-600 hover:via-primary-700 hover:to-secondary-700",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }