import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View className="flex-1 relative bg-blue-300 pt-16">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <View className="h-[7%] mx-4 relative z-50">
          <View className="flex-row justify-end items-center rounded-full bg-white opacity-20">
            <TextInput
              placeholder="Search City"
              placeholderTextColor={"black"}
              className="pl-6 h-10 flex-1 text-base text-white"
            />
            <TouchableOpacity className="rounded-full p-3 m-1 opacity-30">
              <Text>Icon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
