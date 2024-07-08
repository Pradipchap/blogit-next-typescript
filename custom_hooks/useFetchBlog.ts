import { ErrorStatus } from "./../utils/constants";
import { useEffect, useState } from "react";
interface useFetchBlogsInterface {
  api: string;
  dependencies: any[];
  method?: "GET" | "POST";
  body?: BodyInit | null | undefined;
  abort?: boolean;
}

export default function useFetchBlog({
  api,
  dependencies,
  method = "GET",
  body,
  abort = false,
}: useFetchBlogsInterface) {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        if (abort) {
          throw "";
        }
        setLoading(true);
        const response = await fetch(
          api,
          method === "POST" ? { method, body: body || "{}" } : {}
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(ErrorStatus.unknown_error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [...dependencies]);

  return { data, error, loading };
}
