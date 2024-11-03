import { View, Text } from "react-native";
import React from "react";
import CarouselDays from "./CarouselDays";
import CurrentContainer from "./CurrentContainer";

type MainContentForecastProps = {
  location: any;
  current: any;
  forecastData: any;
};

const MainContentForecast = ({
  location,
  current,
  forecastData,
}: MainContentForecastProps) => {
  return (
    <>
      <CurrentContainer location={location} current={current} />
      <CarouselDays forecastData={forecastData} location={location} />
    </>
  );
};

export default MainContentForecast;
