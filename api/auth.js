import { saveToken } from "./storage";
import instance from ".";

// Temporarily set the token for all requests
// instance.defaults.headers.common["Authorization"] =
//   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoaUBoZWxsby5jb20iLCJpYXQiOjE3MzQwMTUyNTEsImV4cCI6MTczNDYyMDA1MX0.FlX4wxQ3Rb6AX1jxZOiM4GT0nZJuocyStWC10PbYpck";

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
  const res = await instance.post("/auth/signup", userInfo);
  if (res.data) {
    saveToken(res.data.token);
  }

  return res.data;
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
