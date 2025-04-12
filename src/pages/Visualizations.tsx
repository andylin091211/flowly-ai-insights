
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VisualizationCard, { ChartType } from "@/components/dashboard/VisualizationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, BarChart2, PieChart, LineChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  customers: [
    { name: "华北", value: 2400 },
    { name: "华东", value: 4500 },
    { name: "华南", value: 3000 },
    { name: "西部", value: 1500 },
  ],
  revenue: [
    { name: "一季度", value: 12000 },
    { name: "二季度", value: 19000 },
    { name: "三季度", value: 15000 },
    { name: "四季度", value: 21000 },
  ],
};

interface VisualizationData {
  id: string;
  title: string;
  description: string;
  chartType: ChartType;
  data: any[];
  isSaved: boolean;
  tags: string[];
}

const visData: VisualizationData[] = [
  {
    id: "1",
    title: "月度销售趋势",
    description: "过去6个月的销售数据",
    chartType: "line",
    data: sampleData.sales,
    isSaved: true,
    tags: ["销售", "趋势", "月度"],
  },
  {
    id: "2",
    title: "产品销售分布",
    description: "各产品销售占比",
    chartType: "pie",
    data: sampleData.distribution,
    isSaved: false,
    tags: ["销售", "产品", "分布"],
  },
  {
    id: "3",
    title: "每周网站流量",
    description: "过去一周的网站访问量",
    chartType: "bar",
    data: sampleData.traffic,
    isSaved: false,
    tags: ["流量", "网站", "周度"],
  },
  {
    id: "4",
    title: "销售转化漏斗",
    description: "用户转化流程分析",
    chartType: "area",
    data: sampleData.conversion,
    isSaved: true,
    tags: ["转化", "漏斗", "用户"],
  },
  {
    id: "5",
    title: "区域客户分布",
    description: "不同地区客户数量",
    chartType: "pie",
    data: sampleData.customers,
    isSaved: false,
    tags: ["客户", "区域", "分布"],
  },
  {
    id: "6",
    title: "季度收入走势",
    description: "各季度收入数据",
    chartType: "bar",
    data: sampleData.revenue,
    isSaved: false,
    tags: ["收入", "季度", "趋势"],
  },
];

const templateData: VisualizationData[] = [
  {
    id: "t1",
    title: "销售仪表板模板",
    description: "综合销售指标分析模板",
    chartType: "bar",
    data: sampleData.sales,
    isSaved: false,
    tags: ["模板", "销售", "仪表板"],
  },
  {
    id: "t2",
    title: "客户分析模板",
    description: "客户数据分析模板",
    chartType: "pie",
    data: sampleData.customers,
    isSaved: false,
    tags: ["模板", "客户", "分析"],
  },
  {
    id: "t3",
    title: "网站流量模板",
    description: "网站流量监控模板",
    chartType: "line",
    data: sampleData.traffic,
    isSaved: false,
    tags: ["模板", "流量", "监控"],
  },
];

const Visualizations = () => {
  const [visualizations, setVisualizations] = useState<VisualizationData[]>(visData);
  const [searchTerm, setSearchTerm] = useState("");
  const [chartTypeFilter, setChartTypeFilter] = useState<string>("all");

  const handleEdit = (id: string) => {
    toast({
      title: "编辑可视化",
      description: "正在跳转到可视化编辑页面...",
    });
    // In a real app, navigate to edit page
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

  const filteredVisualizations = visualizations.filter(vis => {
    const matchesSearch = searchTerm === "" || 
      vis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vis.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vis.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = chartTypeFilter === "all" || vis.chartType === chartTypeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">可视化管理</h1>
            <p className="text-muted-foreground">创建、编辑和管理您的数据可视化</p>
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            创建可视化
          </Button>
        </div>
        
        <div className="flex justify-between items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="搜索可视化..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant={chartTypeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartTypeFilter("all")}
            >
              全部
            </Button>
            <Button 
              variant={chartTypeFilter === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartTypeFilter("bar")}
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              柱状图
            </Button>
            <Button 
              variant={chartTypeFilter === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartTypeFilter("line")}
            >
              <LineChart className="h-4 w-4 mr-2" />
              折线图
            </Button>
            <Button 
              variant={chartTypeFilter === "pie" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartTypeFilter("pie")}
            >
              <PieChart className="h-4 w-4 mr-2" />
              饼图
            </Button>
            <Button 
              variant={chartTypeFilter === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartTypeFilter("area")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              面积图
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="my-visualizations">
          <TabsList>
            <TabsTrigger value="my-visualizations">我的可视化</TabsTrigger>
            <TabsTrigger value="templates">模板</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-visualizations" className="mt-6">
            {filteredVisualizations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVisualizations.map((vis) => (
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
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <BarChart2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">未找到可视化</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {searchTerm 
                      ? `没有找到与"${searchTerm}"相关的可视化` 
                      : "您还没有创建任何可视化"}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    创建第一个可视化
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="templates" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateData.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    {template.chartType === "bar" && (
                      <BarChart2 className="absolute inset-0 m-auto h-12 w-12 text-muted-foreground/50" />
                    )}
                    {template.chartType === "pie" && (
                      <PieChart className="absolute inset-0 m-auto h-12 w-12 text-muted-foreground/50" />
                    )}
                    {template.chartType === "line" && (
                      <LineChart className="absolute inset-0 m-auto h-12 w-12 text-muted-foreground/50" />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">使用此模板</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Visualizations;
