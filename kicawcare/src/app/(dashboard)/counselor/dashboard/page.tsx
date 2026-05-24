"use client";
import { motion } from "framer-motion";
import { Clock, MessageSquareText } from "lucide-react";

export default function CounselorDashboard() {
  const queue = [
    { id: 1, name: "Student A", severity: "CRITICAL", waitTime: "15 mins", aiSummary: "Severe academic stress, lack of sleep. Mentions feeling hopeless." },
    { id: 2, name: "Student B", severity: "SEVERE", waitTime: "45 mins", aiSummary: "Anxiety spikes before exams. High GAD-7 score." },
    { id: 3, name: "Student C", severity: "MODERATE", waitTime: "2 hours", aiSummary: "Feeling overwhelmed with workload. Needs time management strategies." },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Priority Queue</h1>
        <p className="text-muted-foreground">Students awaiting assistance, automatically sorted by AI severity assessment.</p>
      </div>

      <div className="grid gap-4">
        {queue.map((student, idx) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-card hover:shadow-md transition-shadow ${
              student.severity === "CRITICAL" ? "border-red-500/50 bg-red-500/5" : "border-border"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold">{student.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  student.severity === "CRITICAL" ? "bg-red-500/10 text-red-500" :
                  student.severity === "SEVERE" ? "bg-orange-500/10 text-orange-500" :
                  "bg-yellow-500/10 text-yellow-600"
                }`}>
                  {student.severity}
                </span>
              </div>
              <p className="text-muted-foreground text-sm flex items-start gap-2 max-w-2xl">
                <MessageSquareText className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" /> 
                <span><span className="font-semibold text-foreground">AI Briefing:</span> {student.aiSummary}</span>
              </p>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium whitespace-nowrap">Wait: {student.waitTime}</span>
              </div>
              <button className="flex-1 md:flex-none px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all text-center shadow-sm">
                Accept Patient
              </button>
            </div>
          </motion.div>
        ))}
        {queue.length === 0 && (
          <div className="p-12 text-center border border-dashed border-border rounded-3xl text-muted-foreground">
            No students currently in the queue.
          </div>
        )}
      </div>
    </div>
  );
}
