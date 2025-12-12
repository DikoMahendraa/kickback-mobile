import { AppHeader } from "@/components/ui/AppHeader";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PaymentsScreen() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <AppHeader subtitle="Referrer view" badge="MVP • Mobile" />
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <Text style={styles.title}>Payments</Text>

          <View style={styles.section}>
            <Card>
              <Label>Upcoming</Label>
              <View style={styles.listItemHeader}>
                <Text style={[styles.value, styles.bold]}>
                  Kickback – Painting Anna
                </Text>
                <Tag>Pending</Tag>
              </View>
              <Text style={styles.small}>
                Expected: 920 PLN • Waiting for customer payment
              </Text>
            </Card>

            <Card>
              <Label>History</Label>
              <View style={styles.listItemHeader}>
                <Text style={[styles.value, styles.bold]}>
                  Kickback – Office fit-out
                </Text>
                <Tag>Paid</Tag>
              </View>
              <Text style={styles.small}>
                2 400 PLN • Paid 03.12.2025 • Provider: BuildPro
              </Text>
            </Card>
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
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
});
