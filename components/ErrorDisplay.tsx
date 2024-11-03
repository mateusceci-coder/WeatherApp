import { View, Text } from "react-native";
import React from "react";

const ErrorDisplay = () => {
  return (
    <View className="flex items-center justify-center">
      <Text className="text-white text-2xl">
        Error fetching data, please try again later
      </Text>
    </View>
  );
};

export default ErrorDisplay;
