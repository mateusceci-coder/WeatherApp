import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCoordsForecast = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coordsForecast"],
    queryFn: async () => {
      const res = await api.get(
        `forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${latitude},${longitude}&days=3`
      );
      return res.data;
    },

    enabled: !!latitude && !!longitude,
  });

  return { data, isLoading, error };
};
