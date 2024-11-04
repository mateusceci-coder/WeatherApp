import { AntDesign } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

type TextInputLocationProps = {
  setShowLocations: Dispatch<SetStateAction<boolean>>;
  textDebounce: (loc: string) => void;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  handleSubmit: (e: string) => void;
};

const TextInputLocation = ({
  setShowLocations,
  textDebounce,
  setSearch,
  search,
  handleSubmit,
}: TextInputLocationProps) => {
  return (
    <View className="flex-row justify-end items-center rounded-full bg-[rgba(255,255,255,0.4)] mb-4">
      <TextInput
        onChangeText={(e) => {
          if (e.trim() === "") {
            setShowLocations(false);
            setSearch("");
          } else {
            setShowLocations(true);
            textDebounce(e);
          }
        }}
        placeholder="Search City"
        placeholderTextColor={"black"}
        className="pl-6 h-10 flex-1 text-base rounded-full"
        onSubmitEditing={() => handleSubmit(search)}
        keyboardType="default"
      />

      <TouchableOpacity
        className="rounded-full p-1 m-1"
        onPress={() => handleSubmit(search)}
      >
        <AntDesign
          name="search1"
          size={24}
          color="black"
          className="bg-gray-300 p-2 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TextInputLocation;
