import React, { useRef, useState } from "react";
import { TextInput, View } from "react-native";

export default function OTPField({
  length = 5,
  onChangeOTP,
}: {
  length?: number;
  onChangeOTP?: (otp: string) => void;
}) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChangeOTP?.(newOtp.join(""));

    // Focus next
    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  return (
    <View className="flex-row justify-center gap-x-4">
      {otp.map((digit, index) => {
        const isFocused = focusedIndex === index;

        return (
          <TextInput
            key={index}
            keyboardType="number-pad"
            allowFontScaling={false}
            // @ts-ignore
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            className={`w-[3.75rem] h-[4.875rem] text-center text-4xl font-bold border-2 text-primary-012 ${
              isFocused ? "border-primary-01" : "border-gray-300"
            } rounded-xl bg-white`}
          />
        );
      })}
    </View>
  );
}
