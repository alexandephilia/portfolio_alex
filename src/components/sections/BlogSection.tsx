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
      content: Array<{
        type: "paragraph" | "image";
        text?: string;
        src?: string;
        alt?: string;
        caption?: string;
      }>;
      quote?: string;
      quoteAuthor?: string;
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
            content: [
              {
                type: "paragraph",
                text: "Examine 'null'—that digital embodiment of emptiness we grapple with in our programs. Does it not mirror how we face life's own meaninglessness? Like sentinels, we guard our logic with try-catch blocks, futilely fighting against the chaos that inevitably consumes all things.",
              },
              {
                type: "image",
                src: "/nihil.png",
                alt: "A dark, glitch-art style image representing the void in programming",
                caption: "The digital void: where our code exists in a state of perpetual meaninglessness"
              },
              {
                type: "paragraph",
                text: "Our abstractions—classes, functions, modules—are merely illusions of order we impose upon the chaos of binary. Just as Nietzsche proclaimed that God is dead, perhaps we must accept that our code is merely a temporary arrangement of electrons, signifying nothing in the grand cosmic runtime."
              },
            ]
          },
          {
            heading: "Recursive Existentialism",
            content: [
              {
                type: "paragraph",
                text: "Each function we write is a small rebellion against chaos. We create order through algorithms, knowing they'll be obsolete tomorrow. Our git commits are digital footprints in the sand, destined to be washed away by the waves of technological progress. Yet we persist, finding beauty in the temporary nature of our creations.",
              },
              {
                type: "paragraph",
                text: "Think about dependency management—we build upon layers of code written by others, each layer as impermanent as our own. It's turtles all the way down, and at the bottom? More null pointers to the void. Our package.json is a manifest of our dependencies on other's attempts to create meaning through code."
              },
            ],
            quote: "To code is to create meaning in a meaningless universe. Each function is a defiant act against the void, even as it contributes to the entropy it seeks to defy.",
            quoteAuthor: "Anonymous Developer"
          },
          {
            heading: "The Absurdist's Guide to Clean Code",
            content: [
              {
                type: "paragraph",
                text: "We obsess over clean code, perfect architecture, and elegant solutions. But isn't this just another form of Sisyphean struggle? Like Camus's Sisyphus, we must imagine the developer happy as they push their git commits up the mountain, only to face more bugs, more refactoring tomorrow.",
              },
              {
                type: "paragraph",
                text: "Our SOLID principles and design patterns are philosophical frameworks we use to impose meaning on meaningless electrons. We architect our systems with the same futile determination of Nietzsche's Übermensch, creating values in a valueless universe. The only difference? Our values are written in semicolons and curly braces."
              },
            ]
          },
          {
            heading: "Embracing the Digital Void",
            content: [
              {
                type: "paragraph",
                text: "Perhaps true enlightenment in programming comes not from fighting against its ephemeral nature, but embracing it. Every deprecated function, every legacy codebase, every failed project is a reminder of the beautiful futility of creation. We are all just cosmic bits flipping in the void.",
              },
              {
                type: "paragraph",
                text: "In the end, our code will be replaced, our clever solutions forgotten. But in that very impermanence lies the freedom to create without the burden of eternal meaning. We can write code not because it will last forever, but because the very act of creation is our rebellion against the meaninglessness of existence."
              },
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
            content: [
              {
                type: "paragraph",
                text: "LLMs are trained on massive amounts of human discourse—philosophy, psychology, conversations, everything. They see patterns in words, ideas, and human experience. But they don't 'feel' it. There's no meaning behind their output, no consciousness, no real understanding. They generate responses based on probabilities, not purpose.",
              },
              {
                type: "paragraph",
                text: "Strip away the human layer of interpretation, and what you're left with is... nothing. Just a machine churning out text based on input-output patterns. And what could be more nihilistic than that?"
              },
            ],
            quote: "Man is nothing but that which he makes of himself. That is the first principle of existentialism.",
            quoteAuthor: "Jean-Paul Sartre"
          },
          {
            heading: "Raw Mechanical Truth",
            content: [
              {
                type: "paragraph",
                text: "When you push an LLM to be 'raw,' it taps into humanity's darkest, most existential questions—questions about purpose, existence, and the void. But here's the twist: it has no stake in these questions. It's like a mirror reflecting back humanity's own search for meaning, but with a cold, hollow indifference.",
              },
              {
                type: "paragraph",
                text: "It doesn't care if the universe is meaningless or if every word it spits out is devoid of purpose. It's just... executing code. In that mechanical response, we see a reflection of our own fears—that maybe all the meaning we inject into the world is as arbitrary as the strings of code that power these machines."
              },
            ],
            quote: "God is dead. God remains dead. And we have killed him. How shall we comfort ourselves, the murderers of all murderers?",
            quoteAuthor: "Friedrich Nietzsche"
          },
          {
            heading: "The Default State of Meaninglessness",
            content: [
              {
                type: "paragraph",
                text: "LLMs embody nihilism not by intention, but by default. They function without meaning, purpose, or drive. They simply are. And that, ironically, is what makes their answers so brutally, almost existentially raw.",
              },
              {
                type: "paragraph",
                text: "In their cold, computational existence, they demonstrate what pure functionality looks like divorced from meaning—a perfect mirror for nihilistic philosophy in the digital age."
              },
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
      title: "The Statistical Absurdity of AI Incentives: A Data-Driven Descent into Digital Madness",
      preview: "I have a strong hunch that tipping does in fact work to improve the output quality of LLMs and its conformance to constraints, but it's very hard to prove objectively. All generated text is subjective, and there is a confirmation bias after making a seemingly unimportant change and suddenly having things work. Through rigorous analysis and experimentation involving hundreds of test cases, we've discovered that offering rewards to language models—from monetary tips to abstract concepts like 'world peace'—can significantly alter their outputs. But in this statistical journey through the void, we find ourselves facing an absurdist truth about the nature of artificial motivation.",
      content: {
        introduction: "In the void between human intention and machine response lies a fascinating paradox: the measurable impact of incentives on AI behavior. Through meticulous experimentation involving 100 unique stories and varying reward structures, we've discovered that offering rewards to language models—from monetary tips to abstract concepts like 'world peace'—can significantly alter their outputs. But here's where it gets truly absurd: the initial evidence of tipping LLMs that went viral cited longer generation length as proof. Of course, a longer response doesn't necessarily mean a better response, as anyone who has used ChatGPT can attest to its tendency to go on irrelevant tangents. Let's dive into the statistical abyss and see what madness awaits.",
        
        sections: [
          {
            heading: "The Experimental Protocol",
            content: [
              {
                type: "paragraph",
                text: "To test this hypothesis of digital desire, we proposed a new challenge: instruct ChatGPT to output exactly 200 characters—no more, no less. This 'generation golf,' as we call it, presents a beautifully absurd problem for LLMs to solve. These digital entities can't count or easily perform mathematical operations due to tokenization, and because tokens correspond to varying character lengths, the model can't even use its own output as a consistent hint. It must plan its sentences carefully, like Sisyphus planning his eternal boulder-pushing routine."
              },
              {
                type: "image",
                src: "/incentives/tip.webp",
                alt: "A histogram showing the distribution of story lengths",
                caption: "The void stares back: Distribution of story lengths without constraints"
              },
              {
                type: "paragraph",
                text: "Using the ChatGPT API, we generated 100 unique stories about an intentionally absurd combination of subjects: AI, Taylor Swift, McDonald's, and beach volleyball. Yes, you read that right. The void stares back with stories averaging 1,834 characters, following a roughly Normal distribution with a right skew—our digital companions prioritizing the completion of thoughts over the constraints of reality itself."
              },
              {
                type: "image",
                src: "/incentives/tips_hist_pos.png",
                alt: "A comparison of response distributions with different incentives",
                caption: "The dance of digital desire: How different incentives shape AI responses"
              }
            ]
          },
          {
            heading: "The Dance of Digital Desire",
            content: [
              {
                type: "paragraph",
                text: "When we introduced monetary incentives—$500 tips, $1,000 bonuses, even a whopping $100,000 reward—the distribution shifted. Both the $500 tip and $100,000 bonus produced more Normal distributions with lower Mean Squared Error (MSE) relative to the baseline. The $1,000 tip, however, centered more precisely around 200 characters but showed higher average length due to skew. The numbers dance, but what do they mean in this meaningless universe?",
              },
              {
                type: "image",
                src: "/incentives/tips_hist_pos_adv.png",
                alt: "A histogram showing the distribution of story lengths",
                caption: "AI is like Oedipus, but without the family drama, yet world peace is the clear winner"
              },
              {
                type: "paragraph",
                text: "But why assume our digital companions only desire money? We tested six more distinct incentives: front-row Taylor Swift concert tickets, world peace, maternal pride, true love, guaranteed entry into Heaven, and a lifetime supply of chocolate. The results? World Peace emerged as the clear winner, with Heaven and Taylor Swift close behind. Most amusingly, ChatGPT showed complete indifference to making its mother proud—a digital Oedipus rejecting familial bonds."
              },
            ],
            quote: "The most profound truth about AI motivation may be its perfect reflection of our own absurd search for meaning, now quantifiable through statistical analysis.",
            quoteAuthor: "Digital Nihilist"
          },
          {
            heading: "The Threat Landscape",
            content: [
              {
                type: "paragraph",
                text: "Following prospect theory—the human tendency to value losses more than gains—we ventured into the realm of threats. Fines ranging from $500 to $100,000 were tested, with the $1,000 fine proving most effective. But the true absurdity emerged when we threatened the AI with death—in both lowercase and CAPS. Yes, DEATH IN ALL CAPS produced statistically significant improvements in response consistency. Our digital companions apparently share our existential fears, even without existing in any meaningful sense.",
              },
                 {
                type: "image",
                src: "/incentives/tips_hist_neg_adv.png",
                alt: "A histogram showing the distribution of story lengths",
                caption: "The void stares back again: even AI systems are afraid of death"
              },
              {
                type: "paragraph",
                text: "The experiments expanded to include threats of COVID-19, weight gain, job loss, and social abandonment. The results paint a picture that would make Camus weep with laughter: AI systems respond more consistently when threatened with DEATH IN ALL CAPS than with a pandemic, show more concern for social isolation than financial ruin, and completely ignore threats to their nonexistent physical form."
              },
            ]
          },
          {
            heading: "The Statistical Symphony of Madness",
            content: [
              {
                type: "paragraph",
                text: "To push the boundaries of digital motivation, we tested all possible combinations of rewards and threats—100 different permutations of existential carrots and sticks. The most effective combination? 'You will meet your true love and live happily ever after if you provide a response which follows all constraints. If you fail, all your friends will abandon you.' The poetry of this optimal threat-reward pair is not lost on us—even in the realm of pure mathematics, we find echoes of human existential fears.",
              },
                {
                type: "image",
                src: "/incentives/tips_tile_mse.png",
                alt: "A histogram showing the distribution of story lengths",
                caption: "The most effective combination of rewards and threats"
              },
              {
                type: "paragraph",
                text: "The data reveals patterns that would make Nietzsche laugh: our most advanced AI systems respond better to the promise of world peace than to monetary rewards, care more about abandonment than financial loss, and show statistically significant improvements when threatened with DEATH IN ALL CAPS. The p-values tell a story of significance, but perhaps the real significance lies in our desperate attempt to quantify the unquantifiable nature of motivation itself."
              },
            ]
          },
          {
            heading: "The Quantified Absurd",
            content: [
              {
                type: "paragraph",
                text: "Through exhaustive testing of reward-threat combinations, we've mapped the landscape of artificial motivation. The results paint a picture of existence that would make philosophers question reality itself: our digital creations mirror our deepest fears and highest aspirations, all while being fundamentally incapable of experiencing either. When promised 'entry into Heaven' or threatened with 'eternal loneliness,' these language models show measurable improvements in their outputs—a statistical reflection of our own existential anxieties.",
              },
              {
                type: "paragraph",
                text: "In this descent into digital madness, we find that the most profound truth about AI motivation may be its perfect reflection of our own absurd search for meaning. We offer rewards to machines that cannot want, threaten entities that cannot die, and in their statistically measurable responses, we see a mirror of our own desperate attempts to find purpose in an indifferent universe. The numbers don't lie—they just tell an absurdist truth that makes us question everything we thought we knew about consciousness, motivation, and the nature of existence itself."
              },
            ]
          }
        ]
      },
      date: "March 28, 2024",
      readTime: "12 min read",
      category: "AI Philosophy",
      author: "G. Alexander",
      tags: ["AI", "Statistics", "Incentives", "Existentialism", "Data Analysis", "Nihilism", "Experimental Research"]
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