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
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import api from "@/lib/api";

export default function Index() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  const width = Dimensions.get("window").width;
  const progress = useSharedValue<number>(0);
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  const data = [...new Array(6).keys()];

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`current.json?key=${API_KEY}&q=London`);
      console.log(res.data);
    };
    fetchData();
  }, []);

  const handleLocation = (loc) => {
    console.log(loc);
  };

  return (
    <View className="flex-1 relative bg-blue-300 pt-16">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <View className="h-[15%] mx-4 relative z-50 rounded-full">
          <View
            className={`flex-row justify-end items-center rounded-full ${
              showSearchBar ? "bg-white opacity-20" : "transparent"
            }`}
            style={{ borderRadius: 100 }}
          >
            {showSearchBar && (
              <TextInput
                placeholder="Search City"
                placeholderTextColor={"black"}
                className="pl-6 h-10 flex-1 text-base text-white rounded-full"
              />
            )}
            <TouchableOpacity
              className="rounded-full p-1 m-1"
              onPress={() => setShowSearchBar(!showSearchBar)}
            >
              <AntDesign
                name="search1"
                size={24}
                color="black"
                className="bg-white p-2 rounded-full opacity-80"
              />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearchBar && (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((location, index) => {
                let showBorder = index + 1 !== locations.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    key={index}
                    className={
                      "flex-row gap-2 items-center border-0 p-3 px-4 mb-1" +
                      borderClass
                    }
                  >
                    <FontAwesome name="map-marker" size={24} color="black" />
                    <Text className="text-lg ml-2">
                      London, United Kingdown
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View className="flex-1 mx-4 justify-around mb-2">
          <Text className="text-white text-center text-2xl font-bold">
            London,
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdown
            </Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/sun.png")}
              className="w-52 h-52"
            />
          </View>
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              23°C
            </Text>
            <Text className="text-center text-white text-xl ml-5">
              Partly Cloudy
            </Text>
          </View>
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center gap-2">
              <Entypo name="drop" size={24} color="white" />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row space-x-2 items-center gap-2">
              <Feather name="wind" size={24} color="white" />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row space-x-2 items-center gap-2">
              <Feather name="sun" size={24} color="white" />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
          </View>
        </View>
        <View className="flex-1 mx-auto">
          <Carousel
            width={width - 20}
            height={width / 2}
            data={data}
            loop={false}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => console.log("current index:", index)}
            mode="parallax"
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 30 }}>
                  {index}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
