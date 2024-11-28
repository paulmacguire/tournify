import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import useUserStore from "@/stores/useUserStore";
import { getUserDataByToken } from "@/lib/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const userData = await getUserDataByToken(userId);
          if (userData) {
            setUser(userData);
          } else {
            setUser(null);
            // Espera un poco antes de redirigir para asegurar el montaje completo
            setTimeout(() => {
              router.replace("/auth");
            }, 100);
          }
        } else {
          setUser(null);
          setTimeout(() => {
            router.replace("/auth");
          }, 100);
        }
      } catch (error) {
        setUser(null);
        setTimeout(() => {
          router.replace("/auth");
        }, 100);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1A1A1D",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        gestureEnabled: true,
        headerTitle: "",
      }}
    />
  );
}
