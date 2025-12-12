import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onPress?: () => void;
  href?: string;
  style?: ViewStyle;
}

export function Button({ children, variant = "primary", onPress, href, style }: ButtonProps) {
  const router = useRouter();
  const buttonStyle = variant === "primary" ? styles.primary : styles.secondary;
  const textStyle = variant === "primary" ? styles.primaryText : styles.secondaryText;

  const handlePress = () => {
    if (href) {
      router.push(href as any);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={handlePress}
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#1e88e5",
  },
  secondary: {
    backgroundColor: "#eceff1",
  },
  buttonText: {
    fontSize: 13.6, // 0.85rem
    fontWeight: "500",
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#37474f",
  },
});
