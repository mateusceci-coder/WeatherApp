import { View, Text } from "react-native";
import React from "react";

const ErrorDisplay = ({ forecastError }: { forecastError: any }) => {
  const errorMessage = forecastError?.response?.data?.error?.message;

  return (
    <View className="flex-1 items-center justify-center h-96">
      <Text className="text-white text-2xl">
        Error fetching data: {errorMessage}
      </Text>
    </View>
  );
};

export default ErrorDisplay;
