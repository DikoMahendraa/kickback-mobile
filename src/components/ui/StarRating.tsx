import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  size?: number;
}

export function StarRating({
  rating,
  onRatingChange,
  maxRating = 5,
  size = 32,
}: StarRatingProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        return (
          <Pressable
            key={starValue}
            onPress={() => onRatingChange(starValue)}
            style={styles.starButton}
          >
            <Text
              style={[
                styles.star,
                { fontSize: size },
                isFilled ? styles.starFilled : styles.starEmpty,
              ]}
            >
              {isFilled ? "★" : "☆"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  star: {
    color: "#ffd700",
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  starFilled: {
    color: "#ffd700",
  },
  starEmpty: {
    color: "#8a8a9a",
  },
});
