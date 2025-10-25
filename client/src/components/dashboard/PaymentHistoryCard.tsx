"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getLast10Days = () => {
  const days = [];
  for (let i = 9; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    days.push(formatted);
  }
  return days;
};

export default function PaymentHistoryCard() {
  const labels = getLast10Days();

  // Example data — replace `amount` with your actual backend data
  const data = labels.map((label) => ({
    date: label,
    ticketing: Math.floor(Math.random() * 50000) + 1000, // Example: ₦ amounts
  }));

  return (
    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
      <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <h3 className="text-xl md:text-2xl font-medium lg:font-semibold leading-none tracking-tight">
            Payment History
          </h3>
          <p className="text-sm text-slate-500">
            Showing payments received for the past 10 days
          </p>
        </div>
        <div className="flex">
          <button
            data-active="true"
            className="relative z-10 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground">Ticketing</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              <span>₦</span>
              {/* {data.reduce((sum, d) => sum + d.ticketing, 0).toLocaleString()} */}
              0
            </span>
          </button>
        </div>
      </div>

      <div className="p-6 pt-0 px-2 sm:p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#666" }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
            />
            {/* <YAxis tick={{ fill: "#666" }} axisLine={{ stroke: "#ccc" }} /> */}
            <Tooltip
              formatter={(value: number) => [
                `₦${value.toLocaleString()}`,
                "Ticketing",
              ]}
              labelStyle={{ color: "#333" }}
            />
            {/* <Bar dataKey="ticketing" fill="#6366f1" radius={[4, 4, 0, 0]} /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
