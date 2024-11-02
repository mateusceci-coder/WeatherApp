import { getDay, getHour } from "@/lib/utils";
import { useRoute } from "@react-navigation/native";
import { Text, View, Image, ScrollView } from "react-native";

const Forecast = () => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <ScrollView className="flex-1 py-8 px-4 bg-white">
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
          <Text className="text-lg">Sunrise: {item?.astro?.sunrise}</Text>
          <Text className="text-lg">Sunset: {item?.astro?.sunset}</Text>
        </View>
      </View>
      <Text className="text-lg text-center mb-4">
        Humidity: {item?.day?.avghumidity}%
      </Text>
      {item?.hour.map((hour, index) => (
        <View
          className="flex-row justify-between items-center p-2 border border-gray-300 rounded-2xl mb-2"
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
  );
};

export default Forecast;
