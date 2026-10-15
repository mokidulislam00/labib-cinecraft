
"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";

type ContactFormProps = {
  initialService?: string;
};

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string;
  budget: string;
  message: string;
};

const inputClass =
  "mt-2 w-full border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm text-[#F2EFE8] outline-none transition-all duration-300 placeholder:text-white/30 focus:border-[#C5AD86] focus:bg-white/[0.05] focus:ring-1 focus:ring-[#C5AD86]/20";

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  eventDate: "",
  budget: "",
  message: "",
};

const services = [
  "Photography",
  "Cinematography",
  "Wedding Films",
  "Other",
];

export default function ContactForm({
  initialService = "",
}: ContactFormProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ContactFormData>(() => ({
    ...initialForm,
    service: services.includes(initialService) ? initialService : "",
  }));

  // GSAP animation for the form and success state
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      if (submitted) {
        gsap.from("[data-contact-success]", {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
        });

        gsap.from("[data-contact-success-item]", {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.15,
          ease: "power2.out",
        });

        gsap.fromTo(
          ".contact-success-icon",
          { scale: 0.6, rotate: -20 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.65,
            delay: 0.1,
            ease: "back.out(1.8)",
          },
        );

        return;
      }

      gsap.from("[data-contact-reveal]", {
        opacity: 0,
        y: 22,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });

      gsap.from("[data-contact-field]", {
        opacity: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.08,
        delay: 0.15,
        ease: "power2.out",
        clearProps: "opacity,transform",
      });
    },
    {
      scope: formRef,
      dependencies: [submitted],
      revertOnUpdate: true,
    },
  );

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.service ||
      !form.message.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Frontend demo only: no API request is made here.
    setSubmitted(true);
  }

  function handleReset() {
    setForm({
      ...initialForm,
      service: services.includes(initialService) ? initialService : "",
    });

    setSubmitted(false);
    setError("");
  }

  return (
    <div ref={formRef} className="w-full">
      {submitted ? (
        <div
          data-contact-success
          className="border border-[#C5AD86]/30 bg-[#C5AD86]/[0.04] px-5 py-12 text-center sm:px-8 md:px-10"
        >
          <div className="contact-success-icon mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C5AD86]/30 bg-[#C5AD86]/10">
            <CheckCircle2
              size={36}
              strokeWidth={1.3}
              className="text-[#C5AD86]"
            />
          </div>

          <p
            data-contact-success-item
            className="mt-6 text-xs tracking-[0.25em] text-[#C5AD86]"
          >
            INQUIRY PREVIEW
          </p>

          <h2
            data-contact-success-item
            className="mt-3 font-editorial text-4xl text-[#F2EFE8] sm:text-5xl"
          >
            Thank you, {form.name}!
          </h2>

          <p
            data-contact-success-item
            className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/60"
          >
            Your form passed frontend validation. This is a demo confirmation
            only. Your inquiry has not been sent or saved yet.
          </p>

          <div
            data-contact-success-item
            className="mx-auto mt-8 max-w-md space-y-3 border border-white/10 p-5 text-left"
          >
            <p className="mb-4 text-xs tracking-widest text-[#C5AD86]">
              YOUR INQUIRY SUMMARY
            </p>

            <p className="break-words text-sm text-white/80">
              <span className="text-white/40">Name: </span>
              {form.name}
            </p>

            <p className="break-words text-sm text-white/80">
              <span className="text-white/40">Email: </span>
              {form.email}
            </p>

            {form.phone && (
              <p className="text-sm text-white/80">
                <span className="text-white/40">Phone: </span>
                {form.phone}
              </p>
            )}

            <p className="text-sm text-white/80">
              <span className="text-white/40">Service: </span>
              {form.service}
            </p>

            {form.eventDate && (
              <p className="text-sm text-white/80">
                <span className="text-white/40">Date: </span>
                {form.eventDate}
              </p>
            )}

            {form.budget && (
              <p className="text-sm text-white/80">
                <span className="text-white/40">Budget: </span>
                {form.budget}
              </p>
            )}

            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-white/70">
              <span className="text-white/40">Message: </span>
              {form.message}
            </p>
          </div>

          <div
            data-contact-success-item
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="border border-white/20 px-5 py-3 text-xs tracking-widest transition-colors duration-300 hover:border-[#C5AD86] hover:text-[#C5AD86]"
            >
              EDIT YOUR MESSAGE
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-[#C5AD86] px-5 py-3 text-xs tracking-widest text-[#101010] transition-colors duration-300 hover:bg-[#F2EFE8]"
            >
              NEW INQUIRY
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Name and Email */}
          <div
            data-contact-field
            className="grid gap-6 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="name"
                className="text-xs text-white/70"
              >
                YOUR NAME <span className="text-[#C5AD86]">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
                required
                maxLength={100}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-xs text-white/70"
              >
                EMAIL ADDRESS <span className="text-[#C5AD86]">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                maxLength={254}
                className={inputClass}
              />
            </div>
          </div>

          {/* Phone and Service */}
          <div
            data-contact-field
            className="grid gap-6 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="phone"
                className="text-xs text-white/70"
              >
                PHONE NUMBER
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+880 1XXX-XXXXXX"
                autoComplete="tel"
                maxLength={30}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="text-xs text-white/70"
              >
                SERVICE <span className="text-[#C5AD86]">*</span>
              </label>

              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className={`${inputClass} appearance-none`}
              >
                <option value="" className="bg-[#1A1A18]">
                  Select a service
                </option>

                <option value="Photography" className="bg-[#1A1A18]">
                  Photography
                </option>

                <option value="Cinematography" className="bg-[#1A1A18]">
                  Cinematography
                </option>

                <option value="Wedding Films" className="bg-[#1A1A18]">
                  Wedding Films
                </option>

                <option value="Other" className="bg-[#1A1A18]">
                  Other / Not sure yet
                </option>
              </select>
            </div>
          </div>

          {/* Event Date and Budget */}
          <div
            data-contact-field
            className="grid gap-6 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="eventDate"
                className="text-xs text-white/70"
              >
                EVENT / PROJECT DATE
              </label>

              <input
                id="eventDate"
                name="eventDate"
                type="date"
                value={form.eventDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="text-xs text-white/70"
              >
                ESTIMATED BUDGET
              </label>

              <select
                id="budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
              >
                <option value="" className="bg-[#1A1A18]">
                  Select your budget
                </option>

                <option value="Under ৳10,000" className="bg-[#1A1A18]">
                  Under ৳10,000
                </option>

                <option
                  value="৳10,000–৳25,000"
                  className="bg-[#1A1A18]"
                >
                  ৳10,000–৳25,000
                </option>

                <option
                  value="৳25,000–৳50,000"
                  className="bg-[#1A1A18]"
                >
                  ৳25,000–৳50,000
                </option>

                <option value="৳50,000+" className="bg-[#1A1A18]">
                  ৳50,000+
                </option>

                <option value="Not decided" className="bg-[#1A1A18]">
                  Not decided
                </option>
              </select>
            </div>
          </div>

          {/* Project Message */}
          <div data-contact-field>
            <label
              htmlFor="message"
              className="text-xs text-white/70"
            >
              TELL US ABOUT YOUR PROJECT{" "}
              <span className="text-[#C5AD86]">*</span>
            </label>

            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your idea, event, location, and what you have in mind..."
              rows={5}
              required
              maxLength={5000}
              className={`${inputClass} resize-y`}
            />

            <p className="mt-2 text-right text-xs text-white/35">
              {form.message.length}/5000
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div data-contact-field>
            <button
              type="submit"
              className="group flex w-full items-center justify-between gap-6 bg-[#C5AD86] px-6 py-4 text-xs tracking-[0.15em] text-[#101010] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F2EFE8] sm:w-auto sm:min-w-64"
            >
              SEND PROJECT INQUIRY

              <Send
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <p className="text-xs leading-6 text-white/35">
            Fields marked with * are required. This is currently a frontend
            demo: submitting the form does not send an email or save your
            information.
          </p>
        </form>
      )}
    </div>
  );
}
