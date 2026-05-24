"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Brain, CalendarHeart } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col relative overflow-hidden min-h-screen">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px] -z-10 pointer-events-none" />

      {/* Navbar */}
      <header className="w-full py-6 px-6 sm:px-12 flex justify-between items-center backdrop-blur-md bg-background/50 border-b border-border/40 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image src="/img/logo.png" alt="Kicawcare logo" width={24} height={24} className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">Kicawcare</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 sm:py-32 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for all UB Students
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-balance leading-tight mb-6">
            Your Mental Wellness, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
              Our Priority.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            Kicawcare provides a safe, accessible, and emotionally comforting platform 
            for university students. Get AI-assisted insights, queue for counseling, and access self-help tools anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
            >
              Start Free Screening
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full text-lg font-medium border border-border bg-background/50 backdrop-blur-sm hover:bg-muted transition-all"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-6 mt-24 text-left"
        >
          <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Safe & Confidential</h3>
            <p className="text-muted-foreground text-sm">Your data is secured with enterprise-grade encryption and strict privacy protocols.</p>
          </div>
          <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">AI Stress Engine</h3>
            <p className="text-muted-foreground text-sm">Intelligent screening (PHQ-9 & GAD-7) with sentiment analysis for accurate severity assessment.</p>
          </div>
          <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
              <CalendarHeart className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Smart Queuing</h3>
            <p className="text-muted-foreground text-sm">Severity-based priority queue system connecting you to available counselors faster.</p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
