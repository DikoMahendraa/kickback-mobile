import { create } from "zustand";

export type ReferralStatus =
  | "Awaiting Provider Acceptance"
  | "Job In Progress"
  | "Completed / Kickback Released"
  | "Declined";

export type PaymentStatus = "Awaiting payment" | "Paid";

export type JobStatus =
  | "Intro call scheduled"
  | "Offer sent"
  | "Job confirmed"
  | "Job completed";

export interface Customer {
  name: string;
  phone: string;
  email: string;
}

export interface Referral {
  id: string;
  customer: Customer;
  serviceType: string;
  provider: string;
  providerId?: string;
  description: string;
  connectionFee: number;
  estimatedValue?: string;
  status: ReferralStatus;
  jobStatus?: JobStatus;
  invoiceAmount?: number;
  kickbackPercent: number;
  kickbackAmount?: number;
  invoiceFile?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
  connectionFeePaid?: boolean;
  customerContactsUnlocked?: boolean;
  kickbackReleased?: boolean;
  reviewSubmitted?: boolean;
  reviewRating?: number;
  reviewText?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReferralStore {
  referrals: Referral[];
  selectedReferralId: string | null;
  
  // Actions
  createReferral: (referral: Omit<Referral, "id" | "status" | "createdAt" | "updatedAt">) => string;
  updateReferral: (id: string, updates: Partial<Referral>) => void;
  acceptReferral: (id: string) => void;
  declineReferral: (id: string) => void;
  payConnectionFee: (id: string) => void;
  uploadInvoice: (id: string, amount: number, file?: string) => void;
  markPaymentAsPaid: (id: string, method: string) => void;
  submitReview: (id: string, rating: number, text?: string) => void;
  setSelectedReferral: (id: string | null) => void;
  getReferral: (id: string) => Referral | undefined;
}

// Dummy providers
const DUMMY_PROVIDERS = [
  { id: "1", name: "Jan Nowak – Painter" },
  { id: "2", name: "Clean&Fix Sp. z o.o." },
  { id: "3", name: "AquaFix Sp. z o.o." },
  { id: "4", name: "BuildPro" },
];

export const useReferralStore = create<ReferralStore>((set, get) => ({
  referrals: [
    // Dummy data for initial state
    {
      id: "1",
      customer: {
        name: "Anna Kowalska",
        phone: "+48 600 000 000",
        email: "anna@example.com",
      },
      serviceType: "Painting",
      provider: "Jan Nowak – Painter",
      providerId: "1",
      description: "Painting 2 rooms, minor repairs. You manage dates and offer directly with the customer.",
      connectionFee: 150,
      estimatedValue: "8 000 – 10 000 PLN",
      status: "Job In Progress",
      jobStatus: "Job confirmed",
      kickbackPercent: 10,
      connectionFeePaid: true,
      customerContactsUnlocked: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      customer: {
        name: "Emergency Customer",
        phone: "+48 500 000 000",
        email: "emergency@example.com",
      },
      serviceType: "Plumbing",
      provider: "AquaFix Sp. z o.o.",
      providerId: "3",
      description: "Emergency plumbing repair needed",
      connectionFee: 200,
      status: "Awaiting Provider Acceptance",
      kickbackPercent: 10,
      connectionFeePaid: false,
      customerContactsUnlocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  selectedReferralId: null,

  createReferral: (referralData) => {
    const id = `ref-${Date.now()}`;
    const newReferral: Referral = {
      ...referralData,
      id,
      status: "Awaiting Provider Acceptance",
      kickbackPercent: referralData.kickbackPercent || 10,
      connectionFeePaid: false,
      customerContactsUnlocked: false,
      kickbackReleased: false,
      reviewSubmitted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      referrals: [...state.referrals, newReferral],
    }));

    return id;
  },

  updateReferral: (id, updates) => {
    set((state) => ({
      referrals: state.referrals.map((ref) =>
        ref.id === id
          ? { ...ref, ...updates, updatedAt: new Date().toISOString() }
          : ref
      ),
    }));
  },

  acceptReferral: (id) => {
    const referral = get().referrals.find((r) => r.id === id);
    if (!referral) return;

    set((state) => ({
      referrals: state.referrals.map((ref) =>
        ref.id === id
          ? {
              ...ref,
              status: "Job In Progress",
              jobStatus: "Intro call scheduled",
              updatedAt: new Date().toISOString(),
            }
          : ref
      ),
    }));
  },

  declineReferral: (id) => {
    set((state) => ({
      referrals: state.referrals.map((ref) =>
        ref.id === id
          ? {
              ...ref,
              status: "Declined",
              updatedAt: new Date().toISOString(),
            }
          : ref
      ),
    }));
  },

  payConnectionFee: (id) => {
    set((state) => ({
      referrals: state.referrals.map((ref) =>
        ref.id === id
          ? {
              ...ref,
              connectionFeePaid: true,
              customerContactsUnlocked: true,
              updatedAt: new Date().toISOString(),
            }
          : ref
      ),
    }));
  },

  uploadInvoice: (id, amount, file) => {
    const referral = get().referrals.find((r) => r.id === id);
    if (!referral) return;

    const kickbackAmount = (amount * referral.kickbackPercent) / 100;

    set((state) => ({
      referrals: state.referrals.map((ref) =>
        ref.id === id
          ? {
              ...ref,
              invoiceAmount: amount,
              kickbackAmount,
              invoiceFile: file,
              updatedAt: new Date().toISOString(),
            }
          : ref
      ),
    }));
  },

  markPaymentAsPaid: (id, method) => {
    const referral = get().referrals.find((r) => r.id === id);
    if (!referral) return;

    // Auto-trigger kickback payout when payment is marked as paid
    set((state) => ({
      referrals: state.referrals.map((ref) =>
        ref.id === id
          ? {
              ...ref,
              paymentStatus: "Paid",
              paymentMethod: method,
              kickbackReleased: true,
              status: "Completed / Kickback Released",
              updatedAt: new Date().toISOString(),
            }
          : ref
      ),
    }));
  },

  submitReview: (id, rating, text) => {
    set((state) => ({
      referrals: state.referrals.map((ref) =>
        ref.id === id
          ? {
              ...ref,
              reviewSubmitted: true,
              reviewRating: rating,
              reviewText: text,
              updatedAt: new Date().toISOString(),
            }
          : ref
      ),
    }));
  },

  setSelectedReferral: (id) => {
    set({ selectedReferralId: id });
  },

  getReferral: (id) => {
    return get().referrals.find((r) => r.id === id);
  },
}));
