import axios, { AxiosRequestConfig } from "axios";
import { ENVIRONMENT } from "../environment";

// TODO: move it to interceptor
const axiosConfig: AxiosRequestConfig = {
  headers: {
    "X-Auth-Token": ENVIRONMENT.FOOTBALL_DATA_API_TOKEN,
  },
};

const getMatches = async (dateRangeParamString?: string) => {
  try {
    const response = await axios.get(
      `${ENVIRONMENT.FOOTBALL_API_DATA_URL}matches${dateRangeParamString}`,
      axiosConfig
    );

    return response?.data;
  } catch (error) {
    console.log(`⚡️ [API][getMatches]: `, error);
  }
};

export default { getMatches };
