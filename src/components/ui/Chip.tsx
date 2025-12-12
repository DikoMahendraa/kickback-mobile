import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChipProps {
  children: React.ReactNode;
}

export function Chip({ children }: ChipProps) {
  return (
    <View style={styles.chipContainer}>
      <LinearGradient
        colors={["rgba(255, 165, 0, 0.2)", "rgba(255, 140, 0, 0.2)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.chip}
      >
        <Text style={styles.chipText}>{children}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 165, 0, 0.3)",
  },
  chip: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 165, 0, 0.15)",
  },
  chipText: {
    fontSize: 11,
    color: "#ffa500",
    fontWeight: "600",
    letterSpacing: 0.3,
    textShadowColor: "rgba(255, 165, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
