"use client";

import { useState } from 'react';
import ParentDashboard from '@/components/parent/ParentDashboard';
import ChildLearning from '@/components/child/ChildLearning';

export default function Home() {
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("认识数字 4，以及汉字 大和小");

  const startLearning = (topic: string) => {
    setCurrentTopic(topic);
    setIsLearningMode(true);
    // Request full screen in a real app
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.error("Fullscreen request failed", e);
    }
  };

  const exitLearning = () => {
    setIsLearningMode(false);
    // Exit full screen
    try {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } catch (e) {
      console.error("Exit fullscreen failed", e);
    }
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-slate-50 font-sans touch-none">
      {isLearningMode ? (
        <ChildLearning topic={currentTopic} onExit={exitLearning} />
      ) : (
        <ParentDashboard initialTopic={currentTopic} onStartLearning={startLearning} />
      )}
    </main>
  );
}
