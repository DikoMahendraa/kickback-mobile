import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable, Text } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";

const getTabIcon = (routeName: string, isFocused: boolean) => {
  const iconMap: { [key: string]: string } = {
    home: "🏠",
    referrals: "🔁",
    payments: "💰",
  };

  return iconMap[routeName] || "🏠";
};

export function TabBottomNavigation({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const pathname = usePathname();
  const { buildHref } = useLinkBuilder();

  const hiddenPaths = ["/forgot-password", "/create-referral", "/handover", "/invoice", "/provider-accepts"];

  const shouldHideNavigation = hiddenPaths.some((path) =>
    pathname.includes(path)
  );

  if (shouldHideNavigation) {
    return null;
  }

  return (
    <View style={styles.container}>
      <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
        {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Text style={styles.icon}>{getTabIcon(route.name, isFocused)}</Text>
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? "#00f5ff" : "#8a8a9a",
                  textShadowColor: isFocused ? "rgba(0, 245, 255, 0.5)" : "transparent",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: isFocused ? 4 : 0,
                },
              ]}
            >
              {(label as string).replaceAll("/index", "") as string}
            </Text>
          </PlatformPressable>
        );
      })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 245, 255, 0.2)",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  blurContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "rgba(10, 10, 15, 0.85)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    textTransform: "capitalize",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
