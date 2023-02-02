import axios from "axios";

export const BASE_URL = "https://social-app-production-418c.up.railway.app/";

export default axios.create({
  baseURL: BASE_URL,
});
