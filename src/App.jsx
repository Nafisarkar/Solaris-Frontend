/* eslint-disable react/prop-types */
import { ThemeProvider } from "@/components/theme-provider";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
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
import Productcartpage from "./pages/product/productcartpage";

// Define valid categories
const VALID_CATEGORIES = ["anime", "movie", "car", "asthetic", "game"];

// Category route validator component
const CategoryRoute = ({ element: Element }) => {
  const { productcetagoryname } = useParams();

  if (!VALID_CATEGORIES.includes(productcetagoryname)) {
    return <Navigate to="/notfound" replace />;
  }

  return <Element />;
};

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

            {/* product Cart page for logged in users */}
            <Route path="/cartpage" element={<Productcartpage />} />

            {/* Protected category routes */}
            <Route
              path="/category/:productcetagoryname/:id"
              element={<CategoryRoute element={Productdetailspage} />}
            />
            <Route
              path="/category/:productcetagoryname"
              element={<CategoryRoute element={Productpage} />}
            />

            <Route path="/notfound" element={<Notfoundpage />} />
            <Route path="/aboutpage" element={<Aboutpage />} />
            <Route path="/dev" element={<Apipage />} />
          </Routes>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
