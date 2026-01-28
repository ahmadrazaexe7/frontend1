"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Package, CheckCircle, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IntegrationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const integrations = [
    { name: "Shopify", description: "Connect your Shopify store", connected: true, icon: "🛍️" },
    { name: "Stripe", description: "Payment processing", connected: false, icon: "💳" },
    { name: "Slack", description: "Team notifications", connected: false, icon: "💬" },
    { name: "Mailchimp", description: "Email marketing", connected: false, icon: "📧" },
    { name: "Google Analytics", description: "Advanced analytics", connected: true, icon: "📊" },
    { name: "Zapier", description: "Workflow automation", connected: false, icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">Integrations</h1>
          <p className="text-slate-400 text-lg">Connect third-party services to enhance your store</p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`transition-all ${
                integration.connected
                  ? "bg-emerald-600/10 border-emerald-500/30 hover:border-emerald-500/50"
                  : "bg-slate-900/50 border-slate-800 hover:border-blue-500/50"
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{integration.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <p className="text-sm text-slate-400 mt-1">{integration.description}</p>
                      </div>
                    </div>
                    {integration.connected && (
                      <CheckCircle className="text-emerald-400" size={24} />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {integration.connected ? (
                      <>
                        <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm">
                          <Settings size={16} className="mr-2" /> Configure
                        </Button>
                        <Button className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-sm">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm">
                        <Plus size={16} className="mr-2" /> Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
