import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTBjNWY3N2JlMmQxYjJiOWVkOTRiZiIsImVtYWlsIjoiYTNAeWFob28uY29tIiwiaWF0IjoxNjk1NTk5MjI2LCJleHAiOjE2OTU3MDcyMjZ9.e5CI-nPF8-KTdkKgzyoRtGauQW0JPQmNe4svcUT4ilY';
    return config;
  },
  (error) => {
    console.log(error);
    throw error;
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default apiClient;
