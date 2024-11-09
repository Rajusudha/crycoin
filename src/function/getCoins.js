import axios from "axios";
import { DASHBOARD_API_URL } from "../ApiUrl";

export const getCoins = () => {
  const data = axios
    .get(DASHBOARD_API_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error>>>", error);
    });

  return data;
};