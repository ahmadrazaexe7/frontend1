"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Zap, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const stats = [
    { label: "Total Views", value: "24.5K", change: "+12%", icon: BarChart3 },
    { label: "Conversions", value: "1,234", change: "+8%", icon: TrendingUp },
    { label: "Active Users", value: "3,421", change: "+23%", icon: Users },
    { label: "Performance", value: "98.5%", change: "+5%", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">Analytics</h1>
          <p className="text-slate-400 text-lg">Track your store performance and engagement metrics</p>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-4 mb-8">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-semibold transition-all">
            <Calendar size={18} /> Last 30 Days
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-950 border-blue-500/20 hover:border-blue-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium text-slate-400">{stat.label}</CardTitle>
                    <Icon className="h-5 w-5 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                    <p className="text-xs text-emerald-400">{stat.change} from last period</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-800 p-8">
            <CardTitle className="text-2xl mb-8">Traffic Overview</CardTitle>
            <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
              <p className="text-slate-400">Chart visualization coming soon</p>
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-8">
            <CardTitle className="text-2xl mb-8">Revenue Breakdown</CardTitle>
            <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
              <p className="text-slate-400">Chart visualization coming soon</p>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
