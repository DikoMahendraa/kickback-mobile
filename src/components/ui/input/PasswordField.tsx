import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function PasswordField({
  label,
  placeholder,
}: {
  placeholder?: string;
  label?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <View className="space-y-1">
      {label && (
        <Text
          allowFontScaling={false}
          className="text-black mb-[0.375rem] font-medium text-sm"
        >
          {label}
        </Text>
      )}
      <View className="flex-row border bg-white border-gray-11 rounded-[0.625rem] p-4 text-sm">
        <TextInput
          allowFontScaling={false}
          className="flex-1 bg-white"
          secureTextEntry={!visible}
          placeholderTextColor="#666666"
          autoCapitalize="none"
          placeholder={placeholder}
        />
        <Pressable onPress={() => setVisible(!visible)}>
          {visible ? (
            <Eye size={18} className="text-gray-11" />
          ) : (
            <EyeOff size={18} className="text-gray-11" />
          )}
        </Pressable>
      </View>
    </View>
  );
}
