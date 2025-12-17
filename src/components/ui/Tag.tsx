import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface TagProps {
  children: React.ReactNode;
  variant?: "success" | "pending" | "default";
}

export function Tag({ children, variant = "success" }: TagProps) {
  const getGradientColors = (variant: string) => {
    switch (variant) {
      case "success":
        return ["rgba(0, 255, 127, 0.2)", "rgba(0, 200, 100, 0.2)"];
      case "pending":
        return ["rgba(0, 245, 255, 0.2)", "rgba(59, 130, 246, 0.2)"];
      default:
        return ["rgba(0, 255, 127, 0.2)", "rgba(0, 200, 100, 0.2)"];
    }
  };

  const getTextColor = (variant: string) => {
    switch (variant) {
      case "success":
        return "#00ff7f";
      case "pending":
        return "#00f5ff";
      default:
        return "#00ff7f";
    }
  };

  const getBorderColor = (variant: string) => {
    switch (variant) {
      case "success":
        return "rgba(0, 255, 127, 0.4)";
      case "pending":
        return "rgba(0, 245, 255, 0.4)";
      default:
        return "rgba(0, 255, 127, 0.4)";
    }
  };

  return (
    <LinearGradient
      // @ts-ignore
      colors={getGradientColors(variant)}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.tag,
        {
          borderColor: getBorderColor(variant),
          alignSelf: "flex-start", // 🔥 ini kunci
        },
      ]}
    >
      <Text style={[styles.tagText, { color: getTextColor(variant) }]}>
        {children}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(0, 255, 127, 0.15)",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
    textShadowColor: "rgba(0, 255, 127, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
