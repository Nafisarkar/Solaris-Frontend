import { useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ApiDialog } from "@/components/cui/ApiDialog";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import Cookies from "universal-cookie";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router";

const API_BASE_URL = "https://solaris-backend.vercel.app";

const API_ENDPOINTS = {
  PRODUCT: `${API_BASE_URL}/api/product`,
  PRODUCT_BY_CATEGORY: `${API_BASE_URL}/api/product/category`,
  PRODUCT_VARIANT: `${API_BASE_URL}/api/product`,
  SEED_PRODUCTS: `${API_BASE_URL}/seed/product`,
};

const API_ACTIONS = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
};

const Apipage = () => {
  // Move ALL hooks to the top level - no conditionals!
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [data, setData] = useState(null);
  const [requestStatus, setRequestStatus] = useState("idle");
  const [deleteVarentId, setDeleteVarentId] = useState({
    productId: "",
    variantId: "",
  });
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

  // Check admin permissions
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const cookies = new Cookies();
        const cookie = cookies.get("cookie");

        if (!cookie || !isAdmin) {
          navigate("/loginpage");
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Authorization check failed:", error);
        navigate("/loginpage");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [isAdmin, navigate]);

  // API request handler
  const makeApiRequest = async (method, url, data = null) => {
    try {
      setRequestStatus("loading");
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response;
      switch (method) {
        case "get":
          response = await axiosInstance.get(url, config);
          break;
        case "post":
          response = await axiosInstance.post(url, data || {}, config);
          break;
        case "delete":
          response = await axiosInstance.delete(url, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setData({
        status: response.status,
        data: response.data,
      });
      setRequestStatus("success");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setData({
        status: error.response?.status || 500,
        error: {
          message: error.response?.data?.message || "Request failed",
          details: error.response?.data || error.message,
        },
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

  const handleDeleteVariantChange = (field, value) => {
    setDeleteVarentId((prev) => ({
      ...prev,
      [field]: value,
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
      makeApiRequest(API_ACTIONS.POST, API_ENDPOINTS.SEED_PRODUCTS, {
        seed: true,
      }),
    addProductVariant: () => {
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
    deleteProductVariant: () => {
      makeApiRequest(
        API_ACTIONS.DELETE,
        `${API_ENDPOINTS.PRODUCT_VARIANT}/${deleteVarentId.productId}/${deleteVarentId.variantId}`
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
      title: "Delete Product Variant",
      description: "Enter Details for to delete Variant",
      buttonText: "Delete Product Variant",
      inputPlaceholder: "Product ID (required)",
      inputValue: deleteVarentId.productId,
      onInputChange: (e) =>
        handleDeleteVariantChange("productId", e.target.value),
      additionalInputs: [
        {
          placeholder: "Variant Id",
          value: deleteVarentId.variantId,
          onChange: (e) =>
            handleDeleteVariantChange("variantId", e.target.value),
        },
      ],
      onSubmit: apiActions.deleteProductVariant,
      variant: "destructive",
    },
    {
      title: "Delete A Product Variant",
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

  // Early return for loading/unauthorized states
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Verifying admin access...</p>
      </div>
    );
  }

  // Early return for unauthorized
  if (!isAuthorized) {
    return null;
  }

  // Return main component UI when authorized
  return (
    <div className="h-fit font-Poppins">
      <div className="max-w-7xl mx-auto p-4">
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
