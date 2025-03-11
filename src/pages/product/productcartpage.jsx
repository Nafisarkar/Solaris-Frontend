import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, TrashIcon, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/magicui/particles";

const Productcartpage = () => {
  const { isLoggedin, cartProducts, setCartProducts, userInfo } =
    useUserContext();
  const [totalSubPrice, setTotalSubPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      const price = cartProducts.reduce(
        (accumulator, item) => accumulator + item.totalPrice,
        0
      );
      setTotalSubPrice(price);
      setTotalPrice(price + 100);
    } else {
      setTotalSubPrice(0);
      setTotalPrice(0);
    }
  }, [cartProducts]);

  const removeItem = (item) => {
    try {
      console.log("Removing item:", item);

      // Filter out the specific item with exact matching of all properties
      const updatedCart = cartProducts.filter((cartItem) => {
        // Keep the item if ANY of these conditions are false (meaning it's not the same item)
        return !(
          cartItem.variantId === item.variantId &&
          cartItem.material === item.material &&
          cartItem.materialPrice === item.materialPrice &&
          cartItem.size === item.size &&
          cartItem.sizePrice === item.sizePrice
        );
      });

      // Update state and localStorage
      setCartProducts(updatedCart);
      localStorage.setItem("userCart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    alert("Checkout functionality to be implemented!");
  };

  if (!isLoggedin) {
    return (
      <div className="max-w-md mx-auto mt-24 text-center px-4">
        <Card className="backdrop-blur-sm bg-black/50 border border-gray-800">
          <CardHeader>
            <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-60" />
            <CardTitle className="text-3xl font-Arapey">Your Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">Please login to view your cart</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => navigate("/loginpage")}
              className="px-8 py-2 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600"
            >
              Login to Continue
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 font-Poppins">
      <div className="fixed inset-0">
        <Particles
          className="w-full h-full opacity-100"
          quantity={140}
          ease={20}
          refresh={true}
          vx={0.1}
          vy={0.1}
        />
      </div>

      {!cartProducts || cartProducts.length === 0 ? (
        <Card className="mb-8 text-center py-16 backdrop-blur-sm">
          <CardContent>
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <p className="text-xl mb-6">Your cart is empty</p>
            <Button onClick={() => navigate("/")} className="px-8 py-6">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cartProducts.map((item) => (
                <Card
                  key={item.id || Math.random()}
                  className="hover:shadow-lg flex flex-col cursor-pointer"
                >
                  <div className="relative">
                    <CardHeader className="lg:p-8 md:p-4 sm:p-4 p-4 aspect-[3/4] flex-grow bg-amber-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-t-lg shadow-[12px_26px_21px_-12px_#474747] transition-all duration-300 hover:scale-105 transform-gpu"
                      />
                    </CardHeader>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item);
                      }}
                      className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 transition-colors bg-black/60 rounded-full p-1 z-10"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4 min-h-[4.5rem] flex flex-col justify-between shadow-md backdrop-blur-lg bg-black/50">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold truncate font-Poppins w-3/4">
                        {item.name}
                      </h3>
                      <p className="text-sm font-semibold">
                        <span>৳</span> {item.totalPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1 py-0 border-gray-700"
                      >
                        {item.size}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1 py-0 border-gray-700"
                      >
                        {item.material}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="sticky top-4 shadow-md backdrop-blur-lg bg-black/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-medium">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span>
                      <span>৳</span> {totalSubPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Shipping</span>
                    <span>
                      <span>৳ </span> 100
                    </span>
                  </div>

                  <Separator className="my-4 bg-zinc-800" />

                  {userInfo && (
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-zinc-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">
                          {userInfo.address || "No address provided"}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-zinc-500">
                        <Phone className="h-3 w-3 mr-1" />
                        <span>{userInfo.phone || "No phone provided"}</span>
                      </div>
                    </div>
                  )}

                  <Separator className="my-4 bg-zinc-800" />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="flex items-center">
                      <span className="mr-0.5">৳</span>{" "}
                      {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full py-6" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productcartpage;
