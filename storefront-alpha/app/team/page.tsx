"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Mail, Trash2, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeamPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const teamMembers = [
    { id: 1, name: "Ahmad Raza", email: "ahmad@example.com", role: "Owner", avatar: "AR" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "Admin", avatar: "JD" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Editor", avatar: "JS" },
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Implement invite functionality
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">Team</h1>
          <p className="text-slate-400 text-lg">Manage team members and their permissions</p>
        </div>

        {/* Invite Form */}
        <Card className="bg-slate-900/50 border-slate-800 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Invite Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600"
              />
              <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                <Mail size={20} className="mr-2" /> Send Invite
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Team Members List */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl">Team Members ({teamMembers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-sm">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-slate-400">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg">
                      <Shield size={16} className="text-blue-400" />
                      <select className="bg-transparent text-white font-semibold text-sm outline-none">
                        <option value="owner" selected={member.role === "Owner"}>
                          Owner
                        </option>
                        <option value="admin" selected={member.role === "Admin"}>
                          Admin
                        </option>
                        <option value="editor" selected={member.role === "Editor"}>
                          Editor
                        </option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>

                    {member.role !== "Owner" && (
                      <Button className="bg-red-600/20 hover:bg-red-600/40 text-red-400">
                        <Trash2 size={18} />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
