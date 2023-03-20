import path from "../constant/path";
import { AuthResponse } from "../types/auth.type";
import http from "../utils/http";

const authApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>(path.register, body);
  },
  login: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>(path.login, body);
  },
  logout: () => http.post(path.logout),
};
export { authApi };
