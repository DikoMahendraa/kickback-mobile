import { Check } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

type TProps = {
  label: React.ReactNode;
  checklist: boolean;
  onChange: () => void;
};

const RadioField: React.FC<TProps> = ({ label, checklist, onChange }) => {
  return (
    <Pressable onPress={onChange} className="flex-row items-center gap-x-2">
      <View
        className={`w-6 h-6 rounded-full border border-gray-03 flex items-center justify-center ${
          checklist ? "bg-primary-01" : "bg-white"
        }`}
      >
        {checklist && <Check size={14} className="text-white" color="white" />}
      </View>
      {label}
    </Pressable>
  );
};

export default RadioField;
