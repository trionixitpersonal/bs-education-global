"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Award, BookOpen, MapPin } from "lucide-react";

export function StatsCards() {
  const [stats, setStats] = useState({
    universities: 0,
    scholarships: 0,
    programs: 0,
    destinations: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [universities, scholarships, programs] = await Promise.all([
          fetch("/api/universities").then((r) => r.json()),
          fetch("/api/scholarships").then((r) => r.json()),
          fetch("/api/programs").then((r) => r.json()),
        ]);

        setStats({
          universities: universities?.length || 0,
          scholarships: scholarships?.length || 0,
          programs: programs?.length || 0,
          destinations: 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Universities",
      value: stats.universities,
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      title: "Scholarships",
      value: stats.scholarships,
      icon: Award,
      color: "bg-green-500",
    },
    {
      title: "Programs",
      value: stats.programs,
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      title: "Destinations",
      value: stats.destinations,
      icon: MapPin,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-lg p-3 ${card.color}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
