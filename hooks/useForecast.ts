import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const useForecast = ({ place }: { place: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["forecast", place],
    queryFn: async () => {
      const res = await api.get(
        `forecast.json?key=${API_KEY}&q=${place}&days=3`
      );
      return res.data;
    },
    enabled: !!place,
  });

  return { data, isLoading, isError };
};
