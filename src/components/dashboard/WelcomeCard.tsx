
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const WelcomeCard = ({ userName }: { userName: string }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 flowly-gradient-bg opacity-90" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white text-2xl">欢迎回来，{userName}</CardTitle>
          <CardDescription className="text-white/80">
            百流云数据分析平台助您洞察数据中的价值
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 pt-0">
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-none"
              onClick={() => navigate("/nlq")}
            >
              开始自然语言查询
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
              onClick={() => navigate("/visualizations")}
            >
              创建可视化图表
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default WelcomeCard;
