import Cookies from "universal-cookie";

const checkLoginUser = () => {
  const cookies = new Cookies();
  const userCookie = cookies.get("cookie");

  if (userCookie) {
    // User is logged in
    console.log("loginchecker : User is Logged In");
    return true;
  } else {
    // User is not logged in
    console.log("loginchecker : User is Not Logged In");
    return false;
  }
};

export default checkLoginUser;
