import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Button } from "react-native";

type SearchLocationsListProps = {
  locations: any[];
  showLocations: boolean;
  handleLocation: (loc: any) => void;
};

const SearchLocationsList = ({
  locations,
  showLocations,
  handleLocation,
}: SearchLocationsListProps) => {
  return (
    <>
      {locations?.length > 0 && showLocations && (
        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl z-50">
          {locations?.map((loc: any, index: number) => {
            let showBorder = index + 1 !== locations.length;
            let borderClass = showBorder ? "border-b-2 border-b-gray-400" : "";
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleLocation(loc)}
                className={
                  "flex-row gap-2 items-center border-0 p-3 px-4 mb-1" +
                  borderClass
                }
              >
                <FontAwesome name="map-marker" size={24} color="black" />
                <Text className="text-lg ml-2">
                  {loc.name}, {loc.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

export default SearchLocationsList;
