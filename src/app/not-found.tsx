import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-[clamp(4rem,15vw,9rem)] font-extrabold leading-none text-accent-ink">404</h1>
        <p className="mt-4 text-lg text-heading">This page doesn&rsquo;t exist or was moved.</p>
        <Link href="/" className="neu btn mt-10">
          <ArrowLeft size={16} aria-hidden /> Back to home
        </Link>
      </div>
    </main>
  );
}
