import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dropdown } from "@/components/ui/Dropdown";
import InputField from "@/components/ui/input/InputField";
import TextareaField from "@/components/ui/input/TextareaField";
import { Label } from "@/components/ui/Label";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CreateReferralScreen() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [connectionFee, setConnectionFee] = useState("");

  return (
    <View style={styles.outerContainer}>
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
                <Dropdown
                  data={["Painting", "Plumbing", "Renovation", "Consulting"]}
                  placeholder="Select service type"
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Provider</Text>
                <Dropdown
                  data={[
                    "Pick from your network",
                    "Jan Nowak – Painter",
                    "Clean&Fix Sp. z o.o.",
                  ]}
                  placeholder="Select provider"
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
                <Dropdown
                  data={["On accepting referral", "After first meeting"]}
                  placeholder="Select payment timing"
                />
              </View>
              <Text style={styles.small}>
                The provider pays this as soon as they accept the lead.
              </Text>
            </Card>
          </View>

          <View style={styles.actions}>
            <Button href="/(tabs)/home" variant="secondary">
              Cancel
            </Button>
            <Button href="/provider-accepts" variant="primary">
              Send referral →
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
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
});
