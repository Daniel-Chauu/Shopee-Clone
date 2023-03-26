import { HttpStatusCode } from "./../constant/httpStatusCode.enum";
import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import {
  clearLS,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
} from "./auth";
import { SuccessResponse } from "../types/utils.type";
import { AuthResponse } from "../types/auth.type";
import path from "../constant/path";

class Http {
  instance: AxiosInstance;
  private _accessToken: string;
  constructor() {
    this._accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use((config) => {
      if (this._accessToken) {
        config.headers.authorization = this._accessToken;
      }
      return config;
    });
    this.instance.interceptors.response.use(
      (res) => {
        const { url } = res.config;
        if (url == path.login || url == path.register) {
          const data = res.data as AuthResponse;
          this._accessToken = data.data.access_token;
          setAccessTokenToLS(this._accessToken);
          setProfileToLS(data.data.user);
        } else if (url === path.logout) {
          this._accessToken = "";
          clearLS();
        }
        return res;
      },
      function (error: AxiosError) {
        if (error.request.status !== HttpStatusCode.UnprocessableEntity) {
          console.log("interceptor res", error);
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
