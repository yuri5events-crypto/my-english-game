"use client";
import React, { useState, useEffect } from 'react';

const content = {
  ilai: { 
    name: "אילאי", 
    color: "#059669", 
    bgColor: "#ecfdf5",
    questions: [
      { q: "8 * 9 = ?", options: ["64", "72", "81"], a: "72", type: "math" },
      { q: "Translate: 'Magnificent'", options: ["מפואר", "מהיר", "מסוכן"], a: "מפואר", type: "eng" },
      { q: "125 + 125 + 50 = ?", options: ["250", "300", "200"], a: "300", type: "math" },
      { q: "Translate: 'Success'", options: ["כישלון", "הצלחה", "ניסיון"], a: "הצלחה", type: "eng" },
    ]
  },
  alin: { 
    name: "אלין", 
    color: "#0284c7", 
    bgColor: "#f0f9ff",
    questions: [
      { q: "10 + 15 = ?", options: ["20", "25", "30"], a: "25", type: "math" },
      { q: "איך אומרים 'כלב'?", options: ["Cat", "Dog", "Bird"], a: "Dog", type: "eng" },
      { q: "5 * 5 = ?", options: ["20", "25", "30"], a: "25", type: "math" },
      { q: "איך אומרים 'צהוב'?", options: ["Blue", "Red", "Yellow"], a: "Yellow", type: "eng" },
    ]
  }
};

const prizes = [
  { name: "🍦 גלידה גביע", points: 40 },
  { name: "🍪 גלידה אוראו", points: 100 },
  { name: "🎬 סרט בקולנוע", points: 250 },
  { name: "🎡 משחקייה", points: 500 }
];

export default function KidsGame() {
  const [player, setPlayer] = useState(null);
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
   const correct = player && opt === (content as any)[player].questions[currentIdx].a;
    
    if (correct) {
      setScore(s => s + 20);
      setMsg("✅ מצוין!");
    } else {
      setScore(s => Math.max(0, s - 10)); 
      setMsg("❌ אופס...");
    }

    setTimeout(() => {
      setMsg("");
      setCurrentIdx(prev => (prev + 1) % (content as any)[player!].questions.length);
    }, 1200);
  };

  // פונקציית איפוס
  const resetScore = () => {
    const confirmReset = window.confirm(`הניקוד של ${player!} יאופס. האם אתה בטוח?`);
    
    if (confirmReset) {
      setScore(0);
      localStorage.setItem(`score_${player!}`, "0");
    }
  };
  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
        <h1 className="text-4xl font-black mb-12 text-slate-800 text-center tracking-tight">מי משחק עכשיו? 🚀</h1>
        <div className="flex gap-12">
          {['ilai', 'alin'].map(p => (
            <button key={p} onClick={() => setPlayer(p)} className="flex flex-col items-center group transition-transform active:scale-95 text-center">
              <div className="w-44 h-44 rounded-3xl border-8 border-white shadow-2xl overflow-hidden group-hover:rotate-2 transition-all duration-300">
                <img 
                  src={`/${p}.jpg`} 
                  alt={p} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=Kid"; }}
                />
              </div>
              <span className={`mt-4 text-3xl font-black`} style={{ color: content[p].color }}>
                {content[p].name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentPlayerColor = content[player].color;
  const nextPrize = prizes.find(p => score < p.points) || prizes[prizes.length - 1];
  const progress = Math.min((score / nextPrize.points) * 100, 100);

  return (
    <div className="min-h-screen p-4 font-sans text-right transition-colors duration-500" dir="rtl" style={{ backgroundColor: content[player].bgColor }}>
      
      <div className="max-w-md mx-auto bg-white rounded-3xl p-6 shadow-lg mb-6 border-b-4 border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-bold tracking-wider italic">היעד של {content[player].name}</span>
            <span className="font-black text-slate-800 text-xl">{nextPrize.name}</span>
          </div>
          <div className="text-4xl font-black" style={{ color: currentPlayerColor }}>
            {score}
          </div>
        </div>
        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full transition-all duration-1000 ease-out shadow-sm" 
            style={{ width: `${progress}%`, backgroundColor: currentPlayerColor }}
          ></div>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-center border-t-8" style={{ borderTopColor: currentPlayerColor }}>
        {msg && (
          <div className={`absolute inset-0 z-10 flex items-center justify-center text-5xl font-black text-white ${msg.includes('✅') ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
            {msg}
          </div>
        )}
        
        <div className="text-center mb-10">
            <h1 className="text-5xl font-black text-slate-800 leading-tight">
              {content[player].questions[currentIdx].q}
            </h1>
        </div>

        <div className="space-y-5">
          {content[player].questions[currentIdx].options.map(opt => (
            <button 
              key={opt} 
              onClick={() => handleAnswer(opt)} 
              className="w-full py-5 text-white rounded-2xl text-2xl font-bold transition-all shadow-lg active:scale-95"
              style={{ backgroundColor: currentPlayerColor }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-8 mt-12">
        <button onClick={() => setPlayer(null)} className="text-slate-400 font-bold text-sm hover:underline">חזרה לבחירה</button>
        <button onClick={resetScore} className="text-red-400 font-bold text-sm hover:underline">איפוס ניקוד 🗑️</button>
      </div>
    </div>
  );
}