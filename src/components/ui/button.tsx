import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-[#0071a9] text-white hover:bg-[#0071a9]/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[#0071a9]/20 bg-background hover:bg-[#0071a9]/10 hover:text-[#0071a9] focus:outline-none focus-visible:outline-none ring-1 ring-[#0071a9]/10 focus:ring-[#0071a9]/20 focus-visible:ring-[#0071a9]/20 dark:border-white/20 dark:hover:bg-white/10 dark:hover:text-white dark:ring-white/10",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-[#0071a9]/10 hover:text-[#0071a9] dark:hover:bg-white/10 dark:hover:text-white",
        link: "text-[#0071a9] underline-offset-4 hover:underline dark:text-white",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-9 px-3",
        default: "h-10 px-4",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
