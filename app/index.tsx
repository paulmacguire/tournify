import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Main from "../components/Main";
import useUserStore from "@/stores/useUserStore";

export default function Index() {
  const router = useRouter();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Este efecto se ejecuta solo una vez cuando el componente se monta
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      if (isMounted && user) {
        // Espera a que el Root Layout esté montado y el user cargado
        if (user.role === "Admin") {
          router.replace("/admin");
        } else if (user.role === "Capitan") {
          router.replace("/captain");
        }
        setLoading(false);
      }
    }

    fetchUser();
  }, [isMounted, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#ffffff" />
      </View>
    );
  }

  // Renderizar la pantalla principal para usuarios generales si no es Admin o Capitan
  return <Main />;
}
