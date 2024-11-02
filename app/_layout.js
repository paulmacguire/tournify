// _layout.js
import React, { useEffect } from "react";
import { View, ActivityIndicator, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Link } from "expo-router";
import { AboutIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import useUserStore from "@/stores/useUserStore";

export default function Layout() {
  const router = useRouter();
  const { user, fetchUserData } = useUserStore();

  useEffect(() => {
    const initializeUser = async () => {
      const userData = await fetchUserData();
      if (!userData) {
        router.push("/");
      }
    };

    if (!user) {
      initializeUser();
    }
  }, [user]);

  // Renderiza un indicador de carga si el usuario aún no está cargado
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerTitle: "",
          headerLeft: () => <Logo />,
          headerRight: () => (
            <>
              <Link asChild href={"/about"}>
                <Pressable>
                  <AboutIcon />
                </Pressable>
              </Link>
            </>
          ),
        }}
      />
    </View>
  );
}
