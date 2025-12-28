import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface Project {
    id: string;
    category: 'Works' | 'Writings' | 'Personal';
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string; // Tailwind class for bg color
    imageUrl: string;
    status: 'Live' | 'Coming Soon' | 'In Development';
    linkUrl?: string;
    company?: string;
    client?: string;
    date?: string;
    isRedacted?: boolean;
}

export interface SocialLink {
    icon: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
    href: string;
    label: string;
    buttonStyle: string; // Tailwind classes for the button appearance
    iconSize?: number; // Optional custom icon size
    iconGradient?: string; // Tailwind gradient classes for icon (e.g., "from-blue-500 to-blue-700")
}

export interface ExperienceItem {
    id: string;
    company: string;
    role?: string;
    description: string;
    period: string;
}

export interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    period: string;
}

export interface TestimonialItem {
    id: string;
    text: string;
    name: string;
    role: string;
}

export interface ContactItem {
    label: string;
    value: string;
    href: string;
}

export type SkillTheme = 'indigo' | 'purple' | 'emerald' | 'amber' | 'rose' | 'teal' | 'violet' | 'slate' | 'cyan';

export interface Skill {
    name: string;
    theme: SkillTheme;
}

export interface SkillCategory {
    title: string;
    skills: string[];
}

export interface Book {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    color: string;
    spineText?: string;
}
