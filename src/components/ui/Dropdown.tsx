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
        className="flex-row items-center justify-between p-4 border rounded-xl"
        onPress={() => setIsOpen(true)}
        style={{
          borderColor: "rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{ color: selected ? "#b8b8c8" : "#8a8a9a" }}
        >
          {selected ?? placeholder}
        </Text>
        <ChevronDown size={20} color="#8a8a9a" />
      </Pressable>

      <Modal
        onRequestClose={() => setIsOpen(false)}
        onDismiss={() => setIsOpen(false)}
        visible={isOpen}
        transparent
        animationType="fade"
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <View
            className="w-11/12 rounded-2xl shadow-xl p-4"
            style={{
              backgroundColor: "#1a1a24",
              borderWidth: 1,
              borderColor: "rgba(0, 245, 255, 0.3)",
            }}
          >
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
                  className="p-2 rounded-lg"
                  onPress={() => {
                    setSelected(item);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  style={{
                    backgroundColor:
                      selected === item
                        ? "rgba(0, 245, 255, 0.15)"
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: selected === item ? "#00f5ff" : "#b8b8c8",
                      fontWeight: selected === item ? "600" : "400",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text
                  allowFontScaling={false}
                  className="text-center my-8"
                  style={{ color: "#8a8a9a" }}
                >
                  No results found
                </Text>
              }
            />

            <View className="flex-row justify-end pr-3">
              <Pressable onPress={() => setIsOpen(false)}>
                <Text
                  allowFontScaling={false}
                  className="font-semibold text-base"
                  style={{ color: "#00f5ff" }}
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
