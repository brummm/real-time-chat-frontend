import _axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const axios = _axios.create({
  baseURL,
  withCredentials: true,
});

export default axios;
