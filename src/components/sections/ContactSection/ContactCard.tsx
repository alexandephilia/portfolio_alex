import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

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
          <Card className={`group transition-all ${color} cursor-pointer w-full bg-white dark:bg-black/100 
            border-[1px] border-black/20 ring-1 ring-black/5 
            dark:border-white/10 dark:ring-white/5`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
                <CardTitle className="text-base md:text-lg">{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {value}
              </p>
            </CardContent>
          </Card>
        </ShimmerButton>
      </a>
    </motion.div>
  );
};