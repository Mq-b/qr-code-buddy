import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Sparkles } from "lucide-react";
import { QRGenerator } from "@/components/QRGenerator";
import { QRScanner } from "@/components/QRScanner";
import { ModeSelector } from "@/components/ModeSelector";

const Index = () => {
  const [mode, setMode] = useState<"generate" | "scan">("generate");

  return (
    <div className="min-h-screen bg-background bg-grid relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-glow-secondary/30 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Free QR Code Tool
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 scanner-glow">
              <QrCode className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="text-gradient">Lab2QR</span>
            <span className="text-foreground">Code</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-md mx-auto"
          >
            Generate and scan QR codes instantly. Fast, free, and privacy-focused.
          </motion.p>
        </motion.header>

        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <ModeSelector mode={mode} onModeChange={setMode} />
        </motion.div>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {mode === "generate" ? (
              <QRGenerator key="generator" />
            ) : (
              <QRScanner key="scanner" />
            )}
          </AnimatePresence>
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-sm text-muted-foreground"
        >
          <p className="font-mono">
            Built with modern web technologies
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
