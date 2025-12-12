import { CheckIcon } from "lucide-react-native"; // optional icon library
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type TCheckboxButton = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function CheckboxButton({
  label,
  checked = false,
  onChange,
}: TCheckboxButton) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <Pressable
      onPress={toggleCheckbox}
      className="flex-row items-center gap-x-2"
    >
      <View
        className={`w-5 h-5 rounded border border-gray-04 justify-center items-center ${
          isChecked ? "bg-primary-01 border-primarbg-primary-01" : "bg-white"
        }`}
      >
        {isChecked && <CheckIcon size={14} color="white" />}
      </View>
      <Text allowFontScaling={false} className="text-base text-gray-04">
        {label}
      </Text>
    </Pressable>
  );
}
