"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, GraduationCap, Stethoscope, Check } from "lucide-react";

const ROLES = [
  {
    id: "STUDENT",
    title: "Mahasiswa/\nPasien",
    description: "Screening kesehatan mental, konseling, profesional, AI chat, dan sumber daya wellness",
    icon: GraduationCap,
    emoji: "🎓",
    gradient: "linear-gradient(135deg, hsl(195,70%,92%) 0%, hsl(220,65%,93%) 100%)",
    accent: "hsl(195, 70%, 52%)",
    illustration: "/img/logo.png",
  },
  {
    id: "COUNSELOR",
    title: "Konselor",
    description: "Pantau tingkat stress mahasiswa, kelola antrian, chat, dan jadwal kosong",
    icon: Stethoscope,
    emoji: "🩺",
    gradient: "linear-gradient(135deg, hsl(160,60%,90%) 0%, hsl(195,55%,93%) 100%)",
    accent: "hsl(160, 60%, 44%)",
    illustration: "/img/logo.png",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 22 },
  },
};

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"role" | "form">("role");
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "COUNSELOR" | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelect = (role: "STUDENT" | "COUNSELOR") => {
    setSelectedRole(role);
    setTimeout(() => setStep("form"), 350);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: selectedRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Terjadi kesalahan. Silakan coba lagi.");
      } else {
        router.push("/login?registered=true");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(195,55%,88%) 0%, hsl(215,50%,91%) 35%, hsl(260,45%,92%) 65%, hsl(340,50%,93%) 100%)",
      }}
    >
      {/* Floating background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Floating sparkle dots */}
      {[
        { top: "12%", left: "8%", size: 8, delay: 0 },
        { top: "20%", right: "10%", size: 12, delay: 1.2 },
        { top: "75%", left: "5%", size: 6, delay: 2.1 },
        { top: "85%", right: "8%", size: 10, delay: 0.7 },
        { top: "45%", left: "3%", size: 7, delay: 1.8 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full animate-pulse-soft pointer-events-none"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: (dot as { left?: string }).left,
            right: (dot as { right?: string }).right,
            background: `hsl(${[195, 340, 270, 48, 160][i]}, 70%, 75%)`,
            animationDelay: `${dot.delay}s`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15 }}
        />
      ))}

      <AnimatePresence mode="wait">
        {step === "role" ? (
          <motion.div
            key="role"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <div className="flex items-center justify-center mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/logo.png"
                  alt="KicawCare"
                  className="h-12 w-auto"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <h1
                className="font-display text-4xl mb-2"
                style={{ color: "hsl(215, 40%, 28%)" }}
              >
                Saya bergabung sebagai...
              </h1>
              <p
                className="text-base"
                style={{ color: "hsl(215, 20%, 55%)" }}
              >
                Pilih peran Anda untuk memulai
              </p>
            </motion.div>

            {/* Role cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ROLES.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id as "STUDENT" | "COUNSELOR")}
                  className="role-card text-left group relative"
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  style={selectedRole === role.id ? { borderColor: role.accent } : {}}
                >
                  {/* Role illustration circle */}
                  <div className="flex justify-center mb-5">
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center relative overflow-hidden"
                      style={{ background: role.gradient }}
                      whileHover={{ rotate: [0, -3, 3, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Illustrated icon placeholder */}
                      <span className="text-4xl select-none">{role.emoji}</span>
                      {/* Soft shimmer */}
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-2xl text-center mb-3 whitespace-pre-line leading-tight"
                    style={{ color: "hsl(215, 40%, 28%)" }}
                  >
                    {role.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm text-center leading-relaxed"
                    style={{ color: "hsl(215, 20%, 52%)" }}
                  >
                    {role.description}
                  </p>

                  {/* Selection indicator */}
                  {selectedRole === role.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: role.accent }}
                    >
                      <Check size={13} className="text-white" strokeWidth={3} />
                    </motion.div>
                  )}

                  {/* Bottom accent bar */}
                  <motion.div
                    className="absolute bottom-0 left-6 right-6 h-1 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: role.gradient }}
                  />
                </motion.button>
              ))}
            </motion.div>

            {/* Back to login */}
            <motion.p
              variants={itemVariants}
              className="text-center text-sm mt-8"
              style={{ color: "hsl(215, 20%, 55%)" }}
            >
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-700 hover:underline transition-colors"
                style={{ color: "hsl(195, 70%, 46%)" }}
              >
                Masuk di sini
              </Link>
            </motion.p>
          </motion.div>
        ) : (
          /* ── Form Step ── */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-[420px]"
          >
            {/* Back button */}
            <motion.button
              onClick={() => setStep("role")}
              className="flex items-center gap-2 mb-6 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: "hsl(215, 30%, 50%)" }}
              whileHover={{ x: -4 }}
            >
              <ArrowRight size={15} className="rotate-180" />
              Kembali pilih peran
            </motion.button>

            {/* Role badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">
                {selectedRole === "STUDENT" ? "🎓" : "🩺"}
              </span>
              <span
                className="text-sm font-700 px-3 py-1 rounded-full"
                style={{
                  background: selectedRole === "STUDENT" ? "hsl(195,70%,92%)" : "hsl(160,60%,90%)",
                  color: selectedRole === "STUDENT" ? "hsl(195,70%,38%)" : "hsl(160,60%,34%)",
                }}
              >
                {selectedRole === "STUDENT" ? "Mahasiswa / Pasien" : "Konselor"}
              </span>
            </div>

            <div className="glass-card rounded-3xl p-8">
              <h2
                className="font-display text-2xl mb-1"
                style={{ color: "hsl(215, 40%, 28%)" }}
              >
                Buat Akun
              </h2>
              <p className="text-sm mb-6" style={{ color: "hsl(215, 20%, 55%)" }}>
                Isi data diri kamu untuk bergabung
              </p>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 rounded-xl text-sm font-semibold"
                    style={{ background: "hsl(0,80%,96%)", color: "hsl(0,65%,48%)", border: "1px solid hsl(0,60%,88%)" }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="reg-name" className="text-sm font-700" style={{ color: "hsl(215, 30%, 40%)" }}>
                    Nama Lengkap
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap"
                    className="pastel-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-email" className="text-sm font-700" style={{ color: "hsl(215, 30%, 40%)" }}>
                    Email UB
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    placeholder="nim@student.ub.ac.id"
                    className="pastel-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-password" className="text-sm font-700" style={{ color: "hsl(215, 30%, 40%)" }}>
                    Password
                  </label>
                  <input
                    id="reg-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="pastel-input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

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
                    <>Daftar Sekarang <ArrowRight size={16} /></>
                  )}
                </motion.button>
              </form>
            </div>

            <p className="text-center text-sm mt-5" style={{ color: "hsl(215, 20%, 55%)" }}>
              Sudah punya akun?{" "}
              <Link href="/login" className="font-700 hover:underline" style={{ color: "hsl(195, 70%, 46%)" }}>
                Masuk di sini
              </Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
