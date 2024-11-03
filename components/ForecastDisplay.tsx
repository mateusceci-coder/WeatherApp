import { View, Text } from "react-native";
import React from "react";
import ErrorDisplay from "./ErrorDisplay";
import LoadingSpinner from "./LoadingSpinner";
import MainContentForecast from "./MainContentForecast";

type ForecastDisplayProps = {
  errorContainer: boolean;
  forecastLoading: boolean;
  location: any;
  current: any;
  forecastData: any;
};

const ForecastDisplay = ({
  errorContainer,
  forecastLoading,
  location,
  current,
  forecastData,
}: ForecastDisplayProps) => {
  if (errorContainer) {
    return <ErrorDisplay />;
  }

  if (forecastLoading) {
    return <LoadingSpinner />;
  }

  return (
    <MainContentForecast
      location={location}
      current={current}
      forecastData={forecastData}
    />
  );
};

export default ForecastDisplay;
