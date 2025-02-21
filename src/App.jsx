import { ThemeProvider } from "@/components/theme-provider";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Loginpage from "./pages/user/loginpage";
import CreateUserPage from "./pages/user/createuserpage";
import Navbar from "./components/cui/Navbar";
import Notfoundpage from "./pages/user/notfoundpage";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/userContext";
import Productpage from "./pages/product/productpage";
import Aboutpage from "./pages/aboutpage";
import Productdetailspage from "./pages/product/productdetailspage";
import Apipage from "./pages/dev/apipage";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <div>
          <Navbar />
          <Toaster />
          <Routes>
            <Route path="*" element={<Notfoundpage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/loginpage" element={<Loginpage />} />
            <Route path="/createuserpage" element={<CreateUserPage />} />
            <Route
              path="/category/:productcetagoryname"
              element={<Productpage />}
            />
            <Route path="/aboutpage" element={<Aboutpage />} />
            <Route
              path="/category/:productcetagoryname/:id"
              element={<Productdetailspage />}
            />

            <Route path="/dev" element={<Apipage />} />
          </Routes>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
