
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    id: String(project.id),
  }));
}

export const metadata = {
  title: "Project Details | Labib Cinecraft",
  description: "Explore photography and cinematic stories by Labib Cinecraft.",
};

export default function ProjectDetailsPage(props: ProjectPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#101010] text-[#F2EFE8]">
          <p className="text-sm tracking-widest text-[#C5AD86]">
            LOADING PROJECT...
          </p>
        </main>
      }
    >
      <ProjectContent params={props.params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { id } = await params;

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#101010] text-[#F2EFE8]">
      <header className="container-studio flex items-center justify-between border-b border-white/10 py-6">
        <Link href="/" className="font-editorial text-2xl">
          LABIB<span className="text-[#C5AD86]">.</span>
        </Link>

        <Link
          href="/work"
          className="flex items-center gap-2 text-xs tracking-wider text-white/70 transition hover:text-[#C5AD86]"
        >
          <ArrowLeft size={15} />
          ALL PROJECTS
        </Link>
      </header>

      <section className="container-studio pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mb-8 flex flex-wrap items-center gap-4 text-xs tracking-[0.2em]">
          <span className="text-[#C5AD86]">
            {project.category.toUpperCase()}
          </span>
          <span className="text-white/30">/</span>
          <span className="text-white/50">{project.year}</span>
        </div>

        <h1 className="max-w-5xl font-editorial text-5xl leading-[0.95] md:text-8xl">
          {project.title}
          <span className="text-[#C5AD86]">.</span>
        </h1>

        <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 md:text-base">
          {project.description}
        </p>

        <div className="relative mt-12 aspect-[4/3] overflow-hidden bg-[#1A1A18] md:mt-16 md:aspect-[16/9]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="grid gap-10 border-b border-white/10 py-12 md:grid-cols-[1fr_2fr] md:py-16">
          <p className="text-[10px] tracking-[0.25em] text-[#C5AD86]">
            ABOUT THE PROJECT
          </p>

          <div>
            <p className="font-editorial text-3xl leading-snug md:text-4xl">
              Every frame has a story. This is ours.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/60">
              {project.description} At Labib Cinecraft, we focus on
              authentic moments, thoughtful composition, and visual
              storytelling that creates a lasting impression.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 py-10">
          <div>
            <p className="text-xs text-white/40">PROJECT</p>
            <p className="mt-2 font-editorial text-2xl">
              {project.title}
            </p>
          </div>

          <div>
            <p className="text-xs text-white/40">CATEGORY</p>
            <p className="mt-2 text-sm">{project.category}</p>
          </div>

          <div>
            <p className="text-xs text-white/40">YEAR</p>
            <p className="mt-2 text-sm">{project.year}</p>
          </div>

          <Link
            href="/contact"
            className="flex items-center gap-3 bg-[#C5AD86] px-6 py-4 text-xs tracking-wider text-[#101010] transition hover:bg-[#F2EFE8]"
          >
            START A PROJECT
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="container-studio flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
          <span>© {project.year} LABIB CINECRAFT</span>
          <Link
            href="/work"
            className="transition hover:text-[#C5AD86]"
          >
            EXPLORE MORE WORK →
          </Link>
        </div>
      </footer>
    </main>
  );
}
