import { saveToken } from "./storage";
import instance from ".";

const openAi = async (prompt) => {
  //   console.log(prompt);

  const res = await instance.post("/api/v1/user/chat", prompt);
  const aiResponse = res.data;
  // console.log(aiResponse.id);
  return aiResponse;
};

export default openAi;
