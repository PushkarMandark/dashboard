import axios from "axios";

import { authService } from "./authService";

/**
 * A reusable function for making API calls using axios
 * @param {string} url - The API endpoint
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} data - Request body for POST/PUT requests
 * @param {object} customHeaders - Additional headers to include
 * @returns {Promise} - Promise with the response data or error
 */
export const apiCall = async (url, method = "GET", data = null, customHeaders = {}) => {
  try {
    // Get auth token if available
    const token = authService.getToken();

    // Prepare headers
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    // Add auth token if available
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Make the request with axios
    const response = await axios({
      method,
      url,
      data: data && ["POST", "PUT", "PATCH"].includes(method) ? data : null,
      headers,
      // Add additional axios config options as needed
      timeout: 10000, // 10 seconds timeout
      validateStatus: (status) => status < 400, // Resolve only if status is less than 400
    });

    return { data: response.data, success: true };
  } catch (error) {
    console.error("API call failed:", error);

    // Handle axios specific errors
    const errorMessage = error.response
      ? `Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`
      : error.message || "Network error occurred";

    return { error: errorMessage, success: false };
  }
};

/**
 * Shorthand methods for common HTTP verbs
 */
export const apiService = {
  get: (url, customHeaders) => apiCall(url, "GET", null, customHeaders),
  post: (url, data, customHeaders) => apiCall(url, "POST", data, customHeaders),
  put: (url, data, customHeaders) => apiCall(url, "PUT", data, customHeaders),
  patch: (url, data, customHeaders) => apiCall(url, "PATCH", data, customHeaders),
  delete: (url, customHeaders) => apiCall(url, "DELETE", null, customHeaders),
};
