import axios from "axios";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ApiDialog } from "../../components/cui/ApiDialog";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

const API_BASE_URL = "http://localhost:3000/api/";

const Apipage = () => {
  const [data, setData] = useState(null);
  const [requestStatus, setRequestStatus] = useState("idle");
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");

  const makeApiRequest = async (apiCall) => {
    try {
      setRequestStatus("loading");
      const response = await apiCall();
      const formattedData = {
        status: response.status,
        data: response.data,
      };
      setData(formattedData);
      setRequestStatus("success");
    } catch (error) {
      console.error("API Error:", error);
      setData({
        status: error.response?.status || 500,
        error: error.response?.data || { message: "Request failed" },
      });
      setRequestStatus("error");
    } finally {
      setTimeout(() => setRequestStatus("idle"), 1000);
    }
  };

  const apiActions = {
    getAllProducts: () =>
      makeApiRequest(() => axios.get(`${API_BASE_URL}product`)),
    getProductsByCategory: () =>
      makeApiRequest(() =>
        axios.get(`${API_BASE_URL}product/cetagory/${category}`)
      ),
    getProductById: () =>
      makeApiRequest(() => axios.get(`${API_BASE_URL}product/${productId}`)),
    deleteProductById: () =>
      makeApiRequest(() => axios.delete(`${API_BASE_URL}product/${productId}`)),
    seedProducts: () =>
      makeApiRequest(() => axios.post(`http://localhost:3000/seed/product`)),
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium bg-${
        status === "idle"
          ? "gray"
          : status === "loading"
          ? "blue"
          : status === "success"
          ? "green"
          : "red"
      }-500 ${status === "loading" ? "animate-pulse" : ""}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-Poppins">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            API Testing Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Test and monitor your API endpoints
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Response Data Card */}
          <Card className="p-4 sm:p-6 bg-gray-800/50 backdrop-blur border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
              <h2 className="text-lg sm:text-xl  text-white">Response Data</h2>
              <StatusBadge status={requestStatus} />
            </div>

            <div className="relative h-[300px] sm:h-[400px] rounded-lg bg-black/30">
              {requestStatus === "loading" ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-blue-500" />
                </div>
              ) : data ? (
                <div className="absolute inset-0 overflow-auto custom-scrollbar p-2 sm:p-4">
                  <JsonView
                    src={data}
                    theme="dark"
                    displayObjectSize={false}
                    displayDataTypes={false}
                    enableClipboard={true}
                    collapsed={2}
                    style={{
                      background: "transparent",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm sm:text-base">
                  No data available
                </div>
              )}
            </div>
          </Card>

          {/* Available Actions Card */}
          <Card className="p-4 sm:p-6 bg-gray-800/50 backdrop-blur border-gray-700">
            <h2 className="text-lg sm:text-xl  text-white mb-4 sm:mb-6">
              Available Actions
            </h2>
            <div className="space-y-3 sm:space-y-4 font-Poppins font-semibold">
              <Button
                className="w-full h-10 text-sm font-medium"
                onClick={apiActions.getAllProducts}
                disabled={requestStatus === "loading"}
              >
                {requestStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Get All Products
              </Button>

              <ApiDialog
                title="Search Products by Category"
                description="Enter a category name to search for products"
                buttonText="Search by Category"
                inputPlaceholder="Enter category name..."
                inputValue={category}
                onInputChange={(e) => setCategory(e.target.value)}
                onSubmit={apiActions.getProductsByCategory}
                isLoading={requestStatus === "loading"}
                loadingText="Searching..."
              />

              <ApiDialog
                title="Search Product by ID"
                description="Enter a product ID to search for a specific product"
                buttonText="Search by Product ID"
                inputPlaceholder="Enter product ID..."
                inputValue={productId}
                onInputChange={(e) => setProductId(e.target.value)}
                onSubmit={apiActions.getProductById}
                isLoading={requestStatus === "loading"}
                loadingText="Searching..."
              />

              <Button
                className="w-full h-10 text-sm font-medium"
                onClick={apiActions.seedProducts}
                disabled={requestStatus === "loading"}
              >
                Seed Product Data
              </Button>

              <ApiDialog
                title="Delete Product by ID"
                description="Enter a product ID to delete. This action cannot be undone."
                buttonText="Delete Product by ID"
                inputPlaceholder="Enter product ID..."
                inputValue={productId}
                onInputChange={(e) => setProductId(e.target.value)}
                onSubmit={apiActions.deleteProductById}
                isLoading={requestStatus === "loading"}
                loadingText="Deleting product..."
                submitButtonColor="red"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Apipage;
