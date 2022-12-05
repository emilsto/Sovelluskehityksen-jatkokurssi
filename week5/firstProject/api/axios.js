import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

export default axios;
