import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FullScreenLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  withTabBarSpacing?: boolean;
}

export const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({
  children,
  backgroundColor = "#ffffff",
  withTabBarSpacing = true,
}) => {
  const insets = useSafeAreaInsets();

  // Calculate tab bar height (floating button height + padding + safe area)
  const tabBarHeight = withTabBarSpacing
    ? 60 + Math.max(insets.bottom, Platform.OS === "ios" ? 20 : 16)
    : 0;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.content, { paddingBottom: tabBarHeight }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
