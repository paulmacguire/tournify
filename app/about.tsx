import { ScrollView, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { HomeIcon } from "@/components/Icons";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);
export default function About() {
  return (
    <ScrollView className="pt-24 bg-black">
      <Link asChild href={"/"}>
        <StyledPressable className={`active:opacity-20`}>
          <HomeIcon />
        </StyledPressable>
      </Link>
      <Text className="text-white font-bold text-2xl">Sobre el proyecto</Text>
      <Text className="text-white/90 text-lg mb-4">
        Esta es una aplicación de torneos de futbol, donde puedes ver los
        torneos más recientes y próximos a jugarse. Aquí puedes ver los torneos,
        los equipos que participan, los partidos y las posiciones actuales.
      </Text>
    </ScrollView>
  );
}
