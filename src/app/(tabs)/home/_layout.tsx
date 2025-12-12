import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right", // You can use 'slide_from_right', 'slide_from_bottom', 'fade', 'flip', 'simple_push', 'none'
        animationDuration: 300, // Animation duration in ms
        gestureEnabled: true, // Enable swipe back gesture
        gestureDirection: "horizontal", // Gesture direction
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
