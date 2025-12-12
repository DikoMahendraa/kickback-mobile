import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProviderAcceptsScreen() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <AppHeader subtitle="Provider view" badge="MVP • Mobile" />
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <Text style={styles.title}>New Lead</Text>

          <View style={styles.section}>
            <Card>
              <View style={styles.listItemHeader}>
                <Text style={[styles.value, styles.bold]}>
                  Painting – Flat in Warsaw
                </Text>
                <Tag>New</Tag>
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
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
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
