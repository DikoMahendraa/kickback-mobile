import React from "react";
import { useRouter } from "expo-router";

import SignUpScreen from "@/components/screen/auth/sign-up";

export default function SignUp() {
  const router = useRouter();
  
  return (
    <SignUpScreen
      onSuccess={() => router.back()}
      onSwitchToLogin={() => router.push("/(auth)/sign-in")}
    />
  );
}
