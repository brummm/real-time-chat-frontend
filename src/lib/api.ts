import axios from "axios";
import { User } from "./models/user";

export const checkSession = async (): Promise<boolean | null> => {
  try {
    const request = await axios.get("/users/session");
    return request.status === 200;
  } catch (e: any) {
    if (e.status === 401) {
      return false;
    } else {
      console.log(e.status, e);
      return null;
    }
  }
};

export const signIn = async (
  userData: any
): Promise<{ user: User } | boolean | null> => {
  try {
    const { data } = await axios.post("/users/login", userData);
    return data;
  } catch (e: any) {
    if (e.response.status === 401) {
      return false;
    }
    console.log(e.status, e);
    return null;
  }
};
