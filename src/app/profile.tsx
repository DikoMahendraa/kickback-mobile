import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const resetStore = useAuthStore((state) => state.resetStore);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/(auth)/sign-in");
          },
        },
      ]
    );
  };

  const handleBack = () => {
    router.back();
  }

  const handleSwitchAccount = () => {
    Alert.alert(
      "Switch Account",
      "This will logout and clear all data. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Switch Account",
          style: "destructive",
          onPress: () => {
            resetStore();
            router.replace("/(auth)/sign-in");
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <LinearGradient
        colors={["#0a0a0f", "#12121a", "#1a1a24"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.outerContainer}
      >
        <View style={styles.container}>
          <AppHeader title="Profile" />
          <View style={styles.body}>
            <Text style={styles.errorText}>No user found. Please login.</Text>
            <Button href="/(auth)/sign-in" variant="primary" style={styles.button}>
              Go to Login
            </Button>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#0a0a0f", "#12121a", "#1a1a24"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.outerContainer}
    >
      <View style={styles.container}>
        <AppHeader title="Profile" />
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <View style={styles.section}>
            <Card variant="glow">
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
                  </View>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{user.name}</Text>
                  <Text style={styles.profileEmail}>{user.email}</Text>
                  {user.userType === "business" && user.businessName && (
                    <Text style={styles.profileBusiness}>{user.businessName}</Text>
                  )}
                  <View style={styles.userTypeBadge}>
                    <Text style={styles.userTypeText}>
                      {user.userType === "business" ? "Business" : "Normal"} User
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Account Information</Label>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
              {user.phone && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Phone:</Text>
                  <Text style={styles.infoValue}>{user.phone}</Text>
                </View>
              )}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Account Type:</Text>
                <Text style={styles.infoValue}>
                  {user.userType === "business" ? "Business" : "Normal"}
                </Text>
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <Label>Actions</Label>
              <View style={styles.actions}>
                <Button variant="secondary" onPress={handleLogout} style={styles.actionButton}>
                  Logout
                </Button>
                <Button variant="secondary" onPress={handleSwitchAccount} style={styles.actionButton}>
                  Switch Account
                </Button>
              </View>
            </Card>
            <TouchableOpacity onPress={handleBack} className="w-full gap-2 border border-gray-800 flex items-center flex-row justify-center py-3 rounded-lg">
              <Text><ArrowLeft color="#ffffff" size={14} /></Text> <Text className="text-white">Back</Text>
            </TouchableOpacity>
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
  section: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 245, 255, 0.2)",
    borderWidth: 2,
    borderColor: "rgba(0, 245, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#00f5ff",
    letterSpacing: 1,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#b8b8c8",
    marginBottom: 4,
  },
  profileBusiness: {
    fontSize: 14,
    color: "#00f5ff",
    marginBottom: 8,
  },
  userTypeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 245, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.3)",
  },
  userTypeText: {
    fontSize: 10,
    color: "#00f5ff",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  infoLabel: {
    fontSize: 14,
    color: "#b8b8c8",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
  actions: {
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    width: "100%",
  },
  errorText: {
    fontSize: 16,
    color: "#b8b8c8",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
