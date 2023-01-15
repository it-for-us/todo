import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "https://dart-todo-api.onrender.com",
// });

const axiosInterceptors = axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInterceptors;
