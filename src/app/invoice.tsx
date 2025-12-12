import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dropdown } from "@/components/ui/Dropdown";
import InputField from "@/components/ui/input/InputField";
import { Label } from "@/components/ui/Label";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      colors={["#0a0a0f", "#12121a", "#1a1a24"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.outerContainer}
    >
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    maxWidth: 430,
    width: "100%",
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
    paddingBottom: 80,
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
    marginBottom: 8,
    textShadowColor: "rgba(0, 245, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  section: {
    marginBottom: 16,
  },
  field: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12,
    marginBottom: 3,
    color: "#8a8a9a",
    fontWeight: "500",
  },
  small: {
    fontSize: 12,
    color: "#8a8a9a",
    marginTop: 6,
    lineHeight: 18,
  },
  fileButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
  },
  fileButtonText: {
    fontSize: 14,
    color: "#b8b8c8",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
});
