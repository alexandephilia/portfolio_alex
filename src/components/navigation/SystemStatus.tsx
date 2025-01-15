import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const springTransition = {
    type: "spring",
    damping: 20,
    stiffness: 300,
};

export const SystemStatus = () => {
    return (
        <motion.div
            className="pt-4 border-t border-foreground/10 mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <div className="flex items-center justify-center gap-2">
                <motion.div
                    className="relative w-4 h-4 md:w-5 md:h-5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, ...springTransition }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-green-500/50 blur-[2px]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-green-500/50 blur-[1px]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2,
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border-[1.5px] border-green-500/30"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.1,
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                            scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <CheckCircle
                            className="h-4 w-4 md:h-5 md:w-5 text-green-500 relative z-10 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] filter blur-[0.2px]"
                        />
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <p className="text-xs md:text-sm text-muted-foreground m-0">
                        All Systems Operational • v1.0.0
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}; 