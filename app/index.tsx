import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { debounce, set } from "lodash";
import { useForecast } from "@/hooks/useForecast";
import TextInputLocation from "@/components/TextInputLocation";
import SearchLocationsList from "@/components/SearchLocationsList";
import { LinearGradient } from "expo-linear-gradient";
import ForecastDisplay from "@/components/ForecastDisplay";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useCoordsForecast } from "@/hooks/useCoordsForecast";

export default function Index() {
  const [search, setSearch] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const DEFAULT_CITY = "brasilia";

  const [errorContainer, setErrorContainer] = useState(false);
  const { data: locations } = useSearch({ city: search });

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { data: coordsData, isLoading: coordsLoading } = useCoordsForecast({
    latitude,
    longitude,
  });

  const [city, setCity] = useState("");
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
    const checkLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();

      if (status === "granted") {
        try {
          const location = await getCurrentPositionAsync();
          if (location) {
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
          }
        } catch (error) {
          console.error("Error getting location:", error);
          setCity(DEFAULT_CITY);
        }
      } else {
        setCity(DEFAULT_CITY);
      }
    };

    checkLocation();

    if (coordsData) {
      setCity(coordsData.location.name);
    }
  }, [coordsData]);

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
    if (e.trim() === "") return;

    setShowLocations(false);
    setErrorContainer(false);
    setCity(e);
  };

  return (
    <LinearGradient colors={["#06b6d4", "#3b82f6"]} className="flex-1">
      <ScrollView className="flex-1 relative pt-16 ">
        <StatusBar style="light" />
        <SafeAreaView className="flex-1">
          <View className=" mx-4 relative z-50 rounded-full flex-1">
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
            coordsLoading={coordsLoading}
            forecastError={forecastError}
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
