import axios from "axios";
import Cookies from "js-cookie";

// import { generateFingerprint } from "../util/vendor/fingerprint/fingerprint"; // Adjust the path as per your project structure
import { extractedCookiesToken, deleteAllCookies } from "../util/dev/cookies";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authentication token and fingerprint if available
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      console.log(
        " import.meta.env.VITE_BACKEND_URL: ",
        import.meta.env.VITE_BACKEND_URL
      );
      // Cookies
      if (extractedCookiesToken) {
        config.headers.Authorization = `Bearer ${extractedCookiesToken}`;
      }

      // Generate device fingerprint dynamically
      // const fingerprint = await generateFingerprint();

      // Add device fingerprint to headers
      // config.headers["X-Device-Fingerprint"] = fingerprint;

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response normally
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      if (error.response.status === 401) {
        deleteAllCookies();
        setTimeout(() => {
          window.location.href = import.meta.env.VITE_FRONTEND_URL;
        }, 2000); // Delay of 2 seconds (2000 milliseconds)
      }

      if (error.response.status === 429) {
        // console.log(error.response.data?.message);
      }

      if (error.response.status === 403) {
        // Handle forbidden error
        // console.log("Forbidden. You do not have the necessary permissions.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
