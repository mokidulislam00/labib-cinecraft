
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";

import ContactForm from "@/components/contact/contact-form";
import ContactServiceSelector from "@/components/contact/contact-service-selector";

export const metadata = {
  title: "Contact | Labib Cinecraft",
  description:
    "Tell Labib Cinecraft about your photography, cinematography, or wedding film project.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-[#F2EFE8]">
      <header className="border-b border-white/10">
        <div className="container-studio flex min-h-20 items-center justify-between">
          <Link
            href="/"
            className="font-editorial text-2xl tracking-wide"
          >
            LABIB <span className="text-[#C5AD86]">CINECRAFT</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs tracking-widest text-white/60 transition hover:text-[#C5AD86]"
          >
            <ArrowLeft size={15} />
            BACK HOME
          </Link>
        </div>
      </header>

      <section className="container-studio grid gap-14 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:py-24">
        <div>
          <p className="text-xs tracking-[0.3em] text-[#C5AD86]">
            LET'S CREATE SOMETHING
          </p>

          <h1 className="mt-6 font-editorial text-5xl leading-tight sm:text-6xl lg:text-7xl">
            Tell us your
            <br />
            <span className="italic text-[#C5AD86]">story.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-8 text-white/55">
            Have a project in mind? Whether it is photography,
            cinematography, or a wedding film, share your vision
            with us.
          </p>

          <div className="mt-12 space-y-7">
            <a
              href="mailto:mokidulislam00@gmail.com"
              className="group flex items-start gap-4"
            >
              <span className="flex size-11 shrink-0 items-center justify-center border border-white/10 text-[#C5AD86] transition group-hover:border-[#C5AD86]">
                <Mail size={18} />
              </span>

              <span>
                <span className="block text-xs tracking-widest text-white/40">
                  EMAIL
                </span>
                <span className="mt-2 block text-sm transition group-hover:text-[#C5AD86]">
                  mokidulislam00@gmail.com
                </span>
              </span>

              <ArrowUpRight
                size={16}
                className="ml-auto text-white/30"
              />
            </a>

            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center border border-white/10 text-[#C5AD86]">
                <MapPin size={18} />
              </span>

              <span>
                <span className="block text-xs tracking-widest text-white/40">
                  LOCATION
                </span>
                <span className="mt-2 block text-sm">
                  Barisal, Bangladesh
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="border border-white/10 bg-white/[0.02] p-5 sm:p-8 lg:p-10">
          <p className="mb-8 text-xs tracking-[0.2em] text-[#C5AD86]">
            PROJECT INQUIRY
          </p>

          <ContactServiceSelector />
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="container-studio flex flex-col gap-3 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Labib Cinecraft.</p>
          <p>Every frame tells a story.</p>
        </div>
      </footer>
    </main>
  );
}
