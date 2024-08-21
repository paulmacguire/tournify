import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold mb-4">
        ¡Abre App.js para empezar a trabajar en tu app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
