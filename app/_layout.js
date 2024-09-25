import { View, Pressable, Text } from "react-native";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import { AboutIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
export default function Layout() {
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
