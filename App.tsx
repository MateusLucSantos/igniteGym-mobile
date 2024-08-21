import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { config } from "./config/gluestack-ui.config";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { StatusBar, View } from "react-native";
import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <GluestackUIProvider config={config}>
      {fontsLoaded ? <Routes /> : <Loading />}

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </GluestackUIProvider>
  );
}
