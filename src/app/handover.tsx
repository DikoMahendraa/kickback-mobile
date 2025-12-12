import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dropdown } from "@/components/ui/Dropdown";
import InputField from "@/components/ui/input/InputField";
import { Label } from "@/components/ui/Label";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HandoverScreen() {
  const [startDate, setStartDate] = useState("");

  return (
    <View style={styles.outerContainer}>
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
  value: {
    fontSize: 14.4, // 0.9rem
  },
  bold: {
    fontWeight: "600",
  },
  small: {
    fontSize: 12, // 0.75rem
    color: "#78909c",
    marginTop: 4,
  },
  field: {
    marginBottom: 8,
    marginTop: 8,
  },
  fieldLabel: {
    fontSize: 12, // 0.75rem
    marginBottom: 3,
    color: "#607d8b",
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
