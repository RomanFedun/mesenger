import { User } from "../../interfaces/user";

export interface CurrentUser extends User {
  token: string;
}
