import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { useReferralStore } from "@/store/referralStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

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
      className="flex-1 items-center"
    >
      <View className="flex-1 max-w-[430px] w-full">
        <AppHeader subtitle="Referrer view" badge="MVP • Mobile" />
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
          <Text className="mt-2 text-2xl font-bold text-white tracking-wide mb-2" style={{ textShadowColor: "rgba(0, 245, 255, 0.3)", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 }}>
            Referrals
          </Text>

          <View className="mb-4">
            {referrals.length === 0 ? (
              <Card>
                <Text className="text-xs text-text-tertiary mt-1.5 leading-[18px]">No referrals yet. Create your first referral!</Text>
              </Card>
            ) : (
              referrals.map((referral) => (
                <Card
                  key={referral.id}
                  variant={referral.status === "Job In Progress" ? "glow" : undefined}
                >
                  <View className="gap-2 mb-1.5">
                    <Text className="text-[15px] leading-[22px] font-semibold text-white">
                      {referral.serviceType} – {referral.customer.name}
                    </Text>
                    <View>
                      {getStatusTag(referral.status)}</View>
                  </View>
                  <Text className="text-xs text-text-tertiary mt-1.5 leading-[18px]">
                    {referral.status === "Awaiting Provider Acceptance"
                      ? `Connection fee ${referral.connectionFee} PLN • ${referral.provider}`
                      : referral.kickbackAmount
                        ? `Kickback ${referral.kickbackPercent}% • ${referral.kickbackAmount.toFixed(2)} PLN`
                        : `Kickback ${referral.kickbackPercent}% • Expected ${((referral.estimatedValue ? parseFloat(referral.estimatedValue.split("–")[0].replace(/[^0-9.]/g, "")) : 9000) * referral.kickbackPercent) / 100} PLN`}
                  </Text>
                  <View className="flex-row gap-2 mt-4 flex-wrap">
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

