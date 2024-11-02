import { AntDesign } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { View, Text, TextInput } from "react-native";

type TextInputLocationProps = {
  setShowLocations: Dispatch<SetStateAction<boolean>>;
  textDebounce: (loc: string) => void;
};

const TextInputLocation = ({
  setShowLocations,
  textDebounce,
}: TextInputLocationProps) => {
  return (
    <View
      className="flex-row justify-end items-center rounded-full 
              bg-white opacity-40 mb-4"
    >
      <TextInput
        onChangeText={(e) => {
          setShowLocations(true);
          textDebounce(e);
        }}
        onBlur={() => setShowLocations(false)}
        placeholder="Search City"
        placeholderTextColor={"black"}
        className="pl-6 h-10 flex-1 text-base text-white rounded-full"
        keyboardType="default"
      />

      <View className="rounded-full p-1 m-1">
        <AntDesign
          name="search1"
          size={24}
          color="black"
          className="bg-white p-2 rounded-full opacity-80"
        />
      </View>
    </View>
  );
};

export default TextInputLocation;
