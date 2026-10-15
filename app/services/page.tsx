
import Link from "next/link";
import ServicesContent from "@/components/services/services-content";

export const metadata = {
  title: "Services | Labib Cinecraft",
  description:
    "Explore photography, cinematography, and wedding film services from Labib Cinecraft.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10">
        <nav className="container-studio flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-editorial text-2xl text-[#F2EFE8]"
          >
            LABIB<span className="text-[#C5AD86]">.</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-xs text-white/70 transition hover:text-[#C5AD86]"
            >
              ABOUT
            </Link>

            <Link
              href="/work"
              className="text-xs tracking-widest text-white/70 transition hover:text-[#C5AD86]"
            >
              OUR WORK ↗
            </Link>
          </div>
        </nav>
      </header>

      <div className="pt-20">
        <ServicesContent />
      </div>
    </>
  );
}
