import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { useReferralStore } from "@/store/referralStore";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProviderAcceptsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const getReferral = useReferralStore((state) => state.getReferral);
  const acceptReferral = useReferralStore((state) => state.acceptReferral);
  const declineReferral = useReferralStore((state) => state.declineReferral);
  const payConnectionFee = useReferralStore((state) => state.payConnectionFee);
  const setSelectedReferral = useReferralStore((state) => state.setSelectedReferral);

  const [referral, setReferral] = useState(() => {
    if (id) {
      return useReferralStore.getState().getReferral(id);
    }
    return null;
  });

  useEffect(() => {
    if (id) {
      const ref = getReferral(id);
      if (ref) {
        setReferral(ref);
        setSelectedReferral(id);
      } else {
        Alert.alert("Error", "Referral not found");
        router.back();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!referral) {
    return null;
  }

  const handleAccept = () => {
    Alert.alert(
      "Accept Referral",
      `You will be charged ${referral.connectionFee} PLN connection fee. Continue?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Pay & Accept",
          onPress: () => {
            // Simulate payment
            payConnectionFee(referral.id);
            acceptReferral(referral.id);
            setSelectedReferral(referral.id);
            router.push(`/handover?id=${referral.id}`);
          },
        },
      ]
    );
  };

  const handleDecline = () => {
    Alert.alert(
      "Decline Referral",
      "Are you sure you want to decline this referral?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Decline",
          style: "destructive",
          onPress: () => {
            declineReferral(referral.id);
            router.push("/(tabs)/referrals");
          },
        },
      ]
    );
  };

  const getStatusTag = () => {
    if (referral.status === "Awaiting Provider Acceptance") {
      return <Tag variant="pending">New</Tag>;
    }
    return null;
  };

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
                  {referral.serviceType} – {referral.customer.name}
                </Text>
                {getStatusTag()}
              </View>
              <Text style={styles.small}>
                Referred by: Build&Fix s.c. • Customer: {referral.customer.name}
              </Text>
              <View style={styles.spacer} />
              {referral.estimatedValue && (
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Project value (est.)</Text>
                  <Text style={styles.value}>{referral.estimatedValue}</Text>
                </View>
              )}
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Connection fee</Text>
                <Text style={[styles.value, styles.bold]}>
                  {referral.connectionFee} PLN one-time
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Kickback on success</Text>
                <Text style={[styles.value, styles.bold]}>
                  {referral.kickbackPercent}% of final invoice
                </Text>
              </View>
              <View style={styles.spacer} />
              <Label>Customer brief</Label>
              <Text style={styles.small}>{referral.description}</Text>
              {!referral.customerContactsUnlocked && (
                <View style={styles.spacer} />
              )}
              {referral.customerContactsUnlocked && (
                <>
                  <View style={styles.spacer} />
                  <Label>Customer Contact (Unlocked)</Label>
                  <Text style={styles.small}>
                    {referral.customer.phone} • {referral.customer.email}
                  </Text>
                </>
              )}
              <View style={styles.actions}>
                {referral.status === "Awaiting Provider Acceptance" && (
                  <>
                    <Button variant="primary" onPress={handleAccept}>
                      Accept & pay fee
                    </Button>
                    <Button variant="secondary" onPress={handleDecline}>
                      Decline
                    </Button>
                  </>
                )}
                {referral.status === "Job In Progress" && (
                  <Button
                    variant="primary"
                    onPress={() => router.push(`/handover?id=${referral.id}`)}
                  >
                    View Details
                  </Button>
                )}
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
