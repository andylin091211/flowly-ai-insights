
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  BarChart, 
  PieChart, 
  LineChart, 
  Settings, 
  LogOut,
  MessageSquare,
  Star,
  Plus
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("flowly-user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else if (!location.pathname.includes("/login") && 
               !location.pathname.includes("/register") && 
               !location.pathname.includes("/forgot-password") &&
               location.pathname !== "/") {
      navigate("/login");
    }
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("flowly-user");
    toast({
      title: "已退出登录",
      description: "您已成功退出登录",
    });
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-flowly-blue flex items-center justify-center">
            <span className="text-white font-bold">流</span>
          </div>
          <h1 className="text-xl font-bold">流程力数据分析</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>主菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={isActive("/dashboard") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  <span>仪表板</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={isActive("/visualizations") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/visualizations")}
                >
                  <BarChart className="h-5 w-5 mr-2" />
                  <span>可视化</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={isActive("/saved") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/saved")}
                >
                  <Star className="h-5 w-5 mr-2" />
                  <span>收藏</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={isActive("/nlq") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/nlq")}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>自然语言查询</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>创建</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button
              className="w-full justify-start"
              variant="default"
              onClick={() => navigate("/create-dashboard")}
            >
              <Plus className="h-5 w-5 mr-2" />
              新建仪表板
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        {user && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-flowly-blue text-white">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
