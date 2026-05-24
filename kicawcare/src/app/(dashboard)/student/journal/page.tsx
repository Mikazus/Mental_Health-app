"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookHeart, Plus, Search } from "lucide-react";

export default function JournalPage() {
  const [isWriting, setIsWriting] = useState(false);
  const [entry, setEntry] = useState("");

  const handleSave = () => {
    setIsWriting(false);
    setEntry("");
    // TODO: Send to AI engine for sentiment analysis
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">My Journal</h1>
          <p className="text-muted-foreground">A safe space to express your feelings securely.</p>
        </div>
        <button 
          onClick={() => setIsWriting(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Entry
        </button>
      </div>

      {isWriting ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-card border border-border rounded-3xl shadow-sm"
        >
          <input 
            type="text" 
            placeholder="Give your entry a title..." 
            className="w-full text-2xl font-bold bg-transparent border-none outline-none mb-4 placeholder:text-muted-foreground/50"
          />
          <textarea 
            placeholder="How are you feeling today?" 
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full min-h-[300px] bg-transparent border-none outline-none resize-none text-lg text-muted-foreground"
          />
          <div className="flex justify-end gap-3 mt-4 border-t border-border/50 pt-4">
            <button 
              onClick={() => setIsWriting(false)}
              className="px-6 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all"
            >
              Save Entry
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search past entries..." 
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            
            {/* Example Journal Entry */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-card border border-border rounded-3xl hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Feeling overwhelmed with exams</h3>
                <span className="text-xs text-muted-foreground">Today, 10:42 AM</span>
              </div>
              <p className="text-muted-foreground line-clamp-2">
                I have three midterms next week and I feel like I haven't studied enough for any of them. I couldn't sleep last night because I was thinking about it too much...
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full text-xs font-semibold">Stress</span>
                <span className="px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-xs font-semibold">Anxiety</span>
              </div>
            </motion.div>
          </div>
          
          <div className="col-span-1">
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                <BookHeart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Why Journal?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Writing down your thoughts helps our AI better understand your current state and provide more accurate recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
