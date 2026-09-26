import "server-only";
import { z } from "zod";
import { SUPABASE_URL, MEDIA_BUCKET } from "@/lib/supabase/env";
import type { Field } from "./resources";
import { SECTION_KEYS, normalizeSections } from "@/lib/sections";

const mediaPrefix = () => `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/`;

/** Only local assets (/demo/...) or files from our own storage bucket are accepted for media. */
export function isAllowedMediaUrl(value: string) {
  if (/^\/(?!\/)[\w\-./]+$/.test(value) && !value.includes("..")) return true;
  return Boolean(SUPABASE_URL) && value.startsWith(mediaPrefix());
}

const media = z.string().trim().refine(isAllowedMediaUrl, "Please upload the file using the uploader.");
const httpUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => {
    try {
      const u = new URL(v);
      return u.protocol === "https:" || u.protocol === "http:";
    } catch {
      return false;
    }
  }, "Please enter a full URL starting with https://");

const safeJson = (v: unknown) => {
  try {
    return JSON.parse(String(v || "[]"));
  } catch {
    return null;
  }
};

const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === "" || v === undefined ? null : v), schema.nullable());

function fieldSchema(f: Field): z.ZodTypeAny {
  let s: z.ZodTypeAny;
  switch (f.type) {
    case "number": {
      let n = z.coerce.number({ message: `${f.label} must be a number.` }).int();
      if (f.min !== undefined) n = n.min(f.min);
      if (f.max !== undefined) n = n.max(f.max);
      return f.required ? n : z.preprocess((v) => (v === "" ? 0 : v), n);
    }
    case "boolean":
      return z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());
    case "select":
      s = z.enum((f.options ?? []).map((o) => o.value) as [string, ...string[]]);
      break;
    case "slug":
      s = z
        .string()
        .trim()
        .min(1, "Slug is required.")
        .max(100)
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only.");
      break;
    case "color":
      s = z.string().trim().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Use a hex colour like #ff014f.");
      break;
    case "date":
      s = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date.");
      break;
    case "email":
      s = z.string().trim().email("Enter a valid email.").max(120);
      break;
    case "url":
      s = httpUrl;
      break;
    case "image":
    case "file":
      s = media;
      break;
    case "gallery":
      return z.preprocess(safeJson, z.array(media).max(12));
    case "list":
      return z.preprocess(
        (v) =>
          String(v ?? "")
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean),
        z.array(z.string().max(200)).max(30)
      );
    case "links":
      return z.preprocess(
        safeJson,
        z.array(z.object({ platform: z.string().trim().min(1).max(30), url: httpUrl })).max(12)
      );
    case "tools":
      return z.preprocess(
        safeJson,
        z.array(z.object({ name: z.string().trim().min(1).max(40), icon: z.string().trim().min(1).max(30) })).max(8)
      );
    case "sections":
      return z.preprocess(
        safeJson,
        z
          .array(z.object({ key: z.enum(SECTION_KEYS as [string, ...string[]]), visible: z.boolean() }))
          .max(SECTION_KEYS.length)
          .transform((v) => normalizeSections(v))
      );
    default: {
      let t = z.string().trim();
      if (f.maxLength) t = t.max(f.maxLength, `${f.label} is too long (max ${f.maxLength} characters).`);
      s = t;
    }
  }
  if (f.required) {
    return s instanceof z.ZodString ? s.min(1, `${f.label} is required.`) : s;
  }
  return optional(s);
}

export function buildSchema(fields: Field[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) shape[f.name] = fieldSchema(f);
  return z.object(shape);
}

export function formToObject(fields: Field[], formData: FormData) {
  const obj: Record<string, unknown> = {};
  for (const f of fields) {
    // Checkboxes post a hidden "false" plus "true" when ticked.
    obj[f.name] = f.type === "boolean" ? formData.getAll(f.name).includes("true") : formData.get(f.name) ?? "";
  }
  return obj;
}

export function collectErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    errors[key] ??= issue.message;
  }
  return errors;
}
