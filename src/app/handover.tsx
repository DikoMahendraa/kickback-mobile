import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dropdown } from "@/components/ui/Dropdown";
import InputField from "@/components/ui/input/InputField";
import { Label } from "@/components/ui/Label";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HandoverScreen() {
  const [startDate, setStartDate] = useState("");

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
          <Text style={styles.title}>Customer Handover</Text>

          <View style={styles.section}>
            <Card>
              <Label>Customer</Label>
              <Text style={[styles.value, styles.bold]}>Anna Kowalska</Text>
              <Text style={styles.small}>
                +48 600 000 000 • anna@example.com
              </Text>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Service</Label>
              <Text style={styles.small}>
                Painting 2 rooms, minor repairs. You manage dates and offer
                directly with the customer.
              </Text>
              <View style={styles.spacer} />
              <View style={styles.field}>
                <InputField
                  label="Planned start date"
                  placeholder="dd/mm/yyyy"
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Status</Text>
                <Dropdown
                  data={[
                    "Intro call scheduled",
                    "Offer sent",
                    "Job confirmed",
                  ]}
                  placeholder="Select status"
                />
              </View>
              <Text style={styles.small}>
                Referrer sees status, not your exact pricing. Kickback is
                calculated from final invoice only.
              </Text>
            </Card>
          </View>

          <View style={styles.actions}>
            <Button href="/invoice" variant="primary">
              Mark job as done →
            </Button>
            <Button href="/(tabs)/referrals" variant="secondary">
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
  value: {
    fontSize: 15,
    color: "#b8b8c8",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "600",
    color: "#ffffff",
  },
  small: {
    fontSize: 12,
    color: "#8a8a9a",
    marginTop: 6,
    lineHeight: 18,
  },
  field: {
    marginBottom: 8,
    marginTop: 8,
  },
  fieldLabel: {
    fontSize: 12,
    marginBottom: 3,
    color: "#8a8a9a",
    fontWeight: "500",
  },
  spacer: {
    height: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
});
