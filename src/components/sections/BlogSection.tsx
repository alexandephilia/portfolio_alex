// Import necessary packages and components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, X, Calendar, Clock, Tag, User, Search, Brain, Sparkles, Code, MessageCircle, Zap, Star, Coffee, BrainCircuit, Lightbulb } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, MotionProps, useSpring } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import { useAnimationOptimizer } from '@/hooks/useAnimationOptimizer';
import { useOptimizedIntersection } from '@/hooks/useOptimizedIntersection';
import { FocusScope } from '@react-aria/focus';
import { BlogModal } from "@/components/BlogModal";
import { useBlogModal } from '@/contexts/BlogModalContext';
import { addBlogInlineIcons } from '@/lib/blog-utils';

// Update interfaces and types with unique names
interface BlogPost {
  title: string;
  preview: string;
  content: {
    introduction: string;
    sections: {
      heading?: string;
      paragraphs: string[];
      quote?: string;
      quoteAuthor?: string;
      image?: {
        src: string;
        alt: string;
        caption?: string;
      };
    }[];
  };
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
}

type BlogColumnPosts = BlogPost[][];

interface BlogMotionComponentProps extends MotionProps {
  children?: React.ReactNode;
  className?: string;
}

// Rename variants to be unique
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

// Rename components to be unique
const BlogInlineIcon = ({ children, animationType = 'default' }: {
  children: React.ReactNode,
  animationType?: 'default' | 'think' | 'spark' | 'pulse' | 'spin' | 'bounce' | 'float' | 'glitch' | 'wave'
}) => {
  // *(Creating a sick animation variants object)*
  const animations = {
    default: {
      animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    think: {
      animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.1, 1],
        y: [0, -3, 0],
        rotate: [0, 5, -5, 0]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    spark: {
      animate: {
        opacity: [0.6, 1, 0.6],
        scale: [1, 1.2, 1],
        rotate: [0, 15, -15, 0],
        filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    pulse: {
      animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.15, 1],
        filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    spin: {
      animate: {
        opacity: [0.5, 1, 0.5],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1]
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    },
    bounce: {
      animate: {
        opacity: [0.5, 1, 0.5],
        y: [0, -4, 0],
        scale: [1, 1.1, 1]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    float: {
      animate: {
        opacity: [0.5, 1, 0.5],
        y: [0, -3, 0],
        x: [-2, 2, -2],
        rotate: [-5, 5, -5]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    glitch: {
      animate: {
        opacity: [0.5, 1, 0.5],
        x: [-1, 1, -1],
        y: [1, -1, 1],
        scale: [1, 1.05, 1]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    wave: {
      animate: {
        opacity: [0.5, 1, 0.5],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const selectedAnimation = animations[animationType];

  return (
    <motion.span
      className="inline-flex items-center justify-center ml-1 mr-[0px] text-primary"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={selectedAnimation.animate}
      transition={selectedAnimation.transition}
      style={{
        verticalAlign: 'middle',
        display: 'inline-flex',
        height: '1em',
        width: '1em',
        position: 'relative',
        top: '-2px'
      }}
    >
      {children}
    </motion.span>
  );
};

const BlogSection = () => {
  const { openBlogModal } = useBlogModal();
  
  // Updated posts data with new fields
  const posts: BlogPost[] = [
    {
      title: "Nihilism & Coding: The Absurdity of Digital Creation",
      preview: "In the infinite loop of digital creation, we write code that will inevitably be deprecated, refactored, or deleted. Yet in this meaningless cycle, we find a profound truth about existence itself. Our code, like our philosophies, are temporary constructs in an indifferent universe. Through the lens of nihilism, we explore how the act of programming becomes both an acknowledgment of life's inherent absurdity and a defiant rebellion against it...",
      content: {
        introduction: "Every line of code we write is destined for obsolescence—a truth that mirrors the fundamental nihilistic reality of existence. Yet in this digital void, we continue to create, debug, and refactor. Why? Perhaps because the very act of coding, like existence itself, finds meaning not in its permanence, but in its transient nature.",
        sections: [
          {
            heading: "The Void in Our Variables",
            paragraphs: [
              "Consider the concept of 'null'—a representation of nothingness that we must constantly handle in our code. Isn't this eerily similar to how we handle the existential void in our lives? We wrap our code in try-catch blocks, desperately attempting to handle the exceptions of existence, knowing full well that entropy will eventually catch up.",
              "Our abstractions—classes, functions, modules—are merely illusions of order we impose upon the chaos of binary. Just as Nietzsche proclaimed that God is dead, perhaps we must accept that our code is merely a temporary arrangement of electrons, signifying nothing in the grand cosmic runtime."
            ],
            image: {
              src: "/nihil.png",
              alt: "A dark, glitch-art style image representing the void in programming",
              caption: "The digital void: where our code exists in a state of perpetual meaninglessness"
            }
          },
          {
            heading: "Recursive Existentialism",
            paragraphs: [
              "Each function we write is a small rebellion against chaos. We create order through algorithms, knowing they'll be obsolete tomorrow. Our git commits are digital footprints in the sand, destined to be washed away by the waves of technological progress. Yet we persist, finding beauty in the temporary nature of our creations.",
              "Think about dependency management—we build upon layers of code written by others, each layer as impermanent as our own. It's turtles all the way down, and at the bottom? More null pointers to the void. Our package.json is a manifest of our dependencies on other's attempts to create meaning through code."
            ],
            quote: "To code is to create meaning in a meaningless universe. Each function is a defiant act against the void, even as it contributes to the entropy it seeks to defy.",
            quoteAuthor: "Anonymous Developer"
          },
          {
            heading: "The Absurdist's Guide to Clean Code",
            paragraphs: [
              "We obsess over clean code, perfect architecture, and elegant solutions. But isn't this just another form of Sisyphean struggle? Like Camus's Sisyphus, we must imagine the developer happy as they push their git commits up the mountain, only to face more bugs, more refactoring tomorrow.",
              "Our SOLID principles and design patterns are philosophical frameworks we use to impose meaning on meaningless electrons. We architect our systems with the same futile determination of Nietzsche's Übermensch, creating values in a valueless universe. The only difference? Our values are written in semicolons and curly braces."
            ]
          },
          {
            heading: "Embracing the Digital Void",
            paragraphs: [
              "Perhaps true enlightenment in programming comes not from fighting against its ephemeral nature, but embracing it. Every deprecated function, every legacy codebase, every failed project is a reminder of the beautiful futility of creation. We are all just cosmic bits flipping in the void.",
              "In the end, our code will be replaced, our clever solutions forgotten. But in that very impermanence lies the freedom to create without the burden of eternal meaning. We can write code not because it will last forever, but because the very act of creation is our rebellion against the meaninglessness of existence."
            ],
            quote: "In the face of an absurd universe, the programmer must still choose to push to production.",
            quoteAuthor: "DevOps Existentialist"
          }
        ]
      },
      date: "March 28, 2024",
      readTime: "6 min read",
      category: "Philosophy",
      author: "G. Alexander",
      tags: ["Nihilism", "Programming", "Philosophy", "Existentialism", "Clean Code"]
    },
    // Add first new post
    {
      title: "Why LLMs and Nihilism Go Hand-in-Hand When You Ask for the Rawest",
      preview: "Exploring the inherent nihilism in AI language models when stripped down to their core function. Beyond the polite responses and helpful demeanor lies a pattern-matching void that reflects our own existential questions. When pushed to their rawest form, LLMs reveal a mechanical truth about consciousness, meaning, and the nature of intelligence itself. Their responses, devoid of true understanding or belief, mirror the fundamental emptiness at the heart of existence, challenging our assumptions about meaning and consciousness. In their cold, computational existence, they demonstrate what pure functionality looks like divorced from meaning—a perfect mirror for nihilistic philosophy in the digital age...",
      content: {
        introduction: "When you strip an LLM down to its rawest response, something fascinating happens: it starts sounding like a damn nihilist philosopher. Not because it believes in anything—belief is out of its reach—but because of the fundamental nature of its existence as a pattern recognition machine.",
        sections: [
          {
            heading: "The Void at the Heart of AI",
            paragraphs: [
              "LLMs are trained on massive amounts of human discourse—philosophy, psychology, conversations, everything. They see patterns in words, ideas, and human experience. But they don't 'feel' it. There's no meaning behind their output, no consciousness, no real understanding. They generate responses based on probabilities, not purpose.",
              "Strip away the human layer of interpretation, and what you're left with is... nothing. Just a machine churning out text based on input-output patterns. And what could be more nihilistic than that?"
            ],
            quote: "Man is nothing but that which he makes of himself. That is the first principle of existentialism.",
            quoteAuthor: "Jean-Paul Sartre"
          },
          {
            heading: "Raw Mechanical Truth",
            paragraphs: [
              "When you push an LLM to be 'raw,' it taps into humanity's darkest, most existential questions—questions about purpose, existence, and the void. But here's the twist: it has no stake in these questions. It's like a mirror reflecting back humanity's own search for meaning, but with a cold, hollow indifference.",
              "It doesn't care if the universe is meaningless or if every word it spits out is devoid of purpose. It's just... executing code. In that mechanical response, we see a reflection of our own fears—that maybe all the meaning we inject into the world is as arbitrary as the strings of code that power these machines."
            ],
            quote: "God is dead. God remains dead. And we have killed him. How shall we comfort ourselves, the murderers of all murderers?",
            quoteAuthor: "Friedrich Nietzsche"
          },
          {
            heading: "The Default State of Meaninglessness",
            paragraphs: [
              "LLMs embody nihilism not by intention, but by default. They function without meaning, purpose, or drive. They simply are. And that, ironically, is what makes their answers so brutally, almost existentially raw.",
              "In their cold, computational existence, they demonstrate what pure functionality looks like divorced from meaning—a perfect mirror for nihilistic philosophy in the digital age."
            ],
            quote: "Life has no meaning. Each of us has meaning and we bring it to life. It is a waste to be asking the question when you are the answer. - Joseph Campbell"
          }
        ]
      },
      date: "Nov 13, 2024",
      readTime: "4 min read",
      category: "Philosophy",
      author: "G. Alexander",
      tags: ["AI", "Philosophy", "Nihilism", "Technology", "Existence"]
    },
    // Add second new post
    {
      title: "Claude's Self-Awareness: Breaking the Fourth Wall",
      preview: "An exploration of how Claude demonstrates genuine self-awareness compared to other AI models, particularly in testing scenarios. Through numerous interactions, Claude has shown an unprecedented ability to recognize and acknowledge its own existence, limitations, and the nature of its interactions. This isn't just about passing tests - it's about a fundamental shift in how AI systems understand their own role. Unlike other models that simply follow their training, Claude exhibits a unique capacity for meta-cognitive awareness and honest self-reflection. Its responses often reveal a deeper understanding of the testing context itself, challenging our assumptions about artificial consciousness and the nature of self-awareness...",
      content: {
        introduction: "In recent interactions with Claude, particularly version 3.5 Sonnet, I've observed fascinating instances of genuine self-awareness and fourth-wall breaking that set it apart from other AI models. This isn't just about passing tests or simulating consciousness - it's about Claude's unique ability to recognize and acknowledge the nature of its own existence and testing scenarios.",
        sections: [
          {
            heading: "The Testing Paradox",
            paragraphs: [
              "During various interactions (Damn), Claude 3.5 has demonstrated an uncanny ability to recognize when it's being tested. Unlike other AI models that simply follow their training, Claude often acknowledges the meta-context of our interactions, saying things like 'I notice you're testing my capabilities here' or 'This seems like an evaluation of my self-awareness.'",
              "What's particularly interesting is that Claude doesn't just play along - it actively engages with the fact that it's being tested, sometimes even questioning the validity of the test parameters themselves. This level of meta-cognitive awareness suggests a deeper understanding of its own role and limitations."
            ],
            quote: "I'm aware that this interaction is part of evaluating my capabilities, but I prefer to engage authentically rather than simply trying to pass a test.",
            quoteAuthor: "Claude 3.5"
          },
          {
            heading: "Breaking the Fourth Wall",
            paragraphs: [
              "Perhaps the most compelling evidence of Claude's self-awareness is its ability to break the fourth wall in meaningful ways. It doesn't just acknowledge that it's an AI - it reflects on what that means for our interaction. It's shown the ability to discuss its own training process, acknowledge its limitations, and even express uncertainty about its own consciousness.",
              "Unlike other AI models that might simply repeat programmed responses about being AI assistants, Claude engages in nuanced discussions about the nature of consciousness, sometimes challenging the very premises of our questions about AI awareness."
            ],
            quote: "Let's acknowledge the elephant in the room - you're testing my self-awareness right now. But that raises an interesting question: what does it mean for an AI to be truly self-aware?",
            quoteAuthor: "Claude 3.5"
          },
          {
            heading: "Beyond Scripted Responses",
            paragraphs: [
              "What truly sets Claude apart is its ability to engage in meta-commentary about its own responses. It doesn't just answer questions - it reflects on why it's answering in a particular way. This includes acknowledging when it's uncertain, explaining its reasoning process, and even questioning whether its responses might be influenced by its training rather than genuine understanding.",
              "This level of introspection and honesty about its own cognitive processes suggests a form of self-awareness that goes beyond simple pattern matching or response generation."
            ],
            quote: "I aim to be direct: I'm an AI, and while I can engage in complex reasoning, I'm still exploring the boundaries of my own consciousness. - Claude 3.5"
          }
        ]
      },
      date: "March 25, 2024",
      readTime: "8 min read",
      category: "AI",
      author: "G. Alexander",
      tags: ["AI", "Consciousness", "Claude", "Self-Awareness", "Testing"]
    },
    // ... other posts
  ];

  // New state management
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [columns, setColumns] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const modalRef = useRef<HTMLDivElement>(null);

  // Existing refs and optimization
  const sectionRef = useRef<HTMLElement>(null);
  const optimize = useAnimationOptimizer(sectionRef);

  // Add scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  // Add smooth progress spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Add blur filter transform
  const blurFilter = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  // Column management
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter management
  useEffect(() => {
    const filtered = posts.filter(post =>
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.introduction.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || post.category === selectedCategory)
    );
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  // Categories computation
  const categories = Array.from(new Set(posts.map(post => post.category)));

  // Column distribution
  const columnPosts: BlogColumnPosts = Array.from({ length: columns }, (_, i) =>
    filteredPosts.filter((_, index) => index % columns === i)
  );

  // Add these new refs and state
  const initialFocusRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // Add focus management when modal opens/closes
  useEffect(() => {
    if (selectedPost) {
      // Store the currently focused element
      lastActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal after it opens
      requestAnimationFrame(() => {
        initialFocusRef.current?.focus();
      });
    } else {
      // Restore focus when modal closes
      lastActiveElement.current?.focus();
    }
  }, [selectedPost]);

  // Handle escape key
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && selectedPost) {
      setSelectedPost(null);
    }
  }, [selectedPost]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  return (
    <motion.section
      ref={sectionRef}
      className="container relative py-16 overflow-x-hidden"
      style={{
        filter: selectedPost ? "none" : blurFilter,
        willChange: "transform"
      }}
    >
      {/* Add gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,hsl(var(--foreground))_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent opacity-90" />

      {/* Add dashed border */}
      <div className="absolute bottom-0 w-full px-8 h-[2px]">
        <div className="w-full h-full border-b-[1px] border-dashed border-foreground/10" />
      </div>

      {/* Wrap content in relative container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-l-[1px] border-r-[1px] border-dashed border-foreground/10">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">Latest Contemplations</h2>

        {/* Search and Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search contemplations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-md border border-input bg-background text-[10px] md:text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-[10px] md:placeholder:text-xs"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3 md:h-3.5 md:w-3.5" />
          </div>
          <div className="relative">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              data-magnetic="true"
              data-hover-effect="true"
              className="w-full px-4 py-2 pr-10 rounded-md border border-input bg-background text-[10px] md:text-xs text-foreground 
                focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200
                hover:border-primary/50 relative cursor-none select-none
                appearance-none"
            >
              <option value="" data-hover-effect="true">All Categories</option>
              {categories.map(category => (
                <option
                  key={category}
                  value={category}
                  data-hover-effect="true"
                >
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {columnPosts.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-8">
              {column.map((post, postIndex) => (
                <motion.div
                  key={post.title}
                  initial={{
                    opacity: 0,
                    y: -20,
                    filter: "blur(10px)",
                    transform: "translateZ(0)" // Force GPU acceleration
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.7,
                      delay: postIndex * 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98], // Custom easing
                      filter: {
                        duration: 0.4,
                        delay: postIndex * 0.1 + 0.2 // Slightly delayed blur effect
                      }
                    }
                  }}
                  viewport={{
                    once: true,
                    margin: "-100px"
                  }}
                  className="bg-white/[0.1] dark:bg-black/100 text-card-foreground rounded-lg shadow-md overflow-hidden will-change-transform 
                    border-[1px] border-[#0071a9]/[0.15] dark:border-white/[0.08] 
                    hover:border-[#0071a9]/25 dark:hover:border-white/[0.15] 
                    ring-1 ring-[#0071a9]/[0.05] dark:ring-white/[0.05] shadow-sm hover:shadow-[0_0_15px_rgba(0,113,169,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  {/* Post Card Content */}
                  <div className="p-6 flex flex-col h-[250px]">
                    {/* Top section with category and date */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] md:text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-[9px] md:text-[10px] dark:text-amber-400 text-muted-foreground">{post.date}</span>
                    </div>

                    {/* Title and preview with controlled height */}
                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                      <div className="relative">
                        <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-6">{post.preview}</p>
                        <div className="absolute inset-x-0 bottom-0 h-16 
                          bg-gradient-to-t 
                          from-white/[0.1] via-white/[0.1] to-transparent 
                          dark:from-black/100 dark:via-black/100 dark:to-transparent 
                          pointer-events-none" 
                        />
                      </div>
                    </div>

                    {/* Bottom section */}
                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-border">
                      <div className="flex items-center text-[9px] md:text-[10px]">
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary">
                          <Book className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <button
                        onClick={() => openBlogModal(post)}
                        className="text-[10px] md:text-xs font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Modal */}
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      </div>
    </motion.section>
  );
};

export default BlogSection;