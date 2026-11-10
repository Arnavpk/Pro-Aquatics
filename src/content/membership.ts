import { tbc } from "@/lib/placeholder";
import type { FaqItem, MembershipCategory, MembershipPlan } from "@/types/content";

/**
 * Membership plans — every price, duration and benefit is a placeholder
 * until confirmed by the client. Add, remove or rename plans freely.
 */
export const membershipCategories: { id: MembershipCategory; label: string; short: string }[] = [
  { id: "badminton", label: "Badminton Membership", short: "Badminton" },
  { id: "swimming", label: "Swimming Membership", short: "Swimming" },
  { id: "combined", label: "Combined Sports Membership", short: "Combined" },
];

export const membershipPlans: MembershipPlan[] = [
  // Badminton
  {
    id: "bd-starter",
    category: "badminton",
    name: "Court Starter",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Badminton court access"],
    benefits: [tbc("Benefit"), tbc("Benefit")],
  },
  {
    id: "bd-regular",
    category: "badminton",
    name: "Court Regular",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Badminton court access", "Group sessions"],
    benefits: [tbc("Benefit"), tbc("Benefit"), tbc("Benefit")],
    featured: true,
  },
  {
    id: "bd-pro",
    category: "badminton",
    name: "Court Pro",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Badminton court access", "Group sessions", "Coaching"],
    benefits: [tbc("Benefit"), tbc("Benefit"), tbc("Benefit")],
  },
  // Swimming
  {
    id: "sw-starter",
    category: "swimming",
    name: "Pool Starter",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Pool access"],
    benefits: [tbc("Benefit"), tbc("Benefit")],
  },
  {
    id: "sw-regular",
    category: "swimming",
    name: "Pool Regular",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Pool access", "Swimming program"],
    benefits: [tbc("Benefit"), tbc("Benefit"), tbc("Benefit")],
    featured: true,
  },
  {
    id: "sw-pro",
    category: "swimming",
    name: "Pool Pro",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Pool access", "Swimming program", "Personal training"],
    benefits: [tbc("Benefit"), tbc("Benefit"), tbc("Benefit")],
  },
  // Combined
  {
    id: "cb-active",
    category: "combined",
    name: "Dual Active",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Badminton court access", "Pool access"],
    benefits: [tbc("Benefit"), tbc("Benefit")],
  },
  {
    id: "cb-performance",
    category: "combined",
    name: "Dual Performance",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Badminton court access", "Pool access", "Group sessions", "Swimming program"],
    benefits: [tbc("Benefit"), tbc("Benefit"), tbc("Benefit")],
    featured: true,
  },
  {
    id: "cb-family",
    category: "combined",
    name: "Dual Family",
    duration: tbc("Duration"),
    price: tbc("Price"),
    facilities: ["Badminton court access", "Pool access", "Multiple members"],
    benefits: [tbc("Benefit"), tbc("Benefit"), tbc("Benefit")],
  },
];

/** Comparison matrix — true / false / editable text per category. */
export const comparisonRows: {
  feature: string;
  values: Record<MembershipCategory, boolean | ReturnType<typeof tbc> | string>;
}[] = [
  { feature: "Badminton court access", values: { badminton: true, swimming: false, combined: true } },
  { feature: "Swimming pool access", values: { badminton: false, swimming: true, combined: true } },
  { feature: "Group sessions", values: { badminton: tbc("Included?"), swimming: tbc("Included?"), combined: tbc("Included?") } },
  { feature: "Coaching / training programs", values: { badminton: tbc("Included?"), swimming: tbc("Included?"), combined: tbc("Included?") } },
  { feature: "Priority booking requests", values: { badminton: tbc("Included?"), swimming: tbc("Included?"), combined: tbc("Included?") } },
  { feature: "Guest passes", values: { badminton: tbc("Included?"), swimming: tbc("Included?"), combined: tbc("Included?") } },
  { feature: "Starting price", values: { badminton: tbc("Price"), swimming: tbc("Price"), combined: tbc("Price") } },
];

export const membershipFaq: FaqItem[] = [
  {
    question: "How do I become a member?",
    answer:
      "Choose the membership that suits you and send a membership enquiry through our booking page, or visit the club at Keshavnagar. Our team will walk you through the plan details and complete your registration with you.",
  },
  {
    question: "What membership options are available?",
    answer:
      "We offer Badminton memberships, Swimming memberships and Combined Sports memberships that cover both. Each category has options to suit different levels of commitment: current plans, durations and prices are listed above and confirmed by our team on enquiry.",
  },
  {
    question: "How does booking work?",
    answer:
      "Use the booking page to send a request with your sport, session type, preferred date and time. A booking request is not a confirmed slot our team checks availability and contacts you to confirm.",
  },
  {
    question: "Can members participate in both sports?",
    answer:
      "Yes. The Combined Sports membership is designed for people who want to play badminton and swim. Single-sport members can also enquire about adding the other sport.",
  },
  {
    question: "How can I get membership details?",
    answer:
      "Send us a message through the contact page, submit a membership enquiry from the booking page, or speak to the team at the club. We'll share the latest plan details, inclusions and pricing.",
  },
];
