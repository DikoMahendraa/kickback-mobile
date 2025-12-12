import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "purple" | "red";
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onToggle,
  size = "md",
  color = "blue",
  disabled = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onToggle?.(newChecked);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "lg":
        return "w-6 h-6";
      default:
        return "w-8 h-8";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 12;
      case "lg":
        return 20;
      default:
        return 16;
    }
  };

  const getColorClasses = () => {
    if (disabled) {
      return isChecked
        ? "bg-gray-300 border-gray-300"
        : "bg-gray-100 border-gray-300";
    }

    const colors = {
      blue: isChecked
        ? "bg-blue-500 border-blue-500"
        : "bg-white border-gray-300",
      green: isChecked
        ? "bg-green-500 border-green-500"
        : "bg-white border-gray-300",
      purple: isChecked
        ? "bg-purple-500 border-purple-500"
        : "bg-white border-gray-300",
      red: isChecked ? "bg-red-500 border-red-500" : "bg-white border-gray-300",
    };

    return colors[color];
  };

  const getTextSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      className={`flex-row items-center ${disabled ? "opacity-50" : ""}`}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View
        className={`
          ${getSizeClasses()}
          ${getColorClasses()}
          border-2 rounded-full justify-center items-center mr-3
        `}
      >
        {isChecked && (
          <Ionicons
            name="checkmark"
            size={getIconSize()}
            color={disabled ? "#9CA3AF" : "white"}
          />
        )}
      </View>
      {label && (
        <Text
          allowFontScaling={false}
          className={`
            ${getTextSizeClass()}
            ${disabled ? "text-gray-400" : "text-gray-800"}
          `}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
