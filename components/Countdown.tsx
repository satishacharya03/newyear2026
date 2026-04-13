import React, { useState, useEffect, useRef } from 'react';
import { TimeLeft } from '../types';
import { TARGET_DATE, CELEBRATION_LABEL, CELEBRATION_LABEL_NE, CELEBRATION_YEAR } from '../constants';

const NEXT_CELEBRATION_YEAR = String(Number(CELEBRATION_YEAR) + 1);
const NEXT_TARGET_DATE = new Date(TARGET_DATE.getTime());
NEXT_TARGET_DATE.setUTCFullYear(TARGET_DATE.getUTCFullYear() + 1);

const toNepaliDigits = (value: string) => value.replace(/[0-9]/g, digit => '०१२३४५६७८९'[Number(digit)]);

const NEXT_CELEBRATION_LABEL = `Nepali New Year ${NEXT_CELEBRATION_YEAR}`;
const NEXT_CELEBRATION_LABEL_NE = `नेपाली नयाँ वर्ष ${toNepaliDigits(NEXT_CELEBRATION_YEAR)}`;

const Countdown: React.FC = () => {
  const hasAnnouncedRef = useRef(false);
  const [activeTarget, setActiveTarget] = useState<Date>(() => (new Date() >= TARGET_DATE ? NEXT_TARGET_DATE : TARGET_DATE));

  const calculateTimeLeft = (targetDate: Date): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(activeTarget));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextTarget = now >= TARGET_DATE ? NEXT_TARGET_DATE : TARGET_DATE;

      setActiveTarget(nextTarget);
      setTimeLeft(calculateTimeLeft(nextTarget));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-3 md:mx-6">
      <span className="text-3xl md:text-5xl font-light text-white tabular-nums tracking-tighter">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400 mt-2">
        {label}
      </span>
    </div>
  );

  const isTimeUp = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  const isCelebrationRollover = activeTarget.getTime() !== TARGET_DATE.getTime();

  useEffect(() => {
    if (isCelebrationRollover && !hasAnnouncedRef.current) {
      if (!hasAnnouncedRef.current && "Notification" in window && Notification.permission === "granted") {
        hasAnnouncedRef.current = true;
        new Notification(`${CELEBRATION_LABEL}! 🎆`, {
          body: `${NEXT_CELEBRATION_LABEL} is now starting. Join the celebration.`,
          icon: "/ogimage.gif",
          requireInteraction: true
        });
      }
    }
  }, [isCelebrationRollover]);

  if (isCelebrationRollover) {
    return (
      <div className="glass-card rounded-3xl border border-amber-500/20 shadow-lg shadow-amber-500/10 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-amber-500/10 via-white/5 to-rose-500/10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">{CELEBRATION_LABEL_NE}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gradient-gold tracking-tight mb-3 animate-pulse">
            {NEXT_CELEBRATION_LABEL} countdown started
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Nepali New Year 2083 has arrived. This timer is now counting down to {NEXT_CELEBRATION_LABEL}.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-8 py-6 bg-black/10">
          <a
            href="#wishes"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-amber-400 text-slate-950 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-amber-300 transition-colors"
          >
            View Wishes
          </a>
          <a
            href="#vision"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/15 text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Open Vision
          </a>
        </div>

        <div className="flex justify-center items-center py-8 px-6 md:px-12 border-t border-white/5 bg-black/5">
          <TimeUnit value={timeLeft.days} label="Days" />
          <div className="h-8 w-[1px] bg-white/10"></div>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <div className="h-8 w-[1px] bg-white/10"></div>
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <div className="h-8 w-[1px] bg-white/10"></div>
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8 glass-card rounded-2xl px-6 md:px-12 inline-block border border-white/5">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="h-8 w-[1px] bg-white/10"></div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="h-8 w-[1px] bg-white/10"></div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className="h-8 w-[1px] bg-white/10"></div>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
