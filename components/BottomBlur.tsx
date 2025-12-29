import React from 'react';

/**
 * BottomBlur Component
 * 
 * Implements a high-fidelity progressive blur at the bottom of the viewport.
 * This creates a premium "glass fog" effect as content scrolls out of view,
 * improving legibility and depth without overlapping clickable UI elements.
 */
export const BottomBlur: React.FC = () => {
    return (
        <div 
            className="fixed bottom-0 left-0 right-0 h-32 z-40 pointer-events-none select-none overflow-hidden"
            style={{ 
                // Ensuring no layout shift on iOS Safari
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
            }}
        >
            <div className="relative w-full h-full bg-none">
                {/* 
                  Layered Progressive Blur: 
                  Each div provides a specific blur radius with a staggered mask 
                  to create a smooth, physically-accurate transition.
                */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1, backdropFilter: 'blur(0.03125px)', WebkitBackdropFilter: 'blur(0.03125px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)'
                }} />
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 2, backdropFilter: 'blur(0.0625px)', WebkitBackdropFilter: 'blur(0.0625px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%)'
                }} />
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 3, backdropFilter: 'blur(0.125px)', WebkitBackdropFilter: 'blur(0.125px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%)'
                }} />
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 4, backdropFilter: 'blur(0.25px)', WebkitBackdropFilter: 'blur(0.25px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%)'
                }} />
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 5, backdropFilter: 'blur(0.5px)', WebkitBackdropFilter: 'blur(0.5px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%)'
                }} />
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 6, backdropFilter: 'blur(1px)', WebkitBackdropFilter: 'blur(1px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)'
                }} />
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 7, backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 112.5%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 112.5%)'
                }} />
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 8, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 112.5%, rgba(0,0,0,0) 125%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 112.5%, rgba(0,0,0,0) 125%)'
                }} />
            </div>
        </div>
    );
};
