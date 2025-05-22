import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={styles.safeArea}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f0f0f0",
            },
            headerTintColor: "#333",
            contentStyle: {
              backgroundColor: "#e5e5e5",
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Daftar Pengguna" }} />
          <Stack.Screen
            name="map"
            options={{ title: "Peta Lokasi Pengguna" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
});
