"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Lock, Globe, Trash2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">Settings</h1>
          <p className="text-slate-400 text-lg">Manage your account and preferences</p>
        </div>

        {/* Account Settings */}
        <Card className="bg-slate-900/50 border-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Globe size={24} /> Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Full Name</label>
              <Input
                defaultValue={session?.user?.name || ""}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Email</label>
              <Input
                defaultValue={session?.user?.email || ""}
                type="email"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white">
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-slate-900/50 border-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Bell size={24} /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Email notifications", checked: true },
              { label: "Project updates", checked: true },
              { label: "Team invitations", checked: true },
              { label: "Marketing emails", checked: false },
            ].map((notification) => (
              <label key={notification.label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={notification.checked}
                  className="w-5 h-5 rounded bg-slate-700 border-slate-600 cursor-pointer"
                />
                <span className="text-white font-medium">{notification.label}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-slate-900/50 border-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Lock size={24} /> Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white h-12">
              <Lock size={20} className="mr-2" /> Change Password
            </Button>
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white h-12">
              Enable Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-red-950/20 border-red-900/50">
          <CardHeader>
            <CardTitle className="text-2xl text-red-400">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-900/50">
              <p className="text-sm text-red-300 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Trash2 size={20} className="mr-2" /> Delete Account
              </Button>
            </div>

            <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-900/50 pt-6">
              <Button
                onClick={handleLogout}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white h-12"
              >
                <LogOut size={20} className="mr-2" /> Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
