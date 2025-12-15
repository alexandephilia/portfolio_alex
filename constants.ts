import { Github, Linkedin, Phone } from 'lucide-react';

export const THEMES = {
  luxury: {
    primary: 'rgba(228, 230, 135, 1)',
    secondary: '#1a2332',
    accent: '#c6613f',
    white: '#FFFFFF',
  },
  ocean: {
    primary: '#37bdf2ff',
    secondary: '#012596',
    accent: '#284cbfff',
    white: '#37bdf2ff',
  },
  coffee: {
    primary: '#e3dad2',
    secondary: '#543b35',
    accent: '#835b45ff',
    white: '#e3dad2',
  },
  corpo: {
    primary: '#f3f0ec',
    secondary: '#151414',
    accent: '#151414',
    white: '#FFFFFF',
  },
  synth: {
    primary: '#7a659bff',
    secondary: '#372452ff', 
    accent: '#ff2a6d',
    white: '#ffffff',
  }
} as const;

export type ThemeKey = keyof typeof THEMES;

export const COLORS = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  white: 'var(--white)',
};

export const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/alexandephilia", label: "Github" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/alexandephilia/", label: "LinkedIn" },
  { icon: Phone, href: "https://wa.me/6285959300787", label: "WhatsApp" },
];

export const SERVICES = [
  { 
    id: "01", 
    title: "AI-AUGMENTED DEV", 
    description: "ACCELERATING PRODUCTION SPEED BY 10X WITH MCPs AND AI AGENTS, TURNING CONCEPTS INTO DEPLOYED MVPS IN DAYS, NOT WEEKS.",
    detail: "LEVERAGING ADVANCED MCPS AND AUTONOMOUS AGENTS TO REDUCE DEVELOPMENT CYCLES BY 90%. WE BUILD SELF-EVOLVING SYSTEMS THAT WRITE, TEST, AND DEPLOY CODE WITH MINIMAL HUMAN INTERVENTION.",
    tools: ["CLINE", "ANTIGRAVITY", "WARP", "CURSOR"]
  },
  { 
    id: "02", 
    title: "SOLUTION AGNOSTIC", 
    description: "ADAPTING TO TOOLS, NOT BEING RULED BY THEM. AS TECHNICAL REQUIREMENTS EVOLVE.",
    detail: "I PRIORITIZE ARCHITECTURE OVER SPECIFIC TOOLS. BY MAINTAINING A FLEXIBLE TECH STACK, ENSURE INFRASTRUCTURE SCALES ADAPTIVELY, INTEGRATING THE BEST-IN-CLASS SOLUTIONS FOR EACH UNIQUE CHALLENGE.",
    tools: ["PYTHON", "TYPESCRIPT", "REACT", "NEXTJS"]

  },
  { 
    id: "03", 
    title: "A/B ARCHITECTURE", 
    description: "RUNNING MULTI PATH ARCHITECTURAL STRATEGIES TO VALIDATE THE OPTIMAL PATH AND EFFICIENTLY ELIMINATE POTENTIAL BOTTLENECKS.",
    detail: "IMPLEMENTING PARALLEL ARCHITECTURAL STRATEGIES TO EMPIRICALLY VALIDATE PERFORMANCE. THIS DATA-DRIVEN APPROACH ELIMINATES GUESSWORK, ENSURING THE FINAL DEPLOYMENT IS MATHEMATICALLY OPTIMIZED FOR SUCCESS.",
    tools: ["AWS", "VERCEL", "DOCKER", "RAILWAY"]

  },
  { 
    id: "04", 
    title: "FAIL-FAST PROTOCOLS", 
    description: "IDENTIFYING DEAD ENDS EARLY TO MAXIMIZE TIME EFFICIENCY AND REDUCE RISK.",
    detail: "RAPID PROTOTYPING METHODOLOGIES DESIGNED TO EXPOSE CRITICAL FLAWS IMMEDIATELY. I ITERATE THROUGH FAILURE STATES AT HIGH SPEED TO CLEAR THE PATH FOR A ROBUST, PRODUCTION-READY SOLUTION.",
    tools: ["DEVTOOL MCPs", "AI DEBUGGING", "JEST", "CYPRESS"]
  },
];