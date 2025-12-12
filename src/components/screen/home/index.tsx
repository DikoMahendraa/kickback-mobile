import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
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
          <Text style={styles.title}>Dashboard</Text>

          <View style={styles.section}>
            <Card variant="glow">
              <Label>Quick action</Label>
              <Text style={styles.value}>
                Send a new referral to a trusted provider with two taps.
              </Text>
              <View style={styles.actions}>
                <Button href="/create-referral" variant="primary">
                  ＋ New referral
                </Button>
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Today</Label>
              <View style={styles.chipContainer}>
                <Chip>3 open leads</Chip>
                <Chip>1 payment pending</Chip>
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Recent referral</Label>
              <View style={styles.listItemHeader}>
                <Text style={[styles.value, styles.bold]}>
                  Painting – Anna Kowalska
                </Text>
                <Tag variant="success">Job confirmed</Tag>
              </View>
              <Text style={styles.small}>
                Provider: Jan Nowak – Painter • Kickback 10%
              </Text>
              <View style={styles.actions}>
                <Button href="/handover" variant="secondary">
                  View referral
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
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
    flexWrap: "wrap",
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
});
