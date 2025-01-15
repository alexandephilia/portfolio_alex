import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('light');

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get effective theme (actual theme being displayed)
  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  if (!mounted) {
    return (
      <Button variant="outline" size="xs" className="w-6 h-6 p-0 opacity-0">
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          className="w-6 h-6 p-0 transition-all duration-300 hover:blur-[2px] focus:blur-[2px] active:blur-[1px] 
            select-none outline-none focus:outline-none focus-visible:outline-none 
            ring-transparent focus:ring-transparent focus-visible:ring-transparent
            [&>*]:select-none [&_*]:pointer-events-none relative"
        >
          <Sun
            className={`h-4 w-4 transition-all duration-300 
              ${effectiveTheme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
          />
          <Moon
            className={`absolute h-4 w-4 transition-all duration-300
              ${effectiveTheme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[6rem] p-1">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="text-xs px-2 py-1"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="text-xs px-2 py-1"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="text-xs px-2 py-1"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}