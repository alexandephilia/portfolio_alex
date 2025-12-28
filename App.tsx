import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import { BeyondWork } from './components/BeyondWork';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { Skills } from './components/Skills';
import { Tabs } from './components/Tabs';
import { Testimonials } from './components/Testimonials';
import { PROJECTS } from './constants';

export default function App() {
    const [activeTab, setActiveTab] = useState('Personal');
    const [hasVisited, setHasVisited] = useState(false);

    useEffect(() => {
        // Force scroll to top on refresh
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        const visited = sessionStorage.getItem('hasVisited');
        if (!visited) {
            sessionStorage.setItem('hasVisited', 'true');
            setHasVisited(true);
        }
    }, []);

    // Prevent right-click context menu globally
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    // Global Animation Variants
    const sectionVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    // Instant variant for subsequent visits
    const instantVariants = {
        hidden: { opacity: 1, filter: 'blur(0px)', y: 0 },
        visible: { opacity: 1, filter: 'blur(0px)', y: 0 }
    };

    // Simplified Staggered Reveal Variants
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 20,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    // Only apply animations if it's the first load of the session
    const isFirstLoad = !hasVisited;

    // Initialize Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const displayProjects = PROJECTS.filter(project => project.category === activeTab);

    return (
        <div
            className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans"
            style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
            }}
            onDragStart={(e) => e.preventDefault()}
        >
            <div className="max-w-[740px] mx-auto border-x border-dashed border-gray-200 bg-[#FAFAFA] min-h-screen flex flex-col">

                <motion.div
                    variants={isFirstLoad ? containerVariants : {}}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col"
                >
                    <motion.div variants={isFirstLoad ? itemVariants : {}}>
                        <Header />
                    </motion.div>

                    <main className="flex flex-col">
                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <Hero />
                        </motion.div>

                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        </motion.div>

                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <section className="p-6 md:p-10 border-b border-dashed border-gray-200">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={{
                                            hidden: { 
                                                opacity: 0, 
                                                filter: 'blur(10px)', 
                                                y: 15,
                                                scale: 0.98
                                            },
                                            visible: {
                                                opacity: 1,
                                                filter: 'blur(0px)',
                                                y: 0,
                                                scale: 1,
                                                transition: {
                                                    staggerChildren: 0.08,
                                                    delayChildren: 0.05,
                                                    duration: 0.4,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }
                                            },
                                            exit: {
                                                opacity: 0,
                                                filter: 'blur(8px)',
                                                y: -10,
                                                transition: { 
                                                    duration: 0.2,
                                                    ease: "easeIn" 
                                                }
                                            }
                                        }}
                                        className="flex flex-col gap-6"
                                        style={{ willChange: 'opacity, filter, transform' }}
                                    >
                                        {displayProjects.length > 0 ? (
                                            displayProjects.map((project) => (
                                                <ProjectCard key={project.id} project={project} />
                                            ))
                                        ) : (
                                            <motion.div
                                                variants={{
                                                    hidden: { opacity: 0, y: 10 },
                                                    visible: { opacity: 1, y: 0 }
                                                }}
                                                className="py-20 text-center text-gray-400 bg-white rounded-[32px] border border-gray-100"
                                            >
                                                <p>No projects found in this category yet.</p>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </section>
                        </motion.div>

                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <Experience />
                        </motion.div>
                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <Education />
                        </motion.div>
                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <Skills />
                        </motion.div>
                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <Testimonials />
                        </motion.div>
                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <Contact />
                        </motion.div>
                        <motion.div variants={isFirstLoad ? itemVariants : {}}>
                            <BeyondWork />
                        </motion.div>
                    </main>

                    <motion.div variants={isFirstLoad ? itemVariants : {}}>
                        <Footer />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
