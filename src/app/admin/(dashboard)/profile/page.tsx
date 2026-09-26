import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { profileFields } from "@/lib/admin/resources";
import { demoProfile } from "@/data/demo";
import { PageHeader } from "@/components/admin/ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { saveProfile } from "@/actions/admin";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("profile").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
  return (
    <>
      <PageHeader title="Profile" description="Your name, intro, photos, CV and social links — used in the hero, contact card and SEO." />
      <ResourceForm fields={profileFields} values={data ?? demoProfile} action={saveProfile} />
    </>
  );
}
