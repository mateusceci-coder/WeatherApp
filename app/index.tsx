import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { debounce, set } from "lodash";
import { useForecast } from "@/hooks/useForecast";
import TextInputLocation from "@/components/TextInputLocation";
import SearchLocationsList from "@/components/SearchLocationsList";
import CurrentContainer from "@/components/CurrentContainer";
import CarouselDays from "@/components/CarouselDays";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LinearGradient } from "expo-linear-gradient";
import ForecastDisplay from "@/components/ForecastDisplay";

export default function Index() {
  const [search, setSearch] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [city, setCity] = useState("brasilia");
  const [errorContainer, setErrorContainer] = useState(false);
  const { data: locations } = useSearch({ city: search });
  const {
    data: forecast,
    isLoading: forecastLoading,
    error: forecastError,
  } = useForecast({
    place: city,
  });

  const { current, location } = forecast || {};
  const forecastData = forecast?.forecast?.forecastday || [];

  useEffect(() => {
    if (forecastError) {
      setErrorContainer(true);
    }
  }, [forecastError]);

  const handleLocation = (loc: any) => {
    setErrorContainer(false);
    setShowLocations(false);
    setSearch("");
    setCity(loc.name);
  };

  const textDebounce = useCallback(
    debounce((loc) => {
      if (loc.length > 2) {
        setSearch(loc);
      }
    }, 800),
    []
  );

  const handleSubmit = (e: string) => {
    setErrorContainer(false);
    setCity(e);
  };

  return (
    <LinearGradient colors={["#06b6d4", "#3b82f6"]} className="flex-1">
      <ScrollView className="flex-1 relative pt-16 ">
        <StatusBar style="light" />
        <SafeAreaView className="flex-1">
          <View className=" mx-4 relative z-100 rounded-full">
            <TextInputLocation
              setShowLocations={setShowLocations}
              textDebounce={textDebounce}
              setSearch={setSearch}
              search={search}
              handleSubmit={handleSubmit}
            />
            <SearchLocationsList
              handleLocation={handleLocation}
              locations={locations}
              showLocations={showLocations}
            />
          </View>
          <ForecastDisplay
            errorContainer={errorContainer}
            forecastLoading={forecastLoading}
            location={location}
            current={current}
            forecastData={forecastData}
          />
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}
