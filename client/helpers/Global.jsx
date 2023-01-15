import axios from "axios";

export const Global =
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  }) + "/api/";
