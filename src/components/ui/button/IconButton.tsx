import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
  icon: React.ReactNode;
  label: string;
}

export default function IconButton({ onPress, icon, label }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-2 justify-center border py-3 rounded-[0.625rem] border-gray-05"
    >
      {icon}

      <Text
        allowFontScaling={false}
        className="text-base font-medium text-gray-02"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
