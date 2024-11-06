// app/captain/index.tsx

import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import useUserStore from "@/stores/useUserStore";

export default function CaptainIndex() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    async function checkCaptain() {
      if (user?.role !== "Capitan") {
        // Si el usuario no es capitán, redirigir al inicio
        router.replace("/");
      } else {
        // Navegar al panel principal del capitán
        router.replace("/captain/Home");
      }
    }
    checkCaptain();
  }, []);

  return null;
}
