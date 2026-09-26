import { Suspense } from "react";
import { AdminShell } from "@/components/admin/shell";
import { ToastProvider } from "@/components/admin/toast";
import { SetupRequired } from "@/components/admin/setup-required";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProfile, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) return <SetupRequired />;
  const admin = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const [settings, profile, { count }] = await Promise.all([
    getSettings(),
    getProfile(),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false),
  ]);

  return (
    <Suspense>
      <ToastProvider>
        <AdminShell
          siteName={settings.website_name}
          logo={settings.logo_url || profile.profile_image_url}
          user={{ name: admin.displayName, email: admin.email, avatar: admin.avatarUrl, role: admin.role }}
          unread={count ?? 0}
        >
          {children}
        </AdminShell>
      </ToastProvider>
    </Suspense>
  );
}
