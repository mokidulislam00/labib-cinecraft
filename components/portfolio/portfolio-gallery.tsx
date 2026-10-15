
"use client";

import { useState, useRef, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const categories = [
  "All",
  "Photography",
  "Cinematography",
  "Wedding",
] as const;

type Category = (typeof categories)[number];

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  // Animate the gallery heading and category buttons on scroll.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.from(".gallery-heading", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          });

          gsap.from(".gallery-filter", {
            y: 15,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Animate cards whenever the selected category changes.
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        ".gallery-card"
      );

      const images = gsap.utils.toArray<HTMLElement>(
        ".gallery-image"
      );

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, clearProps: "all" });
        gsap.set(images, { scale: 1, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        }
      );

      gsap.fromTo(
        images,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform",
        }
      );

      return () => {
        gsap.killTweensOf(cards);
        gsap.killTweensOf(images);
      };
    },
    {
      scope: gridRef,
      dependencies: [activeCategory],
      revertOnUpdate: true,
    }
  );

  // Subtle image zoom and arrow movement on hover.
  const handleCardEnter = (event: MouseEvent<HTMLElement>) => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = event.currentTarget;
    const image = card.querySelector(".gallery-image");
    const arrow = card.querySelector(".gallery-arrow");

    gsap.to(image, {
      scale: 1.06,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(arrow, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleCardLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const image = card.querySelector(".gallery-image");
    const arrow = card.querySelector(".gallery-arrow");

    gsap.to(image, {
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(arrow, {
      opacity: 0,
      scale: 0.75,
      rotation: -15,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="container-studio py-16 md:py-24"
    >
      {/* Gallery heading and category filters */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
        <p className="gallery-heading text-xs tracking-[0.2em] text-white/50">
          SELECTED PROJECTS
        </p>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`gallery-filter border px-4 py-2 text-xs transition-colors duration-300 ${
                activeCategory === category
                  ? "border-[#C5AD86] bg-[#C5AD86] text-[#101010]"
                  : "border-white/15 text-white/65 hover:border-[#C5AD86] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Animated project grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="gallery-card group"
          >
            <Link
              href={`/work/${project.id}`}
              className="block"
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              {/* Project image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#1A1A18]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="gallery-image object-cover"
                />

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

                {/* Animated arrow */}
                <span className="gallery-arrow absolute right-4 top-4 flex size-10 scale-75 rotate-[-15deg] items-center justify-center rounded-full bg-[#F2EFE8] text-[#101010] opacity-0">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              {/* Project information */}
              <div className="flex items-start justify-between gap-4 pt-5">
                <div>
                  <p className="mb-2 text-[10px] tracking-[0.2em] text-[#C5AD86]">
                    {project.category.toUpperCase()}
                  </p>

                  <h3 className="font-editorial text-2xl md:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    {project.description}
                  </p>
                </div>

                <span className="pt-1 text-xs text-white/40">
                  {project.year}
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <p className="py-20 text-center text-white/60">
          No projects found.
        </p>
      )}
    </section>
  );
}
