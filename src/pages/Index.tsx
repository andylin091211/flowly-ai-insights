
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("flowly-user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-flowly-blue flex items-center justify-center">
            <span className="text-white font-bold">百</span>
          </div>
          <h1 className="text-xl font-bold">百流云数据分析</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/login")}
          >
            登录
          </Button>
          <Button onClick={() => navigate("/register")}>
            注册
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            通过自然语言交互<br />
            <span className="flowly-gradient-text">解锁数据的力量</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            百流云数据分析平台让您能够通过简单的对话方式分析复杂数据，创建精美可视化，并获取关键业务洞察
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="flowly-gradient-bg text-white"
              onClick={() => navigate("/register")}
            >
              立即开始
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/login")}
            >
              了解更多
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="数据分析仪表板" 
              className="w-full h-full object-cover rounded-2xl opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 max-w-md">
                <h3 className="text-2xl font-bold mb-2">强大的AI驱动分析</h3>
                <p className="text-gray-700">连接DeepSeek等先进AI模型，实现自然语言与数据的无缝对话</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">百流云数据分析的核心功能</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-flowly-blue/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-flowly-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">自然语言查询</h3>
              <p className="text-gray-600">使用日常语言与您的数据对话，无需复杂的SQL或编程知识</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-flowly-blue/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-flowly-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">智能可视化</h3>
              <p className="text-gray-600">AI自动生成最合适的数据可视化，并支持实时调整与编辑</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-flowly-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-flowly-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">收藏与仪表板</h3>
              <p className="text-gray-600">将重要的可视化收藏并组织到自定义仪表板中，随时查看关键指标</p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-flowly-blue flex items-center justify-center">
                  <span className="text-white font-bold text-xs">百</span>
                </div>
                <h1 className="text-lg font-bold">百流云数据分析</h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">© 2025 百流科技. 保留所有权利</p>
            </div>
            
            <div className="flex space-x-6">
              <Button variant="link">关于我们</Button>
              <Button variant="link">联系我们</Button>
              <Button variant="link">隐私政策</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
