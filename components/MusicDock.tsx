import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { Pause, Play, Repeat, Repeat1, SkipBack, SkipForward } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { SONGS } from '../constants';

// Max characters that fit without scrolling (based on ~100px container width at 10-11px uppercase font)
const MAX_TITLE_CHARS = 12;

export const MusicDock: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isRepeatOne, setIsRepeatOne] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const constraintsRef = useRef<HTMLDivElement | null>(null);
    const dragControls = useDragControls();

    const currentSong = SONGS[currentSongIndex];

    // Simple reliable check: scroll if title exceeds character threshold
    const shouldScroll = currentSong.title.length > MAX_TITLE_CHARS;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
        setIsPlaying(true);
    };

    const prevSong = () => {
        setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
        setIsPlaying(true);
    };

    const toggleRepeat = () => setIsRepeatOne(!isRepeatOne);

    const handleEnded = () => {
        if (isRepeatOne && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            nextSong();
        }
    };

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.play().catch(e => console.error("Audio play failed on change:", e));
        }
    }, [currentSongIndex]);

    return (
        <>
            {/* Drag constraints - full viewport */}
            <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[99]" />

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            x: isMinimized ? dragPosition.x : 0,
                            y: isMinimized ? dragPosition.y : 0,
                        }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 200,
                            opacity: { duration: 0.3 }
                        }}
                        drag={isMinimized}
                        dragControls={dragControls}
                        dragConstraints={constraintsRef}
                        dragElastic={0.1}
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={(_, info) => {
                            setIsDragging(false);
                            setDragPosition(prev => ({
                                x: prev.x + info.offset.x,
                                y: prev.y + info.offset.y
                            }));
                        }}
                        whileDrag={{ scale: 1.05 }}
                        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] ${isMinimized ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    >
                        <motion.div
                            animate={{
                                width: isMinimized ? 64 : 380,
                            }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                            }}
                            style={{ willChange: 'width' }}
                            className="
                            relative
                            bg-white/40 backdrop-blur-3xl
                            border border-white/50
                            rounded-[20px]
                            shadow-[0_15px_35px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.8)]
                            overflow-hidden
                            transform-gpu
                        "
                        >
                            <div className="flex items-center p-1">
                                <audio
                                    ref={audioRef}
                                    src={currentSong.url}
                                    onEnded={handleEnded}
                                />

                                {/* Album Art with Play/Pause Overlay */}
                                <div
                                    className="relative flex-shrink-0 cursor-pointer group"
                                    onClick={togglePlay}
                                    onTouchStart={() => isMinimized && setShowOverlay(true)}
                                    onTouchEnd={() => {
                                        if (isMinimized && showOverlay) {
                                            togglePlay();
                                            setTimeout(() => setShowOverlay(false), 200);
                                        }
                                    }}
                                    onMouseEnter={() => isMinimized && setShowOverlay(true)}
                                    onMouseLeave={() => setShowOverlay(false)}
                                >
                                    <div
                                        className={`
                                        w-14 h-14
                                        bg-gray-900
                                        flex items-center justify-center
                                        shadow-lg
                                        overflow-hidden
                                        border-[3px] border-white/20
                                        ring-1 ring-black/10
                                        rounded-[14px]
                                        transition-transform duration-300
                                        ${isPlaying && !isMinimized ? 'scale-[1.02]' : 'scale-100'}
                                    `}
                                    >
                                        <img
                                            src={currentSong.coverUrl}
                                            className={`w-full h-full object-cover opacity-80 grayscale brightness-110 transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                                            alt={currentSong.title}
                                        />

                                        {/* Play/Pause Overlay - always visible on hover, or on touch for minimized */}
                                        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-opacity duration-200 ${isMinimized
                                            ? (showOverlay ? 'opacity-100' : 'opacity-0')
                                            : 'opacity-0 group-hover:opacity-100'
                                            }`}>
                                            {isPlaying ? <Pause size={18} fill="white" className="text-white" /> : <Play size={18} fill="white" className="text-white ml-0.5" />}
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60 pointer-events-none" />

                                        {/* Playing Indicator */}
                                        <AnimatePresence>
                                            {isPlaying && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute bottom-1 right-1 flex items-center gap-0.5 h-2.5 px-1 rounded-full bg-black/40 backdrop-blur-md pointer-events-none"
                                                >
                                                    {[...Array(3)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{ height: [2, 8, 2] }}
                                                            transition={{ repeat: Infinity, duration: 0.5 + (i * 0.1) }}
                                                            className="w-0.5 bg-white/80 rounded-full"
                                                        />
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <motion.div
                                    animate={{
                                        opacity: isMinimized ? 0 : 1,
                                        x: isMinimized ? -20 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex-1 flex items-center justify-between gap-3 pl-3 pr-2 overflow-hidden ${isMinimized ? 'pointer-events-none' : ''}`}
                                >
                                    {/* Info & Sub-controls */}
                                    <div className="min-w-[100px] flex flex-col gap-1">
                                        <div className="flex flex-col">
                                            <div
                                                className="overflow-hidden whitespace-nowrap relative h-4 flex items-center w-[100px]"
                                                style={shouldScroll ? {
                                                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                                                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                                                } : {}}
                                            >
                                                <motion.div
                                                    key={currentSong.id}
                                                    initial={{ x: 0 }}
                                                    animate={shouldScroll ? { x: "-50%" } : { x: 0 }}
                                                    transition={shouldScroll ? {
                                                        duration: currentSong.title.length * 0.4,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                        repeatType: "loop"
                                                    } : { duration: 0.3 }}
                                                    className="flex"
                                                >
                                                    <span className="text-[10px] md:text-[11px] font-black text-gray-900 pr-8 tracking-tight uppercase whitespace-nowrap">
                                                        {currentSong.title}
                                                    </span>
                                                    {shouldScroll && (
                                                        <span className="text-[10px] md:text-[11px] font-black text-gray-900 pr-8 tracking-tight uppercase whitespace-nowrap">
                                                            {currentSong.title}
                                                        </span>
                                                    )}
                                                </motion.div>
                                            </div>
                                            <span className="text-[7px] md:text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-80 truncate">
                                                {currentSong.artist}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 h-4">
                                            <div className="flex items-center gap-0.5 h-full">
                                                {[...Array(6)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={isPlaying ? { height: [2, 10, 4, 8, 2] } : { height: 1.5 }}
                                                        transition={{ repeat: Infinity, duration: 0.6 + (i * 0.1) }}
                                                        className={`w-0.5 rounded-full ${isPlaying ? 'bg-[rgb(81,108,180)]/60' : 'bg-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <button onClick={toggleRepeat} className={`p-1 ${isRepeatOne ? 'text-[rgb(81,108,180)]' : 'text-gray-300'}`}>
                                                {isRepeatOne ? <Repeat1 size={12} /> : <Repeat size={12} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Main Controls */}
                                    <div className="flex items-center gap-1">
                                        <button onClick={prevSong} className="text-gray-400 hover:text-gray-900 p-1.5 active:scale-90 transition-transform">
                                            <SkipBack size={14} fill="currentColor" />
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-gray-100/80 border border-white/80 shadow-md flex items-center justify-center text-gray-900 hover:scale-105 active:scale-95 transition-transform"
                                        >
                                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                                        </button>
                                        <button onClick={nextSong} className="text-gray-400 hover:text-gray-900 p-1.5 active:scale-90 transition-transform">
                                            <SkipForward size={14} fill="currentColor" />
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Minimize/Expand Toggle - Outside the animated container */}
                        <button
                            onClick={() => {
                                if (!isMinimized) {
                                    // Reset position when minimizing (optional, or keep position)
                                } else {
                                    // Reset to center when expanding
                                    setDragPosition({ x: 0, y: 0 });
                                }
                                setIsMinimized(!isMinimized);
                            }}
                            className="absolute -top-1.5 -right-1.5 z-50 w-5 h-5 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-md flex items-center justify-center text-gray-400 hover:text-gray-900 hover:scale-110 active:scale-95 transition-all"
                        >
                            <span className="text-[10px] font-bold">{isMinimized ? '+' : '−'}</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
