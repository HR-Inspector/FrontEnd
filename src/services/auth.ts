import axios from "axios";
import { ILogin } from "../types/login";
import { API_URL } from "../constants/api";

const login = (username: string, password: string): Promise<ILogin> => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response: { data: ILogin }) => {
      if (response.data.jwt) {
        localStorage.setItem("authToken", JSON.stringify(response.data.jwt));
      }

      return response.data;
    });
};

const logout = (): void => {
  localStorage.removeItem("authToken");
};

const authService = {
  login,
  logout,
};

export default authService;
