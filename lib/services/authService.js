import Cookies from "js-cookie";

// In a real application, you would use a proper JWT library
// This is a simplified version for demonstration purposes

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

export const authService = {
  // Login user and store token
  login: (userData, token) => {
    // Store token in cookie
    Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days expiry
    
    // Store user data in localStorage
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    
    return userData;
  },
  
  // Logout user
  logout: () => {
    // Remove token from cookie
    Cookies.remove(TOKEN_KEY);
    
    // Remove user data from localStorage
    localStorage.removeItem(USER_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    // Check if token exists in cookie
    return !!Cookies.get(TOKEN_KEY);
  },
  
  // Get current user data
  getCurrentUser: () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  
  // Get token
  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },
};

export default authService;