import type { LucideIcon } from "lucide-react";
import type { Editable } from "@/lib/placeholder";

export type Sport = "badminton" | "swimming";
export type MembershipCategory = Sport | "combined";

export interface MediaImage {
  src: string;
  alt: string;
  credit?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Stat {
  label: string;
  value: Editable<number>;
  suffix?: string;
}

export interface SpecItem {
  label: string;
  value: Editable;
  note?: string;
  icon: LucideIcon;
}

export interface Program {
  slug: string;
  level: string;
  title: string;
  summary: string;
  focus: string[];
  image: MediaImage;
  details: { label: string; value: Editable }[];
}

export interface CoachProfile {
  name: Editable;
  role: string;
  qualifications: Editable;
}

export interface MembershipPlan {
  id: string;
  category: MembershipCategory;
  name: string;
  duration: Editable;
  price: Editable;
  facilities: string[];
  benefits: Editable[];
  featured?: boolean;
}

export interface GalleryItem extends MediaImage {
  caption: string;
  tag?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
