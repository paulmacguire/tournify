import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Button, TouchableHighlight } from "react-native";
// const icon = require("./assets/icon.png");

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <StatusBar style="dark" />
      <Image
        source={{
          uri: "https://celebreak.com/wp-content/uploads/2022/05/como-organizar-un-torneo-de-futbol-paso-a-paso.jpg",
        }}
        className="w-80 h-80"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold mb-4 text-black p-4">
        ¡Abre App.tsx para empezar a trabajar en tu app!
      </Text>
      <TouchableHighlight
        underlayColor="#FF0000"
        onPress={() => alert("Abrir")}
        className="bg-red-500 p-4 rounded-lg shadow-lg"
      >
        <Text className="text-white">Abrir</Text>
      </TouchableHighlight>
    </View>
  );
}
