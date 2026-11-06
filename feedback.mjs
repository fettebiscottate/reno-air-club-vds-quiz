// Confirmed answers are final in immediate-feedback sessions.
export function confirmFeedbackAnswer(session, question, answer) {
  if (session.done || Object.hasOwn(session.answers, question.id)) return null;
  if (!Number.isInteger(answer) || answer < 0 || answer >= question.options.length) return null;
  session.answers[question.id] = answer;
  const correct = answer === question.correct;
  session.streak = correct ? (session.streak || 0) + 1 : 0;
  session.bestStreak = Math.max(session.bestStreak || 0, session.streak);
  return {correct, streak: session.streak};
}

let context;
export function unlockAudio() {
  try {
    const Audio = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Audio) return;
    context ||= new Audio();
    if (context.state === 'suspended') void context.resume().catch(() => {});
  } catch { /* Audio is optional; the quiz remains usable without it. */ }
}
export function playFeedback(correct) {
  unlockAudio();
  if (!context || context.state !== 'running') return;
  try {
    const now = context.currentTime;
    const notes = correct ? [523.25, 659.25, 783.99] : [293.66, 246.94];
    notes.forEach((frequency, i) => {
      const oscillator = context.createOscillator(), gain = context.createGain();
      const start = now + i * .095, end = start + .19;
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(.055, start + .015);
      gain.gain.exponentialRampToValueAtTime(.001, end);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(start); oscillator.stop(end + .015);
      oscillator.onended = () => {oscillator.disconnect(); gain.disconnect();};
    });
  } catch { /* Visual feedback is always available. */ }
}
