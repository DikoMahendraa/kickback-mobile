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
    fontSize: 11.2, // 0.7rem
    textTransform: "uppercase",
    color: "#78909c",
    marginBottom: 4,
  },
});
