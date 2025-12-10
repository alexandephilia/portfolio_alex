import { Github, Linkedin, Phone } from 'lucide-react';

export const COLORS = {
  primary: 'rgba(228, 230, 135, 1)', // Updated Green
  secondary: '#1a2332', // Navy
  accent: '#c6613f', // Red
  white: '#FFFFFF',
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