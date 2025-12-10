# Swiss Design Portfolio

<div align="center">
  <h3>A Technical, Precision-Driven Digital Identity</h3>
</div>

## ✦ Overview

This portfolio serves as a digital identity for **Alexander**, an AI-Driven Full Stack Engineer. Built with a focus on **Swiss International Style**, it emphasizes clarity, grid systems, high contrast, and animated precision.

It is designed to feel like a high-end technical instrument—utilizing smooth scroll animations, heavy typographic hierarchy, and "analog" visual effects like film grain.

## 🛠 Tech Stack

- **Core**: React + Vite (TypeScript)
- **Styling**: Tailwind CSS for utility-first design
- **Motion**: Framer Motion for complex orchestrations (Scroll, Parallax)
- **Effects**: Custom SVG Noise/Grain, CSS masking, GSAP (Marquee)
- **Icons**: Lucide React

## ✨ Key Features

- **Ticket Interface**: A card-based scrolling system inspired by physical tickets and identification tags.
- **Identity Card**:
  - Dynamic greeting bubble with multi-language cycling.
  - "Holographic" parallax effects and 3D tilting.
- **Contact Twin-System**:
  - Symmetrical "Contact" and "Resume" buttons with mirrored radii (`rounded-r-2xl` vs `rounded-l-2xl`).
  - Seamless "solid vs outline" visual hierarchy.
- **Atmosphere**:
  - **Animated Grain**: A custom, script-free React component generating standard-compliant SVG noise with a CSS loop for a retro "broadcast" feel.
  - **Color Palette**: Rigorous use of Navy (`#1a2332`), Acid Green (`#e4e687`), and White.

## 🚀 Running Locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `components/TicketCard.tsx` - Core container with scroll-progress logic.
- `components/effects/GrainEffect.tsx` - The custom masking noise overlay.
- `constants.ts` - Centralized config for colors, services, and social links.

---

<div align="center">
  <p><i>Made by Alexander with Coffee © 2025</i></p>
</div>
