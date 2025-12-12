import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable, Text } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
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
                { color: isFocused ? "#1e88e5" : "#607d8b" },
              ]}
            >
              {(label as string).replaceAll("/index", "") as string}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e4ea",
    paddingTop: 6,
    paddingBottom: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 17.6, // 1.1rem
    marginBottom: 2,
  },
  label: {
    fontSize: 11.2, // 0.7rem
    textTransform: "capitalize",
  },
});
