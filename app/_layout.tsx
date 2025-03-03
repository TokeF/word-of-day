import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack
            screenOptions={
              {
              headerStyle: { backgroundColor: '#7ACDA8' }, 
              headerTintColor: '#fff',  
              headerShadowVisible: false,
            }}> 
          <Stack.Screen name="/(screens)/index" options={{ title: 'Home' }} />
          <Stack.Screen name="/(screens)/word-of-day" options={{ title: 'Word of day' }} />
          <Stack.Screen name="/(screens)/categories" options={{ title: 'Categories' }} />
          <Stack.Screen name="+not-found" />
      </Stack>
  );
}
