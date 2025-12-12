import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import DatePicker from "@/components/ui/input/DatePicker";
import { Label } from "@/components/ui/Label";
import { useReferralStore, type JobStatus } from "@/store/referralStore";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HandoverScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const getReferral = useReferralStore((state) => state.getReferral);
  const updateReferral = useReferralStore((state) => state.updateReferral);
  const setSelectedReferral = useReferralStore((state) => state.setSelectedReferral);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [referral, setReferral] = useState(useReferralStore.getState().getReferral(id || ""));

  useEffect(() => {
    if (id) {
      const ref = getReferral(id);
      if (ref) {
        setReferral(ref);
        setJobStatus(ref.jobStatus || null);
        setSelectedReferral(id);
      }
    } else {
      // If no ID provided, try to get the most recent referral
      const referrals = useReferralStore.getState().referrals;
      if (referrals.length > 0) {
        const mostRecent = [...referrals].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        setReferral(mostRecent);
        setJobStatus(mostRecent.jobStatus || null);
        setSelectedReferral(mostRecent.id);
      }
    }
  }, [id, getReferral, setSelectedReferral]);

  if (!referral) {
    return (
      <LinearGradient
        colors={["#0a0a0f", "#12121a", "#1a1a24"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.outerContainer}
      >
        <View style={styles.container}>
          <AppHeader subtitle="Provider view" badge="MVP • Mobile" />
          <View style={[styles.body, styles.bodyContent, { justifyContent: "center", alignItems: "center" }]}>
            <Text style={[styles.title, { textAlign: "center", marginBottom: 16 }]}>Referral Not Found</Text>
            <Text style={[styles.value, { textAlign: "center", marginBottom: 24 }]}>
              The referral you are looking for does not exist or has been removed.
            </Text>
            <Button variant="secondary" onPress={() => router.back()}>
              Go Back
            </Button>
          </View>
        </View>
      </LinearGradient>
    );
  }

  const jobStatusOptions: JobStatus[] = [
    "Intro call scheduled",
    "Offer sent",
    "Job confirmed",
    "Job completed",
  ];

  const handleStatusChange = (status: JobStatus) => {
    setJobStatus(status);
    updateReferral(referral.id, { jobStatus: status });
  };

  const handleMarkAsDone = () => {
    router.push(`/invoice?id=${referral.id}`);
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
          <Text style={styles.title}>Customer Handover</Text>

          <View style={styles.section}>
            <Card>
              <Label>Customer</Label>
              <Text style={[styles.value, styles.bold]}>{referral.customer.name}</Text>
              {referral.customerContactsUnlocked ? (
                <Text style={styles.small}>
                  {referral.customer.phone} • {referral.customer.email}
                </Text>
              ) : (
                <Text style={[styles.small, { color: "#ff6b6b" }]}>
                  Contact details locked. Pay connection fee to unlock.
                </Text>
              )}
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Service</Label>
              <Text style={styles.small}>{referral.description}</Text>
              <View style={styles.spacer} />
              <View style={styles.field}>
                <DatePicker
                  label="Planned start date"
                  placeholder="dd/mm/yyyy"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  minimumDate={new Date()}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Status</Text>
                <ControlledDropdown
                  data={jobStatusOptions}
                  placeholder="Select status"
                  value={jobStatus}
                  onSelect={handleStatusChange}
                />
              </View>
              <Text style={styles.small}>
                Referrer sees status, not your exact pricing. Kickback is
                calculated from final invoice only.
              </Text>
            </Card>
          </View>

          <View style={styles.actions}>
            <Button variant="primary" onPress={handleMarkAsDone}>
              Mark job as done →
            </Button>
            <Button variant="secondary" onPress={() => router.back()}>
              Back
            </Button>
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

// Controlled Dropdown Component
interface ControlledDropdownProps {
  data: JobStatus[];
  placeholder?: string;
  value: JobStatus | null;
  onSelect: (value: JobStatus) => void;
}

function ControlledDropdown({ data, placeholder, value, onSelect }: ControlledDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ width: "100%" }}>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
        onPress={() => setIsOpen(true)}
      >
        <Text style={{ color: value ? "#b8b8c8" : "#8a8a9a" }}>
          {value ?? placeholder}
        </Text>
        <Text style={{ color: "#8a8a9a" }}>▼</Text>
      </Pressable>

      {isOpen && (
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            onPress={() => setIsOpen(false)}
          >
            <Pressable
              style={{
                width: "85%",
                borderRadius: 16,
                padding: 16,
                backgroundColor: "#1a1a24",
                borderWidth: 1,
                borderColor: "rgba(0, 245, 255, 0.3)",
              }}
              onPress={(e) => e.stopPropagation()}
            >
              <ScrollView style={{ maxHeight: 300 }}>
                {data.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => {
                      onSelect(item);
                      setIsOpen(false);
                    }}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: value === item ? "rgba(0, 245, 255, 0.15)" : "transparent",
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: value === item ? "#00f5ff" : "#b8b8c8",
                        fontWeight: value === item ? "600" : "400",
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable
                onPress={() => setIsOpen(false)}
                style={{ marginTop: 12, alignItems: "flex-end" }}
              >
                <Text style={{ color: "#00f5ff", fontWeight: "600" }}>Close</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}
