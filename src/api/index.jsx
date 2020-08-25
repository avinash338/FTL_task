import axios from "axios";
export const getData = async (options) => {
  try {
    return await axios(options);
  } catch (error) {
    console.log(error);
  }
};
