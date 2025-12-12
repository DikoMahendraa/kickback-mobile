import React, { useState } from "react";

import SplashScreen from "@/components/ui/SplashScreen";
import { useRouter } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
  safeArea: false,
};

export default function Index() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  const handleAnimationComplete = () => {
    setShowSplash(false);
    console.log("Splash animation completed!");
  };

  if (!showSplash) {
    return router.push("/home");
  }

  return (
    <SplashScreen onAnimationComplete={handleAnimationComplete} />
  );
}
