"use client";
import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, Settings } from "lucide-react";
import { useState } from "react";

export default function VideoSession() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Session with Student A</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Session Recording Active
          </p>
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        {/* Video Area */}
        <div className="flex-1 bg-black rounded-3xl overflow-hidden relative shadow-lg group">
          {/* Main Video (Student) */}
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            {/* Placeholder for video stream */}
            <p className="text-zinc-500 font-medium">Waiting for student camera...</p>
          </div>

          {/* Self View (Counselor) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-6 right-6 w-48 h-32 bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-700/50"
          >
            {isVideoOff ? (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                <VideoOff className="w-6 h-6 text-zinc-500" />
              </div>
            ) : (
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Counselor" className="w-full h-full object-cover" />
            )}
          </motion.div>

          {/* Controls Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all ${isMuted ? "bg-red-500 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-white"}`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition-all ${isVideoOff ? "bg-red-500 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-white"}`}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
            <button className="p-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-all">
              <MonitorUp className="w-5 h-5" />
            </button>
            <button className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg shadow-red-500/20">
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar / Notes Area */}
        <div className="w-80 flex flex-col gap-4">
          <div className="p-6 bg-card border border-border rounded-3xl flex-1 flex flex-col">
            <h3 className="font-bold mb-4 flex items-center justify-between">
              Session Notes
              <Settings className="w-4 h-4 text-muted-foreground" />
            </h3>
            <textarea 
              className="flex-1 w-full bg-transparent border-none outline-none resize-none text-sm"
              placeholder="Type your notes here. They will be saved automatically..."
            />
          </div>
          
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl">
            <h3 className="font-bold text-sm text-primary mb-2">AI Summary</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Student has been experiencing severe academic stress. Recommended focusing on breathing exercises and breaking down study tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
