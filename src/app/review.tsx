import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { StarRating } from "@/components/ui/StarRating";
import { useReferralStore } from "@/store/referralStore";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function ReviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const getReferral = useReferralStore((state) => state.getReferral);
  const submitReview = useReferralStore((state) => state.submitReview);
  const setSelectedReferral = useReferralStore((state) => state.setSelectedReferral);

  const [referral, setReferral] = useState(useReferralStore.getState().getReferral(id || ""));
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (id) {
      const ref = getReferral(id);
      if (ref) {
        setReferral(ref);
        setRating(ref.reviewRating || 0);
        setReviewText(ref.reviewText || "");
        setSelectedReferral(id);
      }
    }
  }, [id]);

  if (!referral) {
    return null;
  }

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Validation Error", "Please provide a rating");
      return;
    }

    submitReview(referral.id, rating, reviewText || undefined);

    Alert.alert(
      "Thank You!",
      "Your review has been submitted. You've unlocked a small reward!",
      [
        {
          text: "OK",
          onPress: () => {
            router.push("/(tabs)/payments");
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#0a0a0f", "#12121a", "#1a1a24"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.outerContainer}
    >
      <View style={styles.container}>
        <AppHeader subtitle="Customer view" badge="MVP • Mobile" />
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <Text style={styles.title}>Leave a Review</Text>

          <View style={styles.section}>
            <Card>
              <Label>Service Provider</Label>
              <Text style={[styles.value, styles.bold]}>{referral.provider}</Text>
              <Text style={styles.small}>
                Service: {referral.serviceType}
              </Text>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Rate your experience</Label>
              <View style={styles.ratingContainer}>
                <StarRating
                  rating={rating}
                  onRatingChange={setRating}
                  maxRating={5}
                  size={40}
                />
              </View>
              {rating > 0 && (
                <Text style={styles.ratingText}>
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                      ? "Great!"
                      : rating === 3
                        ? "Good"
                        : rating === 2
                          ? "Fair"
                          : "Poor"}
                </Text>
              )}
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Your review (optional)</Label>
              <TextInput
                style={styles.textInput}
                placeholder="Share your experience..."
                placeholderTextColor="#8a8a9a"
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              <Text style={styles.small}>
                Your feedback helps us improve our service.
              </Text>
            </Card>
          </View>

          <View style={styles.section}>
            <Card variant="glow">
              <Label>Reward</Label>
              <Text style={styles.small}>
                Complete your review to unlock a small reward!
              </Text>
            </Card>
          </View>

          <View style={styles.actions}>
            <Button variant="primary" onPress={handleSubmit}>
              Submit Review
            </Button>
            <Button variant="secondary" onPress={() => router.back()}>
              Skip
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
  ratingContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  ratingText: {
    fontSize: 16,
    color: "#00f5ff",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  textInput: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    fontSize: 14,
    minHeight: 120,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
});
