import { AppHeader } from "@/components/ui/AppHeader";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { useReferralStore } from "@/store/referralStore";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PaymentsScreen() {
  const referrals = useReferralStore((state) => state.referrals);

  // Filter referrals with kickback information
  const kickbackReferrals = referrals.filter(
    (ref) => ref.kickbackAmount !== undefined && ref.kickbackAmount > 0
  );

  const upcomingPayments = kickbackReferrals.filter(
    (ref) => ref.paymentStatus === "Awaiting payment" || !ref.kickbackReleased
  );

  const completedPayments = kickbackReferrals.filter(
    (ref) => ref.kickbackReleased && ref.paymentStatus === "Paid"
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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
            {upcomingPayments.length > 0 && (
              <Card variant="glow">
                <Label>Upcoming</Label>
                {upcomingPayments.map((referral) => (
                  <View key={referral.id} style={{ marginBottom: 12 }}>
                    <View style={styles.listItemHeader}>
                      <Text style={[styles.value, styles.bold]}>
                        Kickback – {referral.serviceType} {referral.customer.name}
                      </Text>
                      <Tag variant="pending">Pending</Tag>
                    </View>
                    <Text style={styles.small}>
                      Expected: {referral.kickbackAmount?.toFixed(2)} PLN • Waiting for customer payment
                    </Text>
                  </View>
                ))}
              </Card>
            )}

            {completedPayments.length > 0 && (
              <Card>
                <Label>History</Label>
                {completedPayments.map((referral) => (
                  <View key={referral.id} style={{ marginBottom: 12 }}>
                    <View style={styles.listItemHeader}>
                      <Text style={[styles.value, styles.bold]}>
                        Kickback – {referral.serviceType} {referral.customer.name}
                      </Text>
                      <Tag variant="success">Paid</Tag>
                    </View>
                    <Text style={styles.small}>
                      {referral.kickbackAmount?.toFixed(2)} PLN • Paid {formatDate(referral.updatedAt)} • Provider: {referral.provider}
                    </Text>
                  </View>
                ))}
              </Card>
            )}

            {upcomingPayments.length === 0 && completedPayments.length === 0 && (
              <Card>
                <Text style={styles.small}>No payments yet. Complete a referral to see kickback payments here.</Text>
              </Card>
            )}
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
