import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
          <Stack.Screen name="+not-found" />
      </Stack>
  );
}
