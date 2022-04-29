import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface AutoLoad {
  loading: boolean;
  data: any;
  error: string | undefined;
  response: AxiosResponse | undefined;
  clearStates: CallableFunction;
}
interface Load extends AutoLoad {
  call: CallableFunction;
}
export const useLoadAPI = (fetchFn: CallableFunction): Load => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<unknown | null>(null);
  const navigate = useNavigate();
  const unmounted = useRef(false);

  let response = useRef<AxiosResponse | undefined>(undefined);
  const call = useCallback(
    async (...args) => {
      if (!unmounted.current) {
        setLoading(true);
        setError(undefined);
        setData(null);
        try {
          response.current = await fetchFn(...args);

          const { data } = response.current!;
          setData(data);
        } catch (e: any) {
          console.error(e);
          if (e.response.status === 401) {
            navigate("/sign-in");
            return;
          }
          setError(e.message);
        }
        setLoading(false);
      }
      return () => {
        unmounted.current = true;
      };
    },
    [fetchFn, navigate]
  );

  const clearStates = useCallback(() => {
    setLoading(false);
    setError(undefined);
    setData(null);
  }, []);
  return {
    call,
    loading,
    data,
    error,
    response: response.current,
    clearStates,
  };
};

export const useAutoLoadAPI = (fetchFn: CallableFunction): AutoLoad => {
  const { call, loading, data, error, response, clearStates } =
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
  return { loading, data, error, response, clearStates };
};
