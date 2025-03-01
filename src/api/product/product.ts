// React TanStack Query
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

// Axios
import axiosInstance from "../../axios/interceptor";

// Interfaces Global
import { MutatePayload } from "../../interface/global/global";

// Interface Product
import {
  ProductFetchParams,
  ProductsResponse,
} from "../../interface/product/product";

// Crud
export const useApiProducts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ payload, api, method }: MutatePayload) => {
      if (method == "POST") {
        return axiosInstance.post(api, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (method === "PUT") {
        // Add _method: PUT to the payload
        const updatedPayload = {
          ...payload,
          _method: "PUT",
        };

        return axiosInstance.post(api, updatedPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (method == "PATCH") {
        return axiosInstance.patch(api, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (method == "GET") {
        return axiosInstance.get(api);
      } else if (method == "DELETE") {
        return axiosInstance.delete(api);
      } else {
        console.error("INVALID METHOD!");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["fetchProducts"]);
      console.error("Success occurred:", data);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
    },
  });

  // console.log("mutation:", mutation); // Log the mutation object to see its structure

  // Return mutate function along with loading, success, and error states
  return {
    mutateProducts: mutation.mutate,
    isLoadingProducts: mutation.isPending || false,
    isErrorProducts: mutation.isError,
    isSuccessProducts: mutation.isSuccess,
    errorProducts: mutation.isError ? mutation.error?.response?.data : null,
    dataProducts: mutation.isSuccess ? mutation.data?.data : null,
    resetProducts: mutation.reset, // Expose the reset function
  };
};

// Fetch
const fetchProducts = async ({
  limit = 12,
  page = 1,
  search = "",
  start_created_at = "",
  end_created_at = "",
}: ProductFetchParams): Promise<ProductsResponse> => {
  const response = await axiosInstance.get("product/index", {
    params: {
      limit,
      page,
      search,
      start_created_at,
      end_created_at,
    },
  });
  return response.data;
};

// Products
// Hook to fetch user
export const useFetchProducts = (params: ProductFetchParams) =>
  useQuery<ProductsResponse>({
    queryKey: ["fetchProducts", params],
    queryFn: () => fetchProducts(params),
    keepPreviousData: true,
    refetchInterval: 300000,
  });
