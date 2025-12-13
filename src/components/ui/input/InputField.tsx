import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
};

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  secureTextEntry = false,
}: Props) {
  return (
    <View>
      {label && (
        <Text
          allowFontScaling={false}
          className="text-text-secondary mb-2 font-medium text-sm"
        >
          {label}
        </Text>
      )}
      <TextInput
        allowFontScaling={false}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        className="border bg-glass border-glass-border text-text-primary text-base rounded-xl p-4"
        placeholder={placeholder}
        placeholderTextColor="#8a8a9a"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          borderColor: "rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "#b8b8c8",
        }}
      />
    </View>
  );
}
