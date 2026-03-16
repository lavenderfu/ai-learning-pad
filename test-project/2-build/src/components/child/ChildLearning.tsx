"use client";

import { useState, useEffect, useRef } from 'react';
import { Lock, Volume2, Star, Loader2 } from 'lucide-react';
import ChickenMascot from './mascot/ChickenMascot';

interface ChildLearningProps {
  topic: string;
  onExit: () => void;
}

interface Option {
  id: number;
  value: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

type ScreenState = 'loading' | 'greeting' | 'learning' | 'celebration' | 'goodbye';

export default function ChildLearning({ topic, onExit }: ChildLearningProps) {
  const [screenState, setScreenState] = useState<ScreenState>('loading');
  const [greetingMsg, setGreetingMsg] = useState('');

  const [showLockModal, setShowLockModal] = useState(false);
  const [mathAnswer, setMathAnswer] = useState('');
  const [wrongOptionId, setWrongOptionId] = useState<number | null>(null);
  const [correctOptionId, setCorrectOptionId] = useState<number | null>(null);

  // Dynamic data states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  // 初始化逻辑：计算连续天数并生成问候语
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('last_learning_date');

    if (!lastVisit) {
      // 第一次来
      setGreetingMsg("哈喽小宝贝！我是叽叽，欢迎来到魔法学习乐园！");
    } else if (lastVisit === today) {
      // 今天已经来过了
      setGreetingMsg("哇，你又来啦！叽叽好开心，我们继续探险吧！");
    } else {
      // 计算相差天数
      const lastDate = new Date(lastVisit);
      const currDate = new Date(today);
      const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // 连续第二天
        setGreetingMsg("早上好呀！你真是一个坚持学习的好宝宝，叽叽为你点赞！");
      } else {
        // 中断了
        setGreetingMsg(`哼，你都 ${diffDays} 天没有来看我了，我自己真不好玩！今天一定要陪我多玩一会儿哦！`);
      }
    }

