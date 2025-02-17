import { ThemeProvider } from "@/components/theme-provider";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Loginpage from "./pages/user/loginpage";
import CreateUserPage from "./pages/user/createuserpage";
import Logoutpage from "./pages/user/notfoundpage";


import Navbar from "./components/cui/Navbar";
import { useEffect, useState } from "react";
import checkLoginUser from "./validator/loginchecker";
import { getUserName } from "../helper/userLocalStorage";
import Notfoundpage from "./pages/user/notfoundpage";
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userNameNav, setUserNameNav] = useState('');
  useEffect(() => {

    const checkLogin = async () => {
      const isLoggedIn = await checkLoginUser();
      setIsLoggedin(isLoggedIn);
      console.log(`Navbar : User is ${isLoggedIn ? 'Logged In' : 'Not Logged In'}`);
      if (isLoggedIn) {
        const userNameNav = getUserName();
        setUserNameNav(userNameNav);
        console.log(`Navbar : User Name is ${userNameNav}`);
      }else{
        setUserNameNav('');
      }
    };

    checkLogin();
  }, [isLoggedin]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Navbar isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} userNameNav={userNameNav} />
        <Toaster />
        <Routes>

          <Route path="*" element={<Notfoundpage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/loginpage" element={<Loginpage isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} userNameNav={userNameNav} setUserNameNav={setUserNameNav} /> } />
          <Route path="/createuserpage" element={<CreateUserPage />} />
          <Route path="/logoutpage" element={<Logoutpage isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} userNameNav={userNameNav} setUserNameNav={setUserNameNav}/>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
