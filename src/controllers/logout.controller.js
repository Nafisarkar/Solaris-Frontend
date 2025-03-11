import axios from "axios";
import Cookies from "universal-cookie";
import { deleteLocalStorage } from "../../helper/userLocalStorage";

export const userLogout = (setIsLoggedin, setUserNameNav) => {
  return axios
    .delete("https://solaris-backend.vercel.app/api/user/logout")
    .then((response) => {
      const cookies = new Cookies();
      cookies.remove("cookie");
      deleteLocalStorage();
      setIsLoggedin(false);
      setUserNameNav("");
      console.log("loginpage : Logout Successful " + response.data.message);
      return response;
    })
    .catch((error) => {
      console.log(error.response.data.message);
      throw error;
    });
};
