
import Link from "next/link";
import AboutContent from "@/components/about/about-content";

export const metadata = {
  title: "About | Labib Cinecraft",
  description:
    "Discover the creative philosophy and visual storytelling services of Labib Cinecraft.",
};

export default function AboutPage() {
  return (
    <>
      <header className="absolute left-0 right-0 top-0 z-50 border-b border-white/10">
        <nav className="container-studio flex h-20 items-center justify-between">
          <Link href="/" className="font-editorial text-2xl text-[#F2EFE8]">
            LABIB<span className="text-[#C5AD86]">.</span>
          </Link>

          <Link
            href="/work"
            className="text-xs tracking-widest text-white/70 transition hover:text-[#C5AD86]"
          >
            OUR WORK ↗
          </Link>
        </nav>
      </header>

      <div className="pt-20">
        <AboutContent />
      </div>
    </>
  );
}
