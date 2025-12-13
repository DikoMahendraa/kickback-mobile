import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="absolute inset-0 bg-white mx-auto">
      <View className="flex-1 w-full pt-16 pb-6">
        <Slot />
      </View>
    </View>
  );
}
