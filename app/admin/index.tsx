import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import useUserStore from "@/stores/useUserStore";

export default function AdminIndex() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    async function checkAdmin() {
      if (user?.role !== "Admin") {
        // Si el usuario no es admin, redirigir al inicio
        router.replace("/");
      } else {
        // Navegar al panel principal del administrador
        router.replace("/admin/Home");
      }
    }
    checkAdmin();
  }, []);

  return null;
}
