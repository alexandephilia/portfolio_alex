import { MotionValue } from "framer-motion";
import { ReactNode } from "react";

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
    tags?: string[];
    overlay?: ReactNode; // Elements to render above the marquee
}

export interface SectionProps {
    isActive?: boolean;
}
