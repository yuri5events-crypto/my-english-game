"use client";
import React, { useState, useEffect } from 'react';

// הגדרת התוכן עם TypeScript גמיש כדי למנוע שגיאות בנייה
const content: any = {
  ilai: {
    name: "אילאי",
    questions: [
      { q: "How do you say 'שלום'?", options: ["Hello", "Apple", "Dog"], a: "Hello" },
      { q: "What is 'חתול'?", options: ["Bird", "Cat", "Fish"], a: "Cat" },
      { q: "How do you say 'בית'?", options: ["Car", "House", "Tree"], a: "House" },
    ]
  },
  alin: {
    name: "אלין",
    questions: [
      { q: "How do you say 'תודה'?", options: ["Please", "Thanks", "Sorry"], a: "Thanks" },
      { q: "What is 'אדום'?", options: ["Blue", "Red", "Green"], a: "Red" },
      { q: "How do you say 'כלב'?", options: ["Dog", "Cat", "Lion"], a: "Dog" },
    ]
  }
};

export default function KidsGame() {
  const [player, setPlayer] = useState<any>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("");

  // טעינת ניקוד מהזיכרון המקומי
  useEffect(() => {
    if (player) {
      const savedScore = localStorage.getItem(`score_${player}`);
      setScore(savedScore ? parseInt(savedScore) : 0);
      setCurrentIdx(0); // איפוס לשאלה הראשונה כשמחליפים שחקן
    }
  }, [player]);

  // שמירת ניקוד כשמנצחים/טועים
  useEffect(() => {
    if (player) {
      localStorage.setItem(`score_${player}`, score.toString());
    }
  }, [score, player]);

  const handleAnswer = (opt: any) => {
    if (msg || !player) return;

    // הגנה מפני שגיאת undefined ב-TypeScript
    const currentQuestions = content[player].questions;
    const correct = opt === currentQuestions[currentIdx].a;

    if (correct) {
      setScore(s => s + 20);
      setMsg("✅ מצוין!");
    } else {
      setScore(s => Math.max(0, s - 10));
      setMsg("❌ אופס...");
    }

    setTimeout(() => {
      setMsg("");
      setCurrentIdx(prev => (prev + 1) % currentQuestions.length);
    }, 1200);
  };

  const resetScore = () => {
    if (!player) return;
    const confirmReset = window.confirm(`הניקוד של ${content[player].name} יאופס. האם אתה בטוח?`);
    if (confirmReset) {
      setScore(0);
      localStorage.setItem(`score_${player}`, "0");
    }
  };

  // מסך בחירת שחקן עם תמונות אמיתיות
  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 font-sans" dir="rtl">
        <h1 className="text-4xl font-black mb-12 text-slate-800 text-center italic">מי משחק עכשיו? 🚀</h1>
        <div className="flex gap-8 md:gap-12">
          {['ilai', 'alin'].map(p => (
            <button key={p} onClick={() => setPlayer(p)} className="group flex flex-col items-center gap-4 focus:outline-none">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300">
                <img 
                  src={`/${p}.jpg`} 
                  alt={content[p].name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // גיבוי למקרה שהתמונה לא נטענת
                    (e.target as any).src = "https://via.placeholder.com/200?text=Photo+Missing";
                  }}
                />
              </div>
              <span className="text-3xl font-bold text-slate-700">{content[p].name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = content[player].questions[currentIdx];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8 flex flex-col items-center font-sans" dir="rtl">
      {/* סרגל עליון */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-md border border-slate-100">
        <button onClick={() => setPlayer(null)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors">
          <span>⬅️</span> החלף שחקן
        </button>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider">ניקוד נוכחי</div>
            <div className="text-2xl font-black text-blue-600">{score}</div>
          </div>
          <button onClick={resetScore} className="p-2 bg-slate-100 hover:bg-red-50 rounded-full transition-colors group">
            <span className="grayscale group-hover:grayscale-0">🗑️</span>
          </button>
        </div>
      </div>

      {/* קופסת המשחק */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-8 md:p-14 text-center relative overflow-hidden border border-slate-50">
        <div className="mb-6 inline-block px-4 py-1 bg-slate-100 rounded-full text-slate-500 font-bold text-sm tracking-widest uppercase">
          שאלה {currentIdx + 1} מתוך {content[player].questions.length}
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black mb-10 text-slate-800 leading-tight">
          {currentQuestion.q}
        </h2>
        
        <div className="grid gap-4 w-full">
          {currentQuestion.options.map((opt: any) => (
            <button 
              key={opt} 
              onClick={() => handleAnswer(opt)} 
              className="w-full py-5 text-2xl font-bold rounded-2xl border-4 border-slate-100 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg transition-all duration-200 text-slate-700 active:scale-95"
            >
              {opt}
            </button>
          ))}
        </div>

        {/* הודעת משוב */}
        {msg && (
          <div className={`absolute inset-0 flex items-center justify-center text-6xl md:text-8xl font-black bg-white/95 animate-in fade-in zoom-in duration-300 ${msg.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
            <div className="flex flex-col items-center gap-4">
              <span>{msg}</span>
              <span className="text-xl text-slate-400">הבא בתור...</span>
            </div>
          </div>
        )}
      </div>
      
      {/* עיצוב רקע קטן */}
      <div className="mt-12 text-slate-300 text-sm font-medium">
        נבנה באהבה לאילאי ואלין ❤️
      </div>
    </div>
  );
}