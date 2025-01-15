import { Badge } from "./badge";

export interface StatusBadgeProps {
  status: "Working on" | string;
  icon: React.ReactNode;
  text: string;
}

export function StatusBadge({ status, icon, text }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "working on":
        return "bg-sky-400/80";
      case "completed":
        return "bg-sky-400/80";
      default:
        return "bg-sky-400/80";
    }
  };

  const getStatusGlow = (status: string) => {
    switch (status.toLowerCase()) {
      case "working on":
        return "shadow-[0_0_8px_#38bdf8,0_0_15px_rgba(56,189,248,0.6)]";
      case "completed":
        return "shadow-[0_0_8px_#38bdf8,0_0_15px_rgba(56,189,248,0.6)]";
      default:
        return "shadow-[0_0_8px_#38bdf8,0_0_15px_rgba(56,189,248,0.6)]";
    }
  };

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 
        bg-gradient-to-r from-background via-background to-background
        hover:from-muted hover:via-muted hover:to-muted
        hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] 
        dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] 
        hover:scale-[1.01] hover:-translate-y-[1px] 
        transition-all duration-300 ease-out group scale-90 md:scale-100
        border-2 border-white/20 dark:border-white/10
        outline outline-2 outline-black/5 dark:outline-white/5
        relative overflow-hidden"
    >
      <div className="flex items-center gap-1.5 md:gap-1.5">
        <div className="relative scale-75 md:scale-100">
          <div className={`absolute inset-0 rounded-full ${getStatusColor(status)} blur-[1px] animate-ping ${getStatusGlow(status)}`} />
          <div className={`relative w-2 h-2 md:w-2 md:h-2 rounded-full ${getStatusColor(status)} blur-[0.5px] animate-pulse ${getStatusGlow(status)}`} />
        </div>
        <span className="text-[10px] md:text-xs font-medium">{status}</span>
      </div>
      <div className="flex items-center gap-0.5 md:gap-1 pl-1 md:pl-1.5 border-l border-muted-foreground/20">
        <div className="scale-75 md:scale-100">
          {icon}
        </div>
        <span className="text-[10px] md:text-xs font-semibold">{text}</span>
      </div>
    </Badge>
  );
}