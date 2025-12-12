import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label?: string;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
};

export default function DatePicker({
  label,
  placeholder = "Select date",
  value,
  onChange,
  minimumDate,
  maximumDate,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleOpenPicker = () => {
    setTempDate(value || new Date());
    if (Platform.OS === "ios") {
      setShowPicker(true);
    } else {
      // Android shows native picker directly
      setShowPicker(true);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "set" && selectedDate) {
        onChange?.(selectedDate);
      }
    } else {
      // iOS - update temp date
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    onChange?.(tempDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  return (
    <View>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <Pressable
        onPress={handleOpenPicker}
        style={styles.inputContainer}
      >
        <Calendar size={18} color="#8a8a9a" />
        <Text
          style={[
            styles.inputText,
            !value && styles.placeholderText,
          ]}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </Pressable>

      {showPicker && (
        <>
          {Platform.OS === "ios" ? (
            <Modal
              visible={showPicker}
              transparent
              animationType="slide"
              onRequestClose={handleCancel}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={handleCancel}
              >
                <Pressable
                  style={styles.modalContent}
                  onPress={(e) => e.stopPropagation()}
                >
                  <View style={styles.modalHeader}>
                    <Pressable onPress={handleCancel}>
                      <Text style={styles.cancelButton}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={handleConfirm}>
                      <Text style={styles.confirmButton}>Confirm</Text>
                    </Pressable>
                  </View>
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    textColor="#ffffff"
                    themeVariant="dark"
                  />
                </Pressable>
              </Pressable>
            </Modal>
          ) : (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginBottom: 8,
    color: "#8a8a9a",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    gap: 12,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: "#b8b8c8",
  },
  placeholderText: {
    color: "#8a8a9a",
  },
  arrow: {
    color: "#8a8a9a",
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#1a1a24",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.3)",
    borderBottomWidth: 0,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  cancelButton: {
    color: "#8a8a9a",
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButton: {
    color: "#00f5ff",
    fontSize: 16,
    fontWeight: "600",
  },
});
