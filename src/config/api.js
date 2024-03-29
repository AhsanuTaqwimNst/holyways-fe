import axios from "axios";

export const API = axios.create({
  baseURL:"https://holyways-be-production-83fc.up.railway.app//api/v1/"

});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};