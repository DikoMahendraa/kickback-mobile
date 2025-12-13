import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import InputField from "@/components/ui/input/InputField";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SignInScreenProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function SignInScreen({ onSuccess, onSwitchToRegister }: SignInScreenProps) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (onSuccess) {
        onSuccess();
      } else {
        router.back();
      }
    } else {
      Alert.alert("Login Failed", result.error || "Invalid credentials");
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
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Welcome back! Please sign in to continue.</Text>

          <View style={styles.section}>
            <Card>
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
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </Card>
          </View>

          <View style={styles.actions}>
            <Button variant="primary" onPress={handleLogin} style={styles.fullWidth}>
              {loading ? "Signing in..." : "Sign In →"}
            </Button>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>{`Don't`} have an account? </Text>
            <TouchableOpacity onPress={onSwitchToRegister}>
              <Text style={styles.switchLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Demo Accounts:</Text>
            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => {
                setEmail("user@example.com");
                setPassword("password123");
              }}
            >
              <Text style={styles.demoText}>Normal User: user@example.com</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => {
                setEmail("business@example.com");
                setPassword("password123");
              }}
            >
              <Text style={styles.demoText}>Business User: business@example.com</Text>
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
    width: "100%"
  },
  container: {
    flex: 1,
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
  demoContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: "rgba(0, 245, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.2)",
  },
  demoTitle: {
    fontSize: 12,
    color: "#8a8a9a",
    marginBottom: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  demoButton: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  demoText: {
    fontSize: 13,
    color: "#b8b8c8",
  },
});
