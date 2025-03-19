import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store/store";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content" // Use "light-content" for light text on dark background
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: "",
          headerBackVisible: true,
        }}
      >
        <Stack.Screen name="(screens)/index" options={{ headerTitle: "" }} />
        <Stack.Screen
          name="(screens)/word-of-day"
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="(screens)/categories"
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="(screens)/challenge"
          options={{ headerTitle: "" }}
        />
        <Stack.Screen name="(screens)/history" options={{ headerTitle: "" }} />
        <Stack.Screen
          name="(screens)/favourites"
          options={{ headerTitle: "" }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
