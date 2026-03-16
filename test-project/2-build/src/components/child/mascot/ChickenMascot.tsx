"use client";

import { useState, useEffect } from 'react';

interface ChickenMascotProps {
  message: string;
  type: 'greeting' | 'goodbye';
  onComplete?: () => void;
}

export default function ChickenMascot({ message, type, onComplete }: ChickenMascotProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // 播放语音
    const playSpeech = () => {
      if ('speechSynthesis' in window) {
        // 取消正在播放的语音
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.9; // 语速稍微慢一点，适合小朋友
        utterance.pitch = 1.2; // 音调高一点，模拟可爱的童声/小鸡声

        window.speechSynthesis.speak(utterance);
      }
    };

    playSpeech();

    // 根据字数估算显示按钮的延迟 (每个汉字算 300ms) + 1秒基础延迟
    const delay = Math.max(2000, message.length * 300 + 1000);

    const timer = setTimeout(() => {
      setShowButton(true);
    }, delay);

    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [message]);

  return (
    <div className="absolute inset-0 z-[80] bg-yellow-50 flex flex-col items-center justify-center animate-in fade-in duration-500">
      
      {/* 简单的纯 CSS 卡通小鸡图形 (用 SVG 画一个可爱的) */}
      <div className="relative w-64 h-64 mb-12 animate-bounce" style={{ animationDuration: '2s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* 身体 */}
          <circle cx="50" cy="60" r="35" fill="#fcd34d" />
          {/* 头部 */}
          <circle cx="50" cy="35" r="25" fill="#fcd34d" />
          {/* 冠 */}
          <path d="M 45 10 Q 50 0 55 10 Q 60 5 60 15 Q 50 15 45 15 Z" fill="#ef4444" />
          {/* 眼睛 */}
          <circle cx="40" cy="30" r="4" fill="#1e293b" />
          <circle cx="60" cy="30" r="4" fill="#1e293b" />
          {/* 腮红 */}
          <ellipse cx="32" cy="38" rx="4" ry="2" fill="#fca5a5" opacity="0.6" />
          <ellipse cx="68" cy="38" rx="4" ry="2" fill="#fca5a5" opacity="0.6" />
          {/* 嘴巴 */}
          <path d="M 45 35 L 55 35 L 50 45 Z" fill="#f97316" />
          {/* 翅膀 */}
          <path d="M 15 60 Q 5 70 20 75 Q 30 70 25 60 Z" fill="#fbbf24" />
          <path d="M 85 60 Q 95 70 80 75 Q 70 70 75 60 Z" fill="#fbbf24" />
          {/* 脚 */}
          <path d="M 40 95 L 40 100 L 35 100 M 40 100 L 45 100" stroke="#f97316" strokeWidth="3" fill="none" />
          <path d="M 60 95 L 60 100 L 55 100 M 60 100 L 65 100" stroke="#f97316" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* 气泡对话框 */}
      <div className="relative bg-white rounded-3xl p-8 max-w-2xl shadow-lg border-4 border-yellow-200">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-yellow-200"></div>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-white z-10"></div>
        
        <p className="text-4xl font-bold text-slate-700 text-center leading-relaxed">
          {message}
        </p>
      </div>

      {/* 操作按钮 */}
      {showButton && onComplete && (
        <button 
          onClick={onComplete}
          className="mt-12 px-12 py-5 bg-green-500 text-white text-3xl font-bold rounded-full shadow-[0_6px_0_rgb(22,163,74)] active:translate-y-1 active:shadow-none transition-all animate-in slide-in-from-bottom-4"
        >
          {type === 'greeting' ? '开始答题吧！' : '退出学习'}
        </button>
      )}
    </div>
  );
}
