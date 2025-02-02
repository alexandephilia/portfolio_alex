import { motion, AnimatePresence } from "framer-motion";
import { X, User, Calendar, Clock, Tag } from "lucide-react";
import { FocusScope } from '@react-aria/focus';
import { useRef, useEffect } from "react";
import { BlogPost } from "../types/blog";
import { addBlogInlineIcons } from "../lib/blog-utils";
import { GradientBlur } from "./ui/gradient-blur";

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

const blogContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const blogItemVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: {
      type: "tween",
      ease: "easeInOut"
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "tween",
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
};

export const BlogModal = ({ post, onClose }: BlogModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (post) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        initialFocusRef.current?.focus();
      });
    } else {
      lastActiveElement.current?.focus();
    }
  }, [post]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && post) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [post, onClose]);

  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 
          dark:bg-black/25 bg-white/10
          backdrop-blur-md [-webkit-backdrop-filter:blur(16px)]
          flex items-center justify-center p-2 sm:p-4 z-[9999]
          [@supports_not_(backdrop-filter:blur(16px))]:bg-black/70
          dark:[@supports_not_(backdrop-filter:blur(16px))]:bg-black/90"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <FocusScope contain restoreFocus autoFocus>
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 350,
              opacity: { duration: 0.15 }
            }}
            className="bg-white/40 dark:bg-black/40 
              backdrop-blur-md [-webkit-backdrop-filter:blur(8px)]
              [@supports_not_(backdrop-filter:blur(8px))]:bg-white/95
              dark:[@supports_not_(backdrop-filter:blur(8px))]:bg-black/95
              text-card-foreground rounded-lg
              w-full max-w-3xl 
              max-h-[90vh] sm:max-h-[85vh] flex flex-col 
              focus:outline-none m-2 sm:m-0
              border border-black/5 dark:border-white/10
              shadow-[0_0_1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_5px_12px_-4px_rgba(0,0,0,0.15),0_12px_24px_-8px_rgba(0,0,0,0.05)]
              dark:shadow-[0_0_1px_rgba(255,255,255,0.1),0_2px_4px_-2px_rgba(0,0,0,0.2),0_5px_12px_-4px_rgba(0,0,0,0.5),0_12px_24px_-8px_rgba(0,0,0,0.8)]
              relative"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Modal Content */}
            <motion.div
              className="p-4 sm:p-6 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent relative"
              variants={blogContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Modal Header */}
              <motion.div
                variants={blogItemVariants}
                className="flex justify-between items-start mb-3 sm:mb-4"
              >
                <h2
                  id="modal-title"
                  className="text-base md:text-lg font-bold tracking-tight"
                >
                  {post.title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm p-1"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </motion.div>

              {/* Post Metadata */}
              <motion.div
                variants={blogContainerVariants}
                className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-[10px] md:text-xs text-muted-foreground border-b border-border pb-2 sm:pb-3"
              >
                {[
                  { icon: <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />, text: post.author },
                  { icon: <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />, text: post.date },
                  { icon: <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />, text: post.readTime },
                  { icon: <Tag className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />, text: post.category }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={blogItemVariants}
                    className="flex items-center"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Introduction */}
              <motion.p
                variants={blogItemVariants}
                className="text-[10px] md:text-xs leading-relaxed text-muted-foreground mb-6"
              >
                {post.content.introduction}
              </motion.p>

              {/* Content Sections */}
              <motion.div variants={blogContainerVariants}>
                {post.content.sections.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    variants={blogContainerVariants}
                    className="space-y-2 sm:space-y-3 mb-6"
                  >
                    {section.heading && (
                      <motion.h3
                        variants={blogItemVariants}
                        className="text-xs md:text-sm font-semibold tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-3"
                      >
                        {section.heading}
                      </motion.h3>
                    )}

                    {section.paragraphs.map((paragraph, pIndex) => (
                      <motion.p
                        key={pIndex}
                        variants={blogItemVariants}
                        className="text-[10px] md:text-xs leading-relaxed"
                      >
                        {addBlogInlineIcons(paragraph)}
                      </motion.p>
                    ))}

                    {section.quote && (
                      <motion.blockquote
                        variants={blogItemVariants}
                        className="border-l-3 border-primary pl-4 sm:pl-6 my-12 sm:my-16 italic text-[10px] md:text-xs relative mx-8 sm:mx-12 pr-4 sm:pr-6 max-w-[85%]"
                      >
                        <span
                          className="absolute -left-1 -top-1 text-primary text-xl sm:text-2xl leading-none"
                          style={{ fontFamily: '"Libre Bodoni", serif', fontStyle: 'italic' }}
                        >
                          "
                        </span>
                        <p
                          className="px-2"
                          style={{ fontFamily: '"Libre Bodoni", serif', fontStyle: 'italic' }}
                        >
                          {section.quote}
                        </p>
                        <span
                          className="absolute text-primary text-xl sm:text-2xl leading-none"
                          style={{
                            fontFamily: '"Libre Bodoni", serif',
                            fontStyle: 'italic',
                            right: '10px',
                            bottom: '-8px'
                          }}
                        >
                          "
                        </span>
                      </motion.blockquote>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Tags */}
              <motion.div
                variants={blogContainerVariants}
                className="flex flex-wrap gap-1 sm:gap-1.5 pt-2 sm:pt-3 border-t border-border"
              >
                {post.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    variants={blogItemVariants}
                    className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] md:text-xs font-medium 
                      bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Gradient Blur */}
              <div className="absolute left-0 right-0 bottom-0 pointer-events-none">
                <GradientBlur isFixed={true} className="z-10" />
              </div>
            </motion.div>
          </motion.div>
        </FocusScope>
      </motion.div>
    </AnimatePresence>
  );
}; 