import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
            screenOptions={
              {
              headerShown: true,
              headerTransparent: true,
              headerShadowVisible: false,
              headerTitle: '',
              headerBackVisible: true,
            }}> 
          <Stack.Screen name="(screens)/index" options={{headerTitle: ''}} />
          <Stack.Screen name="(screens)/word-of-day" options={{headerTitle: '' }} />
          <Stack.Screen name="(screens)/categories" options={{ headerTitle: ''}} />
          <Stack.Screen name="(screens)/history" options={{ headerTitle: ''}} />
          <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
