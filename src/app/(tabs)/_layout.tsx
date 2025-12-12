import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

// Import your custom tab bar component
import { TabBottomNavigation } from "@/components/ui/TabBottomNavigation";

import { View } from "react-native";
import { Host } from "react-native-portalize";
import "../../../global.css";

// Mock navigation state untuk TabBottomNavigation
const createMockTabState = (currentPath: string) => {
  const routes = [
    { key: "home", name: "home", params: {} },
    { key: "referrals", name: "referrals", params: {} },
    { key: "payments", name: "payments", params: {} },
  ];

  let activeIndex = 0;
  if (currentPath.includes("/referrals")) activeIndex = 1;
  else if (currentPath.includes("/payments")) activeIndex = 2;
  else if (currentPath.includes("/home") || currentPath === "/" || currentPath === "/(tabs)") activeIndex = 0;
  else activeIndex = 0;

  return {
    index: activeIndex,
    routes,
    routeNames: ["home", "referrals", "payments"],
    key: "TabNavigator",
    type: "tab",
    stale: false,
    history: routes.map((route) => ({ type: "route", key: route.key })),
    preloadedRouteKeys: [],
  };
};

// Mock descriptors untuk TabBottomNavigation
const createMockDescriptors = () => {
  const routes = ["home", "referrals", "payments"];
  const descriptors: any = {};

  routes.forEach((route) => {
    descriptors[route] = {
      options: {
        title: route.charAt(0).toUpperCase() + route.slice(1),
        tabBarLabel: route.charAt(0).toUpperCase() + route.slice(1),
      },
    };
  });

  return descriptors;
};

export default function TabLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState(() => createMockTabState(pathname));

  useEffect(() => {
    setState(createMockTabState(pathname));
  }, [pathname]);

  // Mock navigation object
  const mockNavigation = {
    navigate: (routeName: string, params?: any) => {
      const routeMap: { [key: string]: string } = {
        home: "/home",
        referrals: "/referrals",
        payments: "/payments",
      };

      if (routeMap[routeName]) {
        router.push(routeMap[routeName] as any);
      }
    },
    emit: (event: any) => {
      return { defaultPrevented: false };
    },
  };

  const mockDescriptors = createMockDescriptors();

  // Mock insets - set to 0 for no safe area
  const mockInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  return (
    <View className="absolute inset-0 bg-white mx-auto">
      <View className="flex-1 bg-white w-full pt-12 pb-3">
        <Host>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade", // Use fade for tab transitions to avoid conflicts with inner stack animations
              animationDuration: 200,
              gestureEnabled: false, // Disable gesture for main tabs
            }}
          >
            <Stack.Screen
              name="home"
              options={{
                animation: "fade",
              }}
            />
            <Stack.Screen
              name="referrals"
              options={{
                animation: "fade",
              }}
            />
            <Stack.Screen
              name="payments"
              options={{
                animation: "fade",
              }}
            />
          </Stack>

          {/* Custom Tab navigation at bottom */}
          <TabBottomNavigation
            state={state as any}
            descriptors={mockDescriptors}
            navigation={mockNavigation as any}
            insets={mockInsets}
          />
        </Host>
      </View>
    </View>
  );
}
