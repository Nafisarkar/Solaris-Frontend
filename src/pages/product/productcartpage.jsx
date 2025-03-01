
import { useUserContext } from "../../context/userContext";

const Productcartpage = () => {
  const { isLoggedin, cartProducts } = useUserContext();
  console.log(cartProducts);
  return (
    <div>
      {isLoggedin ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h1 className="text-6xl font-bold text-white font-Arapey">
            Product Cart Page
          </h1>
          <h1 className="text-6xl font-bold text-white font-Arapey">
            {cartProducts.length}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h1 className="text-6xl font-bold text-white font-Arapey">
            Login First
          </h1>
        </div>
      )}
    </div>
  );
};

export default Productcartpage;
