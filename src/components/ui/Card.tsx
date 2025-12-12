import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "glow";
}

export function Card({ children, style, variant = "default" }: CardProps) {
  const cardStyle = variant === "glow" ? styles.cardGlow : styles.card;

  return (
    <View style={[cardStyle, style]}>
      <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
        <View style={styles.cardContent}>{children}</View>
      </BlurView>
      {variant === "glow" && <View style={styles.glowBorder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGlow: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.3)",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  blurContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
    backgroundColor: "rgba(18, 18, 26, 0.6)",
  },
  glowBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.2)",
    pointerEvents: "none",
  },
});
