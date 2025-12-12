import React from "react";
import { StyleSheet, Text } from "react-native";

interface LabelProps {
  children: React.ReactNode;
}

export function Label({ children }: LabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    textTransform: "uppercase",
    color: "#8a8a9a",
    marginBottom: 8,
    fontWeight: "600",
    letterSpacing: 1.2,
  },
});
