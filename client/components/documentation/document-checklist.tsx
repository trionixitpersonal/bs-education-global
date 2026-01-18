"use client";

import { DocumentGuide } from "@/lib/mock-data/types";
import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

interface DocumentChecklistProps {
  guide: DocumentGuide;
}

export function DocumentChecklist({ guide }: DocumentChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Required Documents</h3>
        <ul className="space-y-2">
          {guide.documents.map((doc, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
            >
              <button
                onClick={() => toggleItem(doc)}
                className="flex-shrink-0"
              >
                {checkedItems.has(doc) ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <span className="flex-1 text-sm">{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Application Checklist</h3>
        <ul className="space-y-2">
          {guide.checklist.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
            >
              <button
                onClick={() => toggleItem(item)}
                className="flex-shrink-0"
              >
                {checkedItems.has(item) ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <span className="flex-1 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {guide.templates.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Available Templates</h3>
          <ul className="space-y-2">
            {guide.templates.map((template, idx) => (
              <li
                key={idx}
                className="rounded-lg border border-border bg-card p-3 text-sm"
              >
                {template}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}