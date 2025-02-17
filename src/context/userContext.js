import {
  useState,
  createContext,
  createElement,
  useEffect,
  useContext,
} from "react";
import checkLoginUser from "../validator/loginchecker";
import { getUserName } from "../../helper/userLocalStorage";

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userNameNav, setUserNameNav] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkLoginUser();
      setIsLoggedin(isLoggedIn);
      console.log(
        `Navbar : User is ${isLoggedIn ? "Logged In" : "Not Logged In"}`
      );
      if (isLoggedIn) {
        const username = getUserName();
        setUserNameNav(username);
        console.log(`Navbar : User Name is ${username}`);
      } else {
        setUserNameNav("");
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
        setUserInfo,
      },
    },
    children
  );
}
