import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChipProps {
  children: React.ReactNode;
}

export function Chip({ children }: ChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#fff3e0",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 11.2, // 0.7rem
    color: "#ef6c00",
  },
});
