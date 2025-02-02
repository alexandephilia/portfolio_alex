import { useSprings, animated, SpringValue } from '@react-spring/web';
import { useEffect, useRef, useState, MutableRefObject } from 'react';

interface SplitTextProps {
    text?: string;
    className?: string;
    delay?: number | { mobile: number; tablet: number; desktop: number };
    animationFrom?: { opacity: number; transform: string };
    animationTo?: { opacity: number; transform: string };
    easing?: (t: number) => number;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
    onLetterAnimationComplete?: () => void;
    fontSize?: { mobile: string; tablet: string; desktop: string };
    spacing?: { mobile: string; tablet: string; desktop: string };
}

const SplitText: React.FC<SplitTextProps> = ({
    text = '',
    className = '',
    delay = { mobile: 35, tablet: 45, desktop: 55 },
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = (t: number) => t,
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    onLetterAnimationComplete,
    fontSize = { mobile: '3rem', tablet: '5rem', desktop: '9rem' },
    spacing = { mobile: '0.2em', tablet: '0.25em', desktop: '0.3em' },
}) => {
    const words = text.split(' ').map(word => word.split(''));
    const letters = words.flat();
    const [inView, setInView] = useState(false);
    const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const ref = useRef<HTMLParagraphElement>(null);
    const animatedCount = useRef(0);
    const totalLetters = letters.length;
    const [allLettersAnimated, setAllLettersAnimated] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setScreenSize('mobile');
            } else if (width < 1024) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const handleLetterComplete = () => {
        animatedCount.current += 1;
        if (animatedCount.current === totalLetters) {
            setAllLettersAnimated(true);
            if (onLetterAnimationComplete) {
                onLetterAnimationComplete();
            }
        }
    };

    const currentDelay = typeof delay === 'number' ? delay : delay[screenSize];
    const currentFontSize = fontSize[screenSize];
    const currentSpacing = spacing[screenSize];

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: {
                opacity: 0,
                transform: 'translate3d(0,40px,0)',
                filter: 'blur(15px)'
            },
            to: inView
                ? {
                    opacity: 1,
                    transform: 'translate3d(0,0,0)',
                    filter: 'blur(0px)'
                }
                : {
                    opacity: 0,
                    transform: 'translate3d(0,40px,0)',
                    filter: 'blur(15px)'
                },
            config: {
                mass: 3,
                tension: 380,
                friction: 23
            },
            delay: i * currentDelay * 2.2,
            immediate: !inView,
            onRest: () => {
                if (i === letters.length - 1) {
                    handleLetterComplete();
                }
            }
        }))
    );

    return (
        <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            overflow: 'visible'
        }}>
            <p
                ref={ref}
                className={`split-parent ${className}`}
                style={{
                    textAlign,
                    overflow: 'visible',
                    display: 'block',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    width: '100%',
                    fontSize: currentFontSize,
                }}
            >
                {words.map((word, wordIndex) => (
                    <span
                        key={wordIndex}
                        style={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            marginRight: wordIndex === words.length - 1 ? 0 : currentSpacing,
                            verticalAlign: 'top'
                        }}
                    >
                        {word.map((letter, letterIndex) => {
                            const index = words
                                .slice(0, wordIndex)
                                .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                            return (
                                <animated.span
                                    key={index}
                                    style={{
                                        ...springs[index],
                                        display: 'inline-block',
                                        willChange: 'transform, opacity',
                                        verticalAlign: 'top',
                                    }}
                                >
                                    {letter}
                                </animated.span>
                            );
                        })}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default SplitText;
