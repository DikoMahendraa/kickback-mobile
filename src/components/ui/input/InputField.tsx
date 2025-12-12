import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
};

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
}: Props) {
  return (
    <View>
      {label && (
        <Text
          allowFontScaling={false}
          className="text-black mb-[0.375rem] font-medium text-sm"
        >
          {label}
        </Text>
      )}
      <TextInput
        allowFontScaling={false}
        multiline={multiline}
        className="border bg-white border-gray-11 text-base rounded-[0.625rem] p-4"
        placeholder={placeholder}
        placeholderTextColor="#666666"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
}
