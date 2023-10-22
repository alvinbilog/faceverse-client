import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
});

// Helper function to get a cookie by name
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const jwt = getCookie('faceverse-jwt'); // Use the helper function here
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    throw error;
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  // Changed from axios.interceptors to apiClient.interceptors
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log(error);
    return Promise.reject(error);
  }
);

export default apiClient;
