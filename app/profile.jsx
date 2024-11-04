import { ScrollView, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { HomeIcon } from "@/components/Icons";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);
export default function Profile() {
  return (
    <ScrollView className="pt-24 bg-black">
      <Link asChild href={"/"}>
        <StyledPressable className={`active:opacity-20`}>
          <HomeIcon />
        </StyledPressable>
      </Link>
      <Text className="text-white font-bold text-2xl">Perfil de Usuario</Text>
      <Text className="text-white/90 text-lg mb-4">
        Aquí puedes ver tu información
      </Text>
        <Text className="text-white/90 text-lg mb-4">
            Nombre: Juan Pérez
        </Text>
        <Text className="text-white/90 text-lg mb-4">
            Correo: juanperez@gmail.com
        </Text>

    </ScrollView>
  );
}
