import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dropdown } from "@/components/ui/Dropdown";
import InputField from "@/components/ui/input/InputField";
import { Label } from "@/components/ui/Label";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InvoiceScreen() {
  const [totalAmount, setTotalAmount] = useState("");
  const [kickbackPercent, setKickbackPercent] = useState("10%");
  const [kickbackAmount, setKickbackAmount] = useState("");

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      // Handle file upload result
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <AppHeader subtitle="Provider view" badge="MVP • Mobile" />
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <Text style={styles.title}>Invoice & Kickback</Text>

          <View style={styles.section}>
            <Card>
              <Label>Invoice</Label>
              <View style={styles.field}>
                <InputField
                  label="Total amount (PLN)"
                  placeholder="e.g. 9 200"
                  value={totalAmount}
                  onChangeText={setTotalAmount}
                />
              </View>
              <View style={styles.field}>
                <InputField
                  label="Kickback %"
                  value={kickbackPercent}
                  onChangeText={setKickbackPercent}
                />
              </View>
              <View style={styles.field}>
                <InputField
                  label="Kickback amount"
                  placeholder="Calculated automatically"
                  value={kickbackAmount}
                  onChangeText={setKickbackAmount}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Upload invoice</Text>
                <TouchableOpacity
                  style={styles.fileButton}
                  onPress={handleFileUpload}
                >
                  <Text style={styles.fileButtonText}>Choose file</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.small}>
                Once the customer pays, the referrer gets the kickback instantly.
              </Text>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Customer payment</Label>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Payment method</Text>
                <Dropdown
                  data={["Bank transfer", "Card", "Cash (manual)"]}
                  placeholder="Select payment method"
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Status</Text>
                <Dropdown
                  data={["Awaiting payment", "Paid"]}
                  placeholder="Select status"
                />
              </View>
            </Card>
          </View>

          <View style={styles.actions}>
            <Button href="/(tabs)/payments" variant="primary">
              Confirm & release kickback
            </Button>
            <Button href="/handover" variant="secondary">
              Back
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    maxWidth: 430,
    width: "100%",
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 12,
    paddingBottom: 72,
  },
  title: {
    marginTop: 4,
    fontSize: 17.6, // 1.1rem
    fontWeight: "600",
  },
  section: {
    marginBottom: 12,
  },
  field: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12, // 0.75rem
    marginBottom: 3,
    color: "#607d8b",
  },
  small: {
    fontSize: 12, // 0.75rem
    color: "#78909c",
    marginTop: 4,
  },
  fileButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfd8dc",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  fileButtonText: {
    fontSize: 13.6, // 0.85rem
    color: "#37474f",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
});
