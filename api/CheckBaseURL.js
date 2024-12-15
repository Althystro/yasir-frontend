import axios from "axios";

const checkBaseURL = async (baseURL) => {
  try {
    const response = await axios.get(baseURL);
    if (response.status === 200) {
      console.log("Base URL is up and running");
      return true;
    }
  } catch (error) {
    console.error("Error checking base URL:", error.message);
    return false;
  }
};

export default checkBaseURL;
