import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { useReferralStore } from "@/store/referralStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const referrals = useReferralStore((state) => state.referrals);

  // Get the most recent referral (sorted by createdAt, most recent first)
  const recentReferral = referrals.length > 0
    ? [...referrals].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;

  const getStatusTag = (status: string, jobStatus?: string) => {
    if (status === "Completed / Kickback Released") {
      return <Tag variant="success">Completed</Tag>;
    } else if (status === "Job In Progress") {
      if (jobStatus === "Job confirmed") {
        return <Tag variant="success">Job confirmed</Tag>;
      }
      return <Tag variant="success">In Progress</Tag>;
    } else if (status === "Awaiting Provider Acceptance") {
      return <Tag variant="pending">Awaiting acceptance</Tag>;
    } else if (status === "Declined") {
      return <Tag variant="pending">Declined</Tag>;
    }
    return <Tag variant="pending">{status}</Tag>;
  };

  const handleViewReferral = () => {
    if (recentReferral) {
      router.push(`/handover?id=${recentReferral.id}`);
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
              {recentReferral ? (
                <>
                  <View style={styles.listItemHeader}>
                    <Text style={[styles.value, styles.bold]}>
                      {recentReferral.serviceType} – {recentReferral.customer.name}
                    </Text>
                    {getStatusTag(recentReferral.status, recentReferral.jobStatus)}
                  </View>
                  <Text style={styles.small}>
                    Provider: {recentReferral.provider} • Kickback {recentReferral.kickbackPercent}%
                  </Text>
                  <View style={styles.actions}>
                    <Button variant="secondary" onPress={handleViewReferral}>
                      View referral
                    </Button>
                  </View>
                </>
              ) : (
                <Text style={styles.small}>No referrals yet. Create your first referral!</Text>
              )}
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
