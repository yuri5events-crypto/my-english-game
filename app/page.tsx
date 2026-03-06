"use client";
import React, { useState, useEffect } from 'react';

const content: any = {
  ilai: {
    name: "אילאי",
    questions: [
      { q: "How do you say 'שלום'?", options: ["Hello", "Apple", "Dog"], a: "Hello" },
      { q: "What is 'חתול'?", options: ["Bird", "Cat", "Fish"], a: "Cat" },
    ]
  },
  alin: {
    name: "אלין",
    questions: [
      { q: "How do you say 'תודה'?", options: ["Please", "Thanks", "Sorry"], a: "Thanks" },
      { q: "What is 'אדום'?", options: ["Blue", "Red", "Green"], a: "Red" },
    ]
  }
};

export default function KidsGame() {
  const [player, setPlayer] = useState<any>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (player) {
      const savedScore = localStorage.getItem(`score_${player}`);
      setScore(savedScore ? parseInt(savedScore) : 0);
    }
  }, [player]);

  useEffect(() => {
    if (player) {
      localStorage.setItem(`score_${player}`, score.toString());
    }
  }, [score, player]);

  const handleAnswer = (opt: any) => {
    if (msg) return;
    const correct = opt === content[player].questions[currentIdx].a;

    if (correct) {
      setScore(s => s + 20);
      setMsg("✅ מצוין!");
    } else {
      setScore(s => Math.max(0, s - 10));
      setMsg("❌ אופס...");
    }

    setTimeout(() => {
      setMsg("");
      setCurrentIdx(prev => (prev + 1) % content[player].questions.length);
    }, 1200);
  };

  const resetScore = () => {
    const confirmReset = window.confirm(`הניקוד של ${content[player].name} יאופס. בטוח?`);
    if (confirmReset) {
      setScore(0);
    }
  };

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <h1 className="text-4xl font-black mb-12 text-slate-800 text-center">מי משחק עכשיו? 🚀</h1>
        <div className="flex gap-12">
          {['ilai', 'alin'].map(p => (
            <button key={p} onClick={() => setPlayer(p)} className="group flex flex-col items-center gap-4">
              <div className="w-44 h-44 rounded-3xl bg-white shadow-xl flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {p === 'ilai' ? '👦' : '👧'}
              </div>
              <span className="text-2xl font-bold text-slate-700">{content[p].name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const q = content[player].questions[currentIdx];

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl flex justify-between items-center mb-12 bg-white p-4 rounded-2xl shadow-sm">
        <button onClick={() => setPlayer(null)} className="text-slate-400">⬅️ החלף שחקן</button>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-blue-600">הניקוד של {content[player].name}: {score}</span>
          <button onClick={resetScore} className="text-xs text-red-300">איפוס</button>
        </div>
      </div>

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
        <div className="mb-8 text-slate-400 font-bold tracking-widest uppercase text-sm">שאלה {currentIdx + 1}</div>
        <h2 className="text-5xl font-black mb-12 text-slate-800 leading-tight">{q.q}</h2>
        
        <div className="grid gap-4">
          {q.options.map((opt: any) => (
            <button key={opt} onClick={() => handleAnswer(opt)} className="py-6 text-2xl font-bold rounded-2xl border-4 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-700">
              {opt}
            </button>
          ))}
        </div>

        {msg && (
          <div className={`absolute inset-0 flex items-center justify-center text-6xl font-black bg-white/90 animate-bounce ${msg.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}