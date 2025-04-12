
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import NLQueryInput from "@/components/nlq/NLQueryInput";
import VisualizationCard, { ChartType } from "@/components/dashboard/VisualizationCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Bot, MessageSquare, BarChart } from "lucide-react";

// Sample data
const sampleData = {
  sales: [
    { name: "一月", value: 4000 },
    { name: "二月", value: 3000 },
    { name: "三月", value: 2000 },
    { name: "四月", value: 2780 },
    { name: "五月", value: 1890 },
    { name: "六月", value: 2390 },
  ],
  traffic: [
    { name: "周一", value: 1200 },
    { name: "周二", value: 1400 },
    { name: "周三", value: 1600 },
    { name: "周四", value: 1200 },
    { name: "周五", value: 1500 },
    { name: "周六", value: 800 },
    { name: "周日", value: 600 },
  ],
  distribution: [
    { name: "产品A", value: 400 },
    { name: "产品B", value: 300 },
    { name: "产品C", value: 300 },
    { name: "产品D", value: 200 },
    { name: "产品E", value: 100 },
  ],
  weekSales: [
    { name: "周一", value: 2400 },
    { name: "周二", value: 1800 },
    { name: "周三", value: 3200 },
    { name: "周四", value: 2900 },
    { name: "周五", value: 3800 },
    { name: "周六", value: 1200 },
    { name: "周日", value: 800 },
  ],
};

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface VisualizationResult {
  id: string;
  title: string;
  description: string;
  chartType: ChartType;
  data: any[];
  isSaved: boolean;
}

const NLQuery = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [visualization, setVisualization] = useState<VisualizationResult | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    // Simulate API call to language model
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let result: VisualizationResult | null = null;
      let responseText = "";
      
      // Simple pattern matching to simulate AI response
      if (query.includes("销售") && query.includes("趋势")) {
        result = {
          id: Date.now().toString(),
          title: "销售趋势分析",
          description: "过去一周的销售趋势数据",
          chartType: "line",
          data: sampleData.weekSales,
          isSaved: false,
        };
        responseText = "根据您的查询，我生成了过去一周的销售趋势分析图表。您可以看到周中期(周三至周五)的销售表现较好，周末销售下降明显。";
      } else if (query.includes("产品") && (query.includes("分布") || query.includes("占比"))) {
        result = {
          id: Date.now().toString(),
          title: "产品销售分布",
          description: "各产品销售占比",
          chartType: "pie",
          data: sampleData.distribution,
          isSaved: false,
        };
        responseText = "这是各产品的销售分布情况。产品A的销售占比最高，接近30%，而产品E的销售比例最低，约为8%。";
      } else if (query.includes("流量") || query.includes("访问")) {
        result = {
          id: Date.now().toString(),
          title: "网站流量分析",
          description: "过去一周的网站访问量",
          chartType: "bar",
          data: sampleData.traffic,
          isSaved: false,
        };
        responseText = "这是过去一周的网站流量数据。周三的访问量最高，周末流量有明显下降趋势。";
      } else {
        responseText = "抱歉，我暂时无法理解您的查询。请尝试询问关于销售趋势、产品分布或网站流量的问题。";
      }
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
      };
      
      setChatHistory(prev => [...prev, assistantMessage]);
      setVisualization(result);
    } catch (error) {
      toast({
        title: "查询失败",
        description: "无法处理您的请求，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (visualization) {
      setVisualization({
        ...visualization,
        isSaved: !visualization.isSaved,
      });
      
      toast({
        title: visualization.isSaved ? "已移除收藏" : "已添加到收藏",
        description: `${visualization.title} ${visualization.isSaved ? "已从收藏夹移除" : "已添加到收藏夹"}`,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">自然语言查询</h1>
          <p className="text-muted-foreground mt-2">
            用日常语言提问，获取数据洞察
          </p>
        </div>
        
        <NLQueryInput onSearch={handleSearch} isLoading={isLoading} />
        
        {chatHistory.length > 0 ? (
          <div className="space-y-8 mt-8">
            <div className="space-y-4">
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            {visualization && (
              <div className="mt-8">
                <VisualizationCard
                  id={visualization.id}
                  title={visualization.title}
                  description={visualization.description}
                  chartType={visualization.chartType}
                  data={visualization.data}
                  isSaved={visualization.isSaved}
                  onSave={handleSave}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-flowly-blue mb-2" />
                  <CardTitle>使用自然语言</CardTitle>
                  <CardDescription>用日常用语与数据对话</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    例如："显示过去一周的销售趋势"
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <BarChart className="h-8 w-8 text-flowly-blue mb-2" />
                  <CardTitle>智能可视化</CardTitle>
                  <CardDescription>自动生成最合适的图表</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    系统会分析您的问题并选择最适合的可视化方式
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Bot className="h-8 w-8 text-flowly-blue mb-2" />
                  <CardTitle>AI解读</CardTitle>
                  <CardDescription>获取数据的专业解读</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AI会为您分析数据趋势并提供有价值的洞察
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NLQuery;
