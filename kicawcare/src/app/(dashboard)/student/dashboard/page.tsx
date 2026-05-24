"use client";

import { motion } from "framer-motion";
import { Brain, Activity, CalendarCheck, Edit3 } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Good Morning, Student</h1>
          <p className="text-muted-foreground">Here is your daily wellness overview.</p>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stress Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-2 p-6 rounded-3xl bg-primary/5 border border-primary/20 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Brain className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold uppercase">
                Normal
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Current Stress Level</p>
              <h2 className="text-2xl font-bold mb-4">You're doing great!</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Your recent PHQ-9 and journal entries indicate a healthy mental state. Keep up the good work.
              </p>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
                Take Weekly Screening
              </button>
            </div>
          </div>
        </motion.div>

        {/* Next Appointment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-card border border-border shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500 w-fit mb-4">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Next Session</p>
            <h3 className="text-xl font-bold mb-2">No upcoming appointments</h3>
            <p className="text-xs text-muted-foreground">
              You can schedule a session with a counselor if you need to talk.
            </p>
          </div>
          <button className="mt-6 w-full px-4 py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-all">
            Schedule Appointment
          </button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-3 grid grid-cols-2 gap-6"
        >
          <button className="flex items-center gap-4 p-6 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all group">
            <div className="p-4 bg-muted group-hover:bg-primary/10 rounded-2xl transition-colors">
              <Activity className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left">
              <h3 className="font-bold">Wellness Activities</h3>
              <p className="text-sm text-muted-foreground">Explore challenges</p>
            </div>
          </button>
          
          <button className="flex items-center gap-4 p-6 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all group">
            <div className="p-4 bg-muted group-hover:bg-primary/10 rounded-2xl transition-colors">
              <Edit3 className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left">
              <h3 className="font-bold">Write Journal</h3>
              <p className="text-sm text-muted-foreground">Log your feelings</p>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
