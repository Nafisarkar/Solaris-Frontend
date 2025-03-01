import {
  useState,
  createContext,
  createElement,
  useEffect,
  useContext,
} from "react";
import checkLoginUser from "../validator/loginchecker";
import { getUserName, getLocalStorage } from "../../helper/userLocalStorage";

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userNameNav, setUserNameNav] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("userCart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkLoginUser();
      setIsLoggedin(isLoggedIn);
      console.log(
        `User Context : User is ${isLoggedIn ? "Logged In" : "Not Logged In"}`
      );
      if (isLoggedIn) {
        const username = getUserName();
        setUserNameNav(username);
        const userData = getLocalStorage();
        console.log(`User Context : User Data is ${userData}`);
        const user = JSON.parse(userData);
        setUserInfo(user);

        if (user.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin();
          console.log(`User Context : User is Admin : ${user.admin}`);
        }

        // Load cart from localStorage
        const savedCart = localStorage.getItem("userCart");
        if (savedCart) {
          setCartProducts(JSON.parse(savedCart));
        }
      } else {
        setUserNameNav("");
        // Clear cart on logout
        setCartProducts([]);
        localStorage.removeItem("userCart");
      }
    };

    checkLogin();
  }, [isLoggedin]);

  return createElement(
    UserContext.Provider,
    {
      value: {
        isLoggedin,
        setIsLoggedin,
        userNameNav,
        setUserNameNav,
        userInfo,
        isAdmin,
        setIsAdmin,
        setUserInfo,
        cartProducts,
        setCartProducts,
      },
    },
    children
  );
}
