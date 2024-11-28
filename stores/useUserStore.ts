import { create } from "zustand";
import { User } from "@/lib/services/common";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));

export default useUserStore;
