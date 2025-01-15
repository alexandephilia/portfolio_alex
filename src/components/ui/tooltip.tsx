import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"


const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = ({ children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) => {
  const [isTouch, setIsTouch] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0;

    setIsTouch(isTouchDevice);
  }, []);

  return (
    <TooltipPrimitive.Root
      delayDuration={0}
      open={isTouch ? isOpen : undefined}
      onOpenChange={setIsOpen}
      {...props}
    >
      {children}
    </TooltipPrimitive.Root>
  );
};

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    className={cn("cursor-pointer touch-manipulation", className)}
    {...props}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      props.onClick?.(e);
    }}
    onTouchStart={(e) => {
      e.preventDefault();
      e.stopPropagation();
      props.onTouchStart?.(e);
    }}
  />
));
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <AnimatePresence mode="wait">
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-[100] overflow-hidden rounded-full flex items-center gap-1.5 px-3 py-1.5 touch-none",
          className || "bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-muted-foreground/10 shadow-sm"
        )}
        {...props}
      >
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 20, 
            scale: 0.95,
            filter: "blur(4px)"
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.3,
              duration: 0.3
            }
          }}
          exit={{ 
            opacity: 0, 
            y: 20, 
            scale: 0.95,
            filter: "blur(4px)",
            transition: {
              duration: 0.15,
              ease: "easeOut"
            }
          }}
          whileHover={{ 
            scale: 1.02,
            transition: {
              duration: 0.2
            }
          }}
        >
          {props.children}
        </motion.div>
      </TooltipPrimitive.Content>
    </AnimatePresence>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
