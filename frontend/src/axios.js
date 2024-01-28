import axios from "axios";

const instance = axios.create({
  // The API (Cloud Function) URL
  // baseURL: "http://127.0.0.1:5001/challenge-809dc/us-central1/api",
  baseURL: "https://amazon-clone-one-red.vercel.app/",
});

export default instance;
