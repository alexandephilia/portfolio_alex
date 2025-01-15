import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ShimmerButtonProps {
    children: React.ReactNode;
    className?: string;
}

export const ShimmerButton = ({ children, className = "" }: ShimmerButtonProps) => {
    const [isNear, setIsNear] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState<{ x: number; y: number; opacity: number }[]>([]);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientX < 0 || e.clientX > window.innerWidth ||
                e.clientY < 0 || e.clientY > window.innerHeight) {
                setIsNear(false);
                setTrail([]);
                return;
            }

            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const isNearButton = x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50;

                setIsNear(isNearButton);
                if (isNearButton) {
                    setCursorPosition({ x, y });
                    setTrail((prevTrail) => [
                        { x, y, opacity: 1 },
                        ...prevTrail.slice(0, 5).map((point) => ({
                            ...point,
                            opacity: point.opacity * 0.8
                        })),
                    ]);
                } else {
                    setTrail([]);
                }
            }
        };

        const handleMouseLeave = () => {
            setIsNear(false);
            setTrail([]);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <motion.div
            ref={buttonRef}
            className={`relative p-[1px] rounded-lg overflow-hidden ${className}`}
        >
            {/* Trail effect */}
            {trail.map((point, index) => (
                <motion.div
                    key={index}
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle 80px at ${point.x}px ${point.y}px, rgba(255,255,255,${point.opacity * 0.4}), transparent 60%)`,
                        opacity: point.opacity,
                        filter: 'blur(8px)',
                    }}
                />
            ))}

            {/* Localized border glow effect */}
            <motion.div
                className="absolute inset-0"
                style={{
                    opacity: isNear ? 1 : 0,
                    background: `
                        radial-gradient(circle 60px at ${cursorPosition.x}px ${cursorPosition.y}px, 
                        rgba(255,255,255,0.8) 0%, 
                        rgba(255,255,255,0.1) 30%, 
                        transparent 70%)
                    `,
                    filter: 'blur(2px)',
                    pointerEvents: 'none',
                }}
                transition={{ opacity: { duration: 0.3 } }}
            />

            {/* Secondary glow effect */}
            <motion.div
                className="absolute inset-0"
                style={{
                    opacity: isNear ? 1 : 0,
                    background: `radial-gradient(circle 100px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,255,255,0.3), transparent 60%)`,
                    filter: 'blur(15px)',
                    pointerEvents: 'none',
                }}
                transition={{ opacity: { duration: 0.3 } }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}; 