import { saveToken } from "./storage";
import instance from ".";

const login = async (userInfo) => {
  console.log(userInfo);
  const res = await instance.post("/auth/login", userInfo);
  const token = res.data.token;
  if (token) {
    saveToken(token);
  }

  return res.data;
};
// const register = async (userInfo) => {
//   const res = await instance.post("/register", userInfo);
//   if (res.data.token) {
//     saveToken(res.data.token);
//   }
//   return res.data;
// };

const register = async (userInfo) => {
  //   console.log("UI", userInfo);
  //   const formData = new FormData();
  //   for (let key in userInfo) {
  //     if (key != "image") {
  //       formData.append(key, userInfo[key]);
  //     }
  //   }

  //   if (userInfo.image) {
  //     formData.append("image", {
  //       name: "image.jpg",
  //       type: "image/jpeg",
  //       uri: userInfo.image,
  //     });
  //   }
  console.log(userInfo);
  const res = await instance.post("/auth/signup", userInfo);
  if (res.data) {
    saveToken(res.data.token);
  }

  return res.data;
};

const getMyProfile = async () => {
  const { data } = await instance.get("/auth/profile");
  return data;
};

export { login, register, getMyProfile };
