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
    <View className="flex-row items-center relative border rounded-[0.625rem]  bg-white border-gray-11 p-4">
      {prefix && <View className="pr-2 border-r border-gray-11">{prefix}</View>}
      <TextInput
        allowFontScaling={false}
        placeholderTextColor="#666666"
        className={clsx(prefix && "pl-2", "text-base bg-white")}
        {...props}
      />
      {suffix && <View className="ml-2 right-4 absolute">{suffix}</View>}
    </View>
  );
};

export default InputWithIcon;
