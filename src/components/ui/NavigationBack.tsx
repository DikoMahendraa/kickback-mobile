import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NavigationBack({
  label,
  onPress,
}: {
  label?: string;
  onPress: () => void;
}) {
  return (
    <View className="flex-row bg-white items-center py-4 mt-5 px-6">
      <TouchableOpacity onPress={onPress} className="mr-4">
        <ArrowLeft size={24} color="#374151" />
      </TouchableOpacity>
      {label && (
        <Text
          allowFontScaling={false}
          className="text-xl font-semibold text-gray-900"
        >
          {label}
        </Text>
      )}
    </View>
  );
}
