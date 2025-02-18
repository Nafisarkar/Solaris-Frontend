import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Particles } from "@/components/magicui/particles";

const ProductPage = () => {
  const { productcetagoryname } = useParams();
  const [selectedProductCetagory, setSelectedProductCetagory] = useState(null);
  // Print route name if it's anime category
  console.log("Current route category:", productcetagoryname);

  useEffect(() => {
    setSelectedProductCetagory(productcetagoryname);
  }, [productcetagoryname]);

  const anime = {
    "Chainsaw Man": {
      subtitle: "Tensei Shitara Slime Datta Ken",
      products: [
        {
          id: 1,
          name: "Chainsaw Man ",
          image:
            "https://i.pinimg.com/736x/ce/61/ce/ce61ce85a1307fdf5189cf1ded43912f.jpg",
        },
        {
          id: 2,
          name: "Makima will kill you",
          image:
            "https://i.pinimg.com/736x/d7/b1/22/d7b1223eef2179b41e9ab84fad1bf3c1.jpg",
        },
        {
          id: 3,
          name: "Makima The Devil",
          image:
            "https://i.pinimg.com/736x/68/cf/4d/68cf4dd4ba9687020f3b8ca5ea73e79a.jpg",
        },
        {
          id: 4,
          name: "Kon",
          image:
            "https://i.pinimg.com/736x/40/bf/b4/40bfb4b847419eff1fd5b4967c9ffc42.jpg",
        },
        // Add more Demon Slayer products
      ],
    },
    "Demon Slayer": {
      subtitle: "Kimetsu no Yaiba",
      products: [
        {
          id: 1,
          name: "Gyomei Himejima",
          image:
            "https://i.pinimg.com/736x/4e/7c/7f/4e7c7f0e3fdfbca9a6d77e6bbc953197.jpg",
        },
        {
          id: 2,
          name: "Mitsuri Kanroji",
          image:
            "https://i.pinimg.com/736x/90/ba/62/90ba62da977103576ffb524f18559b6c.jpg",
        },
        {
          id: 3,
          name: "Muichiro Tokito",
          image:
            "https://i.pinimg.com/736x/88/db/67/88db67cbfa8e9bb4d271a4626c26f467.jpg",
        },
        {
          id: 4,
          name: "Shinobu Kocho",
          image:
            "https://i.pinimg.com/736x/11/de/3c/11de3cb60bce1729fd21b6bf6a4f2bd8.jpg",
        },
        // Add more Demon Slayer products
      ],
    },
    "Attack on Titan": {
      subtitle: "Shingeki no Kyojin",
      products: [
        {
          id: 1,
          name: "Shingeki no Kyojin Original",
          image:
            "https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_UF1000,1000_QL80_.jpg",
        },
        {
          id: 2,
          name: "Levi Arkaman",
          image:
            "https://i.pinimg.com/736x/d7/f7/93/d7f7937263b7a40c1d1a56def6eff704.jpg",
        },
        // Add more AOT products
      ],
    },
    // Add more anime sections...
  };
  const car = {
    "F1 Grand Prix": {
      subtitle: "The best race in the world",
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
    Supra: {
      subtitle: "the dream",
      products: [
        {
          id: 1,
          name: "Supra Pink ",
          image:
            "https://i.pinimg.com/736x/5d/ff/5b/5dff5be42b6322f0b5cbceacd83da493.jpg",
        },
        {
          id: 2,
          name: "Supra Dark",
          image:
            "https://i.pinimg.com/736x/88/74/ff/8874ff238db477e2a6baabb0a4b8b4cc.jpg",
        },
        {
          id: 3,
          name: "Supra Red ",
          image:
            "https://i.pinimg.com/736x/81/d5/d7/81d5d7663a989f308be7280c1ae42534.jpg",
        },
        {
          id: 4,
          name: "Supra Drift ",
          image:
            "https://i.pinimg.com/736x/6b/c3/f8/6bc3f88027d2acc090bba30348999e4a.jpg",
        },
        // Add more AOT products
      ],
    },
    // Add more anime sections...
  };
  const movie = {
    Nosferatu: {
      subtitle: "Dracula is my uncle",
      products: [
        {
          id: 1,
          name: "Nosferatu pray",
          image:
            "https://i.pinimg.com/736x/85/00/ec/8500ec5b55a6c71824e938ac37de12fc.jpg",
        },
        {
          id: 2,
          name: "Shine me with your light",
          image:
            "https://i.pinimg.com/736x/34/61/ff/3461ff60b9d273012c9138b35b0ce5f8.jpg",
        },
        // Add more Demon Slayer products
      ],
    },
    "A Nightmare on Elm Street": {
      subtitle: "Watch your back!",
      products: [
        {
          id: 1,
          name: "Freddy Krueger",
          image:
            "https://i.pinimg.com/736x/96/25/a1/9625a117d69d4a900ab9d438034a3209.jpg",
        },
        {
          id: 2,
          name: "Nightmare on Elm Street",
          image:
            "https://i.pinimg.com/736x/9d/bf/c4/9dbfc403a7452b78c4d8aa9c0901331d.jpg",
        },
        // Add more Demon Slayer products
      ],
    },
    Terrifire: {
      subtitle: "Art wants to know your location ?",
      products: [
        {
          id: 1,
          name: "Happy Art",
          image:
            "https://i.pinimg.com/736x/29/e3/2e/29e32e424c515c1ca48b9824e6578e84.jpg",
        },
        {
          id: 2,
          name: "Let it rain",
          image:
            "https://i.pinimg.com/736x/12/8e/26/128e26e7200dce843e8d6da1a4a49614.jpg",
        },
        // Add more AOT products
      ],
    },
    "Fast and Furious": {
      subtitle: "Family matters ",
      products: [
        {
          id: 1,
          name: "Fast and Furious",
          image:
            "https://i.pinimg.com/736x/00/b4/69/00b469fc87bb4e85202f0631a14c9065.jpg",
        },
        {
          id: 2,
          name: "Iets Burn",
          image:
            "https://i.pinimg.com/736x/aa/7c/18/aa7c183407f79e425d6ac951aaeb6835.jpg",
        },
        {
          id: 3,
          name: "I only Drift",
          image:
            "https://i.pinimg.com/736x/fd/e1/5f/fde15fc7cd78e33578cd6b1c517304e7.jpg",
        },
        // Add more AOT products
      ],
    },

    // Add more anime sections...
  };
  const asthetic = {
    Haven: {
      subtitle: "When Haven Calls You",
      products: [
        {
          id: 1,
          name: "Haven calls you",
          image:
            "https://i.pinimg.com/736x/ed/47/b4/ed47b4df4923a1dc0bf03d91442bbc28.jpg",
        },
        {
          id: 2,
          name: "Burn me to haven",
          image:
            "https://i.pinimg.com/736x/7e/64/41/7e6441d345c820c2e0f07a87524e0eba.jpg",
        },
        {
          id: 3,
          name: "Act of the spade",
          image:
            "https://i.pinimg.com/736x/bd/e9/5e/bde95efa57026e34a3487bf941d475dc.jpg",
        },
        {
          id: 4,
          name: "Act of the spade",
          image:
            "https://i.pinimg.com/736x/47/c7/09/47c709e372e6097a44257eeb2c4aff76.jpg",
        },
        // Add more Demon Slayer products
      ],
    },

    Tint: {
      subtitle: "I am colorless",
      products: [
        {
          id: 1,
          name: "Pull me up",
          image:
            "https://i.pinimg.com/736x/bf/4c/65/bf4c65084bc189ebd1b121c7bd173bbf.jpg",
        },
        {
          id: 2,
          name: "Demon",
          image:
            "https://i.pinimg.com/736x/9f/31/03/9f3103673481c9900e8e9a29ac6f240f.jpg",
        },
        {
          id: 3,
          name: "Hide",
          image:
            "https://i.pinimg.com/736x/d6/0c/a5/d60ca5ca87de9c442ff88654ac41c4bb.jpg",
        },
        {
          id: 4,
          name: "Smoke",
          image:
            "https://i.pinimg.com/736x/99/33/9d/99339dc67dea31e977bf577825a2c6cd.jpg",
        },
        // Add more Demon Slayer products
      ],
    },
    Inverted: {
      subtitle: "Love the Inverted life",
      products: [
        {
          id: 1,
          name: "Inverted",
          image:
            "https://i.pinimg.com/736x/78/f4/ee/78f4eecc1ae734eb639280e44edc2811.jpg",
        },
        {
          id: 2,
          name: "Panic",
          image:
            "https://i.pinimg.com/736x/0c/22/63/0c2263f98c5979aa0bd6aea9adf68fdc.jpg",
        },
        {
          id: 3,
          name: "Purple Eye",
          image:
            "https://i.pinimg.com/736x/9d/da/84/9dda84da1e6fdf987355df4bdadf3838.jpg",
        },
        {
          id: 4,
          name: "Purple Eye",
          image:
            "https://i.pinimg.com/736x/0a/bb/ea/0abbea25945aff626021cabdb85a15c2.jpg",
        },
        // Add more Demon Slayer products
      ],
    },
    Uphoria: {
      subtitle: "Uphoria life",
      products: [
        {
          id: 1,
          name: "Sidney sweeny",
          image:
            "https://i.pinimg.com/736x/e7/d3/b0/e7d3b0d7e6f1bde1f6fa76a1dd8cb1b8.jpg",
        },
        {
          id: 2,
          name: "Chroma 1",
          image:
            "https://i.pinimg.com/736x/ea/30/42/ea3042c4b01077fee44c04f79f307a68.jpg",
        },
        {
          id: 3,
          name: "Chroma 2",
          image:
            "https://i.pinimg.com/736x/29/f9/b7/29f9b7143ba22de963526fd3e3252153.jpg",
        },
        {
          id: 4,
          name: "Chroma 3",
          image:
            "https://i.pinimg.com/736x/46/d6/fb/46d6fbfe108bf848ab3924ee72d59b2b.jpg",
        },

        // Add more Demon Slayer products
      ],
    },

    // Add more anime sections...
  };
  let Products;
  if (selectedProductCetagory === "anime") {
    Products = anime;
  } else if (selectedProductCetagory === "car") {
    Products = car;
  } else if (selectedProductCetagory === "movie") {
    Products = movie;
  } else if (selectedProductCetagory === "asthetic") {
    Products = asthetic;
  } else {
    Products = "";
  }

  return (
    <div className="min-h-screen relative">
      {/* Particles wrapper with fixed positioning */}
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

      {/* Content container with relative positioning and z-index */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 font-Arapey">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 pb-2 border-b capitalize mx-8">
            {Products ? productcetagoryname : "No Product Found"}
          </h1>

          {Object.entries(Products).map(
            ([itemName, { subtitle, products }]) => (
              <div key={itemName} className="mb-4 mx-8">
                <h2 className="text-xl sm:text-3xl font-bold">{itemName}</h2>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">
                  {subtitle}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="hover:shadow-lg flex flex-col cursor-pointer transition-all duration-300 hover:scale-105 transform-gpu"
                    >
                      <CardHeader className="p-0 aspect-[3/4] flex-grow ">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="p-1 min-h-[2rem] flex items-center justify-center shadow-md backdrop-blur-lg bg-black/50">
                        <h3 className="text-xs font-semibold truncate font-Poppins ">
                          {product.name}
                        </h3>
                      </CardContent>
                    </Card>
                  ))}
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
