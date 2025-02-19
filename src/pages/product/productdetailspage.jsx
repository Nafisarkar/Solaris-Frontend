import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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

const Productdetailspage = () => {
  const { productcetagoryname, id } = useParams();
  const location = useLocation();
  const imageFromState = location.state.image;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("a4");
  const [selectedMaterial, setSelectedMaterial] = useState("paper");
  const [product, setProduct] = useState(null);

  // Example effect for API loading - replace with your actual API call
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // For now, use the image from state if available
        setProduct({
          id: parseInt(id),
          name: "Chainsaw Man",
          images: [
            imageFromState||
              // "https://i.pinimg.com/736x/ce/61/ce/ce61ce85a1307fdf5189cf1ded43912f.jpg",
              // "https://i.pinimg.com/736x/d7/b1/22/d7b1223eef2179b41e9ab84fad1bf3c1.jpg",
              "",
          ],
          description: "The legendary chainsaw devil hunter",
          basePrice: 200,
        });

        console.log("Image from state:", imageFromState); // Debug log
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    loadProduct();
  }, [productcetagoryname, id, imageFromState]);

  const sizes = {
    a1: { name: "A1", price: 300 },
    a2: { name: "A2", price: 200 },
    a3: { name: "A3", price: 100 },
    a4: { name: "A4", price: 0 },
  };

  const materials = {
    paper: { name: "Premium Paper", price: 0 },
    foam: { name: "3M Foam Board", price: 50 },
  };

  const calculatePrice = () => {
    if (!product) return "0.00";
    const sizePrice = sizes[selectedSize]?.price || 0;
    const materialPrice = materials[selectedMaterial]?.price || 0;
    return (product.basePrice + sizePrice + materialPrice).toFixed(2);
  };

  const handleBuy = () => {
    console.log("Purchase:", {
      product: product?.name,
      size: sizes[selectedSize].name,
      material: materials[selectedMaterial].name,
      basePrice: product?.basePrice,
      totalPrice: calculatePrice(),
    });
  };

  const nextSlide = () => {
    if (product?.images) {
      setCurrentIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (product?.images) {
      setCurrentIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  // Add touch handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    setTouchEnd(null);
    setTouchStart(null);
  };

  return (
    <div className="mt-2 mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 mb-18 font-Poppins ">
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
        <Card className=" flex flex-col w-full lg:basis-2/3  mx-auto ">
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
                      src={product.images[currentIndex]}
                      alt={`${product.name} - View ${currentIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-[12px_26px_21px_-12px_#474747] transition-all duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 lg:pointer-events-auto pointer-events-none">
                    <button
                      onClick={prevSlide}
                      className="bg-black/50 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/75 transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <span className="text-xl leading-none select-none">
                        <FaRegArrowAltCircleLeft />
                      </span>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="bg-black/50 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/75 transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <span className="text-xl leading-none select-none">
                        <FaRegArrowAltCircleRight />
                      </span>
                    </button>
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
        <Card className="flex-1 w-full lg:lg:basis-1/3 backdrop-blur-lg bg-black/50 ">
          <CardHeader className="p-4">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl">
              {product?.name || "Product Details"}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              Category: {productcetagoryname}
            </CardDescription>
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
                      Cost Summary : {materials[selectedMaterial].name} (৳
                      {materials[selectedMaterial].price}) Base Price: ৳
                      {product?.basePrice} + Size: {sizes[selectedSize].name} (৳
                      {sizes[selectedSize].price})
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {calculatePrice()} ৳
                    </p>
                  </div>
                  <Button
                    onClick={handleBuy}
                    className="w-full text-lg py-4 mt-2 font-Poppins"
                  >
                    Buy Now
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

export default Productdetailspage;
