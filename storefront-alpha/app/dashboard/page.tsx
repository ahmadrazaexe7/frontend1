"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Layout, Layers, ShoppingBag, CreditCard, Settings, 
  Monitor, Smartphone, Send, CheckCircle2, Plus, ArrowRight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("builder");
  const [prompt, setPrompt] = useState("");
  const [devicePreview, setDevicePreview] = useState("desktop");
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Auto-progress steps when generating
  useEffect(() => {
    if (!isGenerating) return;
    
    const stepDurations = [2000, 2500, 2000, 1500]; // Duration for each step
    
    const progressSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, stepDurations[i]));
      }
      setIsGenerating(false);
      setCurrentStep(0); // Reset to first step
    };
    
    progressSteps();
  }, [isGenerating]);

  if (status === "loading") {
    return (
      <div className="w-full h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#020617] text-white overflow-hidden font-sans">
      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between h-16 border-b border-white/5 bg-[#050a18] px-4 gap-4">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push("/")} title="Back to Home">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center font-bold text-xs shadow-lg shadow-cyan-500/30">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <path d="M12 8v8M8 12h8" />
              <circle cx="12" cy="5" r="1" fill="currentColor" />
              <circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
          </div>
          <span className="font-bold text-xs text-cyan-300">NexfAI</span>
        </div>
        <h2 className="font-bold text-xs text-white flex-1 text-right">{getTabTitle()}</h2>
        <div className="h-10 w-10 rounded-full bg-pink-500 border-2 border-white/10 flex items-center justify-center font-bold text-xs shadow-lg" title="User Profile">
          {session?.user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      </div>

      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex w-auto min-w-[220px] border-r border-white/10 flex-col items-start py-8 px-6 gap-8 bg-[#050a18] z-20">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity w-full" onClick={() => router.push("/")} title="Back to Home">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/40 flex-shrink-0">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <path d="M12 8v8M8 12h8" />
              <circle cx="12" cy="5" r="1" fill="currentColor" />
              <circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-white tracking-tight">NexfAI</span>
            <span className="text-[10px] text-cyan-300 font-semibold -mt-1">Storefront</span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent w-full" />
        
        <nav className="flex flex-col gap-3 flex-1 w-full">
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title={item.label}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 border-2 border-white/20 flex items-center justify-center font-bold text-sm shadow-lg shadow-pink-600/30 cursor-pointer hover:scale-110 transition-all" title="User Profile">
          {session?.user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Header - Hidden on mobile */}
        <header className="hidden md:flex h-16 border-b border-white/5 items-center justify-between px-6 md:px-8 bg-[#050a18]/80 backdrop-blur-md">
          <div className="flex items-center gap-6 md:gap-8">
            <div>
              <h2 className="font-bold text-base md:text-lg text-white leading-none">{getTabTitle()}</h2>
              <p className="text-[9px] md:text-[10px] text-slate-500 mt-1 uppercase tracking-widest">{getTabSubtitle()}</p>
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

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex gap-2 overflow-x-auto px-2 py-3 bg-[#050a18]/50 border-b border-white/5 scrollbar-hide">
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
              className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 transition-all text-sm ${activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`}
            >
              <item.icon size={16} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* BUILDER TAB */}
          {activeTab === "builder" && (
            <>
              {/* Status Panel - Hidden on mobile, shown on desktop */}
              <div className="hidden md:flex w-[420px] border-r border-white/10 bg-gradient-to-b from-[#050a18] via-[#0f1420] to-[#050a18] overflow-y-auto flex-col">
                {/* Timeline Section */}
                <div className="p-8">
                  <h4 className="text-xs md:text-[11px] font-black mb-8 text-slate-400 uppercase tracking-[0.25em] px-2">Build Timeline</h4>
                  <div className="space-y-8 relative">
                    {/* Animated Progress line - appears only during generation */}
                    {isGenerating && (
                      <motion.div 
                        className="absolute left-[27px] top-3 bottom-0 w-0.5 rounded-full"
                        initial={{ background: "linear-gradient(to bottom, rgba(59, 130, 246, 0), rgba(59, 130, 246, 0))" }}
                        animate={{ background: `linear-gradient(to bottom, rgba(59, 130, 246, 1), rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0))` }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
                      />
                    )}
                    
                    {steps.map((step, idx) => {
                      const isActive = idx === currentStep;
                      const isCompleted = idx < currentStep;
                      
                      return (
                        <motion.div 
                          key={step} 
                          className="flex items-start gap-6 relative z-10 group"
                          initial={{ opacity: 0.7, x: -10 }}
                          animate={isActive ? { opacity: 1, x: 0 } : { opacity: isCompleted ? 0.8 : 0.7, x: isCompleted ? 5 : -10 }}
                          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                        >
                          {/* Animated circle */}
                          <div className={`relative mt-0.5 transition-all duration-500 ${isActive ? 'scale-110' : isCompleted ? 'scale-95' : 'scale-100 group-hover:scale-105'}`}>
                            <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-500 ${
                              isActive 
                                ? 'border-blue-400 bg-blue-500/20 text-blue-300 shadow-[0_0_16px_rgba(59,130,246,0.4)]' 
                                : isCompleted
                                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                                : 'border-slate-700 bg-slate-800/50 text-slate-500 group-hover:border-blue-500/50 group-hover:bg-blue-500/10'
                            }`}>
                              {isCompleted ? '✓' : idx + 1}
                            </div>
                            {isActive && (
                              <>
                                <div className="absolute inset-0 rounded-full animate-pulse border-2 border-blue-400/20"></div>
                                <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-50 animate-ping" style={{animationDuration: '2s'}}></div>
                              </>
                            )}
                          </div>
                          
                          {/* Text content */}
                          <motion.div 
                            className="flex-1 pt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                          >
                            <p className={`font-bold transition-all duration-500 ${isActive ? 'text-white text-sm' : isCompleted ? 'text-emerald-300 text-sm line-through' : 'text-slate-400 text-sm group-hover:text-slate-300'}`}>{step}</p>
                            <motion.p 
                              className="text-[11px] text-slate-500 mt-1.5"
                              animate={isActive ? { color: 'rgba(59, 130, 246, 0.7)' } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {isActive ? 'Processing...' : isCompleted ? 'Completed' : `Step ${idx + 1}`}
                            </motion.p>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0 mx-6" />

                {/* Recent Builds Section */}
                <div className="p-8 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xs md:text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Recent Builds</h4>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full font-semibold">2 Latest</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Product Hero Section", time: "2 minutes ago", icon: "🎨" },
                      { title: "Collection Grid Layout", time: "15 minutes ago", icon: "📊" }
                    ].map((build, idx) => (
                      <div key={build.title} className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 group-hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <span className="text-xl mt-0.5">{build.icon}</span>
                              <div className="min-w-0">
                                <p className="text-xs md:text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">{build.title}</p>
                                <p className="text-[9px] md:text-[10px] text-slate-500 mt-1.5">{build.time}</p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 border border-emerald-500/40 flex items-center justify-center ml-2">
                              <CheckCircle2 className="text-emerald-400" size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Preview Panel */}
              <div className="flex-1 bg-gradient-to-b from-black via-slate-950/50 to-black p-4 md:p-8 flex flex-col relative overflow-hidden">
                 {/* Animated Background Grid */}
                 <div className="absolute inset-0 opacity-10">
                   <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none"></div>
                 </div>

                 {/* Preview Container - Enhanced with animations */}
                 <div className="flex-1 w-full rounded-[28px] shadow-2xl flex flex-col items-center justify-center text-center p-6 md:p-12 overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800/30 via-slate-900/50 to-slate-950/80 relative group">
                    {/* Animated background elements */}
                    <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-blob pointer-events-none"></div>
                    <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-blob animation-delay-4000 pointer-events-none"></div>
                    
                    {/* Animated grid lines */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px] md:bg-[size:50px]"></div>
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:50px_50px]"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      {/* Animated icon container with multiple layers */}
                      <div className="relative mb-6 md:mb-12">
                        {/* Rotating border */}
                        <div className="absolute -inset-6 md:-inset-8 rounded-full border border-transparent bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-blue-500/30 animate-spin opacity-50" style={{animationDuration: '8s'}}></div>
                        
                        {/* Pulsing glow */}
                        <div className="absolute -inset-3 md:-inset-5 bg-gradient-to-r from-blue-500/40 to-cyan-500/30 rounded-full blur-2xl animate-pulse"></div>
                        
                        {/* Main icon */}
                        <div className="relative w-20 md:w-32 h-20 md:h-32 rounded-3xl bg-gradient-to-br from-blue-500/30 via-slate-700/40 to-cyan-600/20 flex items-center justify-center border-2 border-blue-400/50 shadow-2xl shadow-blue-500/30">
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-pulse"></div>
                          <Monitor size={60} className="text-blue-300 relative z-10 md:w-16 md:h-16 animate-bounce" style={{animationDuration: '3s'}} />
                        </div>
                      </div>
                      
                      {/* Title with gradient */}
                      <h3 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 mb-3 md:mb-6 tracking-tight">Ready to Create</h3>
                      <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium mb-8 md:mb-12">Describe your perfect Shopify theme and our AI will generate it instantly. Watch the magic happen in real-time with live preview.</p>
                      
                      {/* Feature badges */}
                      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] md:text-xs font-semibold">
                          <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
                          AI Powered
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-[10px] md:text-xs font-semibold">
                          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          Real-time
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] md:text-xs font-semibold">
                          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          Production Ready
                        </div>
                      </div>
                    </div>
                 </div>
                 
                 {/* Prompt Input Area - Enhanced */}
                 <div className="mt-6 md:mt-10 w-full relative z-20">
                    <div className="relative group">
                      {/* Animated background glow */}
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/60 via-cyan-600/40 to-blue-600/60 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-300"></div>
                      
                      <div className="relative flex flex-col md:flex-row items-stretch gap-2 md:gap-0 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-blue-500/50 rounded-2xl p-3 md:p-4 shadow-2xl shadow-blue-900/40 backdrop-blur-md">
                        {/* Input wrapper with icon */}
                        <div className="flex-1 flex items-center gap-3 px-4 md:px-6">
                          <div className="text-blue-400/60 group-focus-within:text-blue-300 transition-colors">
                            <Sparkles size={18} className="stroke-[2]" />
                          </div>
                          <input 
                            type="text" 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your theme... (e.g. 'Minimalist jewelry store with dark mode')"
                            className="flex-1 w-full bg-transparent border-none py-3 md:py-4 text-xs md:text-sm text-white focus:outline-none placeholder:text-slate-500/70 font-medium"
                          />
                        </div>
                        
                        <Button 
                          onClick={() => {
                            if (prompt.trim() && !isGenerating) {
                              setIsGenerating(true);
                              setCurrentStep(0);
                            }
                          }}
                          disabled={isGenerating || !prompt.trim()}
                          className={`w-full md:w-auto text-white rounded-xl mx-1 md:mx-2 my-1 md:my-0 px-6 md:px-8 h-11 md:h-12 font-bold flex items-center justify-center gap-2.5 shadow-lg transition-all duration-300 active:scale-95 ${
                            isGenerating 
                              ? 'bg-gradient-to-r from-emerald-600 to-green-500 shadow-emerald-600/60 hover:shadow-emerald-500/80' 
                              : prompt.trim()
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-blue-600/60 hover:shadow-blue-500/80'
                              : 'bg-gradient-to-r from-slate-600 to-slate-500 shadow-slate-600/60 cursor-not-allowed opacity-50'
                          }`}
                        >
                          {isGenerating ? (
                            <>
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <Sparkles size={18} className="stroke-[2.5]" />
                              </motion.div>
                              <span className="hidden sm:inline text-sm font-bold">Generating...</span>
                            </>
                          ) : (
                            <>
                              <Send size={18} className="stroke-[2.5] md:w-5 md:h-5" /> 
                              <span className="hidden sm:inline text-sm font-bold">Generate</span>
                            </>
                          )}
                        </Button>
                      </div>
                      <motion.p 
                        className="text-[10px] md:text-xs text-slate-500/80 mt-3 px-2 text-center font-medium"
                        animate={isGenerating ? { opacity: [0.5, 1, 0.5] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {isGenerating ? '⚡ Building your theme... Watch the process unfold' : '⚡ Press Enter or click Generate • AI will create your perfect theme in seconds'}
                      </motion.p>
                    </div>
                 </div>
              </div>
            </>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-6 md:mb-8">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white">Your Projects</h3>
                    <p className="text-slate-400 mt-1 text-sm">Manage and organize your Shopify themes</p>
                  </div>
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center md:justify-start gap-2 h-10">
                    <Plus size={18} /> New Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 md:p-6 bg-gradient-to-br from-slate-900/50 to-slate-950 border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all cursor-pointer group">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="text-base md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h4>
                          <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${project.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="pt-3 md:pt-4 border-t border-white/5 mt-3 md:mt-4">
                        <p className="text-[10px] md:text-[11px] text-slate-500">Created {project.created}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SHOPIFY/INTEGRATIONS TAB */}
          {activeTab === "shopify" && (
            <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
              <div className="max-w-7xl mx-auto">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">Connected Services</h3>
                <p className="text-slate-400 mb-6 text-sm">Manage your integrations and connected apps</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {integrations.map((integration) => (
                    <div key={integration.name} className={`p-4 md:p-6 rounded-2xl border-2 transition-all ${integration.connected ? "bg-emerald-600/10 border-emerald-500/30" : "bg-slate-900/50 border-slate-800"}`}>
                      <div className="flex items-center justify-between mb-4 gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl md:text-4xl">{integration.icon}</span>
                          <div>
                            <h4 className="text-base md:text-lg font-bold text-white">{integration.name}</h4>
                            <p className="text-xs text-slate-400 mt-1">{integration.connected ? "Connected" : "Not Connected"}</p>
                          </div>
                        </div>
                        {integration.connected && <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={20} />}
                      </div>
                      <Button className={`w-full text-sm md:text-base h-9 md:h-10 ${integration.connected ? "bg-slate-800 hover:bg-slate-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold`}>
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
            <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
                  <div className="p-4 md:p-6 bg-gradient-to-br from-blue-600/20 to-blue-950 border border-blue-500/20 rounded-2xl">
                    <p className="text-xs md:text-sm text-slate-400 mb-2">Current Plan</p>
                    <h3 className="text-xl md:text-2xl font-black text-blue-400">{billingInfo.plan}</h3>
                    <p className="text-xs md:text-sm text-slate-400 mt-2">{billingInfo.price}</p>
                  </div>
                  <div className="p-4 md:p-6 bg-gradient-to-br from-emerald-600/20 to-emerald-950 border border-emerald-500/20 rounded-2xl">
                    <p className="text-xs md:text-sm text-slate-400 mb-2">Next Billing</p>
                    <h3 className="text-xl md:text-2xl font-black text-emerald-400">{billingInfo.nextBilling}</h3>
                    <p className="text-xs md:text-sm text-slate-400 mt-2">24 days remaining</p>
                  </div>
                  <div className="p-4 md:p-6 bg-gradient-to-br from-purple-600/20 to-purple-950 border border-purple-500/20 rounded-2xl">
                    <p className="text-xs md:text-sm text-slate-400 mb-2">Payment Method</p>
                    <h3 className="text-lg md:text-2xl font-black text-purple-400">Visa •••• {billingInfo.cardLast4}</h3>
                    <p className="text-xs md:text-sm text-slate-400 mt-2">Expires {billingInfo.cardExpiry}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/50 to-slate-950 border border-white/10 rounded-2xl p-4 md:p-8">
                  <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Billing Actions</h4>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 text-sm">Upgrade Plan</Button>
                    <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold h-10 text-sm">Downgrade Plan</Button>
                    <Button className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold border border-red-500/20 h-10 text-sm">Cancel Subscription</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
              <div className="max-w-4xl mx-auto">
                {settingsSections.map((section) => (
                  <div key={section.title} className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{section.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {section.items.map((item) => (
                        <div key={item} className="p-3 md:p-4 bg-gradient-to-br from-slate-900/50 to-slate-950 border border-white/10 rounded-xl hover:border-white/20 transition-all cursor-pointer group">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-white font-medium text-sm md:text-base group-hover:text-blue-400 transition-colors">{item}</span>
                            <ArrowRight size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-8 md:mt-12 p-4 md:p-6 bg-red-600/10 border border-red-500/20 rounded-2xl">
                  <h4 className="text-base md:text-lg font-bold text-red-400 mb-2 md:mb-3">Danger Zone</h4>
                  <p className="text-xs md:text-sm text-slate-400 mb-3 md:mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold h-10 text-sm">Delete Account</Button>
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
}
