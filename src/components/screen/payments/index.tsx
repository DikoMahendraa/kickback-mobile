import { AppHeader } from "@/components/ui/AppHeader";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PaymentsScreen() {
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
          <Text style={styles.title}>Payments</Text>

          <View style={styles.section}>
            <Card variant="glow">
              <Label>Upcoming</Label>
              <View style={styles.listItemHeader}>
                <Text style={[styles.value, styles.bold]}>
                  Kickback – Painting Anna
                </Text>
                <Tag variant="pending">Pending</Tag>
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
                <Tag variant="success">Paid</Tag>
              </View>
              <Text style={styles.small}>
                2 400 PLN • Paid 03.12.2025 • Provider: BuildPro
              </Text>
            </Card>
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
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
});
