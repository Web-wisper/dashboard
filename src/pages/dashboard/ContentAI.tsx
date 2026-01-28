import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Copy, RefreshCw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContentAI = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sampleOutputs = [
      "Welcome to our innovative platform where creativity meets technology. We've designed every feature with you in mind, ensuring a seamless experience that empowers your vision and brings your ideas to life.",
      "Transform your digital presence with our cutting-edge solutions. Our AI-powered tools help you create stunning websites, compelling content, and engaging user experiences that captivate your audience.",
      "Discover the future of web design with our intelligent builder. From concept to launch, we guide you every step of the way with smart suggestions, automated layouts, and personalized recommendations.",
    ];
    
    setOutput(sampleOutputs[Math.floor(Math.random() * sampleOutputs.length)]);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-h2-mobile md:text-h2 font-heading mb-1">Content AI</h1>
        <p className="text-opacity-50 text-body-sm">Generate compelling content with AI assistance</p>
      </div>

      {/* Input Section */}
      <div className="glass-card p-5 md:p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <label className="text-label font-medium mb-3 block">What would you like to create?</label>
        <Textarea
          placeholder="E.g., Write a hero section headline for a SaaS product that helps teams collaborate better..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] bg-input border-border focus:border-primary resize-none text-body-sm"
        />
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="btn-gradient h-11 px-6 gap-2 flex-1 sm:flex-none"
          >
            <Sparkles size={18} className={cn(isGenerating && "animate-spin")} />
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
          <div className="flex flex-wrap gap-2">
            {['Hero headline', 'About section', 'CTA text', 'Product description'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setPrompt(`Write a ${suggestion.toLowerCase()} for my website`)}
                className="px-3 py-1.5 text-label-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div className="glass-card p-5 md:p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-h4 font-heading">Generated Content</h3>
          {output && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="gap-2 border-border hover:bg-muted"
              >
                <RefreshCw size={14} className={cn(isGenerating && "animate-spin")} />
                Regenerate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2 border-border hover:bg-muted"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          )}
        </div>

        {output ? (
          <div className="bg-secondary/50 rounded-lg p-5 animate-fade-in">
            <p className="text-body leading-relaxed">{output}</p>
          </div>
        ) : (
          <div className="bg-secondary/30 rounded-lg p-8 text-center border-2 border-dashed border-border">
            <Sparkles className="w-12 h-12 mx-auto text-opacity-30 mb-3" />
            <p className="text-opacity-50 text-body-sm">
              Generated content will appear here
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="glass-card p-5 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <h3 className="text-h4 font-heading mb-3">Pro Tips</h3>
        <ul className="space-y-2 text-body-sm text-opacity-70">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Be specific about your target audience and tone
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Mention key features or benefits you want highlighted
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Include any brand keywords or phrases to maintain consistency
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContentAI;
