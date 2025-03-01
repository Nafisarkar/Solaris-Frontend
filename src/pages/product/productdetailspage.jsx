import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Particles } from "@/components/magicui/particles";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserContext } from "../../context/userContext";
import { useToast } from "@/hooks/use-toast";

// Constants
const SIZES = {
  a1: { name: "A1 - Large", price: 300 },
  a2: { name: "A2 - Medium", price: 200 },
  a3: { name: "A3 - Small", price: 100 },
  a4: { name: "A4 - Tiny", price: 0 },
};

const MATERIALS = {
  paper: { name: "Premium Paper", price: 0 },
  foam: { name: "3M Foam Board", price: 100 },
};

const ProductDetailsPage = () => {
  const { toast } = useToast();
  const { isLoggedin, cartProducts, setCartProducts } = useContext(UserContext);
  const navigate = useNavigate();

  const { productcetagoryname } = useParams();
  const { image, productData } = useLocation().state;

  // State
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("a4");
  const [selectedMaterial, setSelectedMaterial] = useState("paper");
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Initialize product
  useEffect(() => {
    console.log(cartProducts);
    if (productData?.currentVariant) {
      const variant = productData.currentVariant;
      console.log(variant);
      setProduct({
        name: variant.packtitle,
        images: variant.allimagesinpack || [variant.packfrontimage],
        description: variant.description,
        basePrice: variant.price || 0,
        quantity: variant.quantity || 0,
        productTitle: productData.title,
      });
    }
  }, [productData]);

  // Image navigation handlers
  const handleSlideChange = (direction) => {
    if (!product?.images?.length) return;
    setCurrentIndex((prev) => {
      if (direction === "next") {
        return prev === product.images.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? product.images.length - 1 : prev - 1;
    });
  };

  // Touch handlers
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50) {
      handleSlideChange(distance > 0 ? "next" : "prev");
    }
    setTouchEnd(null);
    setTouchStart(null);
  };

  // Price calculation
  const calculatePrice = () => {
    if (!product?.basePrice) return "0.00";
    return (
      product.basePrice +
      SIZES[selectedSize].price +
      MATERIALS[selectedMaterial].price
    ).toFixed(2);
  };

  // Purchase handler
  const handleBuy = () => {
    if (!isLoggedin) {
      toast({
        duration: 2000,
        variant: "destructive",
        title: "Authentication required",
        description: "Please login to add items to cart",
      });
      navigate("/loginpage");
      return;
    }

    const newItem = {
      // Add unique ID for cart items
      productId: productData._id,
      variantId: productData.currentVariant.variantId,
      image: product.images[0], // Save the first image
      name: product.name,
      size: SIZES[selectedSize].name,
      material: MATERIALS[selectedMaterial].name,
      basePrice: product.basePrice,
      sizePrice: SIZES[selectedSize].price,
      materialPrice: MATERIALS[selectedMaterial].price,
      totalPrice: parseFloat(calculatePrice()),
    };

    // Check if this item already exists in cart
    const existingItemIndex = cartProducts.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.variantId === newItem.variantId &&
        item.size === newItem.size &&
        item.material === newItem.material
    );

    if (existingItemIndex >= 0) {
      toast({
        duration: 2000,
        title: "Already in cart",
        description: "This item is already in your cart",
      });
    } else {
      // Add new item
      setCartProducts((prev) => [...prev, newItem]);
      toast({
        duration: 2000,
        title: "Item added",
        description: "Product added to your cart successfully",
      });
    }
  };

  return (
    <div className="mt-2 mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 mb-18 font-Poppins">
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

      <div className="flex flex-col lg:flex-row gap-4 lg:h-[82dvh]">
        {/* Image Display */}
        <Card className="flex flex-col w-full lg:basis-2/3 mx-auto">
          <CardHeader className="p-2 sm:p-3 md:p-4 h-[300px] sm:h-[400px] md:h-[400px] flex-grow bg-amber-100">
            <div
              className="relative h-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {product && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                      src={product.images[currentIndex] || image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-[12px_26px_21px_-12px_#474747] transition-all duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 lg:pointer-events-auto pointer-events-none">
                    <Button
                      onClick={() => handleSlideChange("prev")}
                      className="bg-black/50 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/75 transition-all duration-300 hover:scale-110"
                    >
                      <FaRegArrowAltCircleLeft />
                    </Button>
                    <Button
                      onClick={() => handleSlideChange("next")}
                      className="bg-black/50 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/75 transition-all duration-300 hover:scale-110"
                    >
                      <FaRegArrowAltCircleRight />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-1 min-h-[2rem] flex items-center justify-center shadow-md backdrop-blur-lg bg-black/50">
            {product
              ? `${currentIndex + 1} / ${product.images.length}`
              : "No images"}
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card className="flex-1 w-full lg:basis-1/3 backdrop-blur-lg bg-black/50">
          <CardHeader className="p-4">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl">
              {product?.name || "Product Details"}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              Category: {productcetagoryname}
            </CardDescription>
            <div>
              <p className="text-sm mt-1">{product?.quantity} pcs pack</p>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {product ? (
              <div className="space-y-4">
                <p className="text-base sm:text-lg">{product.description}</p>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Select Size</label>
                    <Select
                      value={selectedSize}
                      onValueChange={setSelectedSize}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a1">A1 - Large</SelectItem>
                        <SelectItem value="a2">A2 - Medium</SelectItem>
                        <SelectItem value="a3">A3 - Small</SelectItem>
                        <SelectItem value="a4">A4 - Tiny</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      Select Material
                    </label>
                    <Select
                      value={selectedMaterial}
                      onValueChange={setSelectedMaterial}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paper">Premium Paper</SelectItem>
                        <SelectItem value="foam">3M Foam Board</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Cost Summary : {MATERIALS[selectedMaterial].name} (৳
                      {MATERIALS[selectedMaterial].price}) Base Price: ৳
                      {product?.basePrice} + Size: {SIZES[selectedSize].name} (৳
                      {SIZES[selectedSize].price})
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {calculatePrice()} ৳
                    </p>
                  </div>

                  <Button
                    onClick={handleBuy}
                    className="w-full text-lg py-4 mt-2 font-Poppins"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            ) : (
              <p>Product not found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
