import React from "react";
import { Text, View } from "react-native";

type Props = {
  orgName: string;
};

export default function InviteText({ orgName }: Props) {
  return (
    <View>
      <Text
        allowFontScaling={false}
        className="text-white font-bold text-2xl text-center mb-2"
      >
        {orgName} invited you to the Amanahfy app!
      </Text>
      <Text
        allowFontScaling={false}
        className="text-white mt-4 text-base text-center"
      >
        Complete your profile to get started and you can started in a matter of
        minutes.
      </Text>
    </View>
  );
}
