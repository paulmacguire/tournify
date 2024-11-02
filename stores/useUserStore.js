// useUserStore.js
import create from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useUserStore = create((set) => ({
  accessToken: "",
  user: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (userData) => set({ user: userData }),

  fetchAccessToken: async () => {
    const token = await AsyncStorage.getItem("access_token");
    set({ accessToken: token || "" });
    return token;
  },

  fetchUserData: async () => {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) return null;

    try {
      // const response = await axios.get(
      //   `${process.env.EXPO_PUBLIC_API_URL}/auth/get-user-by-token`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   },
      // );
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      set({ user: response.data, accessToken: token });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos del usuario", error);
      return null;
    }
  },
}));

export default useUserStore;
