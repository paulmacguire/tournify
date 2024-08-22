import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const HomeIcon = (props: any) => (
  <FontAwesome5 name="home" size={24} color="white" {...props} />
);

export const AboutIcon = (props: any) => (
  <FontAwesome6 name="circle-info" size={24} color="white" />
);
