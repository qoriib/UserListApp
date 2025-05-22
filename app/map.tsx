import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

export default function MapScreen() {
  const { lat, lng } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);

  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);

  const [region, setRegion] = useState<Region>({
    latitude,
    longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const zoom = (scale: number) => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * scale,
      longitudeDelta: region.longitudeDelta * scale,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
      >
        <Marker coordinate={{ latitude, longitude }} title="Lokasi Pengguna" />
      </MapView>
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.button} onPress={() => zoom(0.5)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => zoom(2)}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  zoomControls: {
    position: "absolute",
    bottom: 40,
    right: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f0f0f0dd",
    borderRadius: 30,
    padding: 12,
    marginVertical: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
