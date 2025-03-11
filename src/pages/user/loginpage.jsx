import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Cookies from "universal-cookie";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { validateLogin } from "../../validator/validator";
import getRandomEmojis from "../../helper/randomemoji";
import { useUserContext } from "../../context/userContext";
import { userLogout } from "../../controllers/logout.controller";
import { Particles } from "@/components/magicui/particles";

const Loginpage = () => {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { isLoggedin, setIsLoggedin, setUserNameNav } = useUserContext();
  const [user, setUser] = useState({ email: "", password: "" });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    const Error = validateLogin(user);
    if (Error) {
      console.log(Error);
      toast({
        variant: "destructive",
        duration: 2000,
        title: "Login Failed",
        description: Error[0],
      });
      return;
    }

    axios
      .post("https://solaris-backend.vercel.app/api/user/login", user)
      .then((response) => {
        const cookies = new Cookies();
        cookies.set("cookie", response.data.cookie, { path: "/" });
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        setIsLoggedin(true);
        setUserNameNav(response.data.data.name);
        toast({
          variant: "default",
          duration: 2000,
          title: `Welcome, ${response.data.data.name}! ${getRandomEmojis()}`,
          description: "You have successfully logged in.",
        });
        navigator("/");
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description:
            error.response.data.message ||
            "Please check your credentials and try again.",
        });
        console.error("Login error:", error);
      });
  };

  const handleLogout = () => {
    userLogout(setIsLoggedin, setUserNameNav).catch((error) => {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Unable to logout. Please try again.",
      });
      console.error("Logout error:", error);
    });
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Particles
          className="w-full h-full opacity-100"
          quantity={140}
          ease={20}
          refresh={true}
          vx={0.1}
          vy={0.1}
        />
      </div>
      <div className="flex items-center justify-center p-15 font-Poppins relative z-10">
        <Card className="w-2/3 min-w-[18rem] max-w-[24rem] backdrop-blur-sm bg-background/95">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isLoggedin ? "Logged In" : "Login"}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {isLoggedin
                ? "You are currently logged in"
                : "Enter your credentials to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoggedin ? (
              <Button onClick={handleLogout}>Log Out</Button>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-1 border-2 border-input rounded-md outline-none focus:border-accent placeholder:opacity-20"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="w-full px-4 py-2 border-2 border-input rounded-md outline-none focus:border-accent placeholder:opacity-20"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-foreground opacity-60 hover:opacity-100 focus:outline-none"
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <Link
                    to={"/createuserpage"}
                    className="text-[10px] text-muted-foreground hover:underline"
                  >
                    New here? Sign up
                  </Link>
                  <Button onClick={handleLogin}>Log In</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Loginpage;
