import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "4be1b4cff3f04effb25c715a65316ace",
  },
});
