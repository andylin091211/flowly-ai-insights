
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import VisualizationCard, { ChartType } from "@/components/dashboard/VisualizationCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

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
  conversion: [
    { name: "访问", value: 5000 },
    { name: "浏览", value: 3500 },
    { name: "加购", value: 2200 },
    { name: "付款", value: 1200 },
  ],
};

interface VisualizationData {
  id: string;
  title: string;
  description: string;
  chartType: ChartType;
  data: any[];
  isSaved: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("用户");
  const [visualizations, setVisualizations] = useState<VisualizationData[]>([
    {
      id: "1",
      title: "月度销售趋势",
      description: "过去6个月的销售数据",
      chartType: "line",
      data: sampleData.sales,
      isSaved: true,
    },
    {
      id: "2",
      title: "产品销售分布",
      description: "各产品销售占比",
      chartType: "pie",
      data: sampleData.distribution,
      isSaved: true,
    },
    {
      id: "3",
      title: "每周网站流量",
      description: "过去一周的网站访问量",
      chartType: "bar",
      data: sampleData.traffic,
      isSaved: false,
    },
    {
      id: "4",
      title: "转化漏斗",
      description: "用户转化流程分析",
      chartType: "area",
      data: sampleData.conversion,
      isSaved: false,
    },
  ]);

  useEffect(() => {
    // Get user data
    const userData = localStorage.getItem("flowly-user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/edit-visualization/${id}`);
  };

  const handleSave = (id: string) => {
    setVisualizations(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isSaved: !item.isSaved } 
          : item
      )
    );
    
    const vis = visualizations.find(v => v.id === id);
    if (vis) {
      toast({
        title: vis.isSaved ? "已移除收藏" : "已添加到收藏",
        description: `${vis.title} ${vis.isSaved ? "已从收藏夹移除" : "已添加到收藏夹"}`,
      });
    }
  };

  const handleDelete = (id: string) => {
    const vis = visualizations.find(v => v.id === id);
    setVisualizations(prev => prev.filter(item => item.id !== id));
    
    if (vis) {
      toast({
        title: "已删除",
        description: `${vis.title} 已被删除`,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeCard userName={userName} />
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="favorites">收藏</TabsTrigger>
              <TabsTrigger value="recent">最近查看</TabsTrigger>
            </TabsList>
            
            <Button onClick={() => navigate("/visualizations")}>
              <Plus className="h-4 w-4 mr-2" />
              创建可视化
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visualizations.map((vis) => (
                <VisualizationCard
                  key={vis.id}
                  id={vis.id}
                  title={vis.title}
                  description={vis.description}
                  chartType={vis.chartType}
                  data={vis.data}
                  isSaved={vis.isSaved}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visualizations
                .filter(vis => vis.isSaved)
                .map((vis) => (
                  <VisualizationCard
                    key={vis.id}
                    id={vis.id}
                    title={vis.title}
                    description={vis.description}
                    chartType={vis.chartType}
                    data={vis.data}
                    isSaved={vis.isSaved}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onDelete={handleDelete}
                  />
                ))}
              
              {visualizations.filter(vis => vis.isSaved).length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Star className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">暂无收藏</h3>
                    <p className="text-muted-foreground text-sm mb-4">点击可视化卡片上的星标来添加收藏</p>
                    <Button onClick={() => navigate("/visualizations")}>
                      创建可视化
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visualizations
                .slice(0, 2)
                .map((vis) => (
                  <VisualizationCard
                    key={vis.id}
                    id={vis.id}
                    title={vis.title}
                    description={vis.description}
                    chartType={vis.chartType}
                    data={vis.data}
                    isSaved={vis.isSaved}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
