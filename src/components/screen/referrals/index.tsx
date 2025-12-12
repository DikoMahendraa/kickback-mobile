import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ReferralsScreen() {
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
          <Text style={styles.title}>Referrals</Text>

          <View style={styles.section}>
            <Card variant="glow">
              <View style={styles.listItemHeader}>
                <Text style={[styles.value, styles.bold]}>
                  Painting – Anna Kowalska
                </Text>
                <Tag variant="success">Job confirmed</Tag>
              </View>
              <Text style={styles.small}>
                Kickback 10% • Expected 920 PLN
              </Text>
              <View style={styles.actions}>
                <Button href="/handover" variant="secondary">
                  Open
                </Button>
              </View>
            </Card>

            <Card>
              <View style={styles.listItemHeader}>
                <Text style={[styles.value, styles.bold]}>
                  Plumbing – Emergency
                </Text>
                <Tag variant="pending">Awaiting acceptance</Tag>
              </View>
              <Text style={styles.small}>
                Connection fee 200 PLN • AquaFix Sp. z o.o.
              </Text>
              <View style={styles.actions}>
                <Button href="/provider-accepts" variant="secondary">
                  Preview
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
});
