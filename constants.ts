import { Bot, Cpu, Globe, Smartphone, Terminal } from 'lucide-react';
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { ContactItem, EducationItem, ExperienceItem, Project, SkillCategory, SocialLink, Song, TestimonialItem } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
    {
        icon: FaLinkedinIn,
        href: "https://www.linkedin.com/in/alexandephilia/",
        label: "LinkedIn",
        // Gray gradient button with thick shadow, LinkedIn blue icon
        buttonStyle: "bg-gradient-to-b from-white via-gray-100 to-gray-200 border border-gray-300/60 shadow-[0_4px_0_#d1d5db,0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] text-[#0A66C2] hover:shadow-[0_2px_0_#d1d5db,0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] hover:translate-y-[2px] active:shadow-[0_0px_0_#d1d5db,inset_0_2px_4px_rgba(0,0,0,0.1)] active:translate-y-[4px]"
    },
    {
        icon: FaWhatsapp,
        href: "https://wa.me/6285959300787",
        label: "WhatsApp",
        // Gray gradient button with thick shadow, WhatsApp green icon
        buttonStyle: "bg-gradient-to-b from-white via-gray-100 to-gray-200 border border-gray-300/60 shadow-[0_4px_0_#d1d5db,0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] text-[#16a34a] hover:shadow-[0_2px_0_#d1d5db,0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] hover:translate-y-[2px] active:shadow-[0_0px_0_#d1d5db,inset_0_2px_4px_rgba(0,0,0,0.1)] active:translate-y-[4px]",
        iconSize: 20
    },
    {
        icon: FaXTwitter,
        href: "https://x.com/0xnihilism",
        label: "X",
        // Gray gradient button with thick shadow, dark icon
        buttonStyle: "bg-gradient-to-b from-white via-gray-100 to-gray-200 border border-gray-300/60 shadow-[0_4px_0_#d1d5db,0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] text-gray-800 hover:shadow-[0_2px_0_#d1d5db,0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] hover:translate-y-[2px] active:shadow-[0_0px_0_#d1d5db,inset_0_2px_4px_rgba(0,0,0,0.1)] active:translate-y-[4px]"
    },
];

export const PROJECTS: Project[] = [
    {
        id: "1",
        category: "Works",
        title: "Tenant Customer Service",
        description: "Migrated a mobile application legacy with rule-based chatbot to AI-powered conversational system for multi-tenant hospitality mobile application built with Flutter. I also use Figma to revamping the entire workflow of board Tenant app design to integrate with  Gemini 2.5 Flash.",
        icon: Smartphone,
        iconColor: "bg-blue-600",
        imageUrl: "/Work_1.jpg",
        status: "Live",
        linkUrl: "#",
        company: "Realta Chakradarma",
        date: "2024 - 2025"
    },
    {
        id: "2",
        category: "Works",
        title: "Telegram Crypto Intelligence Bot",
        description: "Developed modular multi-chain cryptocurrency monitoring system with real-time transaction tracking. Features WebSocket-based monitoring, event-driven subscription management, and automated alert distribution for distributed user communities.",
        icon: Bot,
        iconColor: "bg-emerald-600",
        imageUrl: "/Work_2.jpg",
        status: "Live",
        linkUrl: "#",
        company: "RnD (Remote)",
        date: "2025"
    },
    {
        id: "3",
        category: "Works",
        title: "Web3 DeFAI Collaboration",
        description: "Collaborated as Research and Development on DeFAI (Decentralized Finance AI) for stablecoin cross-chain by leveraging AI solutions. Working with a multi cross nations teams via Discord to coordinate globally distributed development.",
        icon: Globe,
        iconColor: "bg-blue-600",
        imageUrl: "/Work_3.jpg",
        status: "Live",
        linkUrl: "#",
        isRedacted: true,
        company: "Discord",
        date: "2024 - 2025"
    },
    {
        id: "5",
        category: "Personal",
        title: "Zeta Platform",
        description: "A modern, seamless AI platform featuring advanced animations powered by Framer Motion. Orchestrates multi-AI providers (Groq, Gemini, OpenRouter, RouteAway) and integrates Exa Search for web intelligence. Includes multi-modal capabilities like image/document uploading with PDF parsing, human-like TTS expressions, and persistent chat history.",
        icon: Cpu,
        iconColor: "bg-purple-600",
        imageUrl: "/Work_5.jpg",
        status: "In Development",
        linkUrl: "#"
    },
    {
        id: "4",
        category: "Personal",
        title: "Electron-based Linux LLMs Suite",
        description: "Created a cross-platform solution for accessing multiple AI services (Grok, ChatGPT, Claude, Deepseek, Manus, and Perplexity) through a single, convenient application packaged as a Linux AppImage using Electron.",
        icon: Terminal,
        iconColor: "bg-slate-700",
        imageUrl: "/Work_4.jpg",
        status: "Live",
        linkUrl: "https://github.com/alexandephilia/ChatGPT-x-DeepSeek-x-Grok-x-Claude-x-Perplexity-Linux-APP"
    }
];

