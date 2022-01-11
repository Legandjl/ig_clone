import { useNavigate } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import useMountCheck from "./useMountCheck";

const useDataLoader = (cb, dataParam) => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loadingInProcess, setLoadingInProcess] = useState(false);
  const [data, setData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [isMounted] = useMountCheck();
  const nav = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoadingInProcess(true);
      setLoadingComplete(false);

      const req = await cb(dataParam);
      if (isMounted.current) {
        setData(req);
        setLoadingComplete(true);
        setLoadingData(false);
        setLoadingInProcess(false);
      }
    };
    if (loadingData && !loadingInProcess) {
      try {
        getData();
      } catch (e) {
        nav(`/error`, { replace: true });
      }
    }
  }, [cb, data, dataParam, isMounted, loadingData, loadingInProcess, nav]);

  const reloadData = () => {
    setLoadingData(true);
  };

  return [loadingComplete, loadingData, data, reloadData];
};

export default useDataLoader;
