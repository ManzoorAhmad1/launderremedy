"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBgColor?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  iconColor = "text-primary-700 dark:text-primary-300",
  iconBgColor = "bg-primary-100 dark:bg-primary-900/50",
}: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">
            {title}
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 truncate">
            {value}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground truncate">{description}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground hidden xs:inline">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn("p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0", iconBgColor)}>
          <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
