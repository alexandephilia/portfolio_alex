declare module 'framer-motion' {
    import * as React from 'react'
    
    export type MotionProps = {
        initial?: any
        animate?: any
        exit?: any
        style?: any
        className?: string
        variants?: any
        transition?: any
        whileHover?: any
        whileTap?: any
        whileInView?: any
        viewport?: any
        ref?: React.RefObject<any> | ((instance: any) => void)
    }

    export type MotionComponent<P = {}> = React.ForwardRefExoticComponent<P & MotionProps & React.RefAttributes<any>>

    export const motion: {
        h3: any
        blockquote: any
        span: any
        p: any
        section: MotionComponent<React.HTMLAttributes<HTMLElement>>
        div: MotionComponent<React.HTMLAttributes<HTMLDivElement>>
        // Add other HTML elements as needed
    }

    export function useScroll(options?: {
        target?: React.RefObject<HTMLElement>
        offset?: [string, string]
        layoutEffect?: boolean
    }): { scrollYProgress: any }

    export function useSpring(value: any, config?: any): any

    export function useTransform(
        input: any,
        inputRange: number[],
        outputRange: any[]
    ): any

    export const useAnimationControls: typeof import('framer-motion').useAnimation

    export const AnimatePresence: React.FC<{
        initial?: boolean
        mode?: "sync" | "wait" | "popLayout"
        onExitComplete?: () => void
        children: React.ReactNode
    }>
} 