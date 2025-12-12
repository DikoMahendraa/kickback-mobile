import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  label: string;
  className?: string;
  onPress: () => void;
}

export default function LinkText({ label, onPress, className }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Text allowFontScaling={false} className={className}>
        {label}
      </Text>
    </Pressable>
  );
}
