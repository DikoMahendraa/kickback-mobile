import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { useReferralStore } from "@/store/referralStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ReferralsScreen() {
  const router = useRouter();
  const referrals = useReferralStore((state) => state.referrals);
  const setSelectedReferral = useReferralStore((state) => state.setSelectedReferral);

  const getStatusTag = (status: string) => {
    if (status === "Completed / Kickback Released") {
      return <Tag variant="success">Completed</Tag>;
    } else if (status === "Job In Progress") {
      return <Tag variant="success">Job confirmed</Tag>;
    } else if (status === "Awaiting Provider Acceptance") {
      return <Tag variant="pending">Awaiting acceptance</Tag>;
    } else if (status === "Declined") {
      return <Tag variant="pending">Declined</Tag>;
    }
    return <Tag variant="pending">{status}</Tag>;
  };

  const handleOpenReferral = (id: string, status: string) => {
    setSelectedReferral(id);
    if (status === "Awaiting Provider Acceptance") {
      router.push(`/provider-accepts?id=${id}`);
    } else if (status === "Job In Progress") {
      router.push(`/handover?id=${id}`);
    } else {
      router.push(`/handover?id=${id}`);
    }
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
          <Text style={styles.title}>Referrals</Text>

          <View style={styles.section}>
            {referrals.length === 0 ? (
              <Card>
                <Text style={styles.small}>No referrals yet. Create your first referral!</Text>
              </Card>
            ) : (
              referrals.map((referral) => (
                <Card
                  key={referral.id}
                  variant={referral.status === "Job In Progress" ? "glow" : undefined}
                >
                  <View style={styles.listItemHeader}>
                    <Text style={[styles.value, styles.bold]}>
                      {referral.serviceType} – {referral.customer.name}
                    </Text>
                    {getStatusTag(referral.status)}
                  </View>
                  <Text style={styles.small}>
                    {referral.status === "Awaiting Provider Acceptance"
                      ? `Connection fee ${referral.connectionFee} PLN • ${referral.provider}`
                      : referral.kickbackAmount
                        ? `Kickback ${referral.kickbackPercent}% • ${referral.kickbackAmount.toFixed(2)} PLN`
                        : `Kickback ${referral.kickbackPercent}% • Expected ${((referral.estimatedValue ? parseFloat(referral.estimatedValue.split("–")[0].replace(/[^0-9.]/g, "")) : 9000) * referral.kickbackPercent) / 100} PLN`}
                  </Text>
                  <View style={styles.actions}>
                    <Button
                      variant="secondary"
                      onPress={() => handleOpenReferral(referral.id, referral.status)}
                    >
                      {referral.status === "Awaiting Provider Acceptance" ? "Preview" : "Open"}
                    </Button>
                  </View>
                </Card>
              ))
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
