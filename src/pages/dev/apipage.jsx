import axios from "axios";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ApiDialog } from "../../components/cui/ApiDialog";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

const API_BASE_URL = "http://localhost:3000";

const API_ENDPOINTS = {
  // get all products
  PRODUCT: `${API_BASE_URL}/api/product`,
  // get product by category
  PRODUCT_BY_CATEGORY: `${API_BASE_URL}/api/product/category`,

  PRODUCT_VARIANT: `${API_BASE_URL}/api/product/variant`,

  // seet 2 products
  SEED_PRODUCTS: `${API_BASE_URL}/seed/product`,
};

const API_ACTIONS = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
};

const Apipage = () => {
  // Core state
  const [data, setData] = useState(null);
  const [requestStatus, setRequestStatus] = useState("idle");

  // Form states
  const [inputs, setInputs] = useState({
    category: "",
    productId: "",
    confirmation: "",
    product: {
      title: "",
      subtitle: "",
      category: "",
    },
    variant: {
      packtitle: "",
      description: "",
      packfrontimage: "",
      allimagesinpack: [],
      quantity: 0,
      price: 0,
      forProduct: "",
    },
  });

  // API request handler
  const makeApiRequest = async (method, url, data = null) => {
    try {
      setRequestStatus("loading");
      const response = await axios[method](url, data);
      setData({ status: response.status, data: response.data });
      setRequestStatus("success");
    } catch (error) {
      setData({
        status: error.response?.status || 500,
        error: error.response?.data || { message: "Request failed" },
      });
      setRequestStatus("error");
    } finally {
      setTimeout(() => setRequestStatus("idle"), 1000);
    }
  };

  // Input handlers
  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      product: { ...prev.product, [field]: value },
    }));
  };

  // API actions
  const apiActions = {
    getAllProducts: () =>
      makeApiRequest(API_ACTIONS.GET, API_ENDPOINTS.PRODUCT),
    getProductsByCategory: () =>
      makeApiRequest(
        API_ACTIONS.GET,
        `${API_ENDPOINTS.PRODUCT_BY_CATEGORY}/${inputs.category}`
      ),
    getProductById: () =>
      makeApiRequest(
        API_ACTIONS.GET,
        `${API_ENDPOINTS.PRODUCT}/${inputs.productId}`
      ),
    createProduct: () =>
      makeApiRequest(API_ACTIONS.POST, API_ENDPOINTS.PRODUCT, inputs.product),
    deleteProduct: () =>
      makeApiRequest(
        API_ACTIONS.DELETE,
        `${API_ENDPOINTS.PRODUCT}/${inputs.productId}`
      ),
    getProductVariant: () =>
      makeApiRequest(
        API_ACTIONS.GET,
        `${API_ENDPOINTS.PRODUCT_VARIANT}/${inputs.productId}`
      ),
    seedProducts: () =>
      makeApiRequest(API_ACTIONS.POST, `${API_ENDPOINTS.SEED_PRODUCTS}`),
    addProductVariant: () => {
      // Create variant object matching the backend requirements
      const variantData = {
        packfrontimage:
          inputs.variant.packfrontimage || "https://placeholder.com/800x600",
        packtitle: inputs.variant.packtitle || "Default Pack",
        description: inputs.variant.description || "",
        allimagesinpack: inputs.variant.allimagesinpack || [],
        quantity: Number(inputs.variant.quantity) || 12,
        price: Number(inputs.variant.price) || 0,
      };

      makeApiRequest(
        API_ACTIONS.POST,
        `${API_ENDPOINTS.PRODUCT}/${inputs.variant.forProduct}`,
        variantData
      );
    },
  };

  // Dialog configurations
  const dialogConfigs = [
    {
      title: "Search by Category",
      description: "Enter a category name",
      buttonText: "Search Category",
      inputPlaceholder: "Category name",
      inputValue: inputs.category,
      onInputChange: (e) => handleInputChange("category", e.target.value),
      onSubmit: apiActions.getProductsByCategory,
    },
    {
      title: "Create Product",
      description: "Enter product details",
      buttonText: "Create Product",
      inputPlaceholder: "Product Title",
      inputValue: inputs.product.title,
      onInputChange: (e) => handleProductChange("title", e.target.value),
      additionalInputs: [
        {
          placeholder: "Subtitle",
          value: inputs.product.subtitle,
          onChange: (e) => handleProductChange("subtitle", e.target.value),
        },
        {
          placeholder: "Category",
          value: inputs.product.category,
          onChange: (e) => handleProductChange("category", e.target.value),
        },
      ],
      onSubmit: apiActions.createProduct,
    },
    {
      title: "Add Product Variant",
      description: "Enter variant details for the product",
      buttonText: "Add Variant",
      inputPlaceholder: "Product ID (required)",
      inputValue: inputs.variant.forProduct,
      onInputChange: (e) =>
        handleInputChange("variant", {
          ...inputs.variant,
          forProduct: e.target.value,
        }),
      additionalInputs: [
        {
          placeholder: "Pack Title (required)",
          value: inputs.variant.packtitle,
          onChange: (e) =>
            handleInputChange("variant", {
              ...inputs.variant,
              packtitle: e.target.value,
            }),
        },
        {
          placeholder: "Front Image URL (required)",
          value: inputs.variant.packfrontimage,
          onChange: (e) =>
            handleInputChange("variant", {
              ...inputs.variant,
              packfrontimage: e.target.value,
            }),
        },
        {
          placeholder: "Description",
          value: inputs.variant.description,
          onChange: (e) =>
            handleInputChange("variant", {
              ...inputs.variant,
              description: e.target.value,
            }),
        },
        {
          placeholder: "All Images URLs (comma separated)",
          value: inputs.variant.allimagesinpack.join(","),
          onChange: (e) =>
            handleInputChange("variant", {
              ...inputs.variant,
              allimagesinpack: e.target.value
                .split(",")
                .map((url) => url.trim()),
            }),
        },
        {
          placeholder: "Quantity (min: 1)",
          value: inputs.variant.quantity,
          onChange: (e) =>
            handleInputChange("variant", {
              ...inputs.variant,
              quantity: Math.max(1, parseInt(e.target.value) || 12),
            }),
          type: "number",
          min: "1",
        },
        {
          placeholder: "Price (required)",
          value: inputs.variant.price,
          onChange: (e) =>
            handleInputChange("variant", {
              ...inputs.variant,
              price: parseFloat(e.target.value) || 0,
            }),
          type: "number",
          min: "0",
        },
      ],
      onSubmit: apiActions.addProductVariant,
    },
  ];

  return (
    <div className="h-fit font-Poppins">
      {" "}
      {/* Add full height background */}
      <div className="max-w-7xl mx-auto p-4">
        {" "}
        {/* Add padding */}
        {/* <h1 className="text-xl font-semibold mb-6 text-center text-white">
          API Testing Dashboard
        </h1> */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Response Data Card */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-white">Response Data</h2>
              <span className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">
                {requestStatus.charAt(0).toUpperCase() + requestStatus.slice(1)}
              </span>
            </div>

            <div className="h-[400px] border ">
              {requestStatus === "loading" ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-4 w-4" />
                </div>
              ) : data ? (
                <div className="h-full overflow-auto p-4">
                  <JsonView
                    src={data}
                    displayObjectSize={false}
                    displayDataTypes={false}
                    enableClipboard={true}
                    collapsed={2}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-sm">
                  No data available
                </div>
              )}
            </div>
          </Card>

          {/* API Endpoints Card */}
          <Card className="p-4 ">
            <h2 className="text-lg mb-4 text-white">API Endpoints</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={apiActions.getAllProducts}
                  disabled={requestStatus === "loading"}
                >
                  {requestStatus === "loading" && (
                    <Loader2 className="mr-2 h-4 w-4" />
                  )}
                  Get All Products
                </Button>

                <Button
                  variant="outline"
                  onClick={apiActions.seedProducts}
                  disabled={requestStatus === "loading"}
                >
                  Seed Product Data
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <ApiDialog
                  title="Search by Category"
                  description="Enter a category name"
                  buttonText="Search Category"
                  inputPlaceholder="Category name"
                  inputValue={inputs.category}
                  onInputChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  onSubmit={apiActions.getProductsByCategory}
                  isLoading={requestStatus === "loading"}
                />

                <ApiDialog
                  title="Get Variants"
                  description="Enter product ID"
                  buttonText="Get Variants"
                  inputPlaceholder="Product ID"
                  inputValue={inputs.productId}
                  onInputChange={(e) =>
                    handleInputChange("productId", e.target.value)
                  }
                  onSubmit={apiActions.getProductVariant}
                  isLoading={requestStatus === "loading"}
                />
              </div>

              {dialogConfigs.map((config, index) => (
                <ApiDialog
                  key={index}
                  {...config}
                  isLoading={requestStatus === "loading"}
                />
              ))}

              <div className="grid grid-cols-2 gap-2">
                <ApiDialog
                  title="Delete Product"
                  description="This action cannot be undone"
                  buttonText="Delete Product"
                  inputPlaceholder="Product ID"
                  inputValue={inputs.productId}
                  onInputChange={(e) =>
                    handleInputChange("productId", e.target.value)
                  }
                  onSubmit={apiActions.deleteProduct}
                  isLoading={requestStatus === "loading"}
                  variant="destructive"
                />

                <ApiDialog
                  title="Delete All"
                  description="Type 'confirm' to delete all products"
                  buttonText="Delete All"
                  inputPlaceholder="Type 'confirm'"
                  inputValue={inputs.confirmation}
                  onInputChange={(e) =>
                    handleInputChange("confirmation", e.target.value)
                  }
                  onSubmit={() => {
                    if (inputs.confirmation === "confirm") {
                      apiActions.deleteProduct();
                    } else {
                      handleInputChange("confirmation", "");
                    }
                  }}
                  isLoading={requestStatus === "loading"}
                  variant="destructive"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Apipage;
