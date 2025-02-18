import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";

const ProductPage = () => {
  const { productcetagoryname } = useParams();
  const [selectedProductCetagory, setSelectedProductCetagory] = useState(null);
  // Print route name if it's anime category
  console.log("Current route category:", productcetagoryname);

  useEffect(() => {
    setSelectedProductCetagory(productcetagoryname);
  }, [productcetagoryname]);

  const anime = {
    "Demon Slayer": {
      subtitle: "Kimetsu no Yaiba",
      products: [
        {
          id: 1,
          name: "Season 1 Poster",
          image:
            "https://i.pinimg.com/736x/0a/d1/07/0ad107595b445459d3dffa1da769a153.jpg",
        },
        {
          id: 2,
          name: "Season 2 Poster",
          image:
            "https://i.pinimg.com/736x/a3/05/3c/a3053ce61d5c047e59d8986b98856a73.jpg",
        },
        {
          id: 3,
          name: "Season 3 Poster",
          image:
            "https://i.pinimg.com/736x/41/e3/77/41e3776fa378fede4fc48f78bb56353a.jpg",
        },
        {
          id: 4,
          name: "Season 4 Poster",
          image:
            "https://i.pinimg.com/736x/12/07/0c/12070ca977db345309ad1b82dfda76e2.jpg",
        },
        // Add more Demon Slayer products
      ],
    },
    "Attack on Titan": {
      subtitle: "Shingeki no Kyojin",
      products: [
        {
          id: 2,
          name: "Eren Poster",
          image:
            "https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_UF1000,1000_QL80_.jpg",
        },
        // Add more AOT products
      ],
    },
    // Add more anime sections...
  };
  const car = {
    "F1 Grand Prix": {
      subtitle: "F1 Grand Prix",
      products: [
        {
          id: 1,
          name: "Singapore Grand Prix",
          image:
            "https://i.pinimg.com/736x/00/00/17/00001751dc3a6592c16f11cea2b615d6.jpg",
        },
        {
          id: 2,
          name: "Saudi Grand Prix",
          image:
            "https://i.pinimg.com/736x/74/bc/4e/74bc4eedd64c27ee63b90c1b073bd805.jpg",
        },
        {
          id: 3,
          name: "Hungarian Grand Prix",
          image:
            "https://i.pinimg.com/736x/69/50/6e/69506e8c3d5d1f5f1e032316de675155.jpg",
        },
        {
          id: 4,
          name: "Britain Grand Prix",
          image:
            "https://i.pinimg.com/736x/0e/e8/2c/0ee82c2152ed25c7446bb7b8feca07ba.jpg",
        },
        // Add more Demon Slayer products
      ],
    },
    "Attack on Titan": {
      subtitle: "Shingeki no Kyojin",
      products: [
        {
          id: 2,
          name: "Eren Poster",
          image:
            "https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_UF1000,1000_QL80_.jpg",
        },
        // Add more AOT products
      ],
    },
    // Add more anime sections...
  };

  let Products;
  if (selectedProductCetagory === "anime") {
    Products = anime;
  } else if (selectedProductCetagory === "car") {
    Products = car;
  } else {
    Products = "";
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 font-Arapey">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 pb-2 border-b capitalize ml-8 mr-8">
        {Products ? productcetagoryname : "No Product Found"}
      </h1>

      {Object.entries(Products).map(([animeName, { subtitle, products }]) => (
        <div key={animeName} className="mb-12">
          <div className="ml-8 mr-8 mb-6">
            <h2 className="text-xl sm:text-3xl font-bold">{animeName}</h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8 ml-8 mr-8 max-w-7xl mx-auto">
            {products.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow flex flex-col group cursor-pointer w-[150px] sm:w-[200px]"
              >
                <CardHeader className="p-0 overflow-hidden w-full h-[225px] sm:h-[300px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg group-hover:scale-115 transition-transform duration-300"
                  />
                </CardHeader>
                <CardContent className="p-2 flex-none bg-secondary/5 w-full">
                  <h3 className="text-sm sm:text-base font-semibold text-center truncate">
                    {product.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
