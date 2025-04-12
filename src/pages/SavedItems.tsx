
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VisualizationCard, { ChartType } from "@/components/dashboard/VisualizationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  tags: string[];
  dashboards: string[];
}

const initialData: VisualizationData[] = [
  {
    id: "1",
    title: "月度销售趋势",
    description: "过去6个月的销售数据",
    chartType: "line",
    data: sampleData.sales,
    isSaved: true,
    tags: ["销售", "趋势", "月度"],
    dashboards: ["销售概览", "月度报告"],
  },
  {
    id: "4",
    title: "销售转化漏斗",
    description: "用户转化流程分析",
    chartType: "area",
    data: sampleData.conversion,
    isSaved: true,
    tags: ["转化", "漏斗", "用户"],
    dashboards: ["用户分析"],
  },
  {
    id: "2",
    title: "产品销售分布",
    description: "各产品销售占比",
    chartType: "pie",
    data: sampleData.distribution,
    isSaved: true,
    tags: ["销售", "产品", "分布"],
    dashboards: ["产品分析", "销售概览"],
  }
];

interface Dashboard {
  id: string;
  name: string;
  description: string;
  visualizationsCount: number;
}

const dashboards: Dashboard[] = [
  {
    id: "d1",
    name: "销售概览",
    description: "销售核心指标一览",
    visualizationsCount: 5,
  },
  {
    id: "d2",
    name: "用户分析",
    description: "用户行为与转化分析",
    visualizationsCount: 3,
  },
  {
    id: "d3",
    name: "产品分析",
    description: "产品性能与分布分析",
    visualizationsCount: 4,
  },
  {
    id: "d4",
    name: "月度报告",
    description: "每月数据综合报告",
    visualizationsCount: 6,
  },
];

const SavedItems = () => {
  const navigate = useNavigate();
  const [savedVisualizations, setSavedVisualizations] = useState<VisualizationData[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDashboards, setSelectedDashboards] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(savedVisualizations.flatMap(vis => vis.tags))
  );

  const handleEdit = (id: string) => {
    toast({
      title: "编辑可视化",
      description: "正在跳转到可视化编辑页面...",
    });
    // In a real app, navigate to edit page
  };

  const handleSave = (id: string) => {
    setSavedVisualizations(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isSaved: !item.isSaved } 
          : item
      )
    );
    
    // If un-saved, remove from the list after a short delay
    const vis = savedVisualizations.find(v => v.id === id);
    if (vis && vis.isSaved) {
      setTimeout(() => {
        setSavedVisualizations(prev => prev.filter(item => item.id !== id));
        
        toast({
          title: "已移除收藏",
          description: `${vis.title} 已从收藏夹移除`,
        });
      }, 300);
    }
  };

  const handleDelete = (id: string) => {
    const vis = savedVisualizations.find(v => v.id === id);
    setSavedVisualizations(prev => prev.filter(item => item.id !== id));
    
    if (vis) {
      toast({
        title: "已删除",
        description: `${vis.title} 已被删除`,
      });
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const toggleDashboard = (dashboard: string) => {
    setSelectedDashboards(prev => 
      prev.includes(dashboard) 
        ? prev.filter(d => d !== dashboard) 
        : [...prev, dashboard]
    );
  };

  const filteredVisualizations = savedVisualizations.filter(vis => {
    const matchesSearch = searchTerm === "" || 
      vis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vis.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => vis.tags.includes(tag));
    
    const matchesDashboards = selectedDashboards.length === 0 || 
      selectedDashboards.some(dashboard => vis.dashboards.includes(dashboard));
    
    return matchesSearch && matchesTags && matchesDashboards;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">收藏夹</h1>
            <p className="text-muted-foreground">管理您收藏的可视化和仪表板</p>
          </div>
          
          <Button onClick={() => navigate("/visualizations")}>
            <Plus className="h-4 w-4 mr-2" />
            添加可视化
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 space-y-6">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-medium mb-3">筛选</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge 
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">仪表板</h4>
                  <div className="flex flex-wrap gap-2">
                    {dashboards.map(dashboard => (
                      <Badge 
                        key={dashboard.id}
                        variant={selectedDashboards.includes(dashboard.name) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleDashboard(dashboard.name)}
                      >
                        {dashboard.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="搜索收藏..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="visualizations">
              <TabsList>
                <TabsTrigger value="visualizations">可视化</TabsTrigger>
                <TabsTrigger value="dashboards">仪表板</TabsTrigger>
              </TabsList>
              
              <TabsContent value="visualizations" className="mt-6">
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
                      <Star className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">暂无收藏的可视化</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        在可视化卡片上点击星标图标来添加收藏
                      </p>
                      <Button onClick={() => navigate("/visualizations")}>
                        浏览可视化
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="dashboards" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboards.map((dashboard) => (
                    <Card key={dashboard.id} className="overflow-hidden h-full">
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-1">{dashboard.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{dashboard.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {dashboard.visualizationsCount} 个可视化
                          </span>
                          <Button variant="outline" size="sm">
                            查看
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  <Card className="overflow-hidden h-full border-dashed">
                    <CardContent className="flex flex-col items-center justify-center h-full p-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">创建新仪表板</h3>
                      <p className="text-muted-foreground text-sm text-center mb-4">
                        将您收藏的可视化组织到新的仪表板中
                      </p>
                      <Button onClick={() => navigate("/create-dashboard")}>
                        创建仪表板
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedItems;
