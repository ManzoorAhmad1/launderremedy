"use client";

import React, { useEffect, useState, useMemo } from "react";
import areaService from "@/services/area.service";
import { MapPin, Search, CheckCircle2, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Area {
  _id: string;
  name: string;
  city: string;
  postcode_prefix?: string;
  description?: string;
  is_active: boolean;
}

export default function ServiceAreasPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCity, setActiveCity] = useState("All");

  useEffect(() => {
    areaService
      .getAllAreas(true)
      .then((res) => setAreas(res.data || []))
      .catch(() => setAreas([]))
      .finally(() => setLoading(false));
  }, []);

  const cities = useMemo(() => {
    const unique = Array.from(new Set(areas.map((a) => a.city))).sort();
    return ["All", ...unique];
  }, [areas]);

  const filtered = useMemo(() => {
    return areas
      .filter((a) => activeCity === "All" || a.city === activeCity)
      .filter(
        (a) =>
          !search.trim() ||
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          (a.postcode_prefix || "").toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [areas, activeCity, search]);

  // Group filtered areas by city for display
  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, Area[]>>((acc, area) => {
      const city = area.city || "Other";
      if (!acc[city]) acc[city] = [];
      acc[city].push(area);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <MapPin className="h-4 w-4" /> London & Surrounding Areas
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Where We Operate
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Find your area below. We offer free collection & delivery across all
            listed locations.
          </p>

          {/* Search bar inside hero */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search area or postcode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 shadow-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm font-medium"
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-primary-600 dark:text-primary-400 text-base">
            {areas.length} Areas
          </span>
          <span>|</span>
          <span>{cities.length - 1} {cities.length - 1 === 1 ? "City" : "Cities"}</span>
          {search && (
            <>
              <span>|</span>
              <span className="text-primary-600 dark:text-primary-400">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{search}&quot;
              </span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* City filter tabs */}
        {cities.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCity === city
                    ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-primary-400 hover:text-primary-600"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-neutral-500">
            <MapPin className="h-14 w-14 mx-auto mb-4 text-neutral-300" />
            <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
              {search ? `No areas found for "${search}"` : "No service areas listed yet."}
            </p>
            <p className="text-sm mt-1">
              {search ? "Try a different search term or postcode." : "Please check back soon!"}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([city, cityAreas]) => (
                <div key={city}>
                  {/* City header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {city}
                      </h2>
                    </div>
                    <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                      {cityAreas.length} area{cityAreas.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Area list — columns */}
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-neutral-100 dark:divide-neutral-800">
                      {cityAreas.map((area, i) => (
                        <div
                          key={area._id}
                          className={`flex items-center justify-between px-5 py-3.5 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors group
                            ${i % 3 !== 2 ? "sm:border-r border-neutral-100 dark:border-neutral-800" : ""}
                            ${Math.floor(i / 3) < Math.floor((cityAreas.length - 1) / 3) ? "sm:border-b border-neutral-100 dark:border-neutral-800" : ""}
                          `}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <CheckCircle2 className="h-4 w-4 text-primary-500 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">
                                {area.name}
                              </p>
                              {area.description && (
                                <p className="text-xs text-neutral-400 truncate mt-0.5">
                                  {area.description}
                                </p>
                              )}
                            </div>
                          </div>
                          {area.postcode_prefix && (
                            <span className="ml-3 shrink-0 text-xs font-mono font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 px-2 py-0.5 rounded">
                              {area.postcode_prefix}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Don&apos;t see your area?</h3>
              <p className="text-white/75 text-sm max-w-sm">
                We&apos;re expanding fast. Contact us and we&apos;ll let you know when we cover your location.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-md text-sm"
            >
              Contact Us <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
