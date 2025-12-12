import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <AppHeader subtitle="Referrer view" badge="MVP • Mobile" />
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <Text style={styles.title}>Dashboard</Text>

          <View style={styles.section}>
            <Card>
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
                <Tag>Job confirmed</Tag>
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
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
});