export const EXPERIENCE: ExperienceItem[] = [
    {
        id: "1",
        company: "RnD (Remote Dubai Based)",
        role: "DevOps Engineer",
        description: "Architected a multi-chain crypto intelligence platform and Telegram bot handling real-time analytics for 6+ networks. Built automated Docker infrastructure, high-performance data pipelines, and a Next.js admin dashboard with 3D analytics.",
        period: "2025"
    },
    {
        id: "2",
        company: "Realta Chakradarma",
        role: "Front End Developer",
        description: "Led frontend modernization by migrating legacy systems to Next.js & TypeScript, improving performance by 35%. Implemented atomic design systems, integrated AI workflows, and enhanced user engagement with Framer Motion and GSAP animations.",
        period: "2021 - 2025"
    },
    {
        id: "3",
        company: "Realta Chakradarma",
        role: "Software Implementation (Bumame)",
        description: "Served as technical liaison for pandemic-era healthcare IT solutions with Bumame Pharmachy as both partnership and customer. Implemented accurate lab testing workflows with zero downtime and facilitated seamless communication between client stakeholders and engineering teams.",
        period: "2020 - 2021"
    },
    {
        id: "4",
        company: "Realta Chakradarma",
        role: "Software Quality Control",
        description: "Managed quality assurance for enterprise systems using Selenium & Cypress, reducing critical bugs by 30%. Analyzed business workflows and authored technical documentation aligned with ISO 9001 standards.",
        period: "2017 - 2020"
    },
    {
        id: "5",
        company: "Tokio Marine Insurance Group",
        role: "Sales Agent",
        description: "Achieved sales targets within the first month as part of the inaugural agent cohort through consultative relationship building and product knowledge mastery.",
        period: "2016 - 2017"
    }
];

export const EDUCATION: EducationItem[] = [
    {
        id: "1",
        degree: "Technology of Information System",
        institution: "Binus University · Drop out · 2012 – 2015",
        period: "2012 – 2015"
    }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        title: "Engineering",
        skills: [
            "JavaScript",
            "TypeScript",
            "Node.js",
            "Python",
            "React.js",
            "Next.js",
            "Vue.js",
            "Express.js",
            "HTML5",
            "CSS3",
            "Java",
            "Markdown"
        ]
    },
    {
        title: "Frontend",
        skills: [
            "Tailwind CSS",
            "Bootstrap 5",
            "Shadcn UI",
            "TanStack",
            "Framer Motion",
            "GSAP",
            "Three.js",
            "Responsive Design",
            "Performance Optimization"
        ]
    },
    {
        title: "Backend",
        skills: [
            "RESTful API Development",
            "WebSocket",
            "MongoDB",
            "Mongoose",
            "Multi-chain Integration"
        ]
    },
    {
        title: "DevOps",
        skills: [
            "Docker",
            "CI/CD",
            "Git/GitHub",
            "Vercel",
            "Railway",
            "Netlify",
            "Zero-downtime Deployment",
            "Caching Strategies",
            "API Integration",
            "Telegraf.js",
            "Puppeteer"
        ]
    },
    {
        title: "Tools",
        skills: [
            "Bun",
            "npm/Yarn",
            "ESLint/Prettier",
            "Cursor IDE",
            "Windsurf",
            "Claude Code",
            "Warp Terminal",
            "MCP Integration",
            "AI-Assisted Development"
        ]
    }
];

