"use client";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function CounselorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="COUNSELOR">{children}</DashboardLayout>;
}
