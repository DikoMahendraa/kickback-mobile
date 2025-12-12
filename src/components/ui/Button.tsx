import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onPress?: () => void;
  href?: string;
  style?: ViewStyle;
}

export function Button({ children, variant = "primary", onPress, href, style }: ButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (href) {
      router.push(href as any);
    } else if (onPress) {
      onPress();
    }
  };

  if (variant === "primary") {
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.buttonContainer, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#00f5ff", "#3b82f6", "#a855f7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.primaryButton}
        >
          <View style={styles.glowOverlay} />
          <Text style={styles.primaryText}>{children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.buttonContainer, style]}
      activeOpacity={0.8}
    >
      <View style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.5)",
  },
  glowOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 245, 255, 0.1)",
    borderRadius: 12,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
  },
  primaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    textShadowColor: "rgba(0, 245, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#b8b8c8",
    letterSpacing: 0.5,
  },
});
