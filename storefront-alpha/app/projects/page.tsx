"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MoreVertical, Trash2, Edit, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchProjects();
    }
  }, [status, router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProjectTitle,
          description: newProjectDesc,
          status: "active",
        }),
      });

      if (response.ok) {
        setNewProjectTitle("");
        setNewProjectDesc("");
        fetchProjects();
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">Projects</h1>
          <p className="text-slate-400 text-lg">Manage and organize all your Shopify themes in one place</p>
        </div>

        {/* Search and Create */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <Input
              placeholder="Search projects..."
              className="pl-12 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-600 h-12"
            />
          </div>
        </div>

        {/* Create Project Form */}
        <Card className="bg-slate-900/50 border-slate-800 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Project title..."
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600"
                />
                <Input
                  placeholder="Project description..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white w-full md:w-auto">
                <Plus size={20} className="mr-2" /> Create Project
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <Card className="bg-slate-900/50 border-slate-800 text-center py-12">
            <p className="text-slate-400 mb-4">No projects yet. Create your first one!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all group">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                        <p className="text-sm text-slate-400 mt-2">{project.description || "No description"}</p>
                      </div>
                      <div className="relative">
                        <button className="p-2 text-slate-500 hover:text-white">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full capitalize">
                          {project.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs">
                        <Eye size={14} className="mr-1" /> View
                      </Button>
                      <Button size="sm" className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs">
                        <Code size={14} className="mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="bg-red-600/20 hover:bg-red-600/40 text-red-400"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
