import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types/content";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="neu neu-hover group h-full p-5 sm:p-7">
      <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-none" aria-label={`Read: ${post.title}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
          <Image src={post.cover_image_url} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div className="mt-6 flex items-center justify-between text-[13px]">
          <span className="font-medium uppercase tracking-[1.5px] text-accent-ink">{post.category}</span>
          <span className="inline-flex items-center gap-1.5 text-muted">
            <Clock size={14} aria-hidden /> {post.read_time}
          </span>
        </div>
        <h3 className="mt-3 flex items-start gap-2 font-heading text-xl font-medium leading-snug transition-colors group-hover:text-accent-ink">
          <span>{post.title}</span>
          <ArrowUpRight size={20} className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
        </h3>
      </Link>
    </article>
  );
}
