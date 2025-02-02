import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";

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
        <div className="md:grid md:grid-cols-3">
          <div className="p-6 md:col-span-1 dark:text-white bg-white dark:bg-black/100">
            <h3 className="text-base md:text-xl font-bold mb-3">Let's Connect</h3>
            <p className="mb-4 text-xs md:text-sm dark:text-gray-300">
              Got an interesting project or just want to chat? I'm all ears.
            </p>
            <Badge variant="outline" className="inline-flex items-center gap-2 px-3 py-1 text-xs bg-white dark:bg-zinc-950 dark:border-zinc-700 dark:text-white overflow-hidden">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Opportunities
            </Badge>
          </div>

          <div className="p-6 md:col-span-2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-medium dark:text-white">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-white/[0.1] dark:bg-black/100 border-black/20 dark:border-white/10 
                      px-3 py-2 text-sm dark:text-white placeholder:text-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700/30 transition-all"
                    required
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-medium dark:text-white">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-white/[0.1] dark:bg-black/100 border-black/20 dark:border-white/10 
                      px-3 py-2 text-sm dark:text-white placeholder:text-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700/30 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium dark:text-white">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border bg-white/[0.1] dark:bg-black/100 border-black/20 dark:border-white/10 
                    px-3 py-2 text-sm dark:text-white placeholder:text-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700/30 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium dark:text-white">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border bg-white/[0.1] dark:bg-black/100 border-black/20 dark:border-white/10 
                    px-3 py-2 h-32 resize-none text-sm text-black dark:text-white placeholder:text-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700/30 transition-all"
                  required
                />
              </div>

              <div className="flex justify-end">
                <motion.div
                  ref={buttonRef}
                  className="relative h-9 cursor-pointer overflow-hidden rounded-full p-[1px] group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
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
                  <div className="absolute inset-[1px] rounded-full bg-black dark:bg-zinc-950" />
                  <Button
                    type="submit"
                    className="relative h-full px-6 rounded-full bg-[#0071a9] dark:bg-[#0071a9] font-medium text-xs text-white transition-all hover:bg-[#0071a9]/90 dark:hover:bg-[#0071a9]/90"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};