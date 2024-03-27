import { useCallback } from "react";

const useHttp = () => {
  const request = useCallback(async (url, method = "GET", headers, body = null) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = response.json();
      return data;
    } catch (e) {
      throw e;
    }
  }, []);

  return { request };
};

export default useHttp;
