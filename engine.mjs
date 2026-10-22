export const EXAM_SIZE = 70, EXAM_MS = 70 * 60 * 1000;
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
