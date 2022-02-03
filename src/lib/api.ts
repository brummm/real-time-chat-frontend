import constants from "./constants";
const { API_URL } = constants;

export const checkSession = async (): Promise<boolean | null> => {
  let request;
  try {
    request = await fetch(`${API_URL}/users/session`);
    return request.status === 200;
  } catch (e: any) {
    if (e.status === 401) {
      return false
    } else {
      console.log(e.status, e);
      return null;
    }
  }
};
