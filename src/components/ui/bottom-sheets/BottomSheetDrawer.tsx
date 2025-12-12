import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, PanResponder, View } from "react-native";
import { Portal } from "react-native-portalize";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const BottomSheetDrawer = ({
  visible,
  onClose,
  children,
  height = SCREEN_HEIGHT * 0.8,
  showHandle = true,
  enableSwipeDown = true,
  isStacked = false,
  stackLevel = 0,
  closeOnNavigationChange = true,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
  showHandle?: boolean;
  enableSwipeDown?: boolean;
  isStacked?: boolean;
  stackLevel?: number;
  closeOnNavigationChange?: boolean;
}) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const [isScrollingContent, setIsScrollingContent] = useState(false);
  const lastScrollY = useRef(0);
  const scrollViewRef = useRef<any>(null);

  // Handle navigation changes
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Always close on navigation change
        if (visible) {
          closeDrawer();
        }
      };
    }, [visible])
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enableSwipeDown,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!enableSwipeDown) return false;

        const { dy } = gestureState;

        // Only handle pan if:
        // 1. We're not currently scrolling content
        // 2. We're pulling down (dy > 0)
        // 3. Either we're at the top of scroll content or pulling down significantly
        return !isScrollingContent && dy > 5;
      },
      onPanResponderGrant: (_, gestureState) => {
        // Check if we should handle this gesture
        const { dy } = gestureState;

        // If we're scrolling up and content can scroll, don't handle
        if (dy < 0 && lastScrollY.current > 0) {
          return false;
        }
      },
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;

        // Only handle downward swipes
        if (dy > 0) {
          // Check if we're at the top of the scroll content
          if (lastScrollY.current <= 0 || !isScrollingContent) {
            translateY.setValue(dy);
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy, vy } = gestureState;

        // Close if significant downward movement or velocity
        if (dy > 100 || (dy > 50 && vy > 0.5)) {
          closeDrawer();
        } else {
          // Snap back to position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      closeDrawer();
    }
  }, [visible]);

  const closeDrawer = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      onClose();
    });
  };

  const handleScrollBeginDrag = () => {
    setIsScrollingContent(true);
  };

  const handleScrollEndDrag = () => {
    setIsScrollingContent(false);
  };

  const handleScroll = (event: any) => {
    lastScrollY.current = event.nativeEvent.contentOffset.y;
  };

  if (!visible) return null;

  // Calculate offset for stacked drawers
  const stackOffset = stackLevel * 20;

  // Clone children to add scroll handlers if they contain ScrollView
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Check if child is a ScrollView or has ScrollView props
      if (
        (child.type && (child.type as any).displayName === "ScrollView") ||
        child.props?.onScroll !== undefined ||
        child.props?.scrollEventThrottle !== undefined
      ) {
        return React.cloneElement(child as React.ReactElement<any>, {
          onScrollBeginDrag: handleScrollBeginDrag,
          onScrollEndDrag: handleScrollEndDrag,
          onScroll: (event: any) => {
            handleScroll(event);
            // Call original onScroll if it exists
            if (child.props?.onScroll) {
              child.props.onScroll(event);
            }
          },
          scrollEventThrottle: child.props?.scrollEventThrottle || 16,
          ref: scrollViewRef,
        });
      }
    }
    return child;
  });

  return (
    <Portal>
      <View
        pointerEvents="box-none"
        className="absolute top-0 left-0 right-0 bottom-0 z-50"
        style={{ position: "absolute" }}
      >
        {/* Backdrop */}
        <View
          className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"
          onTouchEnd={() => {
            closeDrawer();
          }}
        />

        {/* Bottom Sheet */}
        <Animated.View
          className="absolute left-0 right-0 bottom-0 bg-white"
          style={{
            height,
            transform: [{ translateY }, { translateY: -stackOffset }],
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: isStacked ? 0.3 : 0.1,
            shadowRadius: isStacked ? 12 : 6,
            elevation: 10 + stackLevel,
          }}
        >
          {/* Handle */}
          {showHandle && (
            <View
              className="items-center py-4"
              {...(enableSwipeDown ? panResponder.panHandlers : {})}
              style={{ zIndex: 2 }}
            >
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
            </View>
          )}

          {/* Children */}
          <View style={{ flex: 1 }}>{enhancedChildren}</View>
        </Animated.View>
      </View>
    </Portal>
  );
};
