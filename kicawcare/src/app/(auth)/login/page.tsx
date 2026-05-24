"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Email atau password salah. Silakan coba lagi.");
      } else {
        window.location.href = "/student/dashboard";
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, hsl(195,55%,90%) 0%, hsl(220,50%,93%) 50%, hsl(270,45%,94%) 100%)" }}>
      {/* Floating orbs background */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── Left Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col relative w-[45%] min-h-screen overflow-hidden"
      >
        {/* Nature image */}
        <div className="absolute inset-0">
          <Image
            src="/img/left-panel.png"
            alt="Ruang aman untuk cerita dan tumbuh"
            fill
            className="object-cover"
            priority
          />
          {/* Soft overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,220,200,0.18) 0%, rgba(200,235,245,0.08) 50%, rgba(180,160,220,0.22) 100%)",
            }}
          />
        </div>

        {/* Italic tagline overlay */}
        <div className="absolute top-8 left-8 right-8 z-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-display italic text-white text-lg drop-shadow-lg"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
          >
            Ruang aman untuk cerita dan tumbuh
          </motion.p>
        </div>

        {/* Floating decorative petals */}
        {[
          { size: 28, top: "60%", left: "15%", delay: 0, color: "hsl(25,80%,75%,0.55)" },
          { size: 20, top: "72%", left: "55%", delay: 1.5, color: "hsl(340,70%,78%,0.5)" },
          { size: 24, top: "80%", left: "30%", delay: 0.8, color: "hsl(48,80%,72%,0.55)" },
          { size: 16, top: "65%", left: "70%", delay: 2.2, color: "hsl(195,70%,72%,0.5)" },
        ].map((petal, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full animate-float pointer-events-none"
            style={{
              width: petal.size,
              height: petal.size,
              top: petal.top,
              left: petal.left,
              background: petal.color,
              animationDelay: `${petal.delay}s`,
              filter: "blur(1px)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
          />
        ))}
      </motion.div>

      {/* ── Right Panel – Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-[400px]"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mb-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/logo.png"
                alt="KicawCare Logo"
                className="h-14 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </motion.div>

            <h1
              className="font-display text-3xl text-center mb-1"
              style={{ color: "hsl(215, 45%, 30%)" }}
            >
              Sistem Autentikasi
            </h1>
            <h2
              className="font-display text-3xl text-center"
              style={{ color: "hsl(215, 45%, 30%)" }}
            >
              Universitas Brawijaya
            </h2>
          </div>

          {/* Glass card form */}
          <div className="glass-card rounded-3xl p-8">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="mb-4 p-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: "hsl(0, 80%, 96%)",
                    color: "hsl(0, 65%, 48%)",
                    border: "1px solid hsl(0, 60%, 88%)",
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-email"
                  className="text-sm font-700"
                  style={{ color: "hsl(215, 30%, 40%)" }}
                >
                  Username or email
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="nim@student.ub.ac.id"
                  className="pastel-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-password"
                  className="text-sm font-700"
                  style={{ color: "hsl(215, 30%, 40%)" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="pastel-input pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full mt-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    SIGN IN
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Links */}
            <div className="mt-5 text-center space-y-2">
              <Link
                href="#"
                className="text-sm font-semibold transition-colors hover:underline"
                style={{ color: "hsl(195, 70%, 46%)" }}
              >
                I forgot my password
              </Link>
            </div>
          </div>

          {/* Register link */}
          <p
            className="text-center text-sm mt-5"
            style={{ color: "hsl(215, 20%, 55%)" }}
          >
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-700 hover:underline transition-colors"
              style={{ color: "hsl(195, 70%, 46%)" }}
            >
              Daftar di sini
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
