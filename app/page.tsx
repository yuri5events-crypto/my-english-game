"use client";
import React, { useState, useEffect } from 'react';

const content: any = {
  ilai: {
    name: "אילעי",
    lessons: [
      { title: "לימוד אותיות", text: "באנגלית לכל אות גדולה (ABC) יש אות קטנה (abc). הן נשמעות אותו דבר אבל נראות קצת אחרת!", example: "האות B הגדולה נראית כמו b קטנה." },
      { title: "מה זה חילוק?", text: "חילוק זה פשוט לחלק משהו לקבוצות שוות. למשל, 10 חלקי 2 זה לקחת 10 סוכריות ולתת אותן ל-2 חברים. כל אחד יקבל 5!", example: "10 ÷ 2 = 5" }
    ],
    questions: [
      { q: "איזו אות קטנה מתאימה ל-B?", options: ["d", "b", "p"], a: "b" },
      { q: "איזו אות חסרה במילה: D_G (כלב)?", options: ["O", "A", "I"], a: "O" },
      { q: "איזו מילה מתחילה באות S?", options: ["Sun (שמש)", "Moon (ירח)", "Apple (תפוח)"], a: "Sun (שמש)" },
      { q: "כמה זה 20 חלקי 2? (רמז: לחלק 20 ל-2 חברים)", options: ["5", "10", "15"], a: "10" },
      { q: "כמה זה 12 כפול 3?", options: ["36", "30", "40"], a: "36" },
      { q: "איך כותבים CAT באותיות קטנות?", options: ["bat", "cat", "hat"], a: "cat" },
      { q: "כמה זה 100 פחות 25?", options: ["75", "80", "70"], a: "75" },
      { q: "מה האות הראשונה ב-Apple?", options: ["B", "A", "C"], a: "A" },
      { q: "כמה זה 15 חלקי 3?", options: ["3", "5", "6"], a: "5" },
      { q: "איזו אות קטנה מתאימה ל-G?", options: ["q", "g", "p"], a: "g" }
    ]
  },
  alin: {
    name: "אלין",
    lessons: [
      { title: "הכרת האותיות", text: "האות A היא האות הראשונה. היא נשמעת כמו 'איי'. האות הקטנה שלה היא a.", example: "Apple מתחיל ב-A" },
      { title: "מה זה חילוק? (חדש!)", text: "אלין, דמייני שיש לך 6 סוכריות ואת רוצה לחלק אותן שווה בשווה לך ולחברה. כל אחת תקבל 3! זה חילוק.", example: "6 סוכריות ÷ 2 חברים = 3 לכל אחת" }
    ],
    questions: [
      { q: "איזו אות זו: A?", options: ["איי", "בִּי", "סִי"], a: "איי" },
      { q: "איזו אות קטנה מתאימה ל-A?", options: ["b", "a", "c"], a: "a" },
      { q: "כמה זה 6 חלקי 2? (6 סוכריות ל-2 חברים)", options: ["2", "3", "4"], a: "3" },
      { q: "איזו אות נראית כמו עיגול?", options: ["O", "L", "D"], a: "O" },
      { q: "מה האות הראשונה של Dad (אבא)?", options: ["B", "D", "A"], a: "D" },
      { q: "כמה זה 10 חלקי 2? (10 סוכריות ל-2 חברים)", options: ["5", "4", "6"], a: "5" },
      { q: "איזו מילה מתחילה ב-B?", options: ["Ball (כדור)", "Apple", "Cat"], a: "Ball (כדור)" },
      { q: "כמה זה 5 + 5?", options: ["8", "10", "12"], a: "10" },
      { q: "איזו אות קטנה מתאימה ל-M?", options: ["n", "m", "w"], a: "m" },
      { q: "כמה זה 4 חלקי 2?", options: ["1", "2", "3"], a: "2" }
    ]
  }
};

const rewards = [
  { points: 50, text: "🍦 גלידת גביע" },
  { points: 150, text: "🍪 גלידת אוראו" },
  { points: 250, text: "🎬 סרט בקולנוע" }
];

