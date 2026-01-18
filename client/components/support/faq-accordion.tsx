"use client";

import { useState } from "react";
import { FAQ } from "@/lib/mock-data/types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="rounded-lg border border-border bg-card"
        >
          <button
            onClick={() => toggle(faq.id)}
            className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
            aria-expanded={openId === faq.id}
          >
            <span className="font-medium text-foreground">{faq.question}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform",
                openId === faq.id && "rotate-180"
              )}
            />
          </button>
          {openId === faq.id && (
            <div className="border-t border-border p-4">
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
