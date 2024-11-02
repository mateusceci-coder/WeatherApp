import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

type CurrentContainerProps = {
  location: any;
  current: any;
};

const CurrentContainer = ({ location, current }: CurrentContainerProps) => {
  return (
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
  );
};

export default CurrentContainer;
