"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, ArrowRight, Check, Plus, Link as LinkIcon, 
  Layout, Layers, ShoppingBag, CreditCard, Settings, 
  Monitor, Smartphone, Send, Circle, CheckCircle2,
  Users, Target, Zap, Globe, Github, Twitter, Mail, X
} from "lucide-react";
import Marquee from "react-fast-marquee";

// Shadcn-like UI Components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

// --- 1. DASHBOARD COMPONENT (Image 2) ---

const AIDashboard = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState("builder");
  const [prompt, setPrompt] = useState("");
  const [devicePreview, setDevicePreview] = useState("desktop");
  const steps = ["Planning", "Coding", "Debugging", "Optimizing"];

  // Projects Data
  const projects = [
    { id: 1, title: "Luxury Watch Store", description: "High-end ecommerce", status: "Active", created: "Jan 20, 2026" },
    { id: 2, title: "Minimalist Apparel", description: "Fashion brand site", status: "In Progress", created: "Jan 15, 2026" },
    { id: 3, title: "Tech Gadgets Hub", description: "Electronics retailer", status: "Active", created: "Jan 10, 2026" },
  ];

  // Integrations Data
  const integrations = [
    { name: "Shopify", connected: true, icon: "🛍️", color: "emerald" },
    { name: "Stripe", connected: false, icon: "💳", color: "blue" },
    { name: "Google Analytics", connected: true, icon: "📊", color: "cyan" },
    { name: "Mailchimp", connected: false, icon: "📧", color: "pink" },
  ];

  // Billing Data
  const billingInfo = {
    plan: "Growth Plan",
    price: "$79/month",
    nextBilling: "Feb 28, 2026",
    cardLast4: "4242",
    cardExpiry: "12/2026",
  };

  // Settings Sections
  const settingsSections = [
    { title: "Account", items: ["Full Name", "Email", "Company", "Timezone"] },
    { title: "Notifications", items: ["Email Alerts", "Project Updates", "Team Invites", "Marketing Emails"] },
    { title: "Security", items: ["Change Password", "Two-Factor Auth", "Login History", "Active Sessions"] },
  ];

  const getTabTitle = () => {
    const titles: { [key: string]: string } = {
      builder: "Build Process",
      projects: "My Projects",
      shopify: "Integrations",
      billing: "Billing & Subscription",
      settings: "Account Settings",
    };
    return titles[activeTab] || "Build Process";
  };

  const getTabSubtitle = () => {
    const subtitles: { [key: string]: string } = {
      builder: "Real-time execution status",
      projects: "Manage your Shopify themes",
      shopify: "Connect third-party services",
      billing: "Manage your subscription",
      settings: "Update your account",
    };
    return subtitles[activeTab] || "Real-time execution status";
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-20 border-r border-white/5 flex flex-col items-center py-6 gap-8 bg-[#050a18] z-20">
        <div onClick={onBack} className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-xs cursor-pointer hover:scale-110 transition-all shadow-lg shadow-cyan-500/20">SA</div>
        
        <nav className="flex flex-col gap-4 flex-1">
          {[
            { id: 'builder', icon: Layout, label: 'Builder' },
            { id: 'projects', icon: Layers, label: 'Projects' },
            { id: 'shopify', icon: ShoppingBag, label: 'Shopify' },
            { id: 'billing', icon: CreditCard, label: 'Billing' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-xl transition-all relative group ${activeTab === item.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'text-slate-500 hover:text-white'}`}
              title={item.label}
            >
              <item.icon size={22} />
              <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="h-10 w-10 rounded-full bg-pink-500 border-2 border-white/10 flex items-center justify-center font-bold text-sm shadow-lg cursor-pointer hover:scale-110 transition-all">U</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#050a18]/80 backdrop-blur-md">
          <div className="flex items-center gap-8">
            <div>
              <h2 className="font-bold text-lg text-white leading-none">{getTabTitle()}</h2>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">{getTabSubtitle()}</p>
            </div>
            {activeTab === "builder" && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-white/5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Preview • <span className="text-emerald-500">Ready</span>
              </div>
            )}
          </div>
          
          {activeTab === "builder" && (
            <div className="flex bg-slate-900 rounded-xl p-1 border border-white/5">
              <Button size="sm" variant="ghost" onClick={() => setDevicePreview("desktop")} className={`${devicePreview === "desktop" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"} h-8 px-4 rounded-lg flex items-center gap-2 transition-all`}>
                <Monitor size={14} /> Desktop
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setDevicePreview("mobile")} className={`${devicePreview === "mobile" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"} h-8 px-4 rounded-lg flex items-center gap-2 transition-all`}>
                <Smartphone size={14} /> Mobile
              </Button>
            </div>
          )}
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* BUILDER TAB */}
          {activeTab === "builder" && (
            <>
              {/* Status Panel */}
              <div className="w-[380px] border-r border-white/5 p-8 bg-[#050a18]/30 overflow-y-auto">
                <div className="space-y-10 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent" />
                  {steps.map((step, idx) => (
                    <div key={step} className="flex items-center gap-5 relative z-10">
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center bg-[#050a18] transition-colors ${idx === 0 ? 'border-blue-500 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-slate-700 text-slate-700'}`}>
                        <div className={`h-2 w-2 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-transparent'}`} />
                      </div>
                      <span className={`font-medium transition-colors ${idx === 0 ? 'text-white' : 'text-slate-600'}`}>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-20">
                  <h3 className="text-[11px] font-bold mb-6 text-slate-500 uppercase tracking-[0.2em]">Recent Builds</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Product Hero Section", time: "2 minutes ago" },
                      { title: "Collection Grid Layout", time: "15 minutes ago" }
                    ].map((build) => (
                      <div key={build.title} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group">
                        <div>
                          <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{build.title}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{build.time}</p>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="text-emerald-500" size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="flex-1 bg-black p-8 flex flex-col relative">
                 <div className="flex-1 w-full bg-white rounded-[32px] shadow-2xl flex flex-col items-center justify-center text-center p-12 overflow-hidden border border-white/10">
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6">
                        <Monitor size={40} className="text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Theme preview will appear here</h3>
                    <p className="text-slate-400 max-w-xs mx-auto text-sm">Enter a prompt below to start building</p>
                 </div>
                 
                 {/* Prompt Input Area */}
                 <div className="mt-8 w-full max-w-4xl mx-auto">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                      <div className="relative flex items-center bg-[#0f172a] border border-white/10 rounded-2xl p-2 shadow-2xl">
                        <input 
                          type="text" 
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Describe your Shopify theme... (e.g. 'Minimalist jewelry store')"
                          className="flex-1 bg-transparent border-none py-4 px-6 text-sm text-white focus:outline-none placeholder:text-slate-600"
                        />
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 h-12 font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20">
                          <Send size={16} /> Generate
                        </Button>
                      </div>
                    </div>
                 </div>
              </div>
            </>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-white">Your Projects</h3>
                    <p className="text-slate-400 mt-1">Manage and organize your Shopify themes</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2">
                    <Plus size={20} /> New Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-950 border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h4>
                          <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] text-slate-500">Created {project.created}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SHOPIFY/INTEGRATIONS TAB */}
          {activeTab === "shopify" && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-black text-white mb-2">Connected Services</h3>
                <p className="text-slate-400 mb-8">Manage your integrations and connected apps</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {integrations.map((integration) => (
                    <div key={integration.name} className={`p-6 rounded-2xl border-2 transition-all ${integration.connected ? "bg-emerald-600/10 border-emerald-500/30" : "bg-slate-900/50 border-slate-800"}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{integration.icon}</span>
                          <div>
                            <h4 className="text-lg font-bold text-white">{integration.name}</h4>
                            <p className="text-xs text-slate-400 mt-1">{integration.connected ? "Connected" : "Not Connected"}</p>
                          </div>
                        </div>
                        {integration.connected && <CheckCircle2 className="text-emerald-400" size={24} />}
                      </div>
                      <Button className={`w-full ${integration.connected ? "bg-slate-800 hover:bg-slate-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold`}>
                        {integration.connected ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === "billing" && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-950 border border-blue-500/20 rounded-2xl">
                    <p className="text-sm text-slate-400 mb-2">Current Plan</p>
                    <h3 className="text-2xl font-black text-blue-400">{billingInfo.plan}</h3>
                    <p className="text-sm text-slate-400 mt-2">{billingInfo.price}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-emerald-600/20 to-emerald-950 border border-emerald-500/20 rounded-2xl">
                    <p className="text-sm text-slate-400 mb-2">Next Billing</p>
                    <h3 className="text-2xl font-black text-emerald-400">{billingInfo.nextBilling}</h3>
                    <p className="text-sm text-slate-400 mt-2">24 days remaining</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-600/20 to-purple-950 border border-purple-500/20 rounded-2xl">
                    <p className="text-sm text-slate-400 mb-2">Payment Method</p>
                    <h3 className="text-2xl font-black text-purple-400">Visa •••• {billingInfo.cardLast4}</h3>
                    <p className="text-sm text-slate-400 mt-2">Expires {billingInfo.cardExpiry}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/50 to-slate-950 border border-white/10 rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-6">Billing Actions</h4>
                  <div className="flex gap-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Upgrade Plan</Button>
                    <Button className="bg-slate-800 hover:bg-slate-700 text-white font-bold">Downgrade Plan</Button>
                    <Button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold border border-red-500/20">Cancel Subscription</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                {settingsSections.map((section) => (
                  <div key={section.title} className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items.map((item) => (
                        <div key={item} className="p-4 bg-gradient-to-br from-slate-900/50 to-slate-950 border border-white/10 rounded-xl hover:border-white/20 transition-all cursor-pointer group">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium group-hover:text-blue-400 transition-colors">{item}</span>
                            <ArrowRight size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-12 p-6 bg-red-600/10 border border-red-500/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Danger Zone</h4>
                  <p className="text-sm text-slate-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">Delete Account</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Help Circle */}
      <div className="fixed bottom-6 right-6 h-12 w-12 bg-white rounded-full flex items-center justify-center text-black font-black text-xl cursor-pointer shadow-2xl hover:scale-110 transition-transform z-50">?</div>
    </div>
  );
};

// --- 2. LANDING PAGE COMPONENTS ---

const Navbar = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <div className="h-8 md:h-10 w-8 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center font-bold text-xs md:text-sm text-white shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <path d="M12 8v8M8 12h8" />
            <circle cx="12" cy="5" r="1" fill="currentColor" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-sm md:text-lg text-white tracking-tight">NexfAI</span>
          <span className="text-[8px] md:text-[9px] text-cyan-300 font-semibold -mt-1">Storefront</span>
        </div>
      </div>
      <div className="hidden lg:flex gap-6 md:gap-10 text-xs md:text-sm font-semibold text-slate-400">
        <a href="#about" className="hover:text-white transition-colors">About Us</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={() => onNavigate('/signin')} className="text-xs md:text-sm font-bold text-white hover:text-blue-400 transition-colors px-2 md:px-4">Log in</button>
        <button onClick={() => onNavigate('/signup')} className="inline-flex items-center gap-1 md:gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-600/50 rounded-full px-3 md:px-6 py-1.5 md:py-2 font-black text-xs md:text-sm transition-all hover:scale-105 active:scale-95">
          SIGN UP
          <ArrowRight size={14} className="stroke-[2.5px] hidden sm:inline" />
        </button>
      </div>
    </div>
  </nav>
);

const PrecisePricing = () => {
  const plans = [
    { name: "Starter", price: "29", tag: "For solo creators", features: ["10 AI Generations", "1 Active Project", "Standard Support"] },
    { name: "Growth", price: "79", tag: "Best for growing brands", features: ["50 AI Generations", "5 Active Projects", "Custom CSS Access", "Priority Support", "Basic Analytics"], popular: true },
    { name: "Enterprise", price: "199", tag: "For high-volume agencies", features: ["Unlimited AI Generations", "Unlimited Projects", "White-label Dashboard", "24/7 Dedicated Support", "API Access"] },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 md:px-6 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 shadow-inner">
            <Zap size={12} className="md:w-4 md:h-4" /> Flexible Pricing
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">Scale Your Vision</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-slate-400 text-sm md:text-xl font-medium max-w-2xl mx-auto">Simple, transparent pricing that grows with your business. No hidden fees.</motion.p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative group rounded-2xl md:rounded-[32px] border transition-all duration-300 overflow-visible ${
                plan.popular 
                  ? 'border-blue-500/50 bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-950 shadow-2xl shadow-blue-600/20 md:scale-105' 
                  : 'border-white/10 bg-slate-900/50 hover:border-blue-500/30 hover:bg-slate-900/70'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[9px] md:text-[11px] font-black px-4 md:px-6 py-1 md:py-2 rounded-full uppercase tracking-[0.15em] shadow-xl shadow-blue-600/50 z-10">
                    Most Popular
                  </div>
                )}
                
              <div className={`p-6 md:p-8 md:p-10 ${plan.popular ? 'pt-10 md:pt-12' : ''}`}>
                {/* Plan Title */}
                <div className="mb-6 md:mb-8">
                  <p className="text-blue-400 text-[8px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-4">{plan.tag}</p>
                  <div className="flex items-baseline gap-1 md:gap-2">
                    <span className="text-3xl md:text-5xl font-black text-white">${plan.price}</span>
                    <span className="text-slate-400 font-bold text-xs md:text-sm">/month</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-6 md:mb-8" />

                {/* Features */}
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 md:gap-3 text-slate-300 text-xs md:text-sm font-medium group/item">
                      <div className="h-4 md:h-5 w-4 md:w-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-blue-500/40 transition-colors">
                        <Check size={12} className="text-blue-400 stroke-[2.5px]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  className={`w-full h-10 md:h-12 rounded-lg md:rounded-xl font-black text-xs md:text-sm transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 active:scale-95' 
                      : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {plan.popular ? 'GET STARTED' : `START WITH ${plan.name.toUpperCase()}`}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 pt-16 border-t border-white/5"
        >
          <p className="text-slate-400 text-lg font-medium mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Secure Data</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> 24/7 Support</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> SSL Certificate</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Analytics</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- 3. MAIN APP CONTROLLER ---

export default function App() {
  const router = useRouter();
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [mounted, setMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (view === "dashboard") return <AIDashboard onBack={() => setView("landing")} />;

  return (
    <div className="w-full relative min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar onNavigate={handleNavigate} />
      
      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-4 md:px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] md:h-[800px] bg-[radial-gradient(circle_at_50%_0%,_#1e3a8a_0%,_transparent_70%)] opacity-20 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto z-10 relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-12 shadow-inner">
            <Sparkles size={12} className="md:w-4 md:h-4" /> The Future of E-commerce
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-tight uppercase">
            BUILD YOUR <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">EMPIRE</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed font-medium">
            The world's first AI-native architecture platform for Shopify. 
            Generate, customize, and deploy themes at the speed of thought.
          </p>

          <motion.button 
            onClick={() => handleNavigate('/signup')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 md:gap-3 rounded-full px-6 md:px-12 py-3 md:py-4 h-auto text-sm md:text-base lg:text-lg font-black bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-2xl hover:shadow-blue-600/50 transition-all active:scale-95"
          >
            GET STARTED
            <ArrowRight size={20} className="stroke-[2.5px] md:w-6 md:h-6" />
          </motion.button>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-8 md:py-12 border-y border-white/5 mb-12 md:mb-20">
        <Marquee gradient={true} gradientColor="#020617" speed={50}>
            {["Shopify", "Nike", "Vercel", "Stripe", "Airbnb", "Adidas", "Tesla", "Apple"].map(brand => (
                <span key={brand} className="mx-8 md:mx-20 text-2xl md:text-3xl font-black text-slate-800 opacity-50 hover:opacity-100 transition-opacity cursor-default">{brand}</span>
            ))}
        </Marquee>
      </div>

      {/* About Us (Image 3 logic integrated) */}
      <section id="about" className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="h-1 md:h-1.5 w-16 md:w-24 bg-blue-600 mb-6 md:mb-10 rounded-full" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight uppercase tracking-tighter">Engineering the <span className="text-blue-500">Future</span> of Retail.</h2>
            <p className="text-slate-400 text-sm md:text-base lg:text-lg font-medium leading-relaxed mb-8 md:mb-12">
                We build tools that empower the world's most ambitious brands. 
                Our AI-native engine handles the complexity of theme development, 
                allowing you to focus on growth and customer experience.
            </p>
            <div className="grid grid-cols-2 gap-8 md:gap-12">
                {[
                    { val: "99.9%", label: "Uptime" },
                    { val: "10k+", label: "Stores Built" }
                ].map(stat => (
                    <div key={stat.label}>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 md:mb-2">{stat.val}</p>
                        <p className="text-slate-500 text-[9px] md:text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>
          </motion.div>
          <div className="relative group hidden md:block">
            <div className="absolute -inset-4 bg-blue-500/10 rounded-[60px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-square rounded-[40px] md:rounded-[60px] bg-slate-900 border border-white/10 flex items-center justify-center p-8 md:p-12 shadow-2xl overflow-hidden">
                <Users size={120} className="text-blue-500 opacity-5 absolute scale-150 rotate-12" />
                <div className="grid grid-cols-2 gap-4 md:gap-6 w-full relative z-10">
                    {[Zap, Globe, Target, Sparkles].map((Icon, i) => (
                        <div key={i} className="aspect-square rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/10 hover:border-blue-500 transition-all cursor-default">
                            <Icon className="text-blue-500 w-6 md:w-10 h-6 md:h-10" />
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      <PrecisePricing />
      
      {/* Footer */}
      <footer id="contact" className="py-16 md:py-32 px-4 md:px-6 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
                <div className="h-11 md:h-14 w-11 md:w-14 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center font-black text-sm md:text-base shadow-lg shadow-cyan-500/40">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                    <path d="M12 8v8M8 12h8" />
                    <circle cx="12" cy="5" r="1" fill="currentColor" />
                    <circle cx="12" cy="19" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-3xl font-black text-white tracking-tight">NexfAI</span>
                  <span className="text-[9px] md:text-xs text-cyan-300 font-semibold -mt-1">Storefront</span>
                </div>
            </div>
            <div className="flex gap-6 md:gap-12 mb-12 md:mb-20 text-slate-500 font-bold uppercase text-[9px] md:text-xs tracking-[0.3em]">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Github</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
            <p className="text-slate-700 text-[7px] md:text-[10px] font-black uppercase tracking-[0.5em]">© 2026 NEXFAI STOREFRONT INC.</p>
        </div>
      </footer>
    </div>
  );
}