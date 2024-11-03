import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const useSearch = ({ city }: { city: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", city],
    queryFn: async () => {
      const res = await api.get(`search.json?key=${API_KEY}&q=${city}`);
      return res.data;
    },
    enabled: !!city,
  });

  return { data, isLoading, isError };
};
