import React from "react";
import { useRouter } from "expo-router";

import SignInScreen from "@/components/screen/auth/sign-in";

export default function SignIn() {
  const router = useRouter();
  
  return (
    <SignInScreen
      onSuccess={() => router.back()}
      onSwitchToRegister={() => router.push("/(auth)/sign-up")}
    />
  );
}
