"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const signupSuccess = searchParams.get("signup") === "success";

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate inputs
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!result?.ok || result?.error) {
        setError(result?.error || "Sign in failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      // Only redirect if authentication was successful
      if (result.ok) {
        // Wait a moment for session to update, then redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during sign in");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 md:py-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm md:max-w-md"
      >
        <Card className="bg-slate-900/50 border-slate-800 text-white">
          <CardHeader className="space-y-2 text-center py-6 md:py-8">
            <div className="mx-auto h-10 md:h-12 w-10 md:w-12 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold shadow-lg">
              SA
            </div>
            <CardTitle className="text-xl md:text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400 text-sm md:text-base">
              Sign in to continue to AI Shopify Architect
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {signupSuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  Account created! Please sign in.
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white h-10"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <ArrowRight className="h-4 w-4 mr-2" />
                )}
                Sign In
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-slate-800 pt-6">
            <p className="text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default function SigninPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-slate-950" />}>
      <SignInContent />
    </Suspense>
  );
}