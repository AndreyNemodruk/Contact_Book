import { useState, useEffect } from 'react';

const useHandleError = () => {
  const [errorFromApi, setErrorFromApi] = useState(null);
  const [error, setError] = useState(null);
  const clearError = () => {
    setTimeout(() => setError(null), 2500);
  };

  const errorHandler = (err) => {
    const reduceErrors = err.reduce((result, item) => {
      const newItem = { [item.param]: item.msg };
      return { ...result, ...newItem };
    }, {});
    return reduceErrors;
  };
  useEffect(() => {
    if (errorFromApi?.errors) {
      const errors = errorHandler(errorFromApi.errors);
      setError(errors);
      clearError();
      return;
    }
    setError(errorFromApi);
    clearError();
  }, [errorFromApi]);

  return { setErrorFromApi, error };
};

export default useHandleError;
