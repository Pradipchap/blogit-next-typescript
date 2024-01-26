import { ErrorStatus } from "./../utils/constants";
import { useEffect, useState } from "react";
interface useFetchBlogsInterface {
  api: string;
  dependencies: [unknown];
}

export default function useFetchBlog({
  api,
  dependencies,
}: useFetchBlogsInterface) {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const isNetworkConnected =
    typeof window !== "undefined" && window.navigator.onLine;

  useEffect(() => {
    if (!isNetworkConnected) {
      setError(ErrorStatus.network_status);
    }
  }, [isNetworkConnected]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(ErrorStatus.unknown_error);
      }
    }
    getData();
  }, [...dependencies]);

  return { data, error };
}
