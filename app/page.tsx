"use client";
import React, { useState, useEffect } from 'react';

const content: any = {
  ilai: {
    name: "אילעי",
    english: {
      lesson: { title: "לימוד אותיות", text: "באנגלית לכל אות גדולה יש אות קטנה. הן נשמעות אותו דבר!", example: "B = b | A = a" },
      questions: [
        { q: "איזו אות קטנה מתאימה ל-B?", options: ["d", "b", "p"], a: "b" },
        { q: "מה האות הראשונה ב-Apple?", options: ["B", "A", "C"], a: "A" },
        { q: "איזו אות קטנה מתאימה ל-G?", options: ["q", "g", "p"], a: "g" },
        { q: "איך כותבים CAT בקטנות?", options: ["bat", "cat", "hat"], a: "cat" },
        { q: "השלם את האות: D_G (כלב)", options: ["O", "A", "I"], a: "O" }
      ]
    },
    math: {
      lesson: { title: "מה זה חילוק?", text: "חילוק זה לחלק משהו לקבוצות שוות. 10 סוכריות ל-2 חברים זה 5 לכל אחד.", example: "10 ÷ 2 = 5" },
      questions: [
        { q: "כמה זה 20 חלקי 2?", options: ["5", "10", "15"], a: "10" },
        { q: "כמה זה 12 כפול 3?", options: ["36", "30", "40"], a: "36" },
        { q: "כמה זה 100 פחות 25?", options: ["75", "80", "70"], a: "75" },
        { q: "כמה זה 15 חלקי 3?", options: ["3", "5", "6"], a: "5" },
        { q: "כמה זה 5 כפול 8?", options: ["35", "40", "45"], a: "40" }
      ]
    },
    general: {
      lesson: { title: "האחוזון העליון", text: "שאלות על העולם, המדע והטבע שיבדקו כמה אתם חכמים!", example: "7 יבשות | 360 מעלות" },
      questions: [
        { q: "איזו מדינה בעולם נראית כמו צורה של מגף?", options: ["צרפת", "איטליה", "יוון"], a: "איטליה" },
        { q: "מהו האיבר הגדול ביותר בגוף האדם?", options: ["הלב", "העור", "הכבד"], a: "העור" },
        { q: "כמה שחקני כדורגל מכל קבוצה נמצאים על המגרש?", options: ["10", "11", "12"], a: "11" },
        { q: "איזה כוכב לכת הוא הכי קרוב לשמש?", options: ["חמה", "מאדים", "נוגה"], a: "חמה" },
        { q: "מהו בעל החיים הגדול ביותר שחי אי פעם?", options: ["פיל", "לווייתן כחול", "דינוזאור"], a: "לווייתן כחול" },
        { q: "באיזו יבשת נמצאת מדינת ישראל?", options: ["אירופה", "אסיה", "אפריקה"], a: "אסיה" },
        { q: "איזה צבע מתקבל כשמערבבים כחול וצהוב?", options: ["ירוק", "סגול", "כתום"], a: "ירוק" },
        { q: "כמה מעלות יש במעגל שלם?", options: ["180", "240", "360"], a: "360" },
        { q: "האם עגבנייה היא פרי או ירק?", options: ["פרי", "ירק", "ממתק"], a: "פרי" },
        { q: "מה שוקל יותר: קילו נוצות או קילו ברזל?", options: ["ברזל", "נוצות", "שניהם אותו דבר"], a: "שניהם אותו דבר" },
        { q: "מתי יום ההולדת של אחותך אלין?", options: ["17 לדצמבר", "25 לספטמבר", "10 ליוני"], a: "17 לדצמבר" },
        { q: "מתי יום ההולדת שלך, אילעי?", options: ["17 לדצמבר", "25 לספטמבר", "1 באוגוסט"], a: "25 לספטמבר" }
      ]
    }
  },
  alin: {
    name: "אלין",
    english: {
      lesson: { title: "הכרת האותיות", text: "האות A נשמעת כמו 'איי'. האות הקטנה שלה היא a.", example: "Apple = A" },
      questions: [
        { q: "איזו אות זו: A?", options: ["איי", "בִּי", "סִי"], a: "איי" },
        { q: "איזו אות קטנה מתאימה ל-A?", options: ["b", "a", "c"], a: "a" },
        { q: "מה האות הראשונה של Dad?", options: ["B", "D", "A"], a: "D" },
        { q: "איזו מילה מתחילה ב-B?", options: ["Ball", "Apple", "Cat"], a: "Ball" },
        { q: "איזו אות קטנה מתאימה ל-M?", options: ["n", "m", "w"], a: "m" }
      ]
    },
    math: {
      lesson: { title: "מה זה חילוק?", text: "6 סוכריות ל-2 חברים = 3 לכל אחד.", example: "6 ÷ 2 = 3" },
      questions: [
        { q: "כמה זה 6 חלקי 2?", options: ["2", "3", "4"], a: "3" },
        { q: "כמה זה 10 חלקי 2?", options: ["5", "4", "6"], a: "5" },
        { q: "כמה זה 5 + 5?", options: ["8", "10", "12"], a: "10" },
        { q: "כמה זה 4 חלקי 2?", options: ["1", "2", "3"], a: "2" },
        { q: "כמה זה 8 פחות 3?", options: ["4", "5", "6"], a: "5" }
      ]
    },
    general: {
      lesson: { title: "האחוזון העליון", text: "שאלות מעניינות על חיות, צבעים והעולם שלנו!", example: "כחול + צהוב = ירוק" },
      questions: [
        { q: "איזו מדינה נראית כמו צורה של מגף?", options: ["איטליה", "ישראל", "אמריקה"], a: "איטליה" },
        { q: "כמה שחקנים יש בכל קבוצה על המגרש בכדורגל?", options: ["7", "11", "10"], a: "11" },
        { q: "איזה צבע מקבלים אם מערבבים כחול וצהוב?", options: ["כתום", "ירוק", "אדום"], a: "ירוק" },
        { q: "באיזו יבשת אנחנו חיים (ישראל)?", options: ["אירופה", "אסיה", "אפריקה"], a: "אסיה" },
        { q: "מי החיה הכי גדולה בעולם?", options: ["פיל", "אריה", "לווייתן כחול"], a: "לווייתן כחול" },
        { q: "כמה חודשים יש בשנה?", options: ["10", "12", "13"], a: "12" },
        { q: "כמה צלעות יש למשולש?", options: ["3", "4", "5"], a: "3" },
        { q: "מה שוקל יותר: קילו נוצות או קילו ברזל?", options: ["ברזל", "נוצות", "שניהם אותו דבר"], a: "שניהם אותו דבר" },
        { q: "מתי יום ההולדת שלך, אלין?", options: ["17 לדצמבר", "25 לספטמבר", "1 בינואר"], a: "17 לדצמבר" },
        { q: "מתי יום ההולדת של אחיך אילעי?", options: ["17 לדצמבר", "25 לספטמבר", "1 באוגוסט"], a: "25 לספטמבר" }
      ]
    }
  }
};

