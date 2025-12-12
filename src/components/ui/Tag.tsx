import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#e8f5e9",
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 11.2, // 0.7rem
    color: "#2e7d32",
  },
});
