import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${
      sessionStorage.getItem("access-token") ||
      localStorage.getItem("access-token")
    }`,
  },
});

export const setApiHeaders = () => {
  api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      sessionStorage.getItem("access-token") ||
      localStorage.getItem("access-token")
    }`;
    return config;
  });
};

export const fileApi = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": `multipart/form-data`,
    Authorization: `Bearer ${
      sessionStorage.getItem("access-token") ||
      localStorage.getItem("access-token")
    }`,
  },
});

export const setFileApiHeaders = () => {
  fileApi.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      sessionStorage.getItem("access-token") ||
      localStorage.getItem("access-token")
    }`;
    return config;
  });
};
