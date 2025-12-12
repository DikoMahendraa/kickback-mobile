import clsx from "clsx";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

type InputWithIconProps = TextInputProps & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const InputWithIcon: React.FC<InputWithIconProps> = ({
  prefix,
  suffix,
  ...props
}) => {
  return (
    <View
      className="flex-row items-center relative border rounded-xl p-4"
      style={{
        borderColor: "rgba(255, 255, 255, 0.15)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      {prefix && (
        <View
          className="pr-2 border-r"
          style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
        >
          {prefix}
        </View>
      )}
      <TextInput
        allowFontScaling={false}
        placeholderTextColor="#8a8a9a"
        className={clsx(prefix && "pl-2", "text-base")}
        style={{ color: "#b8b8c8", backgroundColor: "transparent" }}
        {...props}
      />
      {suffix && <View className="ml-2 right-4 absolute">{suffix}</View>}
    </View>
  );
};

export default InputWithIcon;
