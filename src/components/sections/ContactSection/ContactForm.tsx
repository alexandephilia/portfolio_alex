import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FormEvent, useState, useRef, useEffect } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const mailtoLink = `mailto:0xnihilist@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="overflow-hidden w-full bg-white dark:bg-black/100 
        border-[1px] border-black/20 ring-1 ring-black/5 
        dark:border-white/10 dark:ring-white/5">
        <div className="md:grid md:grid-cols-5">
          <div className="p-8 md:col-span-2 dark:text-white bg-white dark:bg-black/100">
            <h3 className="text-lg md:text-2xl font-bold mb-6">Get in Touch</h3>
            <p className="mb-8 text-sm md:text-lg dark:text-gray-300">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="relative px-4 py-1.5 text-xs md:text-sm flex items-center gap-2 bg-white dark:bg-zinc-950 dark:border-zinc-700 dark:text-white overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-shine"
                      style={{
                        background: 'linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.2) 48%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 52%, transparent 55%)',
                        transform: 'translateX(-100%) translateY(-100%) rotate(0deg)',
                      }}
                    />
                  </div>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Available for hire
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-8 md:col-span-3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Responsive Container for Name and Email */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-xs md:text-sm font-medium dark:text-white">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-white/[0.1] dark:bg-black/100 border-black/20 dark:border-white/10 
                      px-4 py-3 text-sm md:text-base dark:text-white placeholder:text-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700/30 transition-all"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-xs md:text-sm font-medium dark:text-white">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-white/[0.1] dark:bg-black/100 border-black/20 dark:border-white/10 
                      px-4 py-3 text-sm md:text-base dark:text-white placeholder:text-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700/30 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium dark:text-white">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border bg-white/[0.1] dark:bg-black/100 border-black/20 dark:border-white/10 
                    px-4 py-3 text-sm md:text-base dark:text-white placeholder:text-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700/30 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium dark:text-white">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border bg-white/[0.1] dark:bg-black/100 border-black/20 dark:border-white/10 
                    px-4 py-3 h-40 resize-none text-base text-black dark:text-white placeholder:text-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700/30 transition-all"
                  required
                />
              </div>

              <motion.div
                ref={buttonRef}
                className="relative h-12 md:h-16 w-full cursor-pointer overflow-hidden rounded-full p-[1.5px] group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Default rotating gradient */}
                <motion.div
                  className="absolute inset-0 group-hover:opacity-0 transition-opacity"
                  style={{
                    background: `conic-gradient(
                      from 0deg at 50% 50%,
                      transparent 0deg,
                      rgba(255,255,255,0.9) 60deg,
                      transparent 120deg,
                      transparent 360deg
                    )`,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Hover gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `conic-gradient(
                      from 0deg at 50% 50%,
                      transparent,
                      rgba(255,255,255,0.8),
                      rgba(255,255,255,0.9),
                      rgba(255,255,255,0.8),
                      transparent
                    )`,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-[1.5px] rounded-full bg-black dark:bg-zinc-950" />
                <Button
                  type="submit"
                  className="relative h-full w-full rounded-full bg-black dark:bg-zinc-950 font-medium text-xs md:text-sm text-white transition-all hover:text-white"
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </div>

        </div>
      </Card>
    </motion.div>
  );
};