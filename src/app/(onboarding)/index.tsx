import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!showSplash) {
      // Navigate to home page after splash screen completes
      router.replace("/(tabs)/home");
    }
  }, [showSplash, router]);

  if (!showSplash) {
    return null; // Return null while navigating
  }

  return (
    <SplashScreen onAnimationComplete={handleAnimationComplete} />
  );
}
