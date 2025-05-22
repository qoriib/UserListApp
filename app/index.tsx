import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { User } from "../types/user";

export default function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: User }) => {
    const { id, name, username, email, address } = item;
    const { street, city, zipcode, geo } = address;

    return (
      <View
        style={{
          marginVertical: 8,
          padding: 15,
          backgroundColor: "#f0f0f0",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: `https://randomuser.me/api/portraits/men/${id}.jpg`,
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 12,
              backgroundColor: "#ccc",
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", color: "#333" }}>ID: {id}</Text>
            <Text style={{ color: "#333" }}>Name: {name}</Text>
            <Text style={{ color: "#333" }}>Username: {username}</Text>
            <Text style={{ color: "#333" }}>Email: {email}</Text>
          </View>
        </View>

        <Link
          href={{
            pathname: "/map",
            params: {
              lat: geo.lat,
              lng: geo.lng,
            },
          }}
          asChild
        >
          <Pressable style={{ marginTop: 12 }}>
            <Text style={{ color: "#546e7a", fontWeight: "bold" }}>
              📍 {street}, {city}, {zipcode}
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e5e5e5",
        }}
      >
        <ActivityIndicator size="large" color="#546e7a" />
        <Text style={{ color: "#333", marginTop: 10 }}>Loading users...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#e5e5e5" }}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}
