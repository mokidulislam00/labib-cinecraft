
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
  Check,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Photography",
    subtitle: "Still moments. Lasting impressions.",
    description:
      "Thoughtful imagery for people, brands, events, and the moments worth remembering.",
    icon: Camera,
    features: [
      "Portrait & lifestyle photography",
      "Events & special occasions",
      "Brand & product imagery",
      "Professionally edited photographs",
    ],
  },
  {
    number: "02",
    title: "Cinematography",
    subtitle: "Stories that move you.",
    description:
      "Cinematic visuals built around atmosphere, emotion, and the details that make every story unique.",
    icon: Clapperboard,
    features: [
      "Creative direction & planning",
      "Cinematic video production",
      "Color grading & editing",
      "Social media video formats",
    ],
  },
  {
    number: "03",
    title: "Wedding Films",
    subtitle: "Your story, beautifully remembered.",
    description:
      "Authentic wedding coverage focused on real emotions, meaningful details, and unforgettable moments.",
    icon: Heart,
    features: [
      "Wedding day coverage",
      "Cinematic highlight film",
      "Couple & family moments",
      "Carefully edited final delivery",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Connect",
    text: "Tell us about your story, ideas, and goals.",
  },
  {
    number: "02",
    title: "Plan",
    text: "We discuss the creative direction and details.",
  },
  {
    number: "03",
    title: "Create",
    text: "We capture your moments with care and intention.",
  },
  {
    number: "04",
    title: "Deliver",
    text: "Your finished photographs and films are ready to share.",
  },
];

