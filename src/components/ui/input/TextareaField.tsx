import React from "react";
import { Text, TextInput, View } from "react-native";

export default function TextareaField({
  value,
  onChangeText,
  showLength,
  maxLength = 30,
  placeholder = "Enter a description...",
}: {
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
  showLength?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        allowFontScaling={false}
        numberOfLines={4}
        textAlignVertical="top"
        placeholderTextColor="#8a8a9a"
        className="border rounded-xl p-3 min-h-[80px]"
        style={{
          borderColor: "rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "#b8b8c8",
        }}
      />
      {showLength && (
        <Text
          allowFontScaling={false}
          className="text-sm text-right mt-2"
          style={{ color: "#8a8a9a" }}
        >
          {value?.length}/{maxLength} characters
        </Text>
      )}
    </View>
  );
}
