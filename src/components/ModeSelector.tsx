import { motion } from "framer-motion";
import { QrCode, Scan } from "lucide-react";

interface ModeSelectorProps {
  mode: "generate" | "scan";
  onModeChange: (mode: "generate" | "scan") => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex gap-2 p-1.5 bg-secondary/50 rounded-xl border border-border/50">
      <motion.button
        onClick={() => onModeChange("generate")}
        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
          mode === "generate"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {mode === "generate" && (
          <motion.div
            layoutId="activeMode"
            className="absolute inset-0 bg-primary rounded-lg"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <QrCode className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Generate</span>
      </motion.button>

      <motion.button
        onClick={() => onModeChange("scan")}
        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
          mode === "scan"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {mode === "scan" && (
          <motion.div
            layoutId="activeMode"
            className="absolute inset-0 bg-primary rounded-lg"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Scan className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Scan</span>
      </motion.button>
    </div>
  );
};
