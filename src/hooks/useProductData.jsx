import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useProductData() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `https://beauty-luxe-server.vercel.app/products`
      );

      return res.data;
    },
  });

  return { data, isLoading, isError, refetch };
}

export default useProductData;
