import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProviderAcceptsScreen() {
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
          <Text style={styles.title}>New Lead</Text>

          <View style={styles.section}>
            <Card variant="glow">
              <View style={styles.listItemHeader}>
                <Text style={[styles.value, styles.bold]}>
                  Painting – Flat in Warsaw
                </Text>
                <Tag variant="pending">New</Tag>
              </View>
              <Text style={styles.small}>
                Referred by: Build&Fix s.c. • Customer: Anna Kowalska
              </Text>
              <View style={styles.spacer} />
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Project value (est.)</Text>
                <Text style={styles.value}>8 000 – 10 000 PLN</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Connection fee</Text>
                <Text style={[styles.value, styles.bold]}>
                  150 PLN one-time
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Kickback on success</Text>
                <Text style={[styles.value, styles.bold]}>
                  10% of final invoice
                </Text>
              </View>
              <View style={styles.spacer} />
              <Label>Customer brief</Label>
              <Text style={styles.small}>
                60 m² flat, 2 rooms, walls + ceiling. Work within 3 weeks. You
                contact the customer and confirm scope + price.
              </Text>
              <View style={styles.actions}>
                <Button href="/handover" variant="primary">
                  Accept & pay fee
                </Button>
                <Button href="/(tabs)/referrals" variant="secondary">
                  Decide later
                </Button>
              </View>
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
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
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
