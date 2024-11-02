import { SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { debounce } from "lodash";
import { useForecast } from "@/hooks/useForecast";
import TextInputLocation from "@/components/TextInputLocation";
import SearchLocationsList from "@/components/SearchLocationsList";
import CurrentContainer from "@/components/CurrentContainer";
import CarouselDays from "@/components/CarouselDays";

export default function Index() {
  const [search, setSearch] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [city, setCity] = useState("brasilia");
  const { data: locations, isLoading } = useSearch({ city: search });
  const { data: forecast, isLoading: forecastLoading } = useForecast({
    place: city,
  });

  const { current, location } = forecast || {};
  const forecastData = forecast?.forecast?.forecastday || [];

  const handleLocation = (loc: any) => {
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
  return (
    <View className="flex-1 relative bg-blue-300 pt-16">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <View className=" mx-4 relative z-100 rounded-full">
          <TextInputLocation
            setShowLocations={setShowLocations}
            textDebounce={textDebounce}
          />
          <SearchLocationsList
            handleLocation={handleLocation}
            locations={locations}
            showLocations={showLocations}
          />
        </View>
        <CurrentContainer location={location} current={current} />
        <CarouselDays forecastData={forecastData} location={location} />
      </SafeAreaView>
    </View>
  );
}
