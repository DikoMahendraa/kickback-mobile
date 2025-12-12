import { Calendar } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface DateRangeProps {
  startDate: string;
  endDate: string;
  onPress: () => void;
}

const DateRangeSelector: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center bg-white rounded-xl my-6 p-4 border border-gray-11"
    activeOpacity={0.7}
  >
    <Calendar size={20} color="#6b7280" />
    <Text
      allowFontScaling={false}
      className="text-gray-700 font-medium ml-3 flex-1"
    >
      {startDate} - {endDate}
    </Text>
  </TouchableOpacity>
);

export default DateRangeSelector;
