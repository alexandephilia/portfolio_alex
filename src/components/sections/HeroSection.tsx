import { motion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/statusbadge";
import { SiCardano } from "react-icons/si";
import { Linkedin, Mail, User, Skull } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCallback } from 'react'; // Add this import
import { Separator } from "@/components/ui/separator";
import { ShimmerDot } from "@/components/ui/shimmer-dot";
import { Skeleton } from "../ui/skeleton";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ReactNode } from 'react';
import { CSSProperties } from 'react';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface HeroSectionProps {
  name: string;
  title: ReactNode;
  subtitle: ReactNode;
  profileImage: string;
  socialLinks?: SocialLink[];
}

export const HeroSection = ({
  name,
  title,
  subtitle,
  profileImage,
  socialLinks = [
    {
      href: "https://linkedin.com/in/your-profile",
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn"
    },
    {
      href: "mailto:0xnihilist@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      label: "Email"
    },
    {
      href: "resume.pdf",
      icon: <User className="h-5 w-5" />,
      label: "Resume"
    }
  ]
}: HeroSectionProps) => {
  // Enhanced image variants with elastic, blur, and grayscale effects
  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 0.1,
      filter: "blur(20px) grayscale(100%)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px) grayscale(0%)",
      transition: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
        scale: {
          type: "spring",
          damping: 15,
          stiffness: 70,
          restDelta: 0.001
        },
        opacity: {
          duration: 0.8
        },
        filter: {
          duration: 0.8
        }
      }
    },
    hover: {
      filter: "blur(2px) grayscale(100%)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      filter: "blur(3px) grayscale(0%)",
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const preventTouchActions = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const motionDivStyle: CSSProperties = {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    willChange: 'transform',
    contain: 'paint layout',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none'
  } as const;

  const imgStyle: CSSProperties = {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    willChange: 'transform',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    pointerEvents: 'none',
    touchAction: 'none'
  } as const;

  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,hsl(var(--foreground))_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent opacity-90" />

      <div className="absolute bottom-0 w-full px-8 h-[2px]">
        <div className="w-full h-full border-b-[1px] border-dashed border-foreground/10" />
      </div>

      <section className="container min-h-[70vh] pt-16 md:pt-32 pb-12 relative flex flex-col items-center justify-center border-l-[1px] border-r-[1px] border-dashed border-foreground/10">
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <ShimmerButton className="w-full">
            <div
              className="group relative transition-all duration-500 dark:bg-black/90 bg-white/[0.1] p-8 rounded-lg 
                border-[1px] border-black/20 ring-1 ring-black/5 
                dark:border-white/10 dark:ring-white/5
"
            >
              {/* Grid Pattern Overlay - Light Mode */}
              <div className="absolute inset-0 w-full h-full dark:opacity-0">
                <svg
                  className="w-full h-full opacity-[0.08]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <defs>
                    <pattern
                      id="grid-light"
                      width="24"
                      height="24"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 24 0 L 0 0 0 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="0.5"
                      />
                    </pattern>
                    <linearGradient id="fade-light" x1="0" y1="1" x2="0.5" y2="0.5">
                      <stop offset="0" stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <mask id="fade-mask-light">
                      <rect width="100%" height="100%" fill="url(#fade-light)" />
                    </mask>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-light)" mask="url(#fade-mask-light)" />
                </svg>
              </div>

              {/* Grid Pattern Overlay - Dark Mode */}
              <div className="absolute inset-0 w-full h-full opacity-0 dark:opacity-100">
                <svg
                  className="w-full h-full opacity-[0.65]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <defs>
                    <pattern
                      id="grid-dark"
                      width="24"
                      height="24"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 24 0 L 0 0 0 24"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                    <linearGradient id="fade-dark" x1="0" y1="1" x2="0.4" y2="0.8">
                      <stop offset="0" stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <mask id="fade-mask-dark">
                      <rect width="100%" height="100%" fill="url(#fade-dark)" />
                    </mask>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-dark)" mask="url(#fade-mask-dark)" />
                </svg>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Left Side - Image and Name */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div
                      className="absolute -inset-[2px] rounded-full animate-gradient-rotate"
                      style={{
                        background: 'transparent',
                        border: '1px solid',
                        borderColor: '#3f3f46',
                        borderRadius: '50%',
                        backgroundSize: '200% 200%',
                        filter: 'blur(2px)',
                      }}
                    />
                    <motion.div
                      className="relative w-24 h-24 md:w-40 md:h-40 overflow-hidden rounded-full composite-layer touch-none select-none cursor-pointer"
                      variants={imageVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      whileTap="tap"
                      onTouchStart={preventTouchActions}
                      onTouchMove={preventTouchActions}
                      onTouchEnd={preventTouchActions}
                      style={motionDivStyle}
                    >
                      <img
                        src={profileImage}
                        alt="Profile memoji"
                        className="w-full h-full object-cover transition-all duration-200 prevent-drag select-none touch-none"
                        style={imgStyle}
                        draggable={false}
                        onContextMenu={preventTouchActions}
                        onTouchStart={preventTouchActions}
                        onTouchMove={preventTouchActions}
                        onTouchEnd={preventTouchActions}
                        onMouseDown={preventTouchActions}
                        role="presentation"
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-0.5 text-center">
                    <h1 className="text-[25px] md:text-3xl lg:text-4xl font-bold group hover:blur-[2px] transition-all duration-300 text-center">
                      {typeof name === 'string' ? name.split(/(\p{Emoji}|\s+)/u).filter(Boolean).map((char, index) => (
                        <span
                          key={index}
                          className="inline-block hover:animate-wave transition-all duration-300 group-hover:animate-wave touch-none"
                          style={{
                            fontFamily: '"Instrument Serif", serif',
                            fontWeight: 500,
                            animationDelay: `${index * 0.05}s`,
                            animationFillMode: "forwards",
                            letterSpacing: '0.02em'
                          }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      )) : name}
                    </h1>

                    <p className="text-[11px] md:text-sm lg:text-base text-muted-foreground/80 text-center mx-auto">
                      <span style={{ fontFamily: '"Libre Bodoni", serif' }}>I'm based in </span>
                      <span style={{ fontFamily: '"Libre Bodoni", serif' }}>Indonesia</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 animate-[fadeInBlur_0.8s_ease_forwards] [animation-delay:300ms] mt-4">
                    <StatusBadge
                      status="Working on"
                      icon={<SiCardano className="h-4 w-4" />}
                      text="Existence"
                    />
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="space-y-3 md:space-y-4 w-full max-w-xl">
                    <div className="flex items-center gap-3 md:gap-4">
                      <Separator className="flex-1" />
                      <Skull className="w-3 h-3 md:w-4 md:h-4 text-foreground/20" />
                      <Separator className="flex-1" />
                    </div>

                    <div className="space-y-3 max-w-[85%] md:max-w-[90%] mx-auto">
                      <p className="text-xs md:text-sm lg:text-base leading-relaxed text-muted-foreground/80 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                        {title}
                      </p>
                      <p className="text-xs md:text-sm lg:text-base leading-relaxed text-muted-foreground/80 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 md:gap-5 animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                    {socialLinks.map((link, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 md:h-11 md:w-11 hover:blur-[2px] transition-all duration-300 bg-background/20"
                              onClick={() => window.open(link.href, '_blank', 'noopener,noreferrer')}
                            >
                              <div className="scale-75 md:scale-100">
                                {link.icon}
                              </div>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p className="text-xs md:text-sm">{link.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ShimmerButton>
        </div>

        {/* Scroll indicator */}
        {/* <div className="mt-12 md:mt-16 animate-bounce opacity-50 pointer-events-none">
          <div className="w-4 h-8 md:w-6 md:h-10 border-2 border-foreground/40 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-foreground/40 rounded-full mt-2"></div>
          </div>
        </div> */}
      </section>
    </div>
  );
}; 