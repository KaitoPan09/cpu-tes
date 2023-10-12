import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { useAppContext } from "../context/AppContext";

const useData = (endpoint) => {
  const { request } = useFetch();
  const [rows, setRows] = useState([]);
  const { showLoader, hideLoader } = useAppContext();
  useEffect(() => {
    (async () => {
      showLoader();
      const data = await request(endpoint);
      setRows(data ? data : []);
      hideLoader();
    })();
  }, [endpoint]);

  return [rows, setRows];
};

export default useData;
