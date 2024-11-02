import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { getDay } from "@/lib/utils";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";

interface ForecastItem {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    avghumidity: number;
    maxtemp_c: number;
    mintemp_c: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
}

interface CarouselDaysProps {
  forecastData: ForecastItem[];
  location: {
    name: string;
  };
}

const CarouselDays = ({ forecastData, location }: CarouselDaysProps) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  return (
    <View className="flex-1 mx-auto mt-4">
      <Carousel
        width={width - 20}
        height={width / 1.5}
        data={forecastData}
        loop={false}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => console.log("current index:", index)}
        mode="parallax"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 rounded-2xl bg-white px-8 py-4 opacity-40 items-center"
            onPress={() =>
              navigation.navigate("Forecast", {
                item,
                title: location?.name,
              })
            }
          >
            <View className="items-center">
              <Text className="text-4xl font-semibold">
                {getDay(item?.date)}
              </Text>
              <Image
                source={{ uri: `https:${item?.day?.condition?.icon}` }}
                className="w-32 h-32"
              />
              <Text className="text-2xl font-semibold">
                {item?.day?.condition?.text}
              </Text>
            </View>
            <View className="flex-row justify-between w-full my-2">
              <View>
                <Entypo name="drop" size={32} color="white" />
                <Text className="font-bold text-lg">
                  {item?.day?.avghumidity}%
                </Text>
              </View>
              <View className="gap-2">
                <View className="flex-row gap-2 items-center">
                  <Feather name="sun" size={24} color="black" />
                  <Text className="font-bold text-lg">
                    {item?.astro.sunrise}
                  </Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Feather name="sunset" size={24} color="black" />
                  <Text className="font-bold text-lg">
                    {item?.astro.sunset}
                  </Text>
                </View>
              </View>
              <View className="gap-2">
                <Text className="font-bold flex gap-2">
                  <AntDesign name="arrowup" size={24} color="black" />
                  <Text className="text-lg">{item?.day?.maxtemp_c}°C</Text>
                </Text>
                <Text className="font-bold flex gap-2">
                  <AntDesign name="arrowdown" size={24} color="black" />
                  <Text className="text-lg">{item?.day?.mintemp_c}°C</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CarouselDays;
