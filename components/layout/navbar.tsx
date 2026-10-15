
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-[#F2EFE8]">
      <nav className="container-studio flex h-24 items-center justify-between border-b border-white/15">
        <Link
          href="/"
          aria-label="Labib Cinecraft home"
          className="group flex flex-col"
          onClick={() => setMenuOpen(false)}
        >
          <span className="font-editorial text-3xl leading-none tracking-wide">
            LABIB<span className="text-[#C5AD86]">.</span>
          </span>
          <span className="mt-2 text-[9px] tracking-[0.32em] text-white/60">
            CINECRAFT STUDIO
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-2 text-xs tracking-[0.12em] text-white/75 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#C5AD86] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <Link
            href="/contact"
            className="flex items-center gap-3 border border-white/30 px-5 py-3 text-[10px] tracking-[0.15em] transition-colors duration-300 hover:border-[#C5AD86] hover:bg-[#C5AD86] hover:text-[#101010]"
          >
            START A PROJECT
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex size-11 items-center justify-center border border-white/20 md:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-24 border-b border-white/10 bg-[#101010] px-6 py-8 md:hidden"
          >
            <div className="container-studio flex flex-col">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-white/10 py-5 font-editorial text-3xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex items-center justify-between bg-[#C5AD86] px-5 py-4 text-xs tracking-widest text-[#101010]"
              >
                START A PROJECT
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