export default function KidsGame() {
  const [player, setPlayer] = useState<any>(null);
  const [mode, setMode] = useState<'lesson' | 'quiz'>('lesson');
  const [lessonIdx, setLessonIdx] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (player) {
      const savedScore = localStorage.getItem(`score_${player}`);
      setScore(savedScore ? parseInt(savedScore) : 0);
      setLessonIdx(0);
      setCurrentIdx(0);
      setMode('lesson');
      setIsFinished(false);
    }
  }, [player]);

  const nextStep = () => {
    if (mode === 'lesson') {
      if (lessonIdx + 1 < content[player].lessons.length) {
        setLessonIdx(prev => prev + 1);
      } else {
        setMode('quiz');
      }
    }
  };

  const handleAnswer = (opt: any) => {
    if (msg || isFinished) return;
    const correct = opt === content[player].questions[currentIdx].a;

    if (correct) {
      setScore(s => s + 10);
      setMsg("✅ כל הכבוד!");
    } else {
      setScore(s => Math.max(0, s - 5));
      setMsg("❌ נסו שוב");
    }

    setTimeout(() => {
      setMsg("");
      if (currentIdx + 1 < content[player].questions.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 font-sans text-center" dir="rtl">
        <h1 className="text-4xl font-black mb-12 text-slate-800">מה לומדים היום? 🎓</h1>
        <div className="flex gap-8">
          {['ilai', 'alin'].map(p => (
            <button key={p} onClick={() => setPlayer(p)} className="group flex flex-col items-center gap-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-xl hover:scale-105 transition-all">
                <img src={`/${p}.jpg`} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-bold">{content[p].name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isFinished) {
    const reward = rewards.filter(r => score >= r.points).slice(-1)[0];
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        <h2 className="text-5xl font-black mb-4">אלופים! 🎉</h2>
        <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-green-400">
          <p className="text-2xl mb-4">סיימתם את השיעור והמבחן!</p>
          <div className="text-6xl font-black text-green-600 mb-6">{score} נקודות</div>
          {reward && <div className="text-3xl font-bold text-orange-500 italic">הרווחתם: {reward.text}</div>}
        </div>
        <button onClick={() => setPlayer(null)} className="mt-8 bg-blue-500 text-white px-10 py-4 rounded-2xl text-xl font-bold">חזרה לתפריט</button>
      </div>
    );
  }

  if (mode === 'lesson') {
    const lesson = content[player].lessons[lessonIdx];
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        <div className="bg-white w-full max-w-2xl p-8 md:p-12 rounded-[3rem] shadow-2xl border-t-8 border-orange-400">
          <div className="text-orange-500 font-bold mb-4 italic text-xl">זמן לימוד 📚</div>
          <h2 className="text-4xl font-black mb-6 text-slate-800">{lesson.title}</h2>
          <p className="text-2xl mb-8 leading-relaxed text-slate-700">{lesson.text}</p>
          <div className="bg-orange-50 p-6 rounded-2xl mb-10 border-2 border-dashed border-orange-200">
            <span className="block text-sm font-bold text-orange-400 mb-2 uppercase">דוגמה:</span>
            <span className="text-3xl font-bold text-slate-800">{lesson.example}</span>
          </div>
          <button onClick={nextStep} className="w-full bg-orange-400 text-white py-5 rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-all">
            הבנתי, להמשיך! 👍
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 flex flex-col items-center font-sans text-right" dir="rtl">
      <div className="w-full max-w-2xl bg-white p-6 rounded-3xl shadow-lg mb-6 border-b-4 border-blue-200">
        <div className="flex justify-between items-center mb-4 text-blue-600 font-black text-xl">
           <span>שאלה {currentIdx + 1} / {content[player].questions.length}</span>
           <span>ניקוד: {score}</span>
        </div>
        <div className="bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
          <div className="bg-blue-400 h-full transition-all" style={{ width: `${(currentIdx / content[player].questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-8 text-center relative border-4 border-white min-h-[400px] flex flex-col justify-center">
        <h2 className="text-4xl font-black mb-12 text-slate-800 leading-tight">
          {content[player].questions[currentIdx].q}
        </h2>
        <div className="grid gap-4 w-full">
          {content[player].questions[currentIdx].options.map((opt: any) => (
            <button key={opt} onClick={() => handleAnswer(opt)} className="w-full py-5 text-2xl font-bold rounded-2xl border-4 border-slate-50 hover:border-blue-500 hover:bg-blue-50 text-slate-700 shadow-sm active:scale-95 transition-all">
              {opt}
            </button>
          ))}
        </div>
        {msg && (
          <div className={`absolute inset-0 flex items-center justify-center text-6xl font-black bg-white/95 rounded-[2.5rem] animate-in zoom-in duration-200 ${msg.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}