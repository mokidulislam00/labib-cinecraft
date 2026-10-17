
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import ContactForm from "@/components/contact/contact-form";

const validServices = [
  "Photography",
  "Cinematography",
  "Wedding Films",
  "Other",
];

function ContactServiceContent() {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const service = searchParams.get("service") ?? "";

    setSelectedService(
      validServices.includes(service) ? service : ""
    );
  }, [searchParams]);

  return (
    <ContactForm
      key={selectedService}
      initialService={selectedService}
    />
  );
}

export default function ContactServiceSelector() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-white/50">
          Loading contact form...
        </p>
      }
    >
      <ContactServiceContent />
    </Suspense>
  );
}
