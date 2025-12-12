import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

interface ToggleItemProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleItem: React.FC<ToggleItemProps> = ({
  title,
  description,
  isEnabled,
  onToggle,
}) => {
  const [animatedValue] = useState(new Animated.Value(isEnabled ? 1 : 0));

  const handleToggle = () => {
    const newValue = !isEnabled;
    onToggle(newValue);

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
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-4">
          <Text
            allowFontScaling={false}
            className="text-lg font-semibold text-gray-900 mb-1"
          >
            {title}
          </Text>
          <Text
            allowFontScaling={false}
            className="text-sm text-gray-500 leading-5"
          >
            {description}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleToggle}
          activeOpacity={0.7}
          className="ml-2"
        >
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
      </View>
    </View>
  );
};

export default ToggleItem;
