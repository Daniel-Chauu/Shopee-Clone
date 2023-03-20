import { User } from "./user.type";
import { SuccessResponse } from "./utils.type";

type AuthResponse = SuccessResponse<{
  access_token: string;
  expires: string;
  user: User;
}>;

export type { AuthResponse };
