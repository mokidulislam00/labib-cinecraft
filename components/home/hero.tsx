"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        return;
      }

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Background cinematic zoom
      intro.fromTo(
        ".hero-background",
        {
          scale: 1.14,
        },
        {
          scale: 1,
          duration: 2.2,
          ease: "power2.out",
        },
        0
      );

      // Small heading above the main title
      intro.fromTo(
        ".hero-eyebrow",
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        0.25
      );

      // Main title reveal
      intro.fromTo(
        ".hero-title-line",
        {
          yPercent: 110,
          opacity: 0,
          rotateX: 8,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.16,
          ease: "power4.out",
        },
        0.45
      );

      // Description and CTA buttons
      intro.fromTo(
        ".hero-description",
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.45"
      );

      intro.fromTo(
        ".hero-actions",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.45"
      );

      // Bottom information line
      intro.fromTo(
        ".hero-footer",
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
        "-=0.25"
      );

      // Subtle background parallax while scrolling
      gsap.to(".hero-background", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Animate scroll indicator
      gsap.to(".hero-scroll-arrow", {
        y: 7,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section
      ref={heroRef}
      className="relative flex h-[100svh] min-h-[780px] max-h-[1100px] items-end overflow-hidden bg-[#101010] text-white"
    >
      {/* Cinematic Background */}
      <div
        aria-hidden="true"
        className="hero-background absolute inset-0 scale-[1.14] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2400&q=85')",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/45"
      />

      {/* Left-side shade for readable text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/40 to-transparent"
      />

      {/* Hero Content */}
      <div className="container-studio relative z-10 pb-16 pt-40 md:pb-24">
        {/* Eyebrow */}
        <div className="hero-eyebrow mb-7 flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] text-[#D7C4A6] opacity-0 md:text-xs">
          <span className="h-px w-10 bg-[#D7C4A6]" />
          PHOTOGRAPHY / CINEMATOGRAPHY
        </div>

        {/* Main Heading */}
        <h1 className="max-w-6xl font-editorial text-6xl font-normal leading-[0.91] tracking-[-0.045em] text-white [perspective:1000px] [text-shadow:0_4px_40px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl lg:text-[112px] xl:text-[138px]">
          <span className="block overflow-hidden pb-2">
            <span className="hero-title-line block opacity-0">
              We Capture
            </span>
          </span>

          <span className="block overflow-hidden pb-2">
            <span className="hero-title-line block pl-[8%] italic text-[#D7C4A6] opacity-0">
              What Words
            </span>
          </span>

          <span className="block overflow-hidden pb-2">
            <span className="hero-title-line block opacity-0">
              Cannot.
            </span>
          </span>
        </h1>

        {/* Description and Buttons */}
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="hero-description max-w-sm text-base leading-7 text-white/90 opacity-0 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] md:text-lg">
            Photography, films, and visual stories crafted with
            intention. Every frame holds a feeling worth remembering.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Explore Work */}
            <Link
              href="/work"
              className="hero-actions group flex items-center gap-3 border border-white/50 px-6 py-4 text-xs font-medium tracking-[0.12em] text-white opacity-0 transition-colors duration-300 hover:border-[#D7C4A6] hover:bg-white/10"
            >
              EXPLORE OUR WORK

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            {/* Start a Project */}
            <Link
              href="/contact"
              className="hero-actions group flex items-center gap-3 border border-white/50 px-6 py-4 text-xs font-medium tracking-[0.12em] text-white opacity-0 transition-colors duration-300 hover:border-[#D7C4A6] hover:bg-white/10"
            >
              START A PROJECT

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="hero-footer mt-16 flex items-center justify-between border-t border-white/30 pt-5 text-[10px] tracking-[0.2em] text-white/80 opacity-0 md:mt-20 md:text-[11px]">
          <span>INDEPENDENT CREATIVE STUDIO</span>

          <a
            href="#work"
            className="flex items-center gap-3 transition-colors hover:text-[#C5AD86]"
          >
            SCROLL TO DISCOVER

            <ArrowDown
              size={14}
              className="hero-scroll-arrow"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
