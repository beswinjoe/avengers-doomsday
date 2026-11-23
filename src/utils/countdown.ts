import { CountdownTime } from '../types';

// Official Theatrical Premiere Date: December 17, 2026
export const DEFAULT_RELEASE_DATE = new Date('2026-12-17T00:00:00');

export function calculateCountdown(targetDate: Date = DEFAULT_RELEASE_DATE): CountdownTime {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  let diff = target - now;

  if (diff <= 0) {
    // If exact date reached or passed
    diff = 0;
  }

  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(totalDays / 30.4375);
  const days = Math.floor(totalDays % 30.4375);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const milliseconds = Math.floor((diff % 1000) / 10);

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    totalDays,
    isElapsed: diff <= 0
  };
}

export function formatTwoDigits(num: number): string {
  return Math.max(0, num).toString().padStart(2, '0');
}

export function formatThreeDigits(num: number): string {
  return Math.max(0, num).toString().padStart(3, '0');
}
