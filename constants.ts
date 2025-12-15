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
    description: "ACCELERATING PRODUCTION SPEED BY 10X WITH MCPs AND AI AGENTS, TURNING CONCEPTS INTO DEPLOYED MVPS IN DAYS, NOT WEEKS." 
  },
  { 
    id: "02", 
    title: "SOLUTION AGNOSTIC", 
    description: "ADAPTING TO TOOLS, NOT BEING RULED BY THEM. AS TECHNICAL REQUIREMENTS EVOLVE." 

  },
  { 
    id: "03", 
    title: "A/B ARCHITECTURE", 
    description: "RUNNING PARALLEL SOLUTIONS TO VALIDATE THE OPTIMAL PATH." 

  },
  { 
    id: "04", 
    title: "FAIL-FAST PROTOCOLS", 
    description: "IDENTIFYING DEAD ENDS EARLY TO MAXIMIZE RESOURCE EFFICIENCY." 
  },
];