import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Particles } from "@/components/magicui/particles";
import axios from "axios";
import { staticProductData } from "./staticData";

const API_BASE_URL = "https://solaris-backend.vercel.app/api";

const ProductPage = () => {
  const { productcetagoryname } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productData, setProductData] = useState({
    anime: staticProductData.anime,
    car: staticProductData.car,
    game: staticProductData.game,
    movie: staticProductData.movie,
    asthetic: staticProductData.asthetic,
  });

  // Fetch products based on category
  useEffect(() => {
    if (productcetagoryname) {
      setSelectedCategory(productcetagoryname);
      fetchProducts(`${API_BASE_URL}/product/category/${productcetagoryname}`);
    }
  }, [productcetagoryname]);

  const fetchProducts = async (url) => {
    try {
      const { data } = await axios.get(url);
      const products = data.data;

      const updatedData = { ...productData };

      products.forEach((product) => {
        const category = product.category;
        if (!updatedData[category]) {
          updatedData[category] = {};
        }

        updatedData[category][product.title] = {
          subtitle: product.subtitle,
          products: product.variants.map((variant) => ({
            id: variant.variantId,
            name: variant.packtitle,
            image:
              variant.packfrontimage || "https://via.placeholder.com/400x600",
            description: variant.description,
            price: variant.price,
            quantity: variant.quantity,
            isApiProduct: true,
            fullData: { ...product, currentVariant: variant },
          })),
        };
      });

      setProductData(updatedData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const renderProductCard = ({ id, name, image, fullData }) => (
    <Card key={id} className="hover:shadow-lg flex flex-col cursor-pointer">
      <Link
        to={`/category/${productcetagoryname}/${fullData._id}`}
        state={{ image, productData: fullData, variantId: id }}
      >
        <CardHeader className="lg:p-8 md:p-4 sm:p-4 p-4 aspect-[3/4] flex-grow bg-amber-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t-lg shadow-[12px_26px_21px_-12px_#474747] transition-all duration-300 hover:scale-105 transform-gpu"
          />
        </CardHeader>
      </Link>
      <CardContent className="p-1 min-h-[2rem] flex items-center justify-center shadow-md backdrop-blur-lg bg-black/50">
        <h3 className="text-xs font-semibold truncate font-Poppins">{name}</h3>
      </CardContent>
    </Card>
  );

  const selectedProducts = productData[selectedCategory] || {};

  return (
    <div className="min-h-screen w-full relative">
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

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 font-Arapey">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 pb-2 border-b capitalize mx-8">
            {selectedCategory || "No Product Found"}
          </h1>

          {Object.entries(selectedProducts).map(
            ([itemName, { subtitle, products }]) =>
              products?.length > 0 && (
                <div key={itemName} className="mb-4 mx-8">
                  <h2 className="text-xl sm:text-3xl font-bold">{itemName}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base mt-1">
                    {subtitle}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {products.map(renderProductCard)}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
