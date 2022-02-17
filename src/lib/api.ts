import { useEffect, useState } from "react";
import constants from "./constants";
import { User } from "./models/user";
const { API_URL } = constants;

export const makeGet = async (uri: string): Promise<Response> => {
  return fetch(`${API_URL}${uri}`, {
    mode: "cors",
    credentials: "include",
  });
};

export const makePost = (uri: string, data: any): Promise<Response> => {
  return fetch(`${API_URL}${uri}`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const checkSession = async (): Promise<boolean | null> => {
  try {
    const request = await makeGet("/users/session");
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
  data: any
): Promise<{ user: User } | boolean | null> => {
  try {
    const request = await makePost("/users/login", data);
    if (request.status !== 200) {
      throw Error();
    }
    return await request.json();
  } catch (e: any) {
    if (e.status === 401) {
      return false;
    } else {
      console.log(e.status, e);
      return null;
    }
  }
};

export const fetchUserAPI = (userName: string): Promise<Response> => {
  return makeGet(`/users/profile/${userName}`);
};

export const fetchUser = async (userName: string): Promise<User | null | undefined> => {
  try {
    const response = await fetchUserAPI(userName);
    if (!response.ok) {
      return null;
    }
    const { user } = await response.json();
    return user as User;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
};

export const useLoadAPI = (
  fetchFn: CallableFunction
): [CallableFunction, boolean, any, boolean] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<unknown | null>(null);

  const call = async () => {
    setLoading(true);
    setError(false);
    setData(null);
    try {
      const response = await fetchFn();
      if (!response.ok) {
        throw Error();
      }
      setData(await response.json());
    } catch (e: any) {
      setError(true);
    }
    setLoading(false);
  };
  return [call, loading, data, error];
};

export const useAutoLoadAPI = (
  fetchFn: CallableFunction
): [boolean, any, boolean] => {
  const [call, loading, data, error] = useLoadAPI(fetchFn);
  useEffect(() => {
    call();
  }, []);
  return [loading, data, error];
};
