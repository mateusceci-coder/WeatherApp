import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback, useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import Carousel from "react-native-reanimated-carousel";
import { useSearch } from "@/hooks/useSearch";
import { debounce } from "lodash";
import { useForecast } from "@/hooks/useForecast";
import { format, isToday, parseISO } from "date-fns";

export default function Index() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const width = Dimensions.get("window").width;
  const [search, setSearch] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [city, setCity] = useState("brasilia");
  const { data: locations, isLoading } = useSearch({ city: search });
  const { data: forecast, isLoading: forecastLoading } = useForecast({
    place: city,
  });

  const { current, location } = forecast || {};
  const forecastData = forecast?.forecast?.forecastday || [];

  useEffect(() => {
    if (search === "") {
      setShowLocations(false);
    }
  }, [search]);

  const handleLocation = (loc: any) => {
    setShowLocations(false);
    setSearch("");
    setCity(loc.name);
  };

  console.log("showLocations", showLocations);
  console.log("locations", locations);
  console.log("search", search);

  const getDay = (dateString: string) => {
    const date = parseISO(dateString);

    if (isToday(date)) {
      return "Today";
    }

    return format(date, "EEEE");
  };

  const textDebounce = useCallback(
    debounce((loc) => {
      if (loc.length > 2) {
        setSearch(loc);
      }
    }, 800),
    []
  );
  return (
    <View className="flex-1 relative bg-blue-300 pt-16">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <View className=" mx-4 relative z-50 rounded-full">
          <View
            className="flex-row justify-end items-center rounded-full 
              bg-white opacity-40 mb-4"
          >
            <TextInput
              onChangeText={(e) => {
                setShowLocations(true);
                textDebounce(e);
              }}
              onBlur={() => setShowLocations(false)}
              placeholder="Search City"
              placeholderTextColor={"black"}
              className="pl-6 h-10 flex-1 text-base text-white rounded-full"
              keyboardType="default"
            />

            <View className="rounded-full p-1 m-1">
              <AntDesign
                name="search1"
                size={24}
                color="black"
                className="bg-white p-2 rounded-full opacity-80"
              />
            </View>
          </View>
          {locations?.length > 0 && showLocations && (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations?.map((loc, index) => {
                let showBorder = index + 1 !== locations.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleLocation(loc)}
                    className={
                      "flex-row gap-2 items-center border-0 p-3 px-4 mb-1" +
                      borderClass
                    }
                  >
                    <FontAwesome name="map-marker" size={24} color="black" />
                    <Text className="text-lg ml-2">
                      {loc.name}, {loc.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View className="flex-1 mx-4 justify-around mb-2">
          <Text className="text-white text-center text-2xl font-bold">
            {location?.name},{" "}
            <Text className="text-lg font-semibold text-gray-300">
              {location?.country}
            </Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              source={{ uri: `https:${current?.condition?.icon}` }}
              className="w-52 h-52"
            />
          </View>
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              {current?.temp_c}°C
            </Text>
            <Text className="text-center text-white text-xl ml-5">
              {current?.condition?.text}
            </Text>
          </View>
          <View className="flex-row justify-center">
            <View className="flex-row space-x-2 items-center gap-2">
              <Entypo name="drop" size={32} color="white" />
              <Text className="text-white font-semibold text-2xl">
                {current?.humidity}%
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-1 mx-auto mt-12">
          <Carousel
            width={width - 20}
            height={width / 1.5}
            data={forecastData}
            loop={false}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => console.log("current index:", index)}
            mode="parallax"
            renderItem={({ item }) => (
              <TouchableOpacity className="flex-1 rounded-2xl bg-white px-8 py-4 opacity-40 items-center">
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
      </SafeAreaView>
    </View>
  );
}
