"use client";
import React, { useState, useEffect } from 'react';

// נתונים מותאמים אישית
const content: any = {
  ilai: {
    name: "אילעי",
    math: {
      lvl1: [
        { q: "12 × 4 = ?", options: ["44", "48", "52"], a: "48" },
        { q: "100 ÷ 5 = ?", options: ["20", "25", "15"], a: "20" },
        { q: "150 - 75 = ?", options: ["75", "85", "65"], a: "75" },
        { q: "9 × 9 = ?", options: ["71", "81", "91"], a: "81" },
        { q: "120 + 80 = ?", options: ["180", "200", "220"], a: "200" },
        { q: "45 ÷ 3 = ?", options: ["15", "12", "18"], a: "15" },
        { q: "7 × 8 = ?", options: ["54", "56", "58"], a: "56" },
        { q: "250 ÷ 2 = ?", options: ["120", "125", "130"], a: "125" },
        { q: "33 + 67 = ?", options: ["90", "100", "110"], a: "100" },
        { q: "11 × 5 = ?", options: ["55", "65", "45"], a: "55" },
        { q: "64 ÷ 8 = ?", options: ["7", "8", "9"], a: "8" },
        { q: "14 + 14 + 14 = ?", options: ["38", "42", "44"], a: "42" },
        { q: "500 - 150 = ?", options: ["350", "400", "450"], a: "350" },
        { q: "6 × 12 = ?", options: ["62", "72", "82"], a: "72" },
        { q: "81 ÷ 9 = ?", options: ["8", "9", "10"], a: "9" },
        { q: "0.5 + 0.5 = ?", options: ["1", "0.10", "2"], a: "1" },
        { q: "1000 ÷ 4 = ?", options: ["200", "250", "300"], a: "250" },
        { q: "13 × 2 = ?", options: ["24", "26", "28"], a: "26" },
        { q: "90 ÷ 2 = ?", options: ["40", "45", "50"], a: "45" },
        { q: "77 - 18 = ?", options: ["59", "69", "49"], a: "59" }
      ],
      lvl2: [ /* שאלות קשות יותר לאילעי... */ ]
    },
    english: {
      lvl1: [
        { q: "איך כותבים 'צהוב'?", options: ["Yellow", "Green", "Blue"], a: "Yellow" },
        { q: "מה הפירוש של Friend?", options: ["משפחה", "חבר", "אויב"], a: "חבר" },
        { q: "האות הקטנה של G היא:", options: ["q", "g", "j"], a: "g" },
        { q: "איך אומרים 'מטבח'?", options: ["Kitchen", "Bedroom", "Garden"], a: "Kitchen" },
        { q: "השלם: I ___ a student", options: ["am", "is", "are"], a: "am" },
        { q: "מה הפירוש של Write?", options: ["לקרוא", "לכתוב", "לשיר"], a: "לכתוב" },
        { q: "איך אומרים 'שלוש עשרה'?", options: ["Thirty", "Thirteen", "Three"], a: "Thirteen" },
        { q: "הפועל Eat פירושו:", options: ["לשתות", "לאכול", "לישון"], a: "לאכול" },
        { q: "מה זה Beautiful?", options: ["מכוער", "יפה", "חכם"], a: "יפה" },
        { q: "איך כותבים 'ספר'?", options: ["Book", "Pen", "Bag"], a: "Book" },
        { q: "השלם: Sun_ay (יום ראשון)", options: ["d", "m", "b"], a: "d" },
        { q: "איך אומרים 'עץ'?", options: ["Tree", "Three", "True"], a: "Tree" },
        { q: "מה זה Breakfast?", options: ["צהריים", "ערב", "בוקר"], a: "בוקר" },
        { q: "איך אומרים 'מחר'?", options: ["Today", "Yesterday", "Tomorrow"], a: "Tomorrow" },
        { q: "האות הגדולה של f היא:", options: ["F", "E", "P"], a: "F" },
        { q: "איך אומרים 'נעליים'?", options: ["Shirt", "Shoes", "Pants"], a: "Shoes" },
        { q: "מה הפירוש של Always?", options: ["אף פעם", "תמיד", "לפעמים"], a: "תמיד" },
        { q: "השלם: A, B, C, _", options: ["D", "E", "F"], a: "D" },
        { q: "איך אומרים 'חודש'?", options: ["Week", "Month", "Year"], a: "Month" },
        { q: "מה זה Table?", options: ["כיסא", "שולחן", "מיטה"], a: "שולחן" }
      ]
    },
    general: {
      lvl1: [
        { q: "מתי יום ההולדת של אילעי דון?", options: ["17 לדצמבר", "25 לספטמבר", "1 בינואר"], a: "25 לספטמבר" },
        { q: "איזו מדינה נראית כמו מגף?", options: ["איטליה", "יוון", "צרפת"], a: "איטליה" },
        { q: "מהו האיבר הגדול ביותר בגוף האדם?", options: ["העור", "הלב", "הכבד"], a: "העור" },
        { q: "כמה יבשות יש בעולם?", options: ["5", "6", "7"], a: "7" },
        { q: "באיזו יבשת נמצאת ישראל?", options: ["אירופה", "אסיה", "אפריקה"], a: "אסיה" },
        { q: "איזה כוכב לכת הכי קרוב לשמש?", options: ["חמה", "מאדים", "נוגה"], a: "חמה" },
        { q: "כמה שחקנים יש בקבוצת כדורגל על המגרש?", options: ["10", "11", "12"], a: "11" },
        { q: "מה שוקל יותר: קילו נוצות או קילו ברזל?", options: ["ברזל", "נוצות", "אותו דבר"], a: "אותו דבר" },
        { q: "איזה צבע מתקבל מערבוב כחול וצהוב?", options: ["סגול", "ירוק", "כתום"], a: "ירוק" },
        { q: "כמה מעלות יש במעגל שלם?", options: ["180", "240", "360"], a: "360" },
        { q: "מהי החיה הגדולה ביותר בעולם?", options: ["פיל", "לווייתן כחול", "כריש"], a: "לווייתן כחול" },
        { q: "מי המציא את נורת החשמל?", options: ["אדיסון", "איינשטיין", "ניוטון"], a: "אדיסון" },
        { q: "מהי בירת צרפת?", options: ["רומא", "לונדון", "פריז"], a: "פריז" },
        { q: "באיזה צד נמצא הלב?", options: ["ימין", "שמאל", "מרכז"], a: "שמאל" },
        { q: "כמה חודשים יש בשנה?", options: ["10", "12", "14"], a: "12" },
        { q: "מהי היבשת הקרה ביותר?", options: ["אסיה", "אנטארקטיקה", "אירופה"], a: "אנטארקטיקה" },
        { q: "מי כתב את 'התקווה'?", options: ["הרצל", "נפתלי הרץ אימבר", "ביאליק"], a: "נפתלי הרץ אימבר" },
        { q: "מהו ההר הגבוה בעולם?", options: ["חרמון", "אוורסט", "הימלאיה"], a: "אוורסט" },
        { q: "איזה פרי נחשב לסמל של ראש השנה?", options: ["תפוח", "רימון", "תמר"], a: "רימון" },
        { q: "כמה כוכבים יש בדגל ישראל?", options: ["1", "2", "0"], a: "1" }
      ]
    }
  },
  alin: {
    name: "אלין",
    math: {
      lvl1: [
        { q: "5 + 5 = ?", options: ["8", "10", "12"], a: "10" },
        { q: "10 - 3 = ?", options: ["6", "7", "8"], a: "7" },
        { q: "4 ÷ 2 = ?", options: ["1", "2", "3"], a: "2" },
        { q: "6 + 6 = ?", options: ["11", "12", "13"], a: "12" },
        { q: "8 ÷ 2 = ?", options: ["3", "4", "5"], a: "4" },
        { q: "12 + 3 = ?", options: ["14", "15", "16"], a: "15" },
        { q: "9 - 4 = ?", options: ["5", "6", "4"], a: "5" },
        { q: "2 + 2 + 2 = ?", options: ["4", "6", "8"], a: "6" },
        { q: "10 ÷ 2 = ?", options: ["4", "5", "6"], a: "5" },
        { q: "20 - 10 = ?", options: ["5", "10", "15"], a: "10" },
        { q: "3 + 7 = ?", options: ["9", "10", "11"], a: "10" },
        { q: "14 - 4 = ?", options: ["10", "12", "8"], a: "10" },
        { q: "5 ÷ 5 = ?", options: ["0", "1", "5"], a: "1" },
        { q: "2 × 3 = ?", options: ["5", "6", "7"], a: "6" },
        { q: "15 + 5 = ?", options: ["10", "20", "25"], a: "20" },
        { q: "18 - 8 = ?", options: ["8", "10", "12"], a: "10" },
        { q: "4 + 4 = ?", options: ["7", "8", "9"], a: "8" },
        { q: "12 ÷ 2 = ?", options: ["5", "6", "7"], a: "6" },
        { q: "7 + 2 = ?", options: ["8", "9", "10"], a: "9" },
        { q: "20 ÷ 2 = ?", options: ["5", "10", "15"], a: "10" }
      ]
    },
    english: {
      lvl1: [
        { q: "איזו אות זו: A?", options: ["איי", "בִּי", "סִי"], a: "איי" },
        { q: "מה זה Apple?", options: ["תפוח", "בננה", "תפוז"], a: "תפוח" },
        { q: "האות הקטנה של B היא:", options: ["d", "b", "p"], a: "b" },
        { q: "איך אומרים 'שלום'?", options: ["Hello", "Bye", "Thanks"], a: "Hello" },
        { q: "מה זה Dog?", options: ["חתול", "כלב", "דג"], a: "כלב" },
        { q: "איזו אות קטנה מתאימה ל-M?", options: ["n", "m", "w"], a: "m" },
        { q: "מה הצבע Red?", options: ["כחול", "אדום", "צהוב"], a: "אדום" },
        { q: "איך אומרים 'אמא'?", options: ["Mom", "Dad", "Sister"], a: "Mom" },
        { q: "מה זה Cat?", options: ["כלב", "חתול", "ציפור"], a: "חתול" },
        { q: "האות הקטנה של T היא:", options: ["t", "f", "l"], a: "t" },
        { q: "איך אומרים 'תודה'?", options: ["Please", "Thanks", "Sorry"], a: "Thanks" },
        { q: "מה זה Blue?", options: ["ירוק", "כחול", "לבן"], a: "כחול" },
        { q: "איך אומרים 'ספר'?", options: ["Pen", "Book", "Bag"], a: "Book" },
        { q: "האות הגדולה של e היא:", options: ["E", "A", "O"], a: "E" },
        { q: "איך אומרים 'אחת, שתיים, שלוש'?", options: ["A,B,C", "One,Two,Three", "Red,Blue"], a: "One,Two,Three" },
        { q: "מה זה Sun?", options: ["ירח", "שמש", "כוכב"], a: "שמש" },
        { q: "איזו אות באה אחרי A?", options: ["B", "C", "D"], a: "B" },
        { q: "איך אומרים 'מים'?", options: ["Food", "Water", "Milk"], a: "Water" },
        { q: "מה זה Dad?", options: ["אמא", "אבא", "אח"], a: "אבא" },
        { q: "האות הקטנה של K היא:", options: ["k", "l", "h"], a: "k" }
      ]
    },
    general: {
      lvl1: [
        { q: "מתי יום ההולדת של אלין דון?", options: ["17 לדצמבר", "25 לספטמבר", "1 בינואר"], a: "17 לדצמבר" },
        { q: "איזו מדינה נראית כמו מגף?", options: ["איטליה", "ישראל", "צרפת"], a: "איטליה" },
        { q: "מי החיה הכי גדולה בעולם?", options: ["פיל", "לווייתן כחול", "אריה"], a: "לווייתן כחול" },
        { q: "באיזו יבשת נמצאת ישראל?", options: ["אירופה", "אסיה", "אפריקה"], a: "אסיה" },
        { q: "מה שוקל יותר: קילו נוצות או קילו ברזל?", options: ["ברזל", "נוצות", "אותו דבר"], a: "אותו דבר" },
        { q: "כמה חודשים יש בשנה?", options: ["10", "12", "14"], a: "12" },
        { q: "מה הצבע של השמש?", options: ["אדום", "צהוב", "כחול"], a: "צהוב" },
        { q: "כמה צלעות יש למשולש?", options: ["3", "4", "5"], a: "3" },
        { q: "איך קוראים לכוכב עליו אנחנו חיים?", options: ["מאדים", "כדור הארץ", "צדק"], a: "כדור הארץ" },
        { q: "איזה פרי קוף הכי אוהב?", options: ["תפוח", "בננה", "תות"], a: "בננה" },
        { q: "כמה ימים יש בשבוע?", options: ["5", "7", "10"], a: "7" },
        { q: "מה יוצא מהר געש?", options: ["מים", "לבה", "שלג"], a: "לבה" },
        { q: "מי מלך החיות?", options: ["נמר", "אריה", "דוב"], a: "אריה" },
        { q: "מהו הצבע של הדשא?", options: ["ירוק", "צהוב", "חום"], a: "ירוק" },
        { q: "כמה אצבעות יש ביד אחת?", options: ["4", "5", "6"], a: "5" },
        { q: "איך אומרים 'תודה' באנגלית?", options: ["Please", "Thank you", "Sorry"], a: "Thank you" },
        { q: "איפה נמצא הלב?", options: ["בצד שמאל", "בצד ימין", "ברגל"], a: "בצד שמאל" },
        { q: "איזה פרי הוא אדום ומתוק?", options: ["לימון", "תות", "מלפפון"], a: "תות" },
        { q: "מה שותים פרה?", options: ["חלב", "מים", "מיץ"], a: "מים" },
        { q: "איזו חיה אומרת 'מייאו'?", options: ["כלב", "חתול", "אריה"], a: "חתול" }
      ]
    }
  }
};

