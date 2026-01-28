import { useState, useCallback, useEffect, useRef, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Undo2, Eye, Plus, Layout, Mail, User, FileText, Download, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/types/speech-recognition.d.ts';

interface Section {
  id: string;
  type: 'homepage' | 'contact' | 'about' | 'hero' | 'features' | 'testimonials';
  title: string;
  content: string;
  createdAt: Date;
}

interface SpeechRecognitionType {
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}


const renderSection = (type: Section['type']) => {
  switch (type) {
    case 'hero':
      return (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-12 rounded-xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Build something amazing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning websites with the power of your voice. The future of web development is here.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-8">Get Started</Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">Learn More</Button>
          </div>
        </div>
      );
    case 'features':
      return (
        <div className="bg-card p-8 rounded-xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground">Everything you need to succeed</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-secondary/20 rounded-lg border border-border/50 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layout className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Feature {i}</h3>
                <p className="text-sm text-muted-foreground">Amazing feature description goes here. It helps users understand the value.</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'testimonials':
      return (
        <div className="bg-card p-8 rounded-xl space-y-8">
          <h2 className="text-3xl font-bold text-center">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="p-6 bg-secondary/20 rounded-lg border border-border/50 space-y-4">
                <p className="italic text-muted-foreground">"This platform completely transformed how we build websites. It's incredibly intuitive and fast."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-xs text-muted-foreground">CEO, Tech Corp</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'contact':
      return (
        <div className="bg-card p-8 rounded-xl max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">We'd love to hear from you</p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input className="w-full p-2 rounded-md bg-secondary/50 border border-border" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input className="w-full p-2 rounded-md bg-secondary/50 border border-border" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea className="w-full p-2 rounded-md bg-secondary/50 border border-border h-32" placeholder="Your message..." />
            </div>
            <Button className="w-full">Send Message</Button>
          </div>
        </div>
      );
    case 'about':
      return (
        <div className="bg-card p-8 rounded-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
              <User className="w-16 h-16 text-primary/40" />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold">About Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are a team of passionate developers and designers dedicated to making the web more accessible. Our mission is to empower everyone to build beautiful websites.
              </p>
              <Button variant="outline">Our Story</Button>
            </div>
          </div>
        </div>
      );
    case 'homepage':
    default:
      return (
        <div className="bg-card p-8 rounded-xl text-center space-y-4 border border-border/50 border-dashed">
          <Layout className="w-12 h-12 mx-auto text-primary/50" />
          <h2 className="text-2xl font-bold">Welcome Home</h2>
          <p className="text-muted-foreground">This is a standard homepage placeholder. Add more sections to customize.</p>
        </div>
      );
  }
};

// Memoized Section Component to prevent unnecessary re-renders
const SectionPreview = memo(({ type }: { type: Section['type'] }) => {
  return renderSection(type);
});

const sectionTemplates = {
  homepage: { title: 'Homepage', icon: Layout, content: 'Standard homepage layout' },
  contact: { title: 'Contact Section', icon: Mail, content: 'Contact form and details' },
  about: { title: 'About Page', icon: User, content: 'Company information section' },
  hero: { title: 'Hero Section', icon: Layout, content: 'High-impact landing section' },
  features: { title: 'Features Section', icon: FileText, content: 'Feature grid layout' },
  testimonials: { title: 'Testimonials', icon: User, content: 'Customer reviews section' },
};

const VoiceBuilder = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [history, setHistory] = useState<Section[][]>([]);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);



  const addSection = useCallback((type: Section['type']) => {
    const template = sectionTemplates[type];
    const newSection: Section = {
      id: crypto.randomUUID(),
      type,
      title: template.title,
      content: template.content,
      createdAt: new Date(),
    };

    setSections(prev => {
      setHistory(h => [...h, prev]);
      return [...prev, newSection];
    });
    setTranscript('');
  }, []);

  const parseCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    let sectionType: Section['type'] | null = null;

    if (lowerCommand.includes('homepage') || lowerCommand.includes('home page')) {
      sectionType = 'homepage';
    } else if (lowerCommand.includes('contact')) {
      sectionType = 'contact';
    } else if (lowerCommand.includes('about')) {
      sectionType = 'about';
    } else if (lowerCommand.includes('hero')) {
      sectionType = 'hero';
    } else if (lowerCommand.includes('feature')) {
      sectionType = 'features';
    } else if (lowerCommand.includes('testimonial')) {
      sectionType = 'testimonials';
    }

    if (sectionType && (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('generate'))) {
      addSection(sectionType);
    }
  }, [addSection]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptText = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptText;
        } else {
          interimTranscript += transcriptText;
        }
      }

      if (finalTranscript || interimTranscript) {
        setTranscript(finalTranscript || interimTranscript);
        if (finalTranscript) {
          parseCommand(finalTranscript);
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // Will be handled by toggleListening
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [parseCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setSections(previousState);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleQuickAdd = (type: Section['type']) => {
    addSection(type);
  };

  const handleDownload = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-900">
    ${sections.map(s => `<!-- ${s.title} -->\n<div class="py-12 px-4">\n${s.content}\n</div>`).join('\n\n')}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-h2-mobile md:text-h2 font-heading mb-1">Voice Builder</h1>
        <p className="text-opacity-50 text-body-sm">Create website sections using your voice</p>
      </div>

      {/* Voice Controls */}
      {/* Voice Controls - Compact */}
      <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Mic Button */}
          <button
            onClick={toggleListening}
            disabled={!isSupported}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shrink-0",
              isListening
                ? "bg-gradient-to-br from-accent to-primary mic-pulse shadow-lg"
                : "bg-secondary hover:bg-secondary/80 hover:scale-105",
              !isSupported && "opacity-50 cursor-not-allowed"
            )}
          >
            {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </button>

          {/* Status Area */}
          <div className="flex-1 w-full text-center md:text-left min-w-0">
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-heading font-medium">
                {isListening ? 'Listening...' : 'Tap microphone to start'}
              </h3>
            </div>

            {transcript ? (
              <p className="text-body-sm text-primary font-medium animate-pulse">{transcript}</p>
            ) : (
              <p className="text-body-sm text-muted-foreground truncate">
                Try saying: <span className="text-foreground/80">"Create hero section"</span>, <span className="text-foreground/80">"Add features"</span>, or <span className="text-foreground/80">"Generate footer"</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUndo}
              disabled={history.length === 0}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Undo2 size={16} />
              Undo
            </Button>
          </div>
        </div>

        {!isSupported && (
          <div className="mt-2 text-center text-xs text-destructive bg-destructive/10 p-2 rounded">
            Speech recognition is not supported in this browser.
          </div>
        )}
      </div>

      {/* Quick Add Buttons */}
      <div className="glass-card p-5 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h3 className="text-h4 font-heading mb-4">Quick Add</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(sectionTemplates).map(([type, template]) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(type as Section['type'])}
              className="gap-2 border-border hover:bg-muted hover:border-primary/50"
            >
              <Plus size={14} />
              {template.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      {/* Live Preview */}
      <div className="glass-card p-0 overflow-hidden animate-fade-in flex flex-col h-[800px]" style={{ animationDelay: '300ms' }}>
        <div className="p-5 md:p-6 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Eye size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-h4 font-heading">Live Preview</h3>
              <p className="text-label-sm text-opacity-50">{sections.length} sections generated</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline-block mr-2">Auto-scrolls enabled</span>
            <Button size="sm" onClick={handleDownload} disabled={sections.length === 0} className="gap-2 btn-gradient">
              <Download size={16} />
              <span className="hidden sm:inline">Download Code</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8 bg-gray-50/5 dark:bg-black/20 scrollbar-thin">
          {sections.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border/50 rounded-xl m-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Layout className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Canvas is Empty</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Start speaking or use the Quick Add buttons above to build your website sections.
              </p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-8 pb-20">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="section-enter relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden xl:block" />
                  <div className="absolute -left-[54px] top-8 w-6 h-6 rounded-full bg-background border-2 border-primary hidden xl:flex items-center justify-center text-[10px] font-bold text-primary">
                    {index + 1}
                  </div>

                  <SectionPreview type={section.type} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceBuilder;
