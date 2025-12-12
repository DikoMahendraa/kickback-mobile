import React, { useState } from "react";
import { Animated, TouchableOpacity } from "react-native";

interface ToggleItemProps {
  isEnabled: boolean;
  onToggle?: (value: boolean) => void;
}

export const ToggleItem: React.FC<ToggleItemProps> = ({
  isEnabled,
  onToggle,
}) => {
  const [animatedValue] = useState(new Animated.Value(isEnabled ? 1 : 0));

  const handleToggle = () => {
    const newValue = !isEnabled;
    onToggle?.(newValue);

    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e5e7eb", "#003080"],
  });

  return (
    <TouchableOpacity onPress={handleToggle} activeOpacity={0.7}>
      <Animated.View
        style={{ backgroundColor }}
        className="w-12 h-6 rounded-full justify-center relative"
      >
        <Animated.View
          style={{
            transform: [{ translateX: thumbPosition }],
          }}
          className="w-5 h-5 bg-white rounded-full shadow-md absolute"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
