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
          margin: 10,
          padding: 15,
          backgroundColor: "#fff",
          borderRadius: 10,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: `https://randomuser.me/api/portraits/men/${id}.jpg`,
            }}
            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10 }}
          />
          <View>
            <Text>ID: {id}</Text>
            <Text>Name: {name}</Text>
            <Text>Username: {username}</Text>
            <Text>Email: {email}</Text>
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
          <Pressable style={{ marginTop: 10 }}>
            <Text style={{ color: "#1976D2", fontWeight: "bold" }}>
              {street}, {city}, {zipcode}
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}
