import { getDay, getHour } from "@/lib/utils";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, Image, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";

type RouteParams = {
  params: {
    item: {
      date: string;
      day: {
        condition: {
          icon: string;
          text: string;
        };
        maxtemp_c: number;
        mintemp_c: number;
        avghumidity: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
      hour: {
        time: string;
        condition: {
          icon: string;
          text: string;
        };
        temp_c: number;
      }[];
    };
  };
};

const Forecast = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const { item } = route.params;

  return (
    <LinearGradient colors={["#06b6d4", "#3b82f6"]} className="flex-1">
      <ScrollView className="flex-1 px-4 mb-12">
        <View className="items-center">
          <Text className="text-4xl font-bold">{getDay(item?.date)}</Text>
          <Text className="text-xl font-bold">{item?.date}</Text>
          <Image
            source={{ uri: `https:${item?.day?.condition?.icon}` }}
            className="w-32 h-32"
          />
          <Text className="text-2xl font-semibold">
            {item?.day?.condition?.text}
          </Text>
        </View>
        <View className="flex-row justify-between my-4">
          <View>
            <Text className="text-xl">Max Temp: {item?.day?.maxtemp_c}°C</Text>
            <Text className="text-xl">Min Temp: {item?.day?.mintemp_c}°C</Text>
          </View>
          <View>
            <Text className="text-xl">Sunrise: {item?.astro?.sunrise}</Text>
            <Text className="text-xl">Sunset: {item?.astro?.sunset}</Text>
          </View>
        </View>
        <Text className="text-lg text-center mb-4">
          Humidity: {item?.day?.avghumidity}%
        </Text>
        {item?.hour.map((hour, index: number) => (
          <View
            className="flex-row justify-between items-center rounded-2xl p-2 mb-2 bg-[rgba(255,255,255,0.4)]"
            key={index}
          >
            <Text className="font-semibold">{getHour(hour?.time)}</Text>
            <View className="items-center">
              <Image
                source={{ uri: `https:${hour?.condition?.icon}` }}
                className="w-16 h-16"
              />
              <Text className="font-semibold">{hour?.condition?.text}</Text>
            </View>
            <Text className="text-lg font-semibold">{hour?.temp_c}°C</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default Forecast;
