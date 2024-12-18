import axios from "axios";
import { getToken } from "./storage";

// const BASE_URL = "https://react-native-food-delivery-be.eapi.joincoded.com/api";
//  baseURL: "http://192.168.2.224:8080",

const instance = axios.create({
  baseURL: "http://192.168.2.224:8080",
});
instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
