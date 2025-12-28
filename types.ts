import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

export interface SocialLink {
    icon: IconType | LucideIcon;
    href: string;
    label: string;
    buttonStyle: string;
    iconSize?: number;
}

export interface Project {
    id: string;
    category: string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    imageUrl: string;
    status: string;
    linkUrl: string;
    isRedacted?: boolean;
    company?: string;
    date?: string;
}

export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    description: string;
    period: string;
}

export interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    period: string;
}

export interface SkillCategory {
    title: string;
    skills: string[];
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

export interface Song {
    id: string;
    title: string;
    artist: string;
    url: string;
    coverUrl: string;
}

export interface Writing {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
