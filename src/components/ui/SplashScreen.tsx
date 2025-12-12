import React, { useEffect } from "react";
import { Dimensions, Image, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  // Shared values for animations
  const circleScale = useSharedValue(0);
  const finalScale = useSharedValue(0);
  const imageOpacity = useSharedValue(0);
  const backgroundOpacity = useSharedValue(1);

  // Calculate the scale needed to cover the entire screen
  const maxDimension = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT);
  const finalScaleValue = (maxDimension * 2) / 50; // 50 is initial circle size

  useEffect(() => {
    // Start the animation sequence
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Phase 1: Small circle appears and scales through different sizes
    circleScale.value = withSequence(
      withTiming(1, { duration: 300 }), // Initial appearance
      withTiming(2, { duration: 400 }), // First scale
      withTiming(3, { duration: 400 }), // Second scale
      withTiming(4, { duration: 400 }), // Third scale
      withTiming(0, { duration: 200 }) // Disappear
    );

    // Phase 2: Final large circle that covers the screen
    setTimeout(() => {
      finalScale.value = withTiming(
        finalScaleValue,
        {
          duration: 600,
        },
        () => {
          // Phase 3: Show image with fade in effect
          runOnJS(showImageWithDelay)();
        }
      );
    }, 1500);
  };

  const showImageWithDelay = () => {
    setTimeout(() => {
      imageOpacity.value = withTiming(1, { duration: 600 });

      // Complete animation after image is shown
      setTimeout(() => {
        // Hapus animasi fade out, langsung ke screen berikutnya
        onAnimationComplete && runOnJS(onAnimationComplete)();
      }, 1500);
    }, 200);
  };

  // Animated styles
  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScale.value }],
      opacity: circleScale.value > 0 ? 1 : 0,
    };
  });

  const finalCircleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: finalScale.value }],
      opacity: finalScale.value > 0 ? 1 : 0,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
      transform: [
        {
          scale: interpolate(
            imageOpacity.value,
            [0, 1],
            [0.8, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value,
    };
  });

  return (
    <Animated.View
      style={[containerAnimatedStyle]}
      className="absolute inset-0 bg-white items-center justify-center z-50"
    >
      {/* Animated scaling circles */}
      <View className="absolute items-center justify-center">
        {/* First animated circle */}
        <Animated.View
          style={[circleAnimatedStyle]}
          className="w-12 h-12 bg-secondary-01 rounded-full absolute"
        />

        {/* Final large circle */}
        <Animated.View
          style={[finalCircleAnimatedStyle]}
          className="w-12 h-12 bg-secondary-01 rounded-full absolute"
        />
      </View>

      {/* Floating elements in the background */}
      <Animated.View
        style={[
          imageAnimatedStyle,
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          },
        ]}
      >
        <Image
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            resizeMode: "cover",
          }}
          source={require("@/assets/images/background/splashscreen.png")}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;
