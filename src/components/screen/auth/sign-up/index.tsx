import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import InputField from "@/components/ui/input/InputField";
import { Label } from "@/components/ui/Label";
import { useAuthStore, UserType } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SignUpScreenProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function SignUpScreen({ onSuccess, onSwitchToLogin }: SignUpScreenProps) {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<UserType>("normal");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    if (userType === "business" && !businessName) {
      Alert.alert("Validation Error", "Please enter your business name");
      return;
    }

    setLoading(true);
    const result = await register(email, password, name, userType, phone || undefined, businessName || undefined);
    setLoading(false);

    if (result.success) {
      if (onSuccess) {
        onSuccess();
      } else {
        router.back();
      }
    } else {
      Alert.alert("Registration Failed", result.error || "Could not create account");
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
        <AppHeader subtitle="Authentication" badge="MVP • Mobile" />
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create an account to start referring customers.</Text>

          <View style={styles.section}>
            <Card>
              <Label>Account Type</Label>
              <View style={styles.userTypeContainer}>
                <Pressable
                  style={[
                    styles.userTypeButton,
                    userType === "normal" && styles.userTypeButtonActive,
                  ]}
                  onPress={() => setUserType("normal")}
                >
                  <Text
                    style={[
                      styles.userTypeText,
                      userType === "normal" && styles.userTypeTextActive,
                    ]}
                  >
                    Normal User
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.userTypeButton,
                    userType === "business" && styles.userTypeButtonActive,
                  ]}
                  onPress={() => setUserType("business")}
                >
                  <Text
                    style={[
                      styles.userTypeText,
                      userType === "business" && styles.userTypeTextActive,
                    ]}
                  >
                    Business
                  </Text>
                </Pressable>
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Card>
              <View style={styles.field}>
                <InputField
                  label="Full Name"
                  placeholder="John Doe"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.field}>
                <InputField
                  label="Email"
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.field}>
                <InputField
                  label="Password"
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <View style={styles.field}>
                <InputField
                  label="Phone (Optional)"
                  placeholder="+48 ..."
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
              {userType === "business" && (
                <View style={styles.field}>
                  <InputField
                    label="Business Name"
                    placeholder="Your Business Name"
                    value={businessName}
                    onChangeText={setBusinessName}
                  />
                </View>
              )}
            </Card>
          </View>

          <View style={styles.actions}>
            <Button variant="primary" onPress={handleRegister} style={styles.fullWidth}>
              {loading ? "Creating account..." : "Create Account →"}
            </Button>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <TouchableOpacity onPress={onSwitchToLogin}>
              <Text style={styles.switchLink}>Sign In</Text>
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
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
    marginBottom: 8,
    textShadowColor: "rgba(0, 245, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#8a8a9a",
    marginBottom: 24,
    lineHeight: 20,
  },
  section: {
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  userTypeContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  userTypeButtonActive: {
    backgroundColor: "rgba(0, 245, 255, 0.15)",
    borderColor: "rgba(0, 245, 255, 0.5)",
  },
  userTypeText: {
    fontSize: 14,
    color: "#8a8a9a",
    fontWeight: "500",
  },
  userTypeTextActive: {
    color: "#00f5ff",
    fontWeight: "600",
  },
  actions: {
    marginTop: 8,
  },
  fullWidth: {
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  switchText: {
    fontSize: 14,
    color: "#8a8a9a",
  },
  switchLink: {
    fontSize: 14,
    color: "#00f5ff",
    fontWeight: "600",
  },
});
