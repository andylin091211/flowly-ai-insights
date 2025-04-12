
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, MicIcon, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NLQueryInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const NLQueryInput = ({ onSearch, isLoading = false }: NLQueryInputProps) => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  const handleMicClick = () => {
    // This is a mock-up for voice input
    // In a real implementation, you would use the Web Speech API
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "语音输入",
        description: "正在聆听...",
      });
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        const mockVoiceText = "显示过去一周的销售趋势";
        setQuery(mockVoiceText);
        toast({
          title: "语音识别结果",
          description: mockVoiceText,
        });
      }, 3000);
    } else {
      setIsRecording(false);
      toast({
        title: "语音输入已取消",
        description: "您已停止语音输入",
      });
    }
  };

  useEffect(() => {
    // Focus the input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="用自然语言提问，例如：'显示过去一周的销售趋势'"
            className="pl-10 pr-24 py-6 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleMicClick}
              className={isRecording ? "text-red-500 animate-pulse" : ""}
              disabled={isLoading}
            >
              <MicIcon className="h-5 w-5" />
            </Button>
            <Button
              type="submit"
              size="icon"
              disabled={!query.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NLQueryInput;
