import clsx from "clsx";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  label: string;
  onPress?: () => void;
  color?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "filled" | "outline";
}

const sizeStyles = {
  sm: {
    height: "h-9",
    textSize: "text-sm",
  },
  md: {
    height: "h-11",
    textSize: "text-base",
  },
  lg: {
    height: "h-14",
    textSize: "text-base",
  },
  xl: {
    height: "h-16",
    textSize: "text-xl",
  },
};

export default function PrimaryButton({
  label,
  className,
  disabled = false,
  onPress,
  color = "bg-primary-01",
  size = "lg",
  variant = "filled",
  icon,
  ...props
}: Props) {
  const { height, textSize } = sizeStyles[size];

  const colorName = color.replace("bg-", "");

  const getButtonStyles = () => {
    if (disabled) {
      return variant === "outline"
        ? "bg-transparent border border-gray-300"
        : "bg-gray-300";
    }

    return variant === "outline"
      ? `bg-transparent border border-${colorName}`
      : color;
  };

  const getTextStyles = () => {
    if (disabled) {
      return "text-gray-500";
    }

    return variant === "outline" ? `text-${colorName}` : "text-white";
  };

  return (
    <TouchableOpacity
      className={clsx(
        "rounded-xl flex-row gap-2 items-center justify-center w-full",
        getButtonStyles(),
        height,
        className
      )}
      onPress={disabled ? undefined : onPress}
      {...props}
    >
      {icon && icon}
      <Text
        allowFontScaling={false}
        className={clsx("font-semibold", textSize, getTextStyles())}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
