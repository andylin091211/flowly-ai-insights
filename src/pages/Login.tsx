
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("flowly-user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-flowly-blue flex items-center justify-center">
            <span className="text-white font-bold">百</span>
          </div>
          <h1 className="text-2xl font-bold">百流云数据分析</h1>
        </div>
        <p className="text-gray-500">登录您的账户以继续</p>
      </div>
      
      <LoginForm />
    </div>
  );
};

export default Login;
