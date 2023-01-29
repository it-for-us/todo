import axios from "axios";
import { API_URL } from "../constants/app-constants";

export const axiosSetup = () => {
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  // axios.defaults.timeout = 10000;
};

export const authAxios = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });

  instance.interceptors.request.use(
    (config) => {
      const storage = JSON.parse(
        sessionStorage.getItem("persist:dart-todo-app-auth")
      );
      console.log(storage.token.split('"')[1]);
      const token = storage.token ? storage.token.split('"')[1] : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem("persist:dart-todo-app-auth");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
