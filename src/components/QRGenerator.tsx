import { useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Copy, Check, QrCode, ScanLine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface QRGeneratorProps {
  onClose?: () => void;
}

export const QRGenerator = ({ onClose }: QRGeneratorProps) => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(() => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const handleDownload = useCallback(() => {
    if (!qrRef.current || !text) return;
    
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      if (ctx) {
        ctx.fillStyle = "#0f1419";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = pngUrl;
      link.click();
      toast.success("QR Code downloaded!");
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-6 md:p-8 w-full max-w-lg mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <QrCode className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Generate QR Code</h2>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-mono">
            Enter text or URL
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com or any text..."
            className="min-h-[100px] font-mono text-sm resize-none bg-secondary/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>

        <AnimatePresence mode="wait">
          {text ? (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              <div
                ref={qrRef}
                className="p-6 bg-secondary rounded-2xl glow-border animate-pulse-glow"
              >
                <QRCodeSVG
                  value={text}
                  size={200}
                  bgColor="transparent"
                  fgColor="hsl(174 72% 50%)"
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="flex gap-3 w-full">
                <Button
                  variant="secondary"
                  className="flex-1 gap-2"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy Text"}
                </Button>
                <Button
                  variant="glow"
                  className="flex-1 gap-2"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="p-4 rounded-2xl bg-secondary/50 mb-4">
                <ScanLine className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-sm">
                Enter text above to generate a QR code
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
