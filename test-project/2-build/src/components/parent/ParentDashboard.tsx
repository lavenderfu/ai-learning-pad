"use client";

import { useState } from 'react';
import { Cloud, BarChart2, Rocket } from 'lucide-react';

interface ParentDashboardProps {
  initialTopic: string;
  onStartLearning: (topic: string) => void;
}

export default function ParentDashboard({ initialTopic, onStartLearning }: ParentDashboardProps) {
  const [topic, setTopic] = useState(initialTopic);

  return (
    <div className="flex w-full h-full">
      {/* Left Column: Stats */}
      <div className="w-[40%] bg-white p-8 border-r-2 border-slate-200">
        <h2 className="text-3xl font-bold text-slate-700 mb-6 flex items-center gap-2">
          <BarChart2 size={32} className="text-blue-500" />
          学习看板
        </h2>
        
        <div className="bg-slate-50 rounded-xl p-6 mb-6 shadow-sm">
          <div className="text-slate-500 text-lg mb-2">昨日正确率</div>
          <div className="text-4xl font-bold text-blue-500">85%</div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-6 shadow-sm">
          <div className="text-slate-500 text-lg mb-2">AI 分析建议：</div>
          <div className="text-slate-600 leading-relaxed text-lg">
            宝宝对数字「3」的认知已达标。<br />
            建议今天进行「数字 4 和 5」的认知，同时复习「大小概念」。
          </div>
        </div>
      </div>
      
      {/* Right Column: Controls */}
      <div className="w-[60%] bg-slate-50 p-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <Rocket size={40} className="text-green-500" />
          今日学习任务
        </h1>
        
        <div className="mb-8">
          <label className="text-xl font-bold text-slate-700 block mb-3">设置学习主题：</label>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-5 text-2xl border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="例如：认识苹果，或者练习 1-5"
          />
          
          <div className="mt-4 text-slate-500 text-sm flex items-center">
            <Cloud size={18} className="text-blue-500 mr-2" />
            <span>已同步来自云端远程配置：[异地爸爸配置的主题]</span>
          </div>
        </div>
        
        <button 
          onClick={() => onStartLearning(topic)}
          className="bg-green-500 hover:bg-green-600 active:transform active:translate-y-1 transition-all text-white text-3xl font-bold py-6 px-10 rounded-2xl shadow-[0_6px_0_rgb(22,163,74)] hover:shadow-[0_4px_0_rgb(22,163,74)] active:shadow-none"
        >
          进入沉浸学习
        </button>
        <div className="text-center mt-6 text-slate-400">点击后将全屏锁定，需解数学题退出</div>
      </div>
    </div>
  );
}
