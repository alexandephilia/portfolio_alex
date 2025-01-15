import { ProjectCard } from "./ProjectCard";
import { TimerCard } from "./TimerCard";
import { PomodoroCard } from "./PomodoroCard";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Project {
  title: string;
  description: string;
  content: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage: string;
}

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const blurFilter = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
      },
    },
  };

  const projects: Project[] = [
    {
      title: "Vercel Deployments",
      description: "Deployments on Vercel",
      content: "A collection of projects deployed on Vercel.",
      buttonText: "View Projects",
      buttonLink: "https://vercel.com/garryalexander",
      backgroundImage: "https://vercel.com/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5Q6iTwx2CBd0pFrD9vzZWK%2Fe537e396e236e5daa54a31ff7056a77d%2Fpapercuts-dark.png&w=1920&q=75"
    },
    {
      title: "Radix UI",
      description: "Radix UI Components",
      content: "A collection of components, color schemes and themes built with Radix UI.",
      buttonText: "View Components",
      buttonLink: "https://www.radix-ui.com/primitives",
      backgroundImage: "https://i.ytimg.com/vi/1JnwJBtg4VA/maxresdefault.jpg"
    },
    {
      title: "Open AI Playground",
      description: "Open AI API",
      content: "A collection of projects using the Open AI API.",
      buttonText: "View Projects",
      buttonLink: "https://github.com/garryalexander/openai-api",
      backgroundImage: "https://cdn.shopify.com/s/files/1/0403/5801/9230/t/11/assets/logo-animation-openai-08-Bqv_1250x.jpg?v=1681851367"
    },
    {
      title: "Shadcn UI",
      description: "Shadcn UI Components",
      content: "A collection of components built with Shadcn UI.",
      buttonText: "View Components",
      buttonLink: "https://ui.shadcn.com/",
      backgroundImage: "https://mwskwong.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fq95r71b1uue1%2F4GK6beoMEqbAKNCuSn3Ekp%2F9ce62f182cb9502c3ea28b12066c898c%2Fshadcn_ui_OG_Image.png&w=3840&q=75"
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="container py-16"
      style={{
        filter: blurFilter
      }}
    >
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Existence Kits</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Some tools to help me out to live less absurd
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <motion.div variants={cardVariants}>
          <TimerCard />
        </motion.div>
        <motion.div variants={cardVariants}>
          <PomodoroCard />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};