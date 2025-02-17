import GridMotion from "../components/cui/Gridmoton";
import { useEffect, useState } from "react";
import checkLoginUser from "../validator/loginchecker";
import getImageGridList from "../helper/maingridimage";

const Homepage = () => {
  useEffect(() => {
    try {
      if (!checkLoginUser()) {
        console.log("Home Page : User is Not Logged In");
      } else {
        console.log("Home Page : User is Logged In");
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      <GridMotion
        key={`${windowSize.width}-${windowSize.height}`}
        items={getImageGridList()}
      />
    </div>
  );
};

export default Homepage;
