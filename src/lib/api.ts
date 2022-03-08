import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "./constants";
import { User } from "./models/user";
const { API_URL } = constants;

const credentials: RequestInit = {
  mode: "cors",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
export const Api = {
  async get(uri: string): Promise<Response> {
    return fetch(`${API_URL}${uri}`, {
      ...credentials,
    });
  },
  async post(uri: string, data: any): Promise<Response> {
    return fetch(`${API_URL}${uri}`, {
      ...credentials,
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async put(uri: string, data: any): Promise<Response> {
    return fetch(`${API_URL}${uri}`, {
      ...credentials,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

export const checkSession = async (): Promise<boolean | null> => {
  try {
    const request = await Api.get("/users/session");
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
    const request = await Api.post("/users/login", data);
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
  return Api.get(`/users/profile/${userName}`);
};

export const fetchUser = async (
  userName: string
): Promise<User | null | undefined> => {
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
): [
  CallableFunction,
  boolean,
  any,
  string | undefined,
  Response | undefined,
  CallableFunction
] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<unknown | null>(null);
  const navigate = useNavigate();
  const unmounted = useRef(false);

  let response: Response | undefined = undefined;
  const call = useCallback(
    async (...args) => {
      if (!unmounted.current) {
        setLoading(true);
        setError(undefined);
        setData(null);
        try {
          response = await fetchFn(...args);

          if (!response?.ok) {
            if (response?.status === 401) {
              navigate("/sign-in");
              return;
            } else {
              let error = "Response not ok.";
              const data = await response?.text();
              if (data) {
                const json = JSON.parse(data);
                if (json.error !== undefined) {
                  error = json.error;
                }
              }

              throw Error(error);
            }
          }
          setData(await response.json());
        } catch (e: any) {
          console.error(e);
          setError(e.message);
        }
        setLoading(false);
      }
      return () => {
        unmounted.current = true;
      };
    },
    [fetchFn]
  );

  const clearStates = useCallback(() => {
    setLoading(false);
    setError(undefined);
    setData(null);
  }, []);
  return [call, loading, data, error, response, clearStates];
};

export const useAutoLoadAPI = (
  fetchFn: CallableFunction
): [
  boolean,
  any,
  string | undefined,
  Response | undefined,
  CallableFunction
] => {
  const [call, loading, data, error, response, clearStates] =
    useLoadAPI(fetchFn);
  const unmounted = useRef(false);
  const autoCall = useCallback(() => {
    if (!unmounted.current) {
      call();
    }
  }, [unmounted, call]);

  useEffect(() => {
    autoCall();
    return () => {
      unmounted.current = true;
    };
  }, [autoCall]);
  return [loading, data, error, response, clearStates];
};
