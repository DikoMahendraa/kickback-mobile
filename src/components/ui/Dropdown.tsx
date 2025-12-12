import clsx from "clsx";
import { ChevronDown, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputWithIcon from "./input/InputWithIcon";

interface DropdownProps {
  data: string[];
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  data,
  placeholder = "Select an item",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="w-full">
      <Pressable
        className="flex-row items-center justify-between p-4 border rounded-lg border-gray-300 bg-white"
        onPress={() => setIsOpen(true)}
      >
        <Text allowFontScaling={false} className="text-gray-700">
          {selected ?? placeholder}
        </Text>
        <ChevronDown size={20} color="#64748B" />
      </Pressable>

      <Modal
        onRequestClose={() => setIsOpen(false)}
        onDismiss={() => setIsOpen(false)}
        visible={isOpen}
        transparent
        animationType="fade"
      >
        <View className="flex-1 justify-center items-center bg-black/30">
          <View className="w-11/12 bg-white rounded-2xl shadow-xl p-4">
            <InputWithIcon
              prefix={<Search size={16} color="#64748B" />}
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
            />

            <FlatList
              data={filteredData}
              className="mt-4"
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-2"
                  onPress={() => {
                    setSelected(item);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  <Text
                    className={clsx(
                      selected === item
                        ? "text-primary-01 font-semibold"
                        : "text-black-05"
                    )}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text
                  allowFontScaling={false}
                  className="text-center text-gray-400 my-8"
                >
                  No results found
                </Text>
              }
            />

            <View className="flex-row justify-end pr-3">
              <Pressable onPress={() => setIsOpen(false)}>
                <Text
                  allowFontScaling={false}
                  className="text-primary-01 font-semibold text-base"
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
