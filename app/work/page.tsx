
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PortfolioGallery from "@/components/portfolio/portfolio-gallery";

export const metadata = {
  title: "Selected Work | Labib Cinecraft",
  description:
    "Explore photography, cinematography, and wedding projects by Labib Cinecraft.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-[#F2EFE8]">
      <header className="container-studio border-b border-white/10 py-7">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-wider text-white/70 transition hover:text-[#C5AD86]"
        >
          <ArrowLeft size={15} />
          BACK TO HOME
        </Link>
      </header>

      <section className="container-studio pb-8 pt-20 md:pb-12 md:pt-28">
        <p className="mb-5 text-xs tracking-[0.3em] text-[#C5AD86]">
          THE PORTFOLIO
        </p>

        <h1 className="font-editorial text-6xl leading-[0.95] md:text-8xl">
          Selected
          <span className="italic text-[#C5AD86]"> Work.</span>
        </h1>

        <p className="mt-6 max-w-lg text-sm leading-7 text-white/60 md:text-base">
          A collection of visual stories, meaningful moments, and
          frames created to stay with you.
        </p>
      </section>

      <PortfolioGallery />
    </main>
  );
}
