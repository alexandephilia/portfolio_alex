import { Mail, Linkedin, Github, PhoneCall } from "lucide-react";
import { ContactCard } from "./ContactCard";
import { ContactForm } from "./ContactForm";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const blur = useTransform(scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["8px", "0px", "0px", "8px"]
  );

  const contactCards = [
    {
      title: "GitHub",
      icon: Github,
      value: "Check my repos",
      color: "hover:border-purple-500/50",
      href: "https://github.com/alexandephilia"
    },
    {
      title: "LinkedIn",
      icon: Linkedin,
      value: "Connect with me",
      color: "hover:border-blue-500/50",
      href: "https://www.linkedin.com/in/alexandephilia/"
    },
    {
      title: "Whatsapp",
      icon: PhoneCall,
      value: "Chat with me",
      color: "hover:border-green-500/50",
      href: "https://wa.me/6285959300787"
    }
  ];

  return (
    <motion.div
      ref={sectionRef}
      className="relative w-full"
      style={{
        opacity,
        filter: blur
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full content-[''] z-10 pointer-events-none bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/noise_yvdidf.gif')]"
      ></div>
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      
      <section className="container py-16 w-full relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {contactCards.map((card, index) => (
              <ContactCard
                key={index}
                {...card}
                delay={index * 0.1}
              />
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </motion.div>
  );
}; 