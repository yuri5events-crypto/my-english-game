"use client";
import React, { useState, useEffect } from 'react';

const content: any = {
  ilai: {
    name: "אילעי",
    questions: [
      // אילעי - כיתה ה' - אנגלית וחשבון מתקדם
      { q: "איך אומרים 'מטבח' באנגלית?", options: ["Kitchen", "Chicken", "Bedroom"], a: "Kitchen" },
      { q: "מה הפירוש של המילה 'Beautiful'?", options: ["חכם", "יפה", "חזק"], a: "יפה" },
      { q: "איך כותבים 'צהריים' באנגלית?", options: ["Morning", "Evening", "Afternoon"], a: "Afternoon" },
      { q: "כמה זה 12 כפול 4?", options: ["44", "48", "52"], a: "48" },
      { q: "כמה זה 100 חלקי 4?", options: ["20", "25", "30"], a: "25" },
      { q: "איך אומרים 'הרפתקה' באנגלית?", options: ["Adventure", "Advantage", "Action"], a: "Adventure" },
      { q: "מה הפירוש של 'Library'?", options: ["מעבדה", "ספרייה", "חנות"], a: "ספרייה" },
      { q: "כמה זה 15 כפול 3?", options: ["45", "35", "55"], a: "45" },
      { q: "מה זה חצי (1/2) ועוד חצי (1/2)?", options: ["חצי", "שלם (1)", "רבע"], a: "שלם (1)" },
      { q: "איך אומרים 'מחר' באנגלית?", options: ["Today", "Yesterday", "Tomorrow"], a: "Tomorrow" },
      { q: "כמה זה 9 כפול 9?", options: ["72", "81", "90"], a: "81" },
      { q: "מה זה 'Vegetables'?", options: ["פירות", "ירקות", "ממתקים"], a: "ירקות" },
      { q: "כמה זה 150 פחות 75?", options: ["65", "75", "85"], a: "75" },
      { q: "איך אומרים 'תמיד' באנגלית?", options: ["Never", "Sometimes", "Always"], a: "Always" },
      { q: "כמה זה 60 חלקי 5?", options: ["10", "12", "14"], a: "12" },
      { q: "מה הפירוש של 'Clothes'?", options: ["בגדים", "נעליים", "כובעים"], a: "בגדים" },
      { q: "מה השטח של מלבן שהצלעות שלו הן 5 ו-4?", options: ["9", "20", "18"], a: "20" },
      { q: "איך אומרים 'חופשה' באנגלית?", options: ["Vacation", "Work", "School"], a: "Vacation" },
      { q: "כמה זה 11 כפול 11?", options: ["111", "121", "131"], a: "121" },
      { q: "כמה זה 1000 חלקי 10?", options: ["10", "100", "50"], a: "100" }
    ]
  },
  alin: {
    name: "אלין",
    questions: [
      // אלין - כיתה ג' - אנגלית בסיסית וחשבון
      { q: "איך אומרים 'צבע' באנגלית?", options: ["Color", "Cloud", "Candy"], a: "Color" },
      { q: "מה זה 'Brother'?", options: ["אבא", "אח", "חבר"], a: "אח" },
      { q: "כמה זה 25 ועוד 25?", options: ["40", "50", "60"], a: "50" },
      { q: "איך אומרים 'גלידה' באנגלית?", options: ["Ice cream", "Candy", "Cake"], a: "Ice cream" },
      { q: "כמה זה 3 כפול 5?", options: ["10", "15", "20"], a: "15" },
      { q: "מה זה 'Shoes'?", options: ["גרביים", "נעליים", "מכנסיים"], a: "נעליים" },
      { q: "כמה זה 40 פחות 12?", options: ["28", "32", "38"], a: "28" },
      { q: "איך אומרים 'חמש' באנגלית?", options: ["Four", "Five", "Six"], a: "Five" },
      { q: "כמה זה 6 כפול 2?", options: ["10", "12", "14"], a: "12" },
      { q: "מה זה 'Window'?", options: ["דלת", "חלון", "קיר"], a: "חלון" },
      { q: "כמה זה 100 פחות 1?", options: ["90", "99", "101"], a: "99" },
      { q: "איך אומרים 'אריה' באנגלית?", options: ["Tiger", "Lion", "Elephant"], a: "Lion" },
      { q: "כמה זה 8 ועוד 7?", options: ["14", "15", "16"], a: "15" },
      { q: "מה זה 'Happy'?", options: ["עצוב", "שמח", "כועס"], a: "שמח" },
      { q: "כמה זה 5 כפול 4?", options: ["20", "25", "15"], a: "20" },
      { q: "איך אומרים 'שמיים' באנגלית?", options: ["Sun", "Sky", "Moon"], a: "Sky" },
      { q: "כמה זה 30 חלקי 3?", options: ["5", "10", "15"], a: "10" },
      { q: "מה זה 'Friend'?", options: ["מורה", "חבר", "ילד"], a: "חבר" },
      { q: "כמה זה 14 פחות 7?", options: ["6", "7", "8"], a: "7" },
      { q: "כמה זה 2 כפול 9?", options: ["16", "18", "20"], a: "18" }
    ]
  }
};

const rewards = [
  { points: 80, text: "🍦 גלידת גביע" },
  { points: 200, text: "🍪 גלידת אוראו" },
  { points: 290, text: "🎬 סרט בקולנוע" },
  { points: 450, text: "🎡 משחקייה" }
];

export default function KidsGame() {
  const [player, setPlayer] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (player) {
      const savedScore = localStorage.getItem(`score_${player}`);
      setScore(savedScore ? parseInt(savedScore) : 0);
      // ערבוב שאלות בכל פעם שבוחרים שחקן
      const shuffled = [...content[player].questions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setCurrentIdx(0);
    }
  }, [player]);

  useEffect(() => {
    if (player) localStorage.setItem(`score_${player}`, score.toString());
  }, [score, player]);

  const handleAnswer = (opt: any) => {
    if (msg || !player) return;
    const correct = opt === questions[currentIdx].a;

    if (correct) {
      setScore(s => s + 10);
      setMsg("✅ כל הכבוד!");
    } else {
      setScore(s => Math.max(0, s - 5));
      setMsg("❌ לא נורא, נסה שוב");
    }

    setTimeout(() => {
      setMsg("");
      setCurrentIdx(prev => (prev + 1) % questions.length);
    }, 1200);
  };

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 font-sans" dir="rtl">
        <h1 className="text-4xl font-black mb-12 text-slate-800 text-center italic border-b-4 border-blue-400 pb-2">מי משחק עכשיו? 🚀</h1>
        <div className="flex gap-8 md:gap-12">
          {['ilai', 'alin'].map(p => (
            <button key={p} onClick={() => setPlayer(p)} className="group flex flex-col items-center gap-4">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300">
                <img src={`/${p}.jpg`} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-bold text-slate-700">{content[p].name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const nextReward = rewards.find(r => score < r.points);
  const currentRewardText = rewards.filter(r => score >= r.points).slice(-1)[0]?.text || "עדיין אין";

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8 flex flex-col items-center font-sans" dir="rtl">
      {/* סרגל ניקוד ופרסים */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-3xl shadow-lg mb-6 border-b-4 border-blue-200 text-right">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setPlayer(null)} className="font-bold text-slate-400 hover:text-blue-500">⬅️ החלף שחקן</button>
          <div className="text-2xl font-black text-blue-600">הניקוד של {content[player].name}: {score}</div>
        </div>
        
        <div className="bg-slate-100 rounded-full h-8 overflow-hidden relative border border-slate-200 mb-2 shadow-inner">
          <div 
            className="bg-green-400 h-full transition-all duration-700" 
            style={{ width: `${Math.min((score / (nextReward?.points || score || 500)) * 100, 100)}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-700">
             {nextReward ? `עוד ${nextReward.points - score} נקודות ל${nextReward.text}` : "הגעת לפרס הכי גדול! 🎉"}
          </div>
        </div>
        <div className="text-sm font-bold text-orange-500 bg-orange-50 p-2 rounded-lg inline-block">
           🎁 פרס שכבר השגת: {currentRewardText}
        </div>
      </div>

      {/* קופסת השאלה */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-8 md:p-14 text-center relative border-4 border-white">
        <div className="text-slate-300 font-bold mb-6 uppercase text-sm tracking-widest">שאלה {currentIdx + 1} מתוך {questions.length}</div>
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-slate-800 leading-tight min-h-[120px] flex items-center justify-center">
          {questions[currentIdx]?.q}
        </h2>
        
        <div className="grid gap-4 w-full">
          {questions[currentIdx]?.options.map((opt: any) => (
            <button key={opt} onClick={() => handleAnswer(opt)} className="w-full py-5 text-2xl font-bold rounded-2xl border-4 border-slate-50 hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-700 active:scale-95 shadow-sm">
              {opt}
            </button>
          ))}
        </div>

        {/* הודעת משוב */}
        {msg && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center text-6xl font-black bg-white/95 rounded-[2.5rem] animate-in fade-in zoom-in duration-300 ${msg.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
            <span>{msg}</span>
            <span className="text-xl text-slate-400 mt-4 italic">הכנה לשאלה הבאה...</span>
          </div>
        )}
      </div>
    </div>
  );
}