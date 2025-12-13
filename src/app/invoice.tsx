import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import InputField from "@/components/ui/input/InputField";
import { Label } from "@/components/ui/Label";
import { useReferralStore, type PaymentStatus } from "@/store/referralStore";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InvoiceScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const getReferral = useReferralStore((state) => state.getReferral);
  const updateReferral = useReferralStore((state) => state.updateReferral);
  const uploadInvoice = useReferralStore((state) => state.uploadInvoice);
  const markPaymentAsPaid = useReferralStore((state) => state.markPaymentAsPaid);
  const setSelectedReferral = useReferralStore((state) => state.setSelectedReferral);

  const [referral, setReferral] = useState(useReferralStore.getState().getReferral(id || ""));
  const [totalAmount, setTotalAmount] = useState(referral?.invoiceAmount?.toString() || "");
  const [kickbackAmount, setKickbackAmount] = useState(referral?.kickbackAmount?.toString() || "");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    referral?.paymentStatus || null
  );
  const [paymentMethod, setPaymentMethod] = useState<string | null>(referral?.paymentMethod || null);

  useEffect(() => {
    if (id) {
      const ref = getReferral(id);
      if (ref) {
        setReferral(ref);
        setTotalAmount(ref.invoiceAmount?.toString() || "");
        setKickbackAmount(ref.kickbackAmount?.toString() || "");
        setPaymentStatus(ref.paymentStatus || null);
        setPaymentMethod(ref.paymentMethod || null);
        setSelectedReferral(id);
      }
    }
  }, [id]);

  useEffect(() => {
    if (referral && totalAmount) {
      const amount = parseFloat(totalAmount.replace(/[^0-9.]/g, ""));
      if (!isNaN(amount) && amount > 0) {
        const kickback = (amount * referral.kickbackPercent) / 100;
        setKickbackAmount(kickback.toFixed(2));
        // Update store with calculated kickback
        updateReferral(referral.id, {
          invoiceAmount: amount,
          kickbackAmount: kickback,
        });
      }
    }
  }, [totalAmount, referral]);

  if (!referral) {
    return null;
  }

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const amount = parseFloat(totalAmount.replace(/[^0-9.]/g, ""));
        if (!isNaN(amount) && amount > 0) {
          uploadInvoice(referral.id, amount, result.assets[0].uri);
          Alert.alert("Success", "Invoice uploaded successfully");
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to upload invoice");
    }
  };

  const handlePaymentStatusChange = (status: PaymentStatus) => {
    setPaymentStatus(status);
    updateReferral(referral.id, { paymentStatus: status });

    if (status === "Paid" && paymentMethod) {
      handleConfirmAndRelease();
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    updateReferral(referral.id, { paymentMethod: method });
  };

  const handleConfirmAndRelease = () => {
    if (!paymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }

    const amount = parseFloat(totalAmount.replace(/[^0-9.]/g, ""));
    if (!amount || amount <= 0) {
      Alert.alert("Error", "Please enter a valid invoice amount");
      return;
    }

    // Upload invoice if not already uploaded
    if (!referral.invoiceAmount) {
      uploadInvoice(referral.id, amount);
    }

    // Mark payment as paid and trigger kickback payout
    markPaymentAsPaid(referral.id, paymentMethod);

    Alert.alert(
      "Success!",
      `Kickback of ${kickbackAmount} PLN has been released to the referrer.`,
      [
        {
          text: "OK",
          onPress: () => {
            // Navigate to review screen if not already reviewed
            if (!referral.reviewSubmitted) {
              router.push(`/review?id=${referral.id}`);
            } else {
              router.push("/(tabs)/payments");
            }
          },
        },
      ]
    );
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
                <Text style={styles.fieldLabel}>Kickback %</Text>
                <Text className="text-white">{referral.kickbackPercent}%</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Kickback amount</Text>
                <Text className="text-white font-bold">
                  {kickbackAmount ? `${kickbackAmount} PLN` : "Calculated automatically"}
                </Text>
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
                <ControlledDropdown
                  data={["Bank transfer", "Card", "Cash (manual)"]}
                  placeholder="Select payment method"
                  value={paymentMethod}
                  onSelect={handlePaymentMethodChange}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Status</Text>
                <ControlledDropdown
                  data={["Awaiting payment", "Paid"]}
                  placeholder="Select status"
                  value={paymentStatus}
                  onSelect={handlePaymentStatusChange}
                />
              </View>
            </Card>
          </View>

          <View style={styles.actions}>
            <Button variant="primary" onPress={handleConfirmAndRelease}>
              Confirm & release kickback
            </Button>
            <Button variant="secondary" onPress={() => router.back()}>
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

// Controlled Dropdown Component
interface ControlledDropdownProps {
  data: string[];
  placeholder?: string;
  value: string | null;
  onSelect: (value: string) => void;
}

function ControlledDropdown({ data, placeholder, value, onSelect }: ControlledDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ width: "100%" }}>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
        onPress={() => setIsOpen(true)}
      >
        <Text style={{ color: value ? "#b8b8c8" : "#8a8a9a" }}>
          {value ?? placeholder}
        </Text>
        <Text style={{ color: "#8a8a9a" }}>▼</Text>
      </Pressable>

      {isOpen && (
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            onPress={() => setIsOpen(false)}
          >
            <Pressable
              style={{
                width: "85%",
                borderRadius: 16,
                padding: 16,
                backgroundColor: "#1a1a24",
                borderWidth: 1,
                borderColor: "rgba(0, 245, 255, 0.3)",
              }}
              onPress={(e) => e.stopPropagation()}
            >
              <ScrollView style={{ maxHeight: 300 }}>
                {data.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => {
                      onSelect(item);
                      setIsOpen(false);
                    }}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: value === item ? "rgba(0, 245, 255, 0.15)" : "transparent",
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: value === item ? "#00f5ff" : "#b8b8c8",
                        fontWeight: value === item ? "600" : "400",
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable
                onPress={() => setIsOpen(false)}
                style={{ marginTop: 12, alignItems: "flex-end" }}
              >
                <Text style={{ color: "#00f5ff", fontWeight: "600" }}>Close</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}
