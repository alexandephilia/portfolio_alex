import React from 'react';

export const GradientBlur = () => {
    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
            style={{
                height: '6vh',
                transform: 'translateZ(0)',
                willChange: 'transform',
                isolation: 'isolate'
            }}
        >
            {/* Layer 1 */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: 'blur(0.5px)',
                    WebkitBackdropFilter: 'blur(0.5px)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 12.5%, black 25%, transparent 37.5%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12.5%, black 25%, transparent 37.5%)'
                }}
            />

            {/* Layer 2 */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: 'blur(1px)',
                    WebkitBackdropFilter: 'blur(1px)',
                    maskImage: 'linear-gradient(to bottom, transparent 12.5%, black 25%, black 37.5%, transparent 50%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 12.5%, black 25%, black 37.5%, transparent 50%)'
                }}
            />

            {/* Layer 3 */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: 'blur(2px)',
                    WebkitBackdropFilter: 'blur(2px)',
                    maskImage: 'linear-gradient(to bottom, transparent 25%, black 37.5%, black 50%, transparent 62.5%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 25%, black 37.5%, black 50%, transparent 62.5%)'
                }}
            />

            {/* Layer 4 */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    maskImage: 'linear-gradient(to bottom, transparent 37.5%, black 50%, black 62.5%, transparent 75%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 37.5%, black 50%, black 62.5%, transparent 75%)'
                }}
            />

            {/* Layer 5 */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    maskImage: 'linear-gradient(to bottom, transparent 50%, black 62.5%, black 75%, transparent 87.5%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 50%, black 62.5%, black 75%, transparent 87.5%)'
                }}
            />

            {/* Layer 6 */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    maskImage: 'linear-gradient(to bottom, transparent 62.5%, black 75%, black 87.5%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 62.5%, black 75%, black 87.5%, transparent)'
                }}
            />

            {/* Final Layer */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: 'blur(32px)',
                    WebkitBackdropFilter: 'blur(32px)',
                    maskImage: 'linear-gradient(to bottom, transparent 75%, black 87.5%, black)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 75%, black 87.5%, black)'
                }}
            />
        </div>
    );
}; 