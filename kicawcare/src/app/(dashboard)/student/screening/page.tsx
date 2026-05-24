"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

/* ─── Question data matching reference image ─── */
const sections = [
  {
    tag: "PHQ-9 . DEPRESI",
    color: "hsl(210, 65%, 42%)",
    questions: [
      "Merasa kurang teratarik atau tidak senang melakukan sesuatu",
      "Merasa sedih, depresi, atau putus asa",
      "Sulit tidur atau tidur terlalu banyak",
      "Merasa lelah atau tidak bertenaga",
      "Nafsu makan menurun atau makan berlebihan",
      "Merasa buruk tentang diri sendiri",
      "Sulit berkonsentrasi",
      "Bergerak atau berbicara sangat lambat",
      "Pikiran untuk menyakiti diri sendiri",
    ],
    prefix: "Dalam 2 minggu terakhir, seberapa sering kamu...",
  },
  {
    tag: "GAD-7 . KECEMASAN",
    color: "hsl(340, 65%, 48%)",
    questions: [
      "Merasa gugup, cemas, atau gelisah",
      "Tidak bisa menghentikan atau mengontrol kekhawatiran",
      "Terlalu khawatir tentang berbagai hal",
      "Sulit untuk santai",
      "Sangat gelisah sehingga sulit untuk duduk diam",
      "Mudah jengkel atau terganggu",
      "Merasa takut seolah-olah sesuatu yang buruk akan terjadi",
    ],
    prefix: "Dalam 2 minggu terakhir, seberapa sering kamu...",
  },
];

const options = [
  { label: "Tidak pernah", score: 0 },
  { label: "Beberapa hari", score: 1 },
  { label: "Lebih dari setengah hari", score: 2 },
  { label: "Hampir setiap hari", score: 3 },
];

// Flatten questions
const allQuestions = sections.flatMap((s) =>
  s.questions.map((q) => ({ ...s, question: q }))
);

const totalQuestions = allQuestions.length;

type ScoreMap = Record<number, number>;

function getSeverity(total: number, max: number) {
  const pct = total / max;
  if (pct < 0.2) return { label: "Normal", color: "hsl(160,60%,44%)", bg: "hsl(160,60%,93%)" };
  if (pct < 0.4) return { label: "Ringan", color: "hsl(48,80%,40%)", bg: "hsl(48,80%,92%)" };
  if (pct < 0.65) return { label: "Sedang", color: "hsl(25,75%,45%)", bg: "hsl(25,75%,92%)" };
  return { label: "Parah", color: "hsl(0,65%,50%)", bg: "hsl(0,65%,95%)" };
}

/* ─── Circular Progress SVG ─── */
function CircularProgress({ value, max, size = 96 }: { value: number; max: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const strokeDash = circ * pct;
  const severity = getSeverity(value, max);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(200,220,235,0.5)"
          strokeWidth={8}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={severity.color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circ}`}
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${strokeDash} ${circ}` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-900 leading-none"
          style={{ color: "hsl(215, 40%, 25%)", fontFamily: "Nunito, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}
        </motion.span>
        <span className="text-[11px] font-600" style={{ color: "hsl(215, 20%, 55%)" }}>
          /{max}
        </span>
      </div>
    </div>
  );
}

/* ─── Results Screen ─── */
function ResultsScreen({ answers }: { answers: ScoreMap }) {
  const phq9Score = sections[0].questions.reduce((sum, _, i) => sum + (answers[i] ?? 0), 0);
  const gad7Score = sections[1].questions.reduce((sum, _, i) => sum + (answers[sections[0].questions.length + i] ?? 0), 0);
  const totalScore = phq9Score + gad7Score;
  const maxTotal = 48;
  const severity = getSeverity(totalScore, maxTotal);

  const recommendations =
    severity.label === "Parah"
      ? [
          "Segera gunakan fitur Antrian Konselor.",
          "Konselor kami akan memprioritaskan kasusmu.",
          "Konsul AI siap mendampingimu kapan saja.",
        ]
      : severity.label === "Sedang"
      ? [
          "Disarankan untuk konsultasi dengan konselor.",
          "Coba latihan pernapasan dan meditasi harian.",
          "Gunakan jurnal untuk mengekspresikan perasaan.",
        ]
      : [
          "Pertahankan keseimbangan gaya hidup sehat.",
          "Lanjutkan screening mingguan secara rutin.",
          "Gunakan fitur AI chat jika butuh bercerita.",
        ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-full max-w-2xl"
    >
      <div className="glass-card rounded-3xl p-7 md:p-9">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row gap-6 items-start mb-7">
          {/* Circular score */}
          <div className="flex-shrink-0">
            <CircularProgress value={totalScore} max={maxTotal} size={104} />
          </div>

          {/* Title & badge */}
          <div className="flex-1">
            <h1 className="font-display text-3xl md:text-4xl mb-1" style={{ color: "hsl(215, 40%, 25%)" }}>
              Hasil Screeningmu
            </h1>
            <p className="text-sm mb-3" style={{ color: "hsl(215, 20%, 52%)" }}>
              Segera konsultasikan dengan konselor.{" "}
              <span className="font-700" style={{ color: "hsl(215, 40%, 35%)" }}>Kamu tidak sendirian</span>
            </p>
            {/* Severity badge */}
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-700"
              style={{ background: severity.bg, color: severity.color }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: severity.color }} />
              {severity.label}
            </motion.span>
          </div>

          {/* Sub-scores */}
          <div className="flex sm:flex-col gap-4 sm:gap-3 sm:ml-auto">
            {[
              { tag: "GAD-7 . KECEMASAN", score: gad7Score, max: 21, color: "hsl(340, 65%, 48%)" },
              { tag: "PHQ-9 . DEPRESI", score: phq9Score, max: 27, color: "hsl(210, 65%, 42%)" },
            ].map((sub) => (
              <motion.div
                key={sub.tag}
                className="glass-card-sm rounded-2xl px-4 py-3 min-w-[110px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p className="text-[10px] font-700 uppercase tracking-wide mb-0.5" style={{ color: sub.color }}>
                  {sub.tag}
                </p>
                <p className="font-900 text-xl leading-none" style={{ color: "hsl(215, 40%, 25%)" }}>
                  {sub.score}{" "}
                  <span className="text-sm font-500" style={{ color: "hsl(215, 20%, 55%)" }}>
                    /{sub.max}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 items-start">
          {/* Recommendations */}
          <motion.div
            className="glass-card-sm rounded-2xl p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm font-700 mb-3" style={{ color: "hsl(215, 35%, 35%)" }}>
              Rekomendasi untukmu
            </p>
            <ul className="space-y-2.5">
              {recommendations.map((rec, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: "hsl(215, 25%, 40%)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(160, 60%, 44%)" }} />
                  {rec}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="btn-primary w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Selanjutnya <ArrowRight size={16} />
            </motion.button>
            <button
              className="w-full py-3 rounded-2xl text-sm font-700 transition-all hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1.5px solid rgba(180,210,230,0.6)",
                color: "hsl(215, 30%, 45%)",
              }}
            >
              Lihat Detail Hasil
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function ScreeningPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<ScoreMap>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const progress = Math.round((currentStep / totalQuestions) * 100);
  const currentQ = allQuestions[currentStep];

  const handleSelect = (score: number) => {
    const updated = { ...answers, [currentStep]: score };
    setAnswers(updated);
    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setDirection(1);
        setCurrentStep((s) => s + 1);
      } else {
        setIsCompleted(true);
      }
    }, 380);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  if (isCompleted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, hsl(195,55%,88%) 0%, hsl(215,50%,91%) 40%, hsl(260,45%,92%) 70%, hsl(340,50%,93%) 100%)",
        }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <ResultsScreen answers={answers} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(195,55%,88%) 0%, hsl(215,50%,91%) 40%, hsl(260,45%,92%) 70%, hsl(340,50%,93%) 100%)",
      }}
    >
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-8 relative z-10">
        {/* ── Top: Section tag + counter ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-4"
        >
          <p className="text-xs font-700 uppercase tracking-widest mb-1" style={{ color: currentQ.color }}>
            {currentQ.tag}
          </p>
          <div className="flex items-baseline justify-between">
            <h1 className="font-display text-3xl" style={{ color: "hsl(215, 40%, 25%)" }}>
              Pertanyaan {currentStep + 1} dari {totalQuestions}
            </h1>
            <span className="text-2xl font-900" style={{ color: "hsl(215, 30%, 55%)" }}>
              {progress}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="progress-bar mt-3">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* ── Question card ── */}
        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={(d) => ({ opacity: 0, x: d * 40 })}
              animate={{ opacity: 1, x: 0 }}
              exit={(d) => ({ opacity: 0, x: d * -40 })}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              className="glass-card rounded-3xl p-6 md:p-8 flex flex-col gap-5"
            >
              {/* Question text */}
              <div>
                <p className="text-sm font-600 italic mb-2" style={{ color: currentQ.color }}>
                  {currentQ.prefix}
                </p>
                <h2 className="font-display text-xl md:text-2xl leading-snug" style={{ color: "hsl(215, 40%, 22%)" }}>
                  {currentQ.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {options.map((opt, i) => (
                  <motion.button
                    key={opt.score}
                    onClick={() => handleSelect(opt.score)}
                    className={`option-card ${answers[currentStep] === opt.score ? "selected" : ""}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ x: answers[currentStep] === opt.score ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="option-radio">
                      <div className="option-radio-dot" />
                    </div>
                    <span>{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-5">
            <motion.button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-700 transition-all disabled:opacity-30"
              style={{
                background: "rgba(255,255,255,0.65)",
                border: "1.5px solid rgba(180,210,230,0.5)",
                color: "hsl(215, 30%, 40%)",
              }}
              whileHover={{ scale: currentStep === 0 ? 1 : 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeft size={15} />
              Kembali
            </motion.button>

            {/* Step dots */}
            <div className="flex gap-1.5 items-center">
              {Array.from({ length: Math.min(totalQuestions, 16) }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentStep ? 20 : 6,
                    height: 6,
                    background:
                      i < currentStep
                        ? "hsl(195, 70%, 52%)"
                        : i === currentStep
                        ? "hsl(195, 70%, 52%)"
                        : "rgba(180,210,230,0.5)",
                  }}
                />
              ))}
            </div>

            {answers[currentStep] !== undefined && currentStep < totalQuestions - 1 ? (
              <motion.button
                onClick={() => {
                  setDirection(1);
                  setCurrentStep((s) => s + 1);
                }}
                className="btn-primary text-sm px-5 py-2.5"
                style={{ borderRadius: 14 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Lanjut <ArrowRight size={14} />
              </motion.button>
            ) : (
              <div style={{ width: 90 }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
