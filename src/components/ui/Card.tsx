import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fafbfc",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e4ea",
    marginBottom: 8,
  },
});
