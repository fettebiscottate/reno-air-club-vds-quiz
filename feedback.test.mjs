import {test} from 'node:test';
import assert from 'node:assert/strict';
import {confirmFeedbackAnswer} from './feedback.mjs';
import {score} from './engine.mjs';
const question = (id, correct=1) => ({id, correct, options:['A','B','C']});

test('conferma una sola volta: non si possono correggere errori dopo aver visto la soluzione',()=>{
  const session={answers:{}};
  const q=question('1');
  assert.deepEqual(confirmFeedbackAnswer(session,q,0),{correct:false,streak:0});
  assert.equal(confirmFeedbackAnswer(session,q,1),null);
  assert.equal(session.answers[q.id],0);
  assert.equal(score([q],session.answers).errors,1);
});
test('la serie cresce, si interrompe con un errore e conserva il record al ripristino',()=>{
  let s={answers:{}};
  confirmFeedbackAnswer(s,question('1'),1);
  assert.equal(confirmFeedbackAnswer(s,question('2'),1).streak,2);
  s=JSON.parse(JSON.stringify(s));
  assert.equal(confirmFeedbackAnswer(s,question('3'),0).streak,0);
  assert.equal(s.bestStreak,2);
  assert.equal(confirmFeedbackAnswer(s,question('4'),1).streak,1);
});
test('bozze e risposte non valide non alterano punteggio o serie; sessioni concluse sono bloccate',()=>{
  const s={answers:{},drafts:{'1':1}};const q=question('1');
  assert.equal(score([q],s.answers).unanswered,1);
  for(const answer of [undefined,-1,3,1.5,'1']) assert.equal(confirmFeedbackAnswer(s,q,answer),null);
  assert.deepEqual(s.answers,{});
  s.done=true;
  assert.equal(confirmFeedbackAnswer(s,q,1),null);
});