    // 更新最后访问时间为今天
    localStorage.setItem('last_learning_date', today);
  }, []);

  // Fetch questions from AI on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic }),
        });

        if (!res.ok) throw new Error('Failed to generate questions');

        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setScreenState('greeting');
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error(err);
        setError('生成题目失败，已切换为演示题库。');
        setQuestions([
          {
            id: 1,
            text: `哪个是数字 "4" ？ (主题: ${topic})`,
            options: [
              { id: 1, value: '3', isCorrect: false },
              { id: 2, value: '4', isCorrect: true },
              { id: 3, value: '2', isCorrect: false }
            ]
          }
        ]);
        setScreenState('greeting');
      }
    };

    fetchQuestions();
  }, [topic]);

  const playAudio = (textToSpeak?: string) => {
    // 视觉动效
    const speaker = document.getElementById('speaker-icon');
    if (speaker) {
      speaker.style.transform = 'scale(1.1)';
      setTimeout(() => {
        if (speaker) speaker.style.transform = 'scale(1)';
      }, 200);
    }

    // 真实语音播报
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      let text = textToSpeak;
      // 如果没有传特定文本，并且当前在学习态，就读题目
      if (!text && questions.length > 0 && currentQIndex < questions.length) {
        text = questions[currentQIndex].text;
      }

      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.85; // 语速慢一点
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const checkAnswer = (id: number, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectOptionId(id);
      playAudio("答对啦！太棒了！");

      setTimeout(() => {
        setScreenState('celebration');
        setTimeout(() => {
          setScreenState('learning');
          setCorrectOptionId(null);

          // Move to next question or exit if done
          if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            // 延迟一点读下一题，等动画结束
            setTimeout(() => {
              playAudio(questions[currentQIndex + 1].text);
            }, 500);
          } else {
            // Finished all questions! Show goodbye mascot
            setScreenState('goodbye');
          }
        }, 2000);
      }, 500);
    } else {
      setWrongOptionId(id);
      setTimeout(() => {
        setWrongOptionId(null);
      }, 600);
    }
  };

  // Lock logic
  const handleLockPressStart = () => {
    pressTimer.current = setTimeout(() => {
      setShowLockModal(true);
      setMathAnswer('');
    }, 1500);
  };

  const handleLockPressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  const verifyUnlock = () => {
    if (mathAnswer === '28') {
      setShowLockModal(false);
      onExit();
    } else {
      alert("答案错误！");
      setMathAnswer('');
    }
  };

  if (screenState === 'loading') {
    return (
      <div className="w-full h-full bg-orange-50 flex flex-col items-center justify-center relative">
        <Loader2 size={80} className="text-orange-500 animate-spin mb-8" />
        <h2 className="text-3xl text-orange-800 font-bold">正在为你生成专属魔法题库...</h2>
      </div>
    );
  }

  if (screenState === 'greeting') {
    return (
      <ChickenMascot
        type="greeting"
        message={greetingMsg}
        onComplete={() => {
          setScreenState('learning');
          // Start playing first question immediately
          setTimeout(() => {
            playAudio(questions[0].text);
          }, 500);
        }}
      />
    );
  }

  if (screenState === 'goodbye') {
    return (
      <ChickenMascot
        type="goodbye"
        message="今天的新知识学完啦，你可真棒，明天别忘了还来找我玩哦，我一定会等着你的！"
        onComplete={onExit}
      />
    );
  }

  const currentQuestion = questions[currentQIndex];

  return (
    <div className="w-full h-full bg-orange-50 flex flex-col items-center justify-center relative select-none">
      
      {/* Parent Lock Button */}
      <button 
        className="absolute top-6 right-6 w-16 h-16 bg-white/40 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/80 transition-all z-10"
        onMouseDown={handleLockPressStart}
        onMouseUp={handleLockPressEnd}
        onMouseLeave={handleLockPressEnd}
        onTouchStart={handleLockPressStart}
        onTouchEnd={handleLockPressEnd}
      >
        <Lock size={28} className="text-slate-600" />
      </button>

      {/* Progress Indicator */}
      <div className="absolute top-8 left-8 flex gap-3">
        {questions.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-4 rounded-full transition-all duration-300 ${
              idx < currentQIndex ? 'w-12 bg-green-400' : 
              idx === currentQIndex ? 'w-16 bg-orange-400' : 'w-12 bg-orange-200'
            }`} 
          />
        ))}
      </div>

      {error && <div className="absolute top-24 text-red-500 text-lg bg-red-100 p-2 rounded-xl">⚠️ {error}</div>}

      {/* Question Area */}
      {currentQuestion && (
        <>
          <div className="flex items-center gap-6 mb-16 px-10 text-center">
            <button
              id="speaker-icon"
              onClick={() => playAudio(currentQuestion.text)}
              className="bg-orange-500 min-w-[80px] w-20 h-20 rounded-full flex items-center justify-center shadow-[0_6px_0_rgb(194,65,12)] active:shadow-none active:translate-y-[6px] transition-all"
            >
              <Volume2 size={40} className="text-white" />
            </button>
            <h1 className="text-5xl lg:text-6xl font-bold text-orange-950">{currentQuestion.text}</h1>
          </div>

          {/* Options Area */}
          <div className="flex gap-10 flex-wrap justify-center px-10">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => checkAnswer(opt.id, opt.isCorrect)}
                className={`w-48 h-48 lg:w-52 lg:h-52 rounded-[32px] text-[80px] lg:text-[100px] font-bold transition-all flex items-center justify-center
                  ${correctOptionId === opt.id 
                    ? 'bg-green-400 text-white shadow-[0_8px_0_rgb(22,163,74)]' 
                    : wrongOptionId === opt.id
                      ? 'bg-red-400 text-white shadow-[0_8px_0_rgb(220,38,38)] animate-[shake_0.5s_ease-in-out]'
                      : 'bg-white text-slate-800 shadow-[0_8px_0_rgb(203,213,225)] hover:bg-slate-50'
                  }
                  active:translate-y-[8px] active:shadow-none
                `}
                style={{
                  animation: wrongOptionId === opt.id ? 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both' : 'none',
                  transform: wrongOptionId === opt.id ? 'translate3d(0, 0, 0)' : ''
                }}
              >
                {opt.value}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Celebration Overlay */}
      {screenState === 'celebration' && (
        <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="flex gap-4 mb-6">
            <Star size={100} className="text-yellow-400 fill-yellow-400 animate-bounce" style={{animationDelay: '0ms'}} />
            <Star size={120} className="text-yellow-400 fill-yellow-400 animate-bounce" style={{animationDelay: '100ms'}} />
            <Star size={100} className="text-yellow-400 fill-yellow-400 animate-bounce" style={{animationDelay: '200ms'}} />
          </div>
          <div className="text-6xl text-orange-500 font-bold animate-pulse">太棒啦！</div>
        </div>
      )}

      {/* Parent Lock Modal */}
      {showLockModal && (
        <div className="absolute inset-0 bg-black/80 z-[100] flex items-center justify-center">
          <div className="bg-white p-10 rounded-3xl text-center max-w-md w-full">
            <div className="text-slate-500 text-xl mb-4">家长解锁验证</div>
            <div className="text-5xl font-bold text-slate-800 mb-8 tracking-widest">4 × 7 = ?</div>
            
            <input 
              type="number" 
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              placeholder="输入答案"
              className="w-48 text-center text-3xl p-4 border-4 border-slate-200 rounded-2xl mb-8 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setShowLockModal(false)}
                className="px-8 py-4 bg-slate-200 text-slate-700 text-2xl font-bold rounded-2xl hover:bg-slate-300"
              >
                取消
              </button>
              <button 
                onClick={verifyUnlock}
                className="px-8 py-4 bg-red-500 text-white text-2xl font-bold rounded-2xl hover:bg-red-600 shadow-[0_4px_0_rgb(220,38,38)] active:translate-y-1 active:shadow-none transition-all"
              >
                解锁退出
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInlineStyle={{__html: `
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}} />
    </div>
  );
}