export default function Game() {
  const [player, setPlayer] = useState<any>(null);
  const [subject, setSubject] = useState<'math' | 'english' | 'general' | null>(null);
  const [mode, setMode] = useState<'lesson' | 'quiz' | 'finish'>('lesson');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [msg, setMsg] = useState("");
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (player && subject) {
      const q = [...content[player][subject].questions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(q);
      setCurrentIdx(0);
      setScore(0);
      setMistakes(0);
      setMode('lesson');
    }
  }, [player, subject]);

  const handleAnswer = (opt: any) => {
    if (msg || mode !== 'quiz') return;
    const correct = opt === shuffledQuestions[currentIdx].a;

    if (correct) {
      setScore(s => s + 10);
      setMsg("⭐ נכון! +10 נקודות ⭐");
    } else {
      setScore(s => Math.max(0, s - 5));
      setMistakes(m => m + 1);
      setMsg("❌ טעות... -5 נקודות");
    }

    setTimeout(() => {
      setMsg("");
      if (currentIdx + 1 < shuffledQuestions.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setMode('finish');
      }
    }, 1200);
  };

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6 text-center text-white" dir="rtl">
        <h1 className="text-6xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">האחוזון העליון</h1>
        <div className="flex gap-10">
          {['ilai', 'alin'].map(p => (
            <button key={p} onClick={() => setPlayer(p)} className="group flex flex-col items-center gap-4">
              <div className="w-44 h-44 rounded-[2rem] overflow-hidden border-4 border-white/20 group-hover:border-blue-500 shadow-2xl transition-all">
                <img src={`/${p}.jpg`} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-bold">{content[p].name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-6 text-center text-white" dir="rtl">
        <h2 className="text-4xl font-black mb-12">שלום {content[player].name}, במה נתחרה?</h2>
        <div className="grid gap-6 w-full max-w-md">
          <button onClick={() => setSubject('math')} className="p-8 bg-orange-500 rounded-3xl text-2xl font-black shadow-[0_10px_0_rgb(194,65,12)] active:translate-y-1 active:shadow-none transition-all">🔢 חשבון</button>
          <button onClick={() => setSubject('english')} className="p-8 bg-blue-500 rounded-3xl text-2xl font-black shadow-[0_10px_0_rgb(29,78,216)] active:translate-y-1 active:shadow-none transition-all">🔤 אנגלית</button>
          <button onClick={() => setSubject('general')} className="p-8 bg-yellow-500 text-slate-900 rounded-3xl text-2xl font-black shadow-[0_10px_0_rgb(161,98,7)] active:translate-y-1 active:shadow-none transition-all">🏆 טריוויה</button>
        </div>
      </div>
    );
  }

  if (mode === 'finish') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white" dir="rtl">
        <h2 className="text-7xl font-black mb-6 text-yellow-400 animate-bounce">סיום!</h2>
        <div className="bg-slate-900 p-12 rounded-[3rem] border-4 border-yellow-400/50 shadow-[0_0_50px_rgba(250,204,21,0.2)]">
          <div className="text-2xl mb-2 text-slate-400 uppercase tracking-widest font-bold">הניקוד שלך</div>
          <div className="text-9xl font-black mb-8 text-white">{score}</div>
          <p className="text-2xl text-blue-400 font-bold italic">הצלחת להיכנס לאחוזון העליון!</p>
          <div className="mt-8 bg-slate-800 p-4 rounded-2xl text-right">
             <p className="text-slate-400">דוח לאבא: {mistakes} טעויות בסיבוב הזה.</p>
          </div>
        </div>
        <button onClick={() => setSubject(null)} className="mt-12 bg-white text-slate-950 px-12 py-5 rounded-2xl text-2xl font-black">סיבוב נוסף 🔄</button>
      </div>
    );
  }

  if (mode === 'lesson') {
    const lesson = content[player][subject].lesson;
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white" dir="rtl">
        <div className="bg-slate-800 w-full max-w-2xl p-12 rounded-[4rem] border-t-8 border-blue-500 shadow-2xl">
          <h2 className="text-5xl font-black mb-8">{lesson.title} 🎓</h2>
          <p className="text-2xl mb-12 text-slate-300 leading-relaxed">{lesson.text}</p>
          <div className="bg-slate-950 p-8 rounded-3xl mb-12 border-2 border-white/10 text-4xl font-black text-blue-400 italic">
            {lesson.example}
          </div>
          <button onClick={() => setMode('quiz')} className="w-full bg-blue-500 py-6 rounded-2xl text-3xl font-black shadow-[0_10px_0_rgb(29,78,216)] active:translate-y-1 active:shadow-none transition-all">הבנתי, בואו נשחק! 🚀</button>
        </div>
      </div>
    );
  }

  const q = shuffledQuestions[currentIdx];
  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center text-white" dir="rtl">
      <div className="w-full max-w-2xl bg-slate-900 p-6 rounded-3xl flex justify-between items-center mb-8 border-b-4 border-white/5">
        <div className="text-3xl font-black text-yellow-400">ניקוד: {score}</div>
        <div className="text-slate-500 font-bold">שאלה {currentIdx + 1} / {shuffledQuestions.length}</div>
      </div>
      <div className="bg-slate-900 w-full max-w-2xl rounded-[3.5rem] p-12 text-center relative border-2 border-white/10 shadow-2xl flex flex-col justify-center min-h-[500px]">
        <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">{q.q}</h2>
        <div className="grid gap-5">
          {q.options.map((opt: any) => (
            <button key={opt} onClick={() => handleAnswer(opt)} className="w-full py-6 text-2xl font-bold rounded-2xl bg-slate-800 border-2 border-white/5 hover:border-blue-500 hover:bg-slate-700 transition-all active:scale-95 shadow-lg text-slate-100">
              {opt}
            </button>
          ))}
        </div>
        {msg && (
          <div className={`absolute inset-0 flex items-center justify-center text-5xl font-black bg-slate-950/95 rounded-[3.5rem] animate-pulse ${msg.includes('✅') || msg.includes('⭐') ? 'text-green-400' : 'text-red-400'}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}