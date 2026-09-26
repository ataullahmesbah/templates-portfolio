import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resources } from "@/lib/admin/resources";
import { PageHeader } from "@/components/admin/ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { saveResource } from "@/actions/admin";

type Props = { params: Promise<{ resource: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { resource, id } = await params;
  const r = resources[resource];
  return { title: r ? `${id === "new" ? "New" : "Edit"} ${r.singular.toLowerCase()}` : "Not found" };
}

const defaults: Record<string, Record<string, unknown>> = {
  projects: { status: "published", year: new Date().getFullYear(), likes: 0, sort_order: 0, gallery: [] },
  services: { active: true, icon_key: "sparkles", sort_order: 0 },
  resume: { type: "experience", active: true, sort_order: 0 },
  skills: { level: 80, active: true, sort_order: 0 },
  testimonials: { rating: 5, active: true, sort_order: 0 },
  clients: { category: "Brand", active: true, sort_order: 0 },
  awards: { active: true, sort_order: 0, year: String(new Date().getFullYear()) },
  pricing: { cta_label: "Order Now", active: true, sort_order: 0, features: [] },
  blog: { status: "published", read_time: "3 min read", published_at: new Date().toISOString().slice(0, 10) },
};

export default async function ResourceEdit({ params }: Props) {
  await requireAdmin();
  const { resource: key, id } = await params;
  const resource = resources[key];
  if (!resource) notFound();

  const isNew = id === "new";
  let values: Record<string, unknown> = defaults[key] ?? {};
  if (!isNew) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from(resource.table).select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    values = data;
  }

  return (
    <>
      <Link href={`/admin/${key}`} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-heading">
        <ArrowLeft size={15} /> {resource.label}
      </Link>
      <PageHeader title={isNew ? `New ${resource.singular.toLowerCase()}` : `Edit ${resource.singular.toLowerCase()}`} description={resource.description} />
      <ResourceForm
        fields={resource.fields}
        values={values}
        action={saveResource.bind(null, key, isNew ? null : id)}
        cancelHref={`/admin/${key}`}
        submitLabel={isNew ? `Create ${resource.singular.toLowerCase()}` : "Save changes"}
      />
    </>
  );
}
