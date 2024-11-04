import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const HomeIcon = (props: any) => (
  <FontAwesome5 name="home" size={24} color="white" {...props} />
);

export const AboutIcon = (props: any) => (
  <FontAwesome6 name="circle-info" size={24} color="white" />
);

export const UserIcon = (props: any) => (
  <FontAwesome name="user" size={24} color="white" />
);