export default function ServicesContent() {
  const pageRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Respect reduced-motion accessibility preferences.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // HERO: eyebrow and headline reveal.
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        heroTimeline
          .from(".services-eyebrow", {
            opacity: 0,
            y: 20,
            duration: 0.65,
          })
          .from(
            ".services-title-line",
            {
              opacity: 0,
              yPercent: 110,
              rotateX: -8,
              duration: 0.95,
              stagger: 0.15,
            },
            "-=0.25",
          )
          .from(
            ".services-intro-copy",
            {
              opacity: 0,
              y: 25,
              duration: 0.75,
            },
            "-=0.4",
          )
          .from(
            ".services-explore-link",
            {
              opacity: 0,
              y: 15,
              duration: 0.55,
            },
            "-=0.35",
          );

        // SERVICES: section heading reveal.
        gsap.from(".services-section-heading", {
          opacity: 0,
          y: 35,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            once: true,
          },
        });

        // SERVICES: cards appear one after another.
        gsap.from(".service-card", {
          opacity: 0,
          y: 55,
          rotateX: 4,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 78%",
            once: true,
          },
        });

        // SERVICE ICONS: subtle entrance.
        gsap.from(".service-icon", {
          opacity: 0,
          scale: 0.65,
          rotate: -15,
          duration: 0.7,
          stagger: 0.16,
          delay: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 78%",
            once: true,
          },
        });

        // PROCESS: heading and individual steps.
        gsap.from(".process-heading", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 78%",
            once: true,
          },
        });

        gsap.from(".process-step", {
          opacity: 0,
          y: 35,
          duration: 0.7,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 82%",
            once: true,
          },
        });

        // CTA: cinematic closing reveal.
        gsap.from(".services-cta-content", {
          opacity: 0,
          y: 35,
          duration: 0.9,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-cta",
            start: "top 78%",
            once: true,
          },
        });

        // Clean up hover tweens and media-specific animations.
        return () => {
          gsap.killTweensOf(".service-card");
          gsap.killTweensOf(".service-icon");
        };
      });

      return () => mm.revert();
    },
    { scope: pageRef },
  );

  // Card hover interactions.
  function handleCardEnter(
    event: React.MouseEvent<HTMLElement>,
  ) {
    const card = event.currentTarget;
    const icon = card.querySelector(".service-icon");

    gsap.to(card, {
      y: -8,
      borderColor: "rgba(197, 173, 134, 0.65)",
      backgroundColor: "rgba(197, 173, 134, 0.035)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (icon) {
      gsap.to(icon, {
        rotate: 8,
        scale: 1.12,
        duration: 0.35,
        ease: "back.out(1.8)",
        overwrite: "auto",
      });
    }
  }

  function handleCardLeave(
    event: React.MouseEvent<HTMLElement>,
  ) {
    const card = event.currentTarget;
    const icon = card.querySelector(".service-icon");

    gsap.to(card, {
      y: 0,
      borderColor: "rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0)",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (icon) {
      gsap.to(icon, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#101010] text-[#F2EFE8]"
    >
      {/* HERO */}
      <section className="container-studio pb-20 pt-20 md:pb-28 md:pt-28">
        <p className="services-eyebrow mb-6 flex items-center gap-4 text-xs tracking-[0.3em] text-[#C5AD86]">
          <span className="h-px w-10 bg-[#C5AD86]" />
          WHAT WE CREATE
        </p>

        <h1 className="max-w-5xl font-editorial text-5xl leading-[0.98] sm:text-6xl md:text-8xl lg:text-9xl">
          <span className="block overflow-hidden pb-2">
            <span className="services-title-line block">
              Creative services.
            </span>
          </span>

          <span className="block overflow-hidden pb-2">
            <span className="services-title-line block italic text-[#C5AD86]">
              Personal stories.
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-12">
          <div />

          <p className="services-intro-copy max-w-xl text-sm leading-8 text-white/60 md:text-base">
            Every project is different. We work with you to understand
            your vision and shape it into photographs and films that
            feel authentic, considered, and timeless.
          </p>
        </div>

        <Link
          href="#our-services"
          className="services-explore-link group mt-9 inline-flex items-center gap-3 border-b border-[#C5AD86] pb-3 text-xs tracking-widest transition-colors duration-300 hover:text-[#C5AD86]"
        >
          EXPLORE OUR SERVICES

          <ArrowDownRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      </section>

      {/* SERVICES */}
      <section
        id="our-services"
        className="border-y border-white/10 bg-[#151513]"
      >
        <div className="container-studio py-16 md:py-24">
          <div className="services-section-heading mb-12">
            <p className="mb-4 flex items-center gap-4 text-xs tracking-[0.3em] text-[#C5AD86]">
              <span className="h-px w-8 bg-[#C5AD86]" />
              OUR EXPERTISE
            </p>

            <h2 className="font-editorial text-4xl md:text-6xl">
              Made around your vision.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-white/50">
              Every frame has a purpose. Every story deserves a thoughtful
              approach.
            </p>
          </div>

          <div className="services-grid grid gap-5 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                  className="service-card flex flex-col border border-white/10 p-6 will-change-transform md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs tracking-widest text-white/40">
                      {service.number}
                    </span>

                    <div className="service-icon text-[#C5AD86]">
                      <Icon size={27} strokeWidth={1.2} />
                    </div>
                  </div>

                  <h3 className="mt-10 font-editorial text-3xl md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm italic text-[#C5AD86]">
                    {service.subtitle}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-white/55">
                    {service.description}
                  </p>

                  <div className="my-7 border-t border-white/10" />

                  <ul className="flex-1 space-y-4">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/70"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[#C5AD86]"
                        />

                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="group mt-9 flex items-center justify-between border-t border-white/10 pt-5 text-xs tracking-widest transition-colors duration-300 hover:text-[#C5AD86]"
                  >
                    DISCUSS YOUR PROJECT

                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section container-studio py-20 md:py-28">
        <div className="process-heading">
          <p className="mb-5 flex items-center gap-4 text-xs tracking-[0.3em] text-[#C5AD86]">
            <span className="h-px w-8 bg-[#C5AD86]" />
            THE PROCESS
          </p>

          <h2 className="max-w-3xl font-editorial text-5xl leading-tight md:text-7xl">
            From first idea
            <br />
            <span className="italic text-[#C5AD86]">
              to final frame.
            </span>
          </h2>
        </div>

        <div className="process-steps mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="process-step group relative"
            >
              <span className="text-xs text-[#C5AD86]">
                {step.number}
              </span>

              <h3 className="mt-4 font-editorial text-3xl transition-transform duration-300 group-hover:translate-x-1">
                {step.title}
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-7 text-white/50">
                {step.text}
              </p>

              <div className="mt-6 h-px w-10 bg-[#C5AD86]/40 transition-all duration-500 group-hover:w-full group-hover:bg-[#C5AD86]" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta border-t border-white/10">
        <div className="container-studio py-20 text-center md:py-32">
          <p className="services-cta-content mb-5 flex items-center justify-center gap-4 text-xs tracking-[0.3em] text-[#C5AD86]">
            <span className="h-px w-8 bg-[#C5AD86]" />
            YOUR STORY STARTS HERE
            <span className="h-px w-8 bg-[#C5AD86]" />
          </p>

          <h2 className="services-cta-content mx-auto max-w-4xl font-editorial text-5xl leading-tight md:text-7xl">
            Have something
            <br className="sm:hidden" />
            <span className="italic text-[#C5AD86]">
              {" "}in mind?
            </span>
          </h2>

          <p className="services-cta-content mx-auto mt-6 max-w-md text-sm leading-7 text-white/50">
            Tell us what you are planning. We will discuss your vision,
            requirements, and a suitable approach together.
          </p>

          <div className="services-cta-content">
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-4 bg-[#C5AD86] px-7 py-4 text-xs tracking-widest text-[#101010] transition-colors duration-300 hover:bg-[#F2EFE8]"
            >
              LET&apos;S TALK

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
