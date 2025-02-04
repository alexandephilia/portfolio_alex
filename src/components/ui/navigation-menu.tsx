import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import { motion, useMotionValue, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0, height: 0 });

  const updatePosition = React.useCallback((index: number, element: Element) => {
    if (!listRef.current) return;
    
    const listRect = listRef.current.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();
    
    // Get computed styles for padding
    const computedStyle = window.getComputedStyle(element);
    const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    
    setDimensions({
      width: itemRect.width - paddingX + 8, // Subtract padding and add slight overlap
      left: itemRect.left - listRect.left + (paddingX / 4), // Center by adjusting for padding
      height: itemRect.height
    });
    setActiveIndex(index);
  }, []);

  return (
    <div ref={listRef} className="relative">
      <NavigationMenuPrimitive.List
        ref={ref}
        className={cn(
          "group flex flex-1 list-none items-center justify-center space-x-1",
          className
        )}
        {...props}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <motion.div
          className="absolute rounded-md bg-accent/80 backdrop-blur-[1px]"
          initial={false}
          animate={{
            width: activeIndex !== null ? dimensions.width : 0,
            x: activeIndex !== null ? dimensions.left : 0,
            height: activeIndex !== null ? dimensions.height - 4 : 0, // Slightly smaller for visual polish
            opacity: activeIndex !== null ? 1 : 0,
          }}
          transition={{
            type: "spring",
            bounce: 0.15,
            duration: 0.4,
            delay: 0.05
          }}
          style={{
            top: "50%",
            y: "-50%",
            left: "0",
            pointerEvents: "none",
          }}
        />
        {React.Children.map(props.children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          
          return React.cloneElement(child as React.ReactElement<any>, {
            onMouseEnter: (e: React.MouseEvent) => {
              const target = e.currentTarget as Element;
              updatePosition(index, target);
              if (child.props.onMouseEnter) {
                child.props.onMouseEnter(e);
              }
            },
          });
        })}
      </NavigationMenuPrimitive.List>
    </div>
  );
})
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors nav-gpu relative hover:text-accent-foreground focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:text-accent-foreground data-[state=open]:text-accent-foreground"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <motion.div 
        className="flex items-center"
        animate={{
          x: isHovered ? 3 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
          duration: 0.3
        }}
      >
        <motion.span 
          className="relative"
          animate={{
            x: isHovered ? 2 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.5,
            delay: 0.05
          }}
        >
          {children}
        </motion.span>
        <motion.span
          className="inline-flex ml-1"
          initial={{ opacity: 0, x: -8, width: 0, rotate: 180 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -8,
            width: isHovered ? 'auto' : 0,
            rotate: isHovered ? 0 : 180
          }}
          transition={{
            opacity: { delay: 0.1, duration: 0.2 },
            x: { 
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
              delay: 0.1
            },
            width: { delay: 0.1, duration: 0.2 },
            rotate: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.15
            }
          }}
        >
          <ChevronDown
            className="relative top-[1px] h-3 w-3"
            aria-hidden="true"
          />
        </motion.span>
      </motion.div>
    </NavigationMenuPrimitive.Trigger>
  );
})
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]",
        "w-full overflow-hidden rounded-md border",
        "backdrop-blur-[8px]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
        "md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
