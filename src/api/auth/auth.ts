// React TanStack Query
import { useMutation } from "@tanstack/react-query";

// Axios
import axiosInstance from "../../axios/interceptor";

// Interfaces
import { MutatePayload } from "../../interface/global/global";

// Crud api
export const useApiAuth = () => {
  const mutation = useMutation({
    mutationFn: async ({ payload, api, method }: MutatePayload) => {
      if (method == "POST") {
        return axiosInstance.post(api, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (method == "PUT") {
        return axiosInstance.put(api, payload, {
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
        return axiosInstance.get(api, payload);
      } else if (method == "DELETE") {
        return axiosInstance.delete(api, payload);
      } else {
        console.error("INVALID METHOD!");
      }
    },
    onSuccess: (data) => {
      console.error("Success occurred:", data);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
    },
  });

  // console.log("mutation:", mutation); // Log the mutation object to see its structure

  // Return mutate function along with loading, success, and error states
  return {
    mutateAuth: mutation.mutate,
    isLoadingAuth: mutation.isPending || false,
    isErrorAuth: mutation.isError,
    isSuccessAuth: mutation.isSuccess,
    errorAuth: mutation.isError ? mutation.error?.response?.data : null,
    dataAuth: mutation.isSuccess ? mutation.data?.data : null,
    resetAuth: mutation.reset, // Expose the reset function
  };
};
