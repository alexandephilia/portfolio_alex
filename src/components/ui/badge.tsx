import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-[2px] px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 shadow-[0_1px_3px_0_rgb(0,0,0,0.1)] dark:shadow-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(var(--primary),0.1)] hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-105",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-[0_0_0_1px_rgba(var(--secondary),0.1)] hover:shadow-[0_0_20px_rgba(var(--secondary),0.4)] hover:scale-105",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-[0_0_0_1px_rgba(var(--destructive),0.1)] hover:shadow-[0_0_20px_rgba(var(--destructive),0.4)] hover:scale-105",
        outline:
          "text-foreground border-zinc-600/20 dark:border-transparent bg-background dark:shadow-[0_0_0_1px_rgba(var(--foreground),0.05)] hover:shadow-[0_0_10px_rgba(var(--foreground),0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
