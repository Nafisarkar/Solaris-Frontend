import axios from "axios";
import Cookies from "universal-cookie";
import { deleteLocalStorage } from "../../helper/userLocalStorage";

export const userLogout = async () => {
  try {
    const response = await axios.delete(
      "https://solaris-backend.vercel.app/api/user/logout"
    );
    const cookies = new Cookies();
    cookies.remove("cookie");
    deleteLocalStorage();
    console.log("Logout successful: " + response.data.message);
    return response;
  } catch (error) {
    console.log("Logout error:", error.response || error);
    throw error;
  }
};
