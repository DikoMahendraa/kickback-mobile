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
        placeholderTextColor="#666666"
        className="border border-gray-200 rounded-[0.625rem] p-3 text-gray-900 min-h-[80px]"
      />
      {showLength && (
        <Text
          allowFontScaling={false}
          className="text-sm text-gray-13 text-right mt-2"
        >
          {value?.length}/{maxLength} characters
        </Text>
      )}
    </View>
  );
}
