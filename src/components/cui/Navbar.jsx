import { useState, useEffect, useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import checkLoginUser from "../../validator/loginchecker";
import { UserContext } from "@/context/userContext";

function Navbar() {
  const { isLoggedin, setIsLoggedin, userNameNav, isAdmin } =
    useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isHallOfFameDropdownOpen, setIsHallOfFameDropdownOpen] =
    useState(false);

  const location = useLocation();

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkLoginUser();
      setIsLoggedin(isLoggedIn);
      console.log(
        `Navbar : User is ${isLoggedIn ? "Logged In" : "Not Logged In"}`
      );
    };
    checkLogin();
  }, [setIsLoggedin]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsAccountDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsHallOfFameDropdownOpen(false);
  };

  const toggleAccountDropdown = () => {
    setIsHallOfFameDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const toggleCategoryDropdown = () => {
    setIsHallOfFameDropdownOpen(false);
    setIsAccountDropdownOpen(false);
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleHallOfFameDropdown = () => {
    setIsHallOfFameDropdownOpen(!isHallOfFameDropdownOpen);
    setIsAccountDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsAccountDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsHallOfFameDropdownOpen(false);
  }, [location]);

  return (
    <>
      <div className="mt-2 mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="relative">
          <nav className="relative z-50 flex flex-col items-center justify-between py-4 shadow-md backdrop-blur-lg bg-black/50">
            <div className="container mx-auto flex items-center justify-between px-12">
              <Link to="/" className="text-4xl font-bold font-Bigelow">
                SOLARIS
              </Link>
              <button
                className="lg:hidden focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
              >
                <RxHamburgerMenu className="w-6 h-6" />
              </button>
              <div className="hidden lg:flex items-center space-x-2">
                <button
                  onClick={toggleAccountDropdown}
                  className="flex items-center text-lg font-Arapey py-2 px-2 hover:underline cursor-pointer"
                >
                  {userNameNav ? (
                    <>
                      {userNameNav.charAt(0).toUpperCase() +
                        userNameNav.slice(1)}
                      {isAdmin && (
                        <span className="ml-1 text-amber-400">[ Admin ]</span>
                      )}
                    </>
                  ) : (
                    "Profile"
                  )}
                  <ChevronDown className="ml-1 h-2 w-2" />
                </button>
                <button
                  onClick={toggleCategoryDropdown}
                  className="flex items-center text-lg font-Arapey py-2 px-2 hover:underline cursor-pointer"
                >
                  Categories
                  <ChevronDown className="ml-1 h-2 w-2" />
                </button>
                <button
                  onClick={toggleHallOfFameDropdown}
                  className="flex items-center text-lg font-Arapey py-2 px-2 hover:underline cursor-pointer"
                >
                  Hall Of Fame
                  <ChevronDown className="ml-1 h-2 w-2" />
                </button>
                <Link
                  to={"/aboutpage"}
                  className="flex items-center text-lg font-Arapey py-2 px-2 hover:underline cursor-pointer"
                >
                  About Us
                  <ChevronDown className="ml-1 h-2 w-2" />
                </Link>
              </div>
            </div>
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } lg:hidden flex-col w-full mt-4`}
            >
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center text-lg font-Arapey py-2 px-12 hover:underline"
              >
                {userNameNav ? (
                  <>
                    {userNameNav.charAt(0).toUpperCase() + userNameNav.slice(1)}
                    {isAdmin && (
                      <span className="ml-1 text-amber-400">[ Admin ]</span>
                    )}
                  </>
                ) : (
                  "Profile"
                )}
                <ChevronDown className="ml-1 h-2 w-2" />
              </button>
              <button
                onClick={toggleCategoryDropdown}
                className="flex items-center text-lg font-Arapey py-2 px-12 hover:underline cursor-pointer"
              >
                Categories
                <ChevronDown className="ml-1 h-2 w-2" />
              </button>
              <button
                onClick={toggleHallOfFameDropdown}
                className="flex items-center text-lg font-Arapey py-2 px-12 hover:underline cursor-pointer"
              >
                Hall Of Fame
                <ChevronDown className="ml-1 h-2 w-2" />
              </button>
              <Link
                to="/aboutpage"
                className="flex items-center text-lg font-Arapey py-2 px-12 hover:underline cursor-pointer"
              >
                About
                <ChevronDown className="ml-1 h-2 w-2" />
              </Link>
            </div>
          </nav>
          {isAccountDropdownOpen && (
            <div className="absolute z-50 w-full shadow-lg backdrop-blur-lg bg-black/80 font-Arapey">
              <div
                className="px-12 py-4"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {isLoggedin ? (
                  <Link
                    to="/loginpage"
                    className="block text-base py-2 hover:underline"
                    role="menuitem"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    to="/loginpage"
                    className="block text-base py-2 hover:underline"
                    role="menuitem"
                  >
                    Login
                  </Link>
                )}
                {isLoggedin && (
                  <span>
                    <Link
                      to="/cartpage"
                      className="block text-base py-2 hover:underline"
                      role="menuitem"
                    >
                      Cart
                    </Link>
                  </span>
                )}

                {isLoggedin && isAdmin && (
                  <span className=" text-red-400">
                    <Link
                      to="/dev"
                      className="block text-base py-2 hover:underline"
                      role="menuitem"
                    >
                      Developer
                    </Link>
                  </span>
                )}
              </div>
            </div>
          )}
          {isCategoryDropdownOpen && (
            <div className="absolute z-50 w-full shadow-lg backdrop-blur-lg bg-black/80 font-Arapey">
              <div
                className="px-12 py-4"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  to="/category/anime"
                  className="block text-base py-2 hover:underline cursor-pointer"
                  role="menuitem"
                >
                  Anime
                </Link>
                <Link
                  to="/category/movie"
                  className="block text-base py-2 hover:underline"
                  role="menuitem"
                >
                  Movie
                </Link>
                <Link
                  to="/category/game"
                  className="block text-base py-2 hover:underline"
                  role="menuitem"
                >
                  Games
                </Link>
                <Link
                  to="/category/car"
                  className="block text-base py-2 hover:underline"
                  role="menuitem"
                >
                  Cars
                </Link>
                <Link
                  to="/category/asthetic"
                  className="block text-base py-2 hover:underline"
                  role="menuitem"
                >
                  Asthetic
                </Link>
              </div>
            </div>
          )}
          {isHallOfFameDropdownOpen && (
            <div className="absolute z-50 w-full shadow-lg backdrop-blur-lg bg-black/80 font-Arapey">
              <div
                className="px-12 py-4 "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  to="/category/"
                  className="block text-base py-2 hover:underline"
                  role="menuitem"
                >
                  Super Hero
                </Link>
                <Link
                  to="/category/"
                  className="block text-base py-2 hover:underline"
                  role="menuitem"
                >
                  Super Cars
                </Link>
                <Link
                  to="/category/"
                  className="block text-base py-2 hover:underline"
                  role="menuitem"
                >
                  Gen Z
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
