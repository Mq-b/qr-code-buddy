import { motion } from "framer-motion";
import { 
  QrCode, 
  Camera, 
  FileCode, 
  Download, 
  RefreshCw, 
  Globe, 
  Cpu,
  Github,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: RefreshCw,
    title: "双向转换",
    description: "文件 ↔ 条形码图像，支持任意二进制文件"
  },
  {
    icon: Camera,
    title: "实时扫描",
    description: "摄像头实时识别，自动设备配置"
  },
  {
    icon: FileCode,
    title: "19种格式",
    description: "QR码、Data Matrix、Code128、EAN等"
  },
  {
    icon: Download,
    title: "批量处理",
    description: "支持多文件批量生成与导出"
  },
  {
    icon: Globe,
    title: "多语言",
    description: "中英文界面，国际化支持"
  },
  {
    icon: Cpu,
    title: "跨平台",
    description: "Windows 与 Linux 原生支持"
  }
];

const techStack = [
  { name: "Qt5", desc: "GUI框架" },
  { name: "ZXing-cpp", desc: "条码库" },
  { name: "OpenCV", desc: "图像处理" },
  { name: "Boost", desc: "MQTT/Asio" },
  { name: "CMake", desc: "构建系统" }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-grid relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <QrCode className="w-4 h-4" />
            开源跨平台桌面应用
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Lab2QR</span>
            <span className="text-foreground">Code</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            文件与条形码图像的双向转换工具
            <br />
            <span className="text-sm">支持 Base64 编码确保数据完整性</span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="glow" 
              size="lg"
              onClick={() => window.open('https://github.com/Mq-b/Lab2QRCode', '_blank')}
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub 仓库
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://github.com/Mq-b/Lab2QRCode/releases', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              下载
            </Button>
          </div>
        </motion.header>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">核心功能</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-5 text-center group hover:border-primary/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">技术栈</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="px-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm"
              >
                <span className="font-mono text-primary">{tech.name}</span>
                <span className="text-muted-foreground ml-2">{tech.desc}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Quick Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 text-center"
        >
          <h2 className="text-xl font-bold mb-4">快速链接</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://deepwiki.com/Mq-b/Lab2QRCode" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              在线文档
            </a>
            <a 
              href="https://github.com/Mq-b/Lab2QRCode/issues" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              问题反馈
            </a>
            <a 
              href="https://github.com/Mq-b/Lab2QRCode#readme" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              README
            </a>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-sm text-muted-foreground font-mono"
        >
          由 Mq-b 开发 · MIT 许可证
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
