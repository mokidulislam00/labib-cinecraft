
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <section
        id="work"
        className="container-studio py-24 md:py-32"
      >
        <p className="mb-5 text-xs tracking-[0.3em] text-[#C5AD86]">
          A SELECTION OF OUR WORK
        </p>

        <h2 className="max-w-3xl font-editorial text-5xl leading-tight md:text-7xl">
          Stories told through
          <span className="italic text-[#C5AD86]"> every frame.</span>
        </h2>

        <p className="mt-6 max-w-md text-sm leading-7 text-[#A5A39D]">
          A collection of photographs and films shaped by people,
          places, and the moments that matter.
        </p>
      </section>
    </main>
  );
}
