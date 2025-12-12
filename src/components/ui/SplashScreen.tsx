import { LinearGradient } from "expo-linear-gradient";
import { Sparkles } from "lucide-react-native";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  // Shared values for animations
  const logoScale = useSharedValue(0);
  const logoRotation = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const ring1Scale = useSharedValue(0);
  const ring1Opacity = useSharedValue(0);
  const ring2Scale = useSharedValue(0);
  const ring2Opacity = useSharedValue(0);
  const ring3Scale = useSharedValue(0);
  const ring3Opacity = useSharedValue(0);
  const particlesOpacity = useSharedValue(0);
  const particlesRotation = useSharedValue(0);
  const backgroundOpacity = useSharedValue(1);
  const glowPulse = useSharedValue(0);


  useEffect(() => {
    const startAnimation = () => {
      // Continuous glow pulse
      glowPulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

      // Particles rotation
      particlesRotation.value = withRepeat(
        withTiming(360, { duration: 20000, easing: Easing.linear }),
        -1,
        false
      );

      // Phase 1: Rings appear in sequence
      ring1Scale.value = withSequence(
        withDelay(200, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) })),
        withTiming(1.2, { duration: 400 })
      );
      ring1Opacity.value = withDelay(200, withTiming(1, { duration: 600 }));

      ring2Scale.value = withSequence(
        withDelay(400, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) })),
        withTiming(1.3, { duration: 400 })
      );
      ring2Opacity.value = withDelay(400, withTiming(1, { duration: 600 }));

      ring3Scale.value = withSequence(
        withDelay(600, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) })),
        withTiming(1.4, { duration: 400 })
      );
      ring3Opacity.value = withDelay(600, withTiming(1, { duration: 600 }));

      // Phase 2: Logo appears with rotation
      logoScale.value = withDelay(
        800,
        withSequence(
          withTiming(0.8, { duration: 300 }),
          withTiming(1.1, { duration: 200, easing: Easing.out(Easing.back(1.5)) }),
          withTiming(1, { duration: 200 })
        )
      );
      logoRotation.value = withDelay(
        800,
        withSequence(
          withTiming(360, { duration: 800, easing: Easing.out(Easing.cubic) })
        )
      );
      logoOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));

      // Phase 3: Particles fade in
      particlesOpacity.value = withDelay(1000, withTiming(1, { duration: 800 }));

      // Phase 4: Complete animation
      setTimeout(() => {
        backgroundOpacity.value = withTiming(0, { duration: 500 }, () => {
          onAnimationComplete && runOnJS(onAnimationComplete)();
        });
      }, 2500);
    };

    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: logoScale.value },
        { rotate: `${logoRotation.value}deg` },
      ],
      opacity: logoOpacity.value,
    };
  });

  const ring1AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: ring1Scale.value }],
      opacity: ring1Opacity.value,
    };
  });

  const ring2AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: ring2Scale.value }],
      opacity: ring2Opacity.value,
    };
  });

  const ring3AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: ring3Scale.value }],
      opacity: ring3Opacity.value,
    };
  });

  const particlesAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${particlesRotation.value}deg` }],
      opacity: particlesOpacity.value,
    };
  });

  const glowAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      glowPulse.value,
      [0, 1],
      [0.3, 0.6],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value,
    };
  });

  // Particle positions
  const particles = Array.from({ length: 8 }, (_, i) => ({
    angle: (i * 360) / 8,
    distance: 120,
  }));

  return (
    <Animated.View
      style={[containerAnimatedStyle, styles.container]}
      className="absolute inset-0 z-50"
    >
      {/* Background gradient */}
      <LinearGradient
        colors={["#0a0a0f", "#12121a", "#1a1a24", "#0a0a0f"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Animated glow effect */}
      <Animated.View style={[glowAnimatedStyle, styles.glowContainer]}>
        <View style={styles.glowCircle1} />
        <View style={styles.glowCircle2} />
      </Animated.View>

      {/* Rotating particles */}
      <Animated.View
        style={[particlesAnimatedStyle, styles.particlesContainer]}
      >
        {particles.map((particle, index) => {
          const x = Math.cos((particle.angle * Math.PI) / 180) * particle.distance;
          const y = Math.sin((particle.angle * Math.PI) / 180) * particle.distance;
          return (
            <View
              key={index}
              style={[
                styles.particle,
                {
                  transform: [{ translateX: x }, { translateY: y }],
                },
              ]}
            />
          );
        })}
      </Animated.View>

      {/* Concentric rings */}
      <View style={styles.ringsContainer}>
        <Animated.View style={[ring3AnimatedStyle, styles.ring, styles.ring3]}>
          <LinearGradient
            colors={["transparent", "rgba(0, 245, 255, 0.1)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ringGradient}
          />
        </Animated.View>
        <Animated.View style={[ring2AnimatedStyle, styles.ring, styles.ring2]}>
          <LinearGradient
            colors={["transparent", "rgba(168, 85, 247, 0.15)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ringGradient}
          />
        </Animated.View>
        <Animated.View style={[ring1AnimatedStyle, styles.ring, styles.ring1]}>
          <LinearGradient
            colors={["rgba(0, 245, 255, 0.2)", "rgba(168, 85, 247, 0.2)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ringGradient}
          />
        </Animated.View>
      </View>

      {/* Logo/Icon */}
      <Animated.View style={[logoAnimatedStyle, styles.logoContainer]}>
        <LinearGradient
          colors={["#00f5ff", "#a855f7", "#00f5ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoGradient}
        >
          <Sparkles size={48} color="#ffffff" strokeWidth={2.5} />
        </LinearGradient>
      </Animated.View>

      {/* App name */}
      <Animated.View
        style={[
          {
            opacity: logoOpacity.value,
            transform: [{ translateY: interpolate(logoOpacity.value, [0, 1], [20, 0], Extrapolate.CLAMP) }],
          },
          styles.titleContainer,
        ]}
      >
        <Animated.Text style={styles.title}>Kickback</Animated.Text>
        <Animated.Text style={styles.subtitle}>Referral Platform</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  glowContainer: {
    position: "absolute",
    width: SCREEN_WIDTH * 1.5,
    height: SCREEN_HEIGHT * 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  glowCircle1: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(0, 245, 255, 0.15)",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
  },
  glowCircle2: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(168, 85, 247, 0.15)",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 80,
  },
  particlesContainer: {
    position: "absolute",
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  particle: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00f5ff",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  ringsContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderRadius: 1000,
    borderWidth: 2,
  },
  ring1: {
    width: 160,
    height: 160,
    borderColor: "#00f5ff",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  ring2: {
    width: 200,
    height: 200,
    borderColor: "#a855f7",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
  },
  ring3: {
    width: 240,
    height: 240,
    borderColor: "rgba(0, 245, 255, 0.3)",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  ringGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 1000,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  titleContainer: {
    marginTop: 120,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 245, 255, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#b8b8c8",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
});

export default SplashScreen;
