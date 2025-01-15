import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
  achievements?: string[];
}

const experienceData: ExperienceItem[] = [
  {
    date: "2017 - 2021",
    title: "Quality Control",
    company: "PT Realta Chkaradrama (Full Time)",
    description: "Specialized in implementing robust testing frameworks and quality assurance processes. Developed testing solutions, crafted user manuals and maintained high code quality standards.",
    responsibilities: [
      "Developed and maintained automated testing frameworks",
      "Performed thorough software quality assurance testing",
      "Created detailed test documentation and reports",
      "Collaborated with development teams to resolve issues"
    ],
    technologies: ["Selenium", "Robohelp", "SVN", "Google Docs", "XML"],
    achievements: [
      "Reduced bug detection time by 40% through automated testing",
      "Improved overall software quality metrics by 25%"
    ]
  },
  {
    date: "2020 - 2021",
    title: "IT Consultant On-Site Temporary",
    company: "Bumame Pharmacy",
    description: "Deployed, trained, and implemented comprehensive COVID-19 testing programs including registration systems, swab and rapid testing protocols, and laboratory result testing workflows.",
    responsibilities: [
      "Designed and implemented COVID-19 testing registration system",
      "Trained staff on new testing protocols and systems",
      "Managed laboratory result testing workflows",
      "Ensured data accuracy and patient privacy"
    ],
    technologies: ["Healthcare Systems", "Database Management", "Testing Protocols"],
    achievements: [
      "Successfully processed over 1000+ COVID-19 tests",
      "Reduced registration time by 50% through system optimization"
    ]
  },
  {
    date: "2021 - Now",
    title: "Front End Developer",
    company: "PT Realta Chkaradrama (Full Time)",
    description: "Built responsive web development using HTML, CSS, JavaScript. Bootstrap, React, Next.js and TypeScript. Implemented modern UI/UX designs and optimized performance.",
    responsibilities: [
      "Develop responsive and interactive web applications",
      "Implement modern UI/UX designs",
      "Optimize application performance",
      "Collaborate with backend teams for API integration"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap"],
    achievements: [
      "Improved website load times by 60%",
      "Successfully delivered 10+ major web applications"
    ]
  }
];

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const blurFilter = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      }
    }
  };

  const cardVariants = {
    hidden: (isEven: boolean) => ({
      x: isEven ? 50 : -50,
      y: 50,
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.95,
      rotate: isEven ? 5 : -5
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 90,
        mass: 0.8,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      className="relative py-16 overflow-hidden w-full"
      style={{
        opacity,
        filter: blurFilter,
        willChange: "transform"
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,hsl(var(--foreground))_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent opacity-90" />
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Experience Timeline</h2>
      <div className="relative max-w-3xl mx-auto px-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden md:block" />

        <motion.div
          className="space-y-8 md:space-y-12 w-full"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  x: window.innerWidth >= 768 ? (index % 2 === 0 ? 100 : -100) : 0,
                  y: window.innerWidth < 768 ? 50 : 0,
                  opacity: 0,
                  filter: "blur(10px)"
                },
                visible: {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    delay: index * 0.2,
                    duration: 0.8,
                    type: "spring",
                    damping: 20,
                    stiffness: 90
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-center w-full overflow-hidden`}
            >
              <div className="w-full md:w-1/2 p-4">
                <ShimmerButton className="w-full">
                  <Card className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden will-change-transform">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-sm md:text-base font-bold">{item.title}</CardTitle>
                          <p className="text-[7px] md:text-[9px] font-medium text-primary/80 tracking-tight">{item.company}</p>
                        </div>
                        <span className="text-[7px] md:text-[9px] whitespace-nowrap dark:text-amber-400 text-muted-foreground/70 bg-primary/10 px-1.5 py-0.5 rounded-full font-medium tracking-tight">
                          {item.date}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-[10px] md:text-xs mb-2">{item.description}</p>
                      </div>

                      {item.responsibilities && (
                        <div>
                          <h4 className="text-xs font-semibold mb-1 text-primary">Key Responsibilities:</h4>
                          <ul className="list-disc list-inside text-[10px] md:text-xs space-y-0.5">
                            {item.responsibilities.map((resp, idx) => (
                              <li key={idx}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.technologies && (
                        <div>
                          <h4 className="text-xs font-semibold mb-1 text-primary">Technologies:</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {item.technologies.map((tech, idx) => (
                              <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-secondary rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.achievements && (
                        <div>
                          <h4 className="text-xs font-semibold mb-1 text-primary">Key Achievements:</h4>
                          <ul className="list-disc list-inside text-[10px] md:text-xs space-y-0.5">
                            {item.achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </ShimmerButton>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};