import { useEffect, useRef } from "react";

const useMountCheck = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return [isMounted];
};

export default useMountCheck;
