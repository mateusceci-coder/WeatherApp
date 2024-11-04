import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingSpinner = () => {
  return (
    <View className="flex-1 justify-center items-center h-96">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingSpinner;
