import { create } from "zustand";

export type UserType = "normal" | "business";

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  phone?: string;
  businessName?: string; // For business users
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, userType: UserType, phone?: string, businessName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getCurrentUser: () => User | null;
}

// Static user database (in-memory)
const staticUsers: Array<User & { password: string }> = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
    userType: "normal",
    phone: "+48 600 000 000",
  },
  {
    id: "2",
    email: "business@example.com",
    password: "password123",
    name: "Jane Smith",
    userType: "business",
    phone: "+48 500 000 000",
    businessName: "Clean&Fix Sp. z o.o.",
  },
];

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = staticUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    // Remove password before storing user
    const { password: _, ...userWithoutPassword } = user;

    set({
      user: userWithoutPassword,
      isAuthenticated: true,
    });

    return { success: true };
  },

  register: async (
    email: string,
    password: string,
    name: string,
    userType: UserType,
    phone?: string,
    businessName?: string
  ) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = staticUsers.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      email,
      password,
      name,
      userType,
      phone,
      businessName: userType === "business" ? businessName : undefined,
    };

    staticUsers.push(newUser);

    // Remove password before storing user
    const { password: _, ...userWithoutPassword } = newUser;

    set({
      user: userWithoutPassword,
      isAuthenticated: true,
    });

    return { success: true };
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  getCurrentUser: () => {
    return get().user;
  },
}));

