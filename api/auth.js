import { saveToken } from "./storage";
import instance from ".";

const login = async (userInfo) => {
  console.log(userInfo);
  try {
    const res = await instance.post("/auth/login", userInfo);
    const token = res.data.token;
    if (token) {
      saveToken(token);
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

const register = async (userInfo) => {
  try {
    const res = await instance.post("/auth/signup", userInfo);
    if (res.data) {
      saveToken(res.data.token);
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getMyProfile = async () => {
  const { data } = await instance.get("/users/me");
  return data;
};

const updateProfile = async (userInfo) => {
  console.log(userInfo);
  const res = await instance.post("/users/me", userInfo);
  return res.data;
};

export { login, register, getMyProfile, updateProfile };
