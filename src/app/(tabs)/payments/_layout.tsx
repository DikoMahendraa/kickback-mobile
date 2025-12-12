import { Stack } from "expo-router";
import React from "react";

export default function MoreLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 300,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        contentStyle: { backgroundColor: "#FFFFFF" }, // Ensure white background during animations
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack>
  );
}
