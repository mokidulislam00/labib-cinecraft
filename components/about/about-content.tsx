
"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Clapperboard,
  Heart,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Photography",
    description:
      "Editorial portraits, events, lifestyle, and visual stories captured with intention.",
    icon: Camera,
  },
  {
    number: "02",
    title: "Cinematography",
    description:
      "Cinematic films that combine thoughtful composition, movement, and emotion.",
    icon: Clapperboard,
  },
  {
    number: "03",
    title: "Wedding Films",
    description:
      "Honest, emotional storytelling that preserves the moments you never want to forget.",
    icon: Heart,
  },
];

export default function AboutContent() {
  const pageRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Respect the visitor's reduced-motion preference.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // INTRO: cinematic text reveal
        const intro = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        intro
          .from(".about-eyebrow", {
            opacity: 0,
            y: 20,
            duration: 0.7,
          })
          .from(
            ".about-title-line",
            {
              opacity: 0,
              yPercent: 110,
              rotateX: -12,
              duration: 1,
              stagger: 0.16,
            },
            "-=0.35",
          )
          .from(
            ".about-intro-copy",
            {
              opacity: 0,
              y: 25,
              duration: 0.8,
            },
            "-=0.55",
          );

        // PHILOSOPHY: reveal the image and text on scroll
        gsap.from(".about-photo-frame", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".about-philosophy",
            start: "top 75%",
            once: true,
          },
        });

        gsap.from(".about-photo", {
          scale: 1.2,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-philosophy",
            start: "top 75%",
            once: true,
          },
        });

        gsap.from(".about-philosophy-copy", {
          opacity: 0,
          x: 45,
          duration: 1,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-philosophy",
            start: "top 72%",
            once: true,
          },
        });

        // SERVICES: heading reveal
        gsap.from(".about-services-heading", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-services",
            start: "top 78%",
            once: true,
          },
        });

        // SERVICES: stagger each row
        gsap.from(".about-service-row", {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-service-list",
            start: "top 82%",
            once: true,
          },
        });

        // CTA: reveal the closing message
        gsap.from(".about-cta-content", {
          opacity: 0,
          y: 45,
          duration: 1,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-cta",
            start: "top 78%",
            once: true,
          },
        });

        // Subtle floating arrow animation
        gsap.to(".about-bottom-arrow", {
          y: 5,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Clean up this media-query animation when it stops matching.
        return () => {
          gsap.killTweensOf([
            ".about-bottom-arrow",
            ".about-photo",
          ]);
        };
      });

      return () => mm.revert();
    },
    { scope: pageRef },
  );

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#101010] text-[#F2EFE8]"
    >
      {/* INTRO */}
      <section className="container-studio pb-20 pt-20 md:pb-28 md:pt-28">
        <p className="about-eyebrow mb-6 flex items-center gap-4 text-xs tracking-[0.3em] text-[#C5AD86]">
          <span className="h-px w-10 bg-[#C5AD86]" />
          BEHIND THE LENS
        </p>

        <h1 className="max-w-5xl font-editorial text-5xl leading-[0.98] sm:text-6xl md:text-8xl lg:text-9xl">
          <span className="block overflow-hidden pb-2">
            <span className="about-title-line block">
              We don&apos;t just
            </span>
          </span>

          <span className="block overflow-hidden pb-2">
            <span className="about-title-line block">
              capture moments.
            </span>
          </span>

          <span className="block overflow-hidden pb-2">
            <span className="about-title-line block italic text-[#C5AD86]">
              We preserve feelings.
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2 md:gap-16">
          <div />

          <p className="about-intro-copy max-w-xl text-sm leading-8 text-white/60 md:text-base">
            Labib Cinecraft is an independent creative studio built
            around visual storytelling. We believe the strongest images
            and films are not simply seen — they are felt, remembered,
            and experienced again.
          </p>
        </div>
      </section>

      {/* IMAGE AND PHILOSOPHY */}
      <section className="about-philosophy container-studio grid gap-10 pb-24 md:grid-cols-2 md:items-center md:gap-16 md:pb-32">
        <div className="about-photo-frame relative aspect-[4/5] overflow-hidden bg-[#1A1A18]">
          <div
            className="about-photo absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=85')",
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.25em] text-white/80">
            BEHIND EVERY FRAME
          </span>
        </div>

        <div>
          <p className="about-philosophy-copy mb-5 flex items-center gap-4 text-xs tracking-[0.25em] text-[#C5AD86]">
            <span className="h-px w-8 bg-[#C5AD86]" />
            OUR PHILOSOPHY
          </p>

          <h2 className="about-philosophy-copy font-editorial text-4xl leading-tight md:text-6xl">
            Real moments.
            <br />
            Honest stories.
            <br />
            <span className="italic text-[#C5AD86]">
              Lasting memories.
            </span>
          </h2>

          <p className="about-philosophy-copy mt-7 text-sm leading-8 text-white/60">
            Every project starts with listening. We learn about the
            people, places, and ideas behind your story before we ever
            pick up a camera.
          </p>

          <p className="about-philosophy-copy mt-4 text-sm leading-8 text-white/60">
            From the first conversation to the final edit, our goal is
            to create work that feels personal, timeless, and true to you.
          </p>

          <div className="about-philosophy-copy">
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#C5AD86] pb-3 text-xs tracking-widest transition-colors duration-300 hover:text-[#C5AD86]"
            >
              LET&apos;S CREATE SOMETHING
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="about-services border-y border-white/10 bg-[#151513]">
        <div className="container-studio py-20 md:py-28">
          <p className="about-services-heading mb-5 flex items-center gap-4 text-xs tracking-[0.3em] text-[#C5AD86]">
            <span className="h-px w-10 bg-[#C5AD86]" />
            WHAT WE DO
          </p>

          <div className="about-services-heading mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-editorial text-4xl leading-tight sm:text-5xl md:text-7xl">
              Thoughtful work.
              <br />
              <span className="italic text-[#C5AD86]">
                Crafted with purpose.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-white/50">
              From still images to moving pictures, every service is
              designed around your unique story.
            </p>
          </div>

          <div className="about-service-list border-t border-white/10">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="about-service-row group grid gap-5 border-b border-white/10 py-8 md:grid-cols-[70px_1fr_1fr_50px] md:items-center md:py-10"
                >
                  <span className="text-xs text-white/40 transition-colors duration-300 group-hover:text-[#C5AD86]">
                    {service.number}
                  </span>

                  <h3 className="font-editorial text-3xl transition-colors duration-300 group-hover:text-[#C5AD86] md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="max-w-md text-sm leading-7 text-white/50">
                    {service.description}
                  </p>

                  <Icon
                    size={22}
                    strokeWidth={1.2}
                    className="text-[#C5AD86] transition-transform duration-300 group-hover:scale-125"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="about-cta relative isolate overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#101010]/80 via-[#101010]/55 to-[#101010]/90" />

        <div className="container-studio py-24 text-center md:py-36">
          <p className="about-cta-content mb-6 flex items-center justify-center gap-4 text-xs tracking-[0.3em] text-[#C5AD86]">
            <span className="h-px w-8 bg-[#C5AD86]" />
            HAVE A STORY TO TELL?
            <span className="h-px w-8 bg-[#C5AD86]" />
          </p>

          <h2 className="about-cta-content mx-auto max-w-4xl font-editorial text-4xl leading-tight sm:text-5xl md:text-8xl">
            Let&apos;s make something
            <span className="italic text-[#C5AD86]">
              {" "}meaningful.
            </span>
          </h2>

          <p className="about-cta-content mx-auto mt-6 max-w-md text-sm leading-7 text-white/60">
            Have an idea, an event, or a story waiting to be told?
            We&apos;d love to hear about it.
          </p>

          <div className="about-cta-content">
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-4 bg-[#C5AD86] px-7 py-4 text-xs tracking-widest text-[#101010] transition-colors duration-300 hover:bg-[#F2EFE8]"
            >
              START A CONVERSATION
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="about-cta-content mt-16 flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-white/40">
            <ArrowDownRight
              size={14}
              className="about-bottom-arrow"
            />
            MADE WITH INTENTION
          </div>
        </div>
      </section>
    </main>
  );
}
