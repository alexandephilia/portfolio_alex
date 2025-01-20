import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface ContactCardProps {
  title: string;
  icon: LucideIcon;
  value: string;
  color: string;
  delay?: number;
  href: string;
}

export const ContactCard = ({ title, icon: Icon, value, color, delay = 0, href }: ContactCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Get the hover color based on the title
  const getHoverColor = (title: string) => {
    switch (title.toLowerCase()) {
      case 'whatsapp':
        return '#25D366';
      case 'github':
        return '#f97316';
      case 'linkedin':
        return '#0077B5';
      default:
        return color;
    }
  };

  const hoverColor = getHoverColor(title);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [50, 0, 0, 50]
  );

  const blur = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  const getIconAnimation = (title: string) => {
    switch (title.toLowerCase()) {
      case 'whatsapp':
        return {
          initial: {
            scale: 1,
            rotate: 0,
            y: 0,
            color: "inherit",
            filter: "none"
          },
          hover: {
            scale: [1, 1.2, 1.1],
            rotate: [0, -15, 15, -15, 0],
            y: [0, -3, 0],
            color: hoverColor,
            filter: `drop-shadow(0 0 8px ${hoverColor}) drop-shadow(0 0 20px ${hoverColor}80)`,
            transition: {
              duration: 0.6,
              rotate: { repeat: Infinity, repeatType: "loop", duration: 0.5 },
              y: { repeat: Infinity, repeatType: "reverse", duration: 0.5 }
            }
          }
        };
      case 'github':
        return {
          initial: {
            scale: 1,
            rotate: 0,
            color: "inherit",
            filter: "none"
          },
          hover: {
            scale: [1, 1.2, 1.15],
            rotate: [0, -20, 20, -10, 10, 0],
            color: hoverColor,
            filter: `drop-shadow(0 0 10px ${hoverColor})`,
            transition: {
              duration: 0.6,
              rotate: { 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              scale: { type: "spring", stiffness: 400, damping: 10 }
            }
          }
        };
      case 'linkedin':
        return {
          initial: {
            scale: 1,
            y: 0,
            color: "inherit",
            filter: "none"
          },
          hover: {
            scale: [1, 1.3, 1.2],
            y: [0, -5, 0],
            color: hoverColor,
            filter: `drop-shadow(0 0 12px ${hoverColor})`,
            transition: {
              duration: 0.4,
              scale: { type: "spring", stiffness: 500, damping: 7 },
              y: { type: "spring", stiffness: 400, damping: 8 }
            }
          }
        };
      default:
        return {
          initial: {
            scale: 1,
            color: "inherit",
            filter: "none"
          },
          hover: {
            scale: 1.2,
            color: hoverColor,
            filter: `drop-shadow(0 0 8px ${hoverColor})`,
            transition: { duration: 0.2 }
          }
        };
    }
  };

  const iconAnimation = getIconAnimation(title);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y,
        filter: blur,
        willChange: "transform"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <a href={href} className="block">
        <ShimmerButton className="w-full">
          <motion.div
            whileHover={{ 
              boxShadow: `0 0 20px ${hoverColor}40`
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`group transition-all ${color} cursor-pointer w-full bg-white dark:bg-black/100 
                border-[1px] border-black/20 ring-1 ring-black/5 
                dark:border-white/10 dark:ring-white/5`}
              initial="initial"
              whileHover="hover"
              animate="initial"
            >
              <CardHeader className="p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <motion.div
                    variants={iconAnimation}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-sm md:text-base">{title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4 pt-0 px-4 md:pb-5 md:px-5">
                <p className="text-xs md:text-sm text-muted-foreground">
                  {value}
                </p>
              </CardContent>
            </motion.div>
          </motion.div>
        </ShimmerButton>
      </a>
    </motion.div>
  );
};