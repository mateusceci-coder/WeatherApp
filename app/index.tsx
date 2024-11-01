import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Index() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

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
      </SafeAreaView>
    </View>
  );
}
