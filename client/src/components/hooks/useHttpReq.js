import axios from "axios";
import { useState, useCallback, useEffect } from "react";

export const useHttp = (reqData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const req = () => {
    setLoading(true);
    const request = axios(reqData)
      .then((res) => res.data)
      .catch((e) => setError(e.message));
    setLoading(false);
    return request;
  };

  const clearError = () => {
    setError(null);
  };
  return { loading, req, error, clearError };
};
