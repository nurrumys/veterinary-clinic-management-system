import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  console.log("TOKEN FROM STORAGE:", token);


  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }


  console.log(
    "REQUEST URL:",
    config.url
  );


  console.log(
    "AUTH HEADER:",
    config.headers.Authorization
  );


  return config;

});


export default api;