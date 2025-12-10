import { ReactNode } from "react";
import { MotionValue } from "framer-motion";

export interface CardProps {
  children: ReactNode;
  header: string;
  index: number;
  // We pass the global scroll progress (0...TotalCards) instead of a discrete active index
  scrollProgress: MotionValue<number>;
  totalCards: number;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  subHeader?: string;
  isLanyard?: boolean;
}

export interface SectionProps {
  isActive?: boolean;
}