import { Resource } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Video,
  Wrench,
  FileCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface ResourceCardProps {
  resource: Resource;
}

const categoryIcons = {
  Guide: BookOpen,
  Article: FileText,
  Video: Video,
  Tool: Wrench,
  Template: FileCheck,
};

const categoryColors = {
  Guide: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Article: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Video: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Tool: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  Template: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = categoryIcons[resource.category];
  const colorClass = categoryColors[resource.category];

  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-md p-2 ${colorClass}`}>
            <Icon className="h-4 w-4" />
          </div>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${colorClass}`}
          >
            {resource.category}
          </span>
        </div>
      </div>

      <h3 className="mb-2 text-xl font-semibold leading-tight">
        {resource.title}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
        {resource.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {resource.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {resource.tags.length > 3 && (
          <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
            +{resource.tags.length - 3}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {resource.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{resource.readTime}</span>
            </div>
          )}
          <span>
            {new Date(resource.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={resource.link}>
            View
            <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
