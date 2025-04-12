
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any login
      const mockUser = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: "测试用户",
        email: formData.email,
      };
      
      localStorage.setItem("flowly-user", JSON.stringify(mockUser));
      
      toast({
        title: "登录成功",
        description: "欢迎回到百流云数据分析平台",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "登录失败",
        description: "请检查您的邮箱和密码",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">登录</CardTitle>
        <CardDescription className="text-center">
          登录您的百流云数据分析账户
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">电子邮箱</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="请输入您的电子邮箱"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="请输入密码"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/forgot-password")}>
              忘记密码?
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "登录中..." : "登录"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          没有账户?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate("/register")}>
            注册
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
