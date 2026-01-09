import { useState, useEffect, useCallback, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRScannerProps {
  onClose?: () => void;
}

export const QRScanner = ({ onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanning = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setResult(decodedText);
          scanner.stop();
          setIsScanning(false);
          toast.success("QR Code scanned successfully!");
        },
        () => {}
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Failed to start scanner:", err);
      toast.error("Failed to access camera. Please allow camera permissions.");
    }
  }, []);

  const stopScanning = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        console.error("Failed to stop scanner:", err);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Result copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const handleOpenLink = useCallback(() => {
    if (!result) return;
    try {
      const url = new URL(result);
      window.open(url.href, "_blank", "noopener,noreferrer");
    } catch {
      toast.error("Not a valid URL");
    }
  }, [result]);

  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const resetScanner = useCallback(() => {
    setResult(null);
    setCopied(false);
  }, []);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

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
            <Camera className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Scan QR Code</h2>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="p-4 bg-secondary/50 rounded-xl border border-primary/20">
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  SCANNED RESULT
                </p>
                <p className="font-mono text-sm break-all text-foreground">
                  {result}
                </p>
              </div>

              <div className="flex gap-3">
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
                  {copied ? "Copied!" : "Copy"}
                </Button>
                {isUrl(result) && (
                  <Button
                    variant="glow"
                    className="flex-1 gap-2"
                    onClick={handleOpenLink}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Link
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={resetScanner}
              >
                Scan Another
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div
                ref={containerRef}
                className="relative aspect-square w-full max-w-[300px] mx-auto rounded-2xl overflow-hidden bg-secondary"
              >
                <div id="qr-reader" className="w-full h-full" />
                
                {isScanning && (
                  <>
                    {/* Scanner overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl" />
                      <div className="scan-line top-0" />
                    </div>
                    {/* Corner markers */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary" />
                  </>
                )}

                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              <Button
                variant={isScanning ? "destructive" : "glow"}
                className="w-full gap-2"
                onClick={isScanning ? stopScanning : startScanning}
              >
                <Camera className="w-4 h-4" />
                {isScanning ? "Stop Scanning" : "Start Camera"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Point your camera at a QR code to scan
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
