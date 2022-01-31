import axios from "axios";

export const api = axios.create({
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${sessionStorage.getItem("access-token") ||
    localStorage.getItem("access-token")}`
  }
})

export const setApiHeaders = () => {
  api.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("access-token") ||
    localStorage.getItem("access-token")}`
    return config;
  })
}