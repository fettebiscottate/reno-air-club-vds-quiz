export const EXAM_SIZE = 70, EXAM_MS = 70 * 60 * 1000;
// Largest remainders; equal remainders follow the requested topic order.
const weights = [15, 15, 15, 20, 5, 10, 10, 5, 5];
const quotas = weights.map((percent, i) => ({topic: i + 1, percent, count: Math.floor(EXAM_SIZE * percent / 100)}));
const priority = quotas.map((q, i) => ({i, remainder: EXAM_SIZE * q.percent % 100}))
  .sort((a, b) => b.remainder - a.remainder || a.i - b.i);
const extra = EXAM_SIZE - quotas.reduce((sum, q) => sum + q.count, 0);
for (const {i} of priority.slice(0, extra)) quotas[i].count++;
export const EXAM_DISTRIBUTION = Object.freeze(quotas.map(q => Object.freeze(q)));
export function sampleExam(pool, random = Math.random) {
  return EXAM_DISTRIBUTION.flatMap(({topic, count}) => sample(pool.filter(q => q.topic === topic), count, random));
}
export function sample(pool, count, random = Math.random) {
  if (!Number.isInteger(count) || count < 1 || count > pool.length) throw new Error('Numero di domande non valido');
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy.slice(0, count);
}
export function score(questions, answers) {
  const correct = questions.filter(q => answers[q.id] === q.correct).length;
  const unanswered = questions.filter(q => answers[q.id] == null).length;
  return {correct, unanswered, errors: questions.length - correct, passed: questions.length - correct <= 7};
}
export function remaining(session, now = Date.now()) {return session.deadline ? Math.max(0, session.deadline - now) : null;}