export default function Game() {
  const [player, setPlayer] = useState<any>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [level, setLevel] = useState<1 | 2>(1);
  const [mode, setMode] = useState<'menu' | 'quiz' | 'review' | 'finish'>('menu');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [msg, setMsg] = useState("");
  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);

  // התחלת משחק
  const startQuiz = (sub: string, lvl: 1 | 2) => {
    setSubject(sub);
    setLevel(lvl);
    const qList = content[player][sub][`lvl${lvl}`] || [];
    setActiveQuestions(qList.sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setScore(0);
    setMistakes([]);
    setMode('quiz');
  };

  const handleAnswer = (opt: string) => {
    if (msg) return;
    const currentQ = activeQuestions[currentIdx];
    const isCorrect = opt === currentQ.a;

    if (isCorrect) {
      setScore(s => s + 5); // 5 נקודות לכל שאלה מתוך 20 = 100
      setMsg("✅ נכון!");
    } else {
      setMistakes(prev => [...prev, currentQ]);
      setMsg("❌ לא נורא...");
    }

    setTimeout(() => {
      setMsg("");
      if (currentIdx + 1 < activeQuestions.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setMode('finish');
      }
    }, 1000);
  };

  const startReview = () => {
    setActiveQuestions(mistakes);
    setMistakes([]);
    setCurrentIdx(0);
    setMode('quiz');
  };

  if (!player) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white" dir="rtl">
        <h1 className="text-6xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">האחוזון העליון</h1>
        <div className="flex gap-10">
          {['ilai', 'alin'].map(p => (
            <button key={p} onClick={() => setPlayer(p)} className="group flex flex-col items-center gap-4">
              <div className="w-44 h-44 rounded-[2rem] overflow-hidden border-4 border-white/10 group-hover:border-blue-500 shadow-2xl transition-all">
                <img src={`/${p}.jpg`} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-bold">{content[p].name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white" dir="rtl">
        <h2 className="text-4xl font-black mb-12">שלום {content[player].name}, בחר מקצוע:</h2>
        <div className="grid gap-6 w-full max-w-md">
          {['math', 'english', 'general'].map(sub => (
            <button key={sub} onClick={() => startQuiz(sub, 1)} className="p-8 bg-slate-800 rounded-3xl border-2 border-white/5 hover:border-blue-500 text-2xl font-bold transition-all">
              {sub === 'math' ? '🔢 חשבון' : sub === 'english' ? '🔤 אנגלית' : '🌍 טריוויה'}
            </button>
          ))}
        </div>
        <button onClick={() => setPlayer(null)} className="mt-12 text-slate-500 underline">החלפת משתמש</button>
      </div>
    );
  }

  if (mode === 'finish') {
    const passed = score >= 70;
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white" dir="rtl">
        <div className="bg-slate-900 p-12 rounded-[4rem] border-4 border-white/5 shadow-2xl max-w-lg w-full">
          <h2 className="text-6xl font-black mb-6 text-yellow-400">{score} נקודות</h2>
          
          {passed ? (
            <div>
              <p className="text-2xl text-green-400 font-bold mb-8">כל הכבוד! עברת את השלב!</p>
              <button onClick={() => startQuiz(subject!, 2)} className="w-full bg-blue-500 py-6 rounded-2xl font-black text-2xl shadow-lg">עבור לרמה 2 🚀</button>
            </div>
          ) : (
            <div>
              <p className="text-2xl text-red-400 font-bold mb-4">חסרות לך נקודות כדי לעבור...</p>
              <p className="text-slate-400 mb-8">בוא נעבור שוב על {mistakes.length} השאלות שטעית בהן!</p>
              <button onClick={startReview} className="w-full bg-yellow-500 text-slate-900 py-6 rounded-2xl font-black text-2xl">תקן את הטעויות שלי ✍️</button>
            </div>
          )}
          <button onClick={() => setMode('menu')} className="mt-6 w-full bg-slate-800 py-4 rounded-2xl">חזרה לתפריט</button>
        </div>
      </div>
    );
  }

  const q = activeQuestions[currentIdx];
  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center text-white font-sans" dir="rtl">
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <div className="text-2xl font-black text-yellow-400">ניקוד: {score}</div>
        <div className="text-slate-500 font-bold">שאלה {currentIdx + 1} / {activeQuestions.length}</div>
      </div>
      <div className="bg-slate-900 w-full max-w-2xl rounded-[3.5rem] p-12 text-center relative border-2 border-white/10 shadow-2xl min-h-[500px] flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">{q.q}</h2>
        <div className="grid gap-5">
          {q.options.map((opt: any) => (
            <button key={opt} onClick={() => handleAnswer(opt)} className="w-full py-6 text-2xl font-bold rounded-2xl bg-slate-800 border-2 border-white/5 hover:border-blue-500 transition-all active:scale-95">
              {opt}
            </button>
          ))}
        </div>
        {msg && (
          <div className={`absolute inset-0 flex items-center justify-center text-6xl font-black bg-slate-950/90 rounded-[3.5rem] animate-in zoom-in ${msg.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}