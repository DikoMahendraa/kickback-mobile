import { useAuthStore } from "@/store/authStore";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function AppHeader({ title = "Kickback", subtitle, badge }: AppHeaderProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleUserPress = () => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0a0f", "#12121a", "#1a1a24"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.glowEffect} />
        <BlurView intensity={30} tint="dark" style={styles.blurOverlay}>
          <View style={styles.content}>
            <View style={styles.leftSection}>
              <View>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              </View>
            </View>
            {badge && (
              <View style={styles.badgeContainer}>
                <LinearGradient
                  colors={["rgba(0, 245, 255, 0.2)", "rgba(168, 85, 247, 0.2)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.badgeGradient}
                >
                  <Text style={styles.badgeText}>{badge}</Text>
                </LinearGradient>
              </View>
            )}
            {isAuthenticated && user && (
              <Pressable onPress={handleUserPress} style={styles.userButton}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userInitials}>{getInitials(user.name)}</Text>
                </View>
              </Pressable>
            )}
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 245, 255, 0.2)",
  },
  gradientBackground: {
    position: "relative",
  },
  glowEffect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#00f5ff",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  blurOverlay: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  userButton: {
    marginLeft: 12,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 245, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  userInitials: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00f5ff",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 245, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#b8b8c8",
    marginTop: 4,
    letterSpacing: 0.3,
  },
  badgeContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.3)",
  },
  badgeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 10,
    color: "#00f5ff",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
