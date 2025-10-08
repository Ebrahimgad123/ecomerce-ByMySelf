"use client"
import React, { useEffect, useState } from 'react'

const Timer = () => {
      const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // مؤقت تنازلي 5 ساعات مثلاً
  useEffect(() => {
    const targetTime = new Date().getTime() + 5 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center space-x-4 ">
        <div className="flex-col"><p>Hours</p> <div className="flex gap-2"><span className="font-bold text-2xl">{String(timeLeft.hours).padStart(2, "0")}</span><span>:</span></div></div>
        
        <div className="flex-col"><p>Minutes</p><div className="flex gap-2"> <span className="font-bold text-2xl">{String(timeLeft.minutes).padStart(2, "0")}</span><span>:</span></div></div>
         <div className="flex-col"><p>Seconds</p> <div className="flex gap-2"><span className="font-bold text-2xl">{String(timeLeft.seconds).padStart(2, "0")}</span></div></div>
      </div>

  )
}

export default Timer