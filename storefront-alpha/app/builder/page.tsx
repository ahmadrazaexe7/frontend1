"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Wand2, Layers, Grid3x3, Sparkles, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const stats = [
    { label: "Templates Created", value: "42", change: "+15%", icon: Layers, color: "purple" },
    { label: "Components Built", value: "156", change: "+32%", icon: Grid3x3, color: "pink" },
    { label: "AI Generations", value: "892", change: "+48%", icon: Sparkles, color: "cyan" },
    { label: "Build Time Saved", value: "127h", change: "+22%", icon: Clock, color: "emerald" },
  ];

  const recentBuilds = [
    { name: "Premium Hero Section", status: "Completed", timestamp: "2 hours ago", color: "emerald" },
    { name: "Product Grid Layout", status: "In Progress", timestamp: "30 minutes ago", color: "blue" },
    { name: "Checkout Flow", status: "Completed", timestamp: "1 day ago", color: "emerald" },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { gradient: string; text: string; border: string } } = {
      purple: { gradient: "from-purple-600/20 via-slate-900 to-slate-950 border-purple-500/20", text: "text-purple-400", border: "border-purple-500/20" },
      pink: { gradient: "from-pink-600/20 via-slate-900 to-slate-950 border-pink-500/20", text: "text-pink-400", border: "border-pink-500/20" },
      cyan: { gradient: "from-cyan-600/20 via-slate-900 to-slate-950 border-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/20" },
      emerald: { gradient: "from-emerald-600/20 via-slate-900 to-slate-950 border-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/20" },
      blue: { gradient: "from-blue-600/20 via-slate-900 to-slate-950 border-blue-500/20", text: "text-blue-400", border: "border-blue-500/20" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Wand2 className="text-white" size={24} />
            </div>
            <h1 className="text-5xl font-black">Builder Studio</h1>
          </div>
          <p className="text-slate-400 text-lg">Design and build stunning Shopify themes with AI assistance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const colors = getColorClasses(stat.color);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`bg-gradient-to-br ${colors.gradient} hover:border-opacity-100 transition-all`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium text-slate-400">{stat.label}</CardTitle>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                    <p className={`text-xs ${colors.text}`}>{stat.change} from last period</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Builds */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800 p-8">
              <div className="flex items-center justify-between mb-8">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Zap className="text-amber-400" size={28} />
                  Recent Builds
                </CardTitle>
              </div>
              <div className="space-y-4">
                {recentBuilds.map((build, idx) => {
                  const statusColors = build.color === "emerald" ? "text-emerald-400" : "text-blue-400";
                  const statusBg = build.color === "emerald" ? "bg-emerald-500/20" : "bg-blue-500/20";
                  return (
                    <motion.div
                      key={build.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold group-hover:text-white transition-colors">{build.name}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{build.timestamp}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusBg} ${statusColors}`}>
                          {build.status}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-600/20 via-slate-900 to-slate-950 border-purple-500/20 p-8">
              <CardTitle className="text-lg mb-6 text-white">New Project</CardTitle>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-105">
                + Create Theme
              </button>
              <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 font-bold py-3 rounded-xl transition-all mt-3 border border-purple-500/20">
                + Import Template
              </button>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-600/20 via-slate-900 to-slate-950 border-cyan-500/20 p-8">
              <CardTitle className="text-lg mb-6 text-white">AI Tools</CardTitle>
              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                <Sparkles size={18} /> Generate Component
              </button>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
