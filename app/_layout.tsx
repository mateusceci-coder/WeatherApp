import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import index from "./index";
import Forecast from "./Forecast";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen
          name="index"
          component={index}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forecast"
          component={Forecast}
          options={({ route }) => ({
            title: route.params.title || "Forecast",
            headerStyle: {
              backgroundColor: "#06b6d4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", fontSize: 32 },
            headerTitleAlign: "center",
            headerShadowVisible: false,
          })}
        />
      </Stack.Navigator>
    </QueryClientProvider>
  );
}