export const TESTIMONIALS: TestimonialItem[] = [
    {
        id: "1",
        text: "Garry's ability to drive fast iterations and ship high-quality features while at Realta was remarkable. He has a unique talent for finding the right modern tools to break us out of legacy patterns, significantly accelerating our development cycles and overall delivery.",
        name: "Gunawan",
        role: "Manager at Realta Chakradarma"
    },
    {
        id: "2",
        text: "Garry's engineering skills are matched only by his learning speed and adaptability. He built the whole system in line with our vision and seamlessly helped with the resignation of our core flow. Top tier skills.",
        name: "Nicholas",
        role: "Client at RnD (Germany)"
    },
    {
        id: "3",
        text: "Garry has been instrumental in refining our design workflows at Realta. His proactive exploration of AI tools and his ability to design custom solutions have made our jobs significantly faster and easier. His knowledge in AI-assisted workflows is a game-changer for any creative team.",
        name: "Dahnil",
        role: "Designer at Realta Chakradarma"
    }
];

export const CONTACT_INFO: ContactItem[] = [
    { label: "Email", value: "4lexander31@gmail.com", href: "mailto:4lexander31@gmail.com" },
    { label: "LinkedIn", value: "/in/Alexandephilia", href: "https://www.linkedin.com/in/alexandephilia/" },
    { label: "GitHub", value: "Alexandephilia", href: "https://github.com/alexandephilia" },
    { label: "X/Twitter", value: "@0xnihilism", href: "https://x.com/0xnihilism" },
];

export const BEYOND_WORK_IMAGES = [
    "/beyond/beyond_1.jpeg",
    "/beyond/beyond_2.jpeg",
    "/beyond/beyond_3.jpeg",
    "/beyond/beyond_4.jpeg",
    "/beyond/beyond_5.jpeg",
    "/beyond/beyond_6.jpeg",
    "/beyond/beyond_7.jpeg",
    "/beyond/beyond_8.jpeg",
    "/beyond/beyond_9.jpeg",
    "/beyond/beyond_10.jpeg",
];

export const TOOL_STACK_URLS = [
    "https://cdn.simpleicons.org/figma/F24E1E",
    "https://cdn.simpleicons.org/linear/5E6AD2",
    "https://cdn.simpleicons.org/openai/74AA9C",
    "https://cdn.simpleicons.org/webflow/146EF5",
    "https://cdn.simpleicons.org/adobexd/470137",
];

export const SONGS: Song[] = [
    {
        id: "1",
        title: "Hideaway",
        artist: "Cigarettes After Sex",
        url: "/songs/Hideaway - Cigarettes After Sex.mp3",
        coverUrl: "/songs/cas.jpg"
    },
    {
        id: "2",
        title: "Holding You, Holding Me",
        artist: "Cigarettes After Sex",
        url: "/songs/Holding You, Holding Me - Cigarettes After Sex.mp3",
        coverUrl: "/songs/cas.jpg"
    },
    {
        id: "3",
        title: "Heavenly",
        artist: "Cigarettes After Sex",
        url: "/songs/Heavenly - Cigarettes After Sex.mp3",
        coverUrl: "/songs/cas1.jpg"
    }
];
