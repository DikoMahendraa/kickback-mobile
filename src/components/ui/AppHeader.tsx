import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function AppHeader({ title = "Kickback", subtitle, badge }: AppHeaderProps) {
  return (
    <LinearGradient
      colors={["#1e88e5", "#42a5f5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17.6, // 1.1rem
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  subtitle: {
    fontSize: 12, // 0.75rem
    color: "#ffffff",
    opacity: 0.9,
    marginTop: 2,
  },
  badgeContainer: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 10.4, // 0.65rem
    color: "#1565c0",
  },
});
