import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import InputField from "@/components/ui/input/InputField";
import TextareaField from "@/components/ui/input/TextareaField";
import { Label } from "@/components/ui/Label";
import { useReferralStore } from "@/store/referralStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CreateReferralScreen() {
  const router = useRouter();
  const createReferral = useReferralStore((state) => state.createReferral);
  const setSelectedReferral = useReferralStore((state) => state.setSelectedReferral);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [connectionFee, setConnectionFee] = useState("");
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [paymentTiming, setPaymentTiming] = useState<string | null>(null);

  const serviceTypes = ["Painting", "Plumbing", "Renovation", "Consulting"];
  const providers = [
    "Jan Nowak – Painter",
    "Clean&Fix Sp. z o.o.",
    "AquaFix Sp. z o.o.",
    "BuildPro",
  ];
  const paymentTimings = ["On accepting referral", "After first meeting"];

  const handleSubmit = () => {
    // Validation
    if (!customerName || !phone || !email || !serviceType || !provider || !connectionFee) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    const fee = parseFloat(connectionFee.replace(/[^0-9.]/g, ""));
    if (isNaN(fee) || fee <= 0) {
      Alert.alert("Validation Error", "Please enter a valid connection fee amount");
      return;
    }

    // Create referral
    const referralId = createReferral({
      customer: {
        name: customerName,
        phone: phone,
        email: email,
      },
      serviceType: serviceType,
      provider: provider,
      description: description || "No description provided",
      connectionFee: fee,
      kickbackPercent: 10,
    });

    // Set selected referral and navigate
    setSelectedReferral(referralId);
    router.push(`/provider-accepts?id=${referralId}`);
  };

  return (
    <LinearGradient
      colors={["#0a0a0f", "#12121a", "#1a1a24"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.outerContainer}
    >
      <View style={styles.container}>
        <AppHeader subtitle="Referrer view" badge="MVP • Mobile" />
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <Text style={styles.title}>New Referral</Text>

          <View style={styles.section}>
            <Card>
              <Label>Step 1 • Customer</Label>
              <View style={styles.field}>
                <InputField
                  label="Customer name"
                  placeholder="e.g. Anna Kowalska"
                  value={customerName}
                  onChangeText={setCustomerName}
                />
              </View>
              <View style={styles.field}>
                <InputField
                  label="Phone"
                  placeholder="+48 ..."
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
              <View style={styles.field}>
                <InputField
                  label="Email"
                  placeholder="anna@example.com"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Step 2 • Service & provider</Label>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Service type</Text>
                <ControlledDropdown
                  data={serviceTypes}
                  placeholder="Select service type"
                  value={serviceType}
                  onSelect={setServiceType}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Provider</Text>
                <ControlledDropdown
                  data={providers}
                  placeholder="Select provider"
                  value={provider}
                  onSelect={setProvider}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Short description</Text>
                <TextareaField
                  placeholder="What does the customer need?"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Step 3 • Connection fee</Label>
              <View style={styles.field}>
                <InputField
                  label="Connection fee amount"
                  placeholder="e.g. 150 PLN"
                  value={connectionFee}
                  onChangeText={setConnectionFee}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>When is it paid?</Text>
                <ControlledDropdown
                  data={paymentTimings}
                  placeholder="Select payment timing"
                  value={paymentTiming}
                  onSelect={setPaymentTiming}
                />
              </View>
              <Text style={styles.small}>
                The provider pays this as soon as they accept the lead.
              </Text>
            </Card>
          </View>

          <View style={styles.actions}>
            <Button
              href="/(tabs)/home"
              variant="secondary"
              onPress={() => router.back()}
            >
              Cancel
            </Button>
            <Button variant="primary" onPress={handleSubmit}>
              Send referral →
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
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

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
                {filteredData.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => {
                      onSelect(item);
                      setIsOpen(false);
                      setSearch("");
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
