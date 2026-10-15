/* ============================================================
   QuestionGame.jsx — Three-question quiz
   Animation: correct answer → card flips to show back →
              card floats up into completed row →
              new circle pops up for next question
   ============================================================ */
import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { questions } from '../data/questions.js';
import styles from './QuestionGame.module.css';

/* ─────────────────────────────────────────────────────────────
   AnswerButton — with shake on wrong
   ───────────────────────────────────────────────────────────── */
const shakeVariants = {
  shake: {
    x: [0, -9, 9, -6, 6, -3, 3, 0],
    transition: { duration: 0.45 },
  },
  idle: { x: 0 },
};

function AnswerButton({ answer, onClick, state, disabled }) {
  const isWrong   = state === 'wrong';
  const isCorrect = state === 'correct';
  return (
    <motion.button
      className={`${styles.answerBtn} ${isWrong ? styles.wrong : ''} ${isCorrect ? styles.correct : ''}`}
      onClick={() => !disabled && onClick(answer)}
      variants={shakeVariants}
      animate={isWrong ? 'shake' : 'idle'}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {answer.text}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   CompletedCircle — small circle sitting in the top row (blank)
   ───────────────────────────────────────────────────────────── */
function CompletedCircle() {
  return (
    <motion.div
      className={styles.completedCircle}
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <span className={styles.completedDot} aria-hidden="true">♡</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GIF helper based on question id and answer index:
   Q1: 1, 2, 4 -> crying dude.gif; 3 -> yes-lets-go.gif
   Q2: 1, 2, 3 -> yes-lets-go.gif; 4 -> angry dog.gif
   Q3: 1, 3, 4 -> choking dude.gif; 2 -> yamete.gif
   ───────────────────────────────────────────────────────────── */
function getGifForAnswer(questionId, answerIndex) {
  // answerIndex is 1-based (1, 2, 3, 4)
  if (questionId === 1) {
    if (answerIndex === 3) return '/yes-lets-go.gif';
    return '/crying dude.gif';
  }
  if (questionId === 2) {
    if (answerIndex === 4) return '/angry dog.gif';
    return '/yes-lets-go.gif';
  }
  if (questionId === 3) {
    if (answerIndex === 2) return '/yamete.gif';
    return '/choking dude.gif';
  }
  return '/yes-lets-go.gif';
}

/* ─────────────────────────────────────────────────────────────
   ActiveCard — the big circle that shows the question.
   On flip=true: rotates 180° on Y axis, showing the GIF reaction on back,
   then exits upward.
   ───────────────────────────────────────────────────────────── */
function ActiveCard({ question, phase, activeGif, onFlipDone }) {
  const isFlip = phase === 'flipping';
  const isFly  = phase === 'flying';

  return (
    <motion.div
      className={styles.cardOuter}
      animate={isFly ? { y: -280, opacity: 0, scale: 0.82 } : { y: 0, opacity: 1, scale: 1 }}
      transition={isFly ? { duration: 0.65, ease: [0.4, 0, 0.6, 1] } : { duration: 0 }}
      onAnimationComplete={() => {
        if (isFly) onFlipDone();
      }}
    >
      {/* Inner wrapper — perspective for 3-D flip */}
      <motion.div
        className={styles.cardInner}
        animate={isFlip || isFly ? { rotateY: 180 } : { rotateY: 0 }}
        transition={
          isFlip
            ? { duration: 0.55, ease: [0.4, 0, 0.2, 1] }
            : isFly
            ? { duration: 0 }
            : { duration: 0.3 }
        }
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── Front face — question ─────────────────────── */}
        <div className={styles.cardFront}>
          <span className={styles.questionNumber}>Q{question.id}</span>
          <p className={styles.questionText}>{question.question}</p>
          <span className={styles.circleAccent} aria-hidden="true">♡</span>
        </div>

        {/* ── Back face — shows the reaction GIF behind card after it rotates ─────────────── */}
        <div className={styles.cardBack}>
          {activeGif && (
            <img
              src={activeGif}
              alt="Reaction GIF"
              className={styles.cardBackGif}
              loading="eager"
              decoding="sync"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main QuestionGame
   ───────────────────────────────────────────────────────────── */
export default function QuestionGame({ onComplete }) {
  const [currentIdx, setCurrentIdx]     = useState(0);
  const [completed, setCompleted]       = useState([]);       // finished questions
  const [answersSummary, setAnswersSummary] = useState([]);   // [{ question, answer }]
  const [answerStates, setAnswerStates] = useState({});
  const [activeGif, setActiveGif]       = useState('');       // reaction GIF to show on card back
  const [cardPhase, setCardPhase]       = useState('idle');   // 'idle'|'flipping'|'flying'
  const [isAnimating, setIsAnimating]   = useState(false);
  const [showNext, setShowNext]         = useState(true);     // controls next-card pop-in

  const currentQuestion = questions[currentIdx];
  const progressPct     = (currentIdx / questions.length) * 100;

  /* Called when the flying card has left the screen */
  const handleFlipDone = useCallback(() => {
    const done = questions[currentIdx];
    setCompleted(prev => [...prev, done]);
    setCardPhase('idle');
    setAnswerStates({});
    setActiveGif('');

    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      // All done — return full summary of questions and selected answers
      setTimeout(() => onComplete(answersSummary), 350);
    } else {
      // Pop in the next card
      setShowNext(false);
      setCurrentIdx(nextIdx);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowNext(true);
          setIsAnimating(false);
        });
      });
    }
  }, [currentIdx, answersSummary, onComplete]);

  const handleAnswer = useCallback((answer, answerIndex) => {
    if (isAnimating) return;

    // Pick reaction gif according to question id and answer index (1, 2, 3, 4)
    const gifUrl = getGifForAnswer(currentQuestion.id, answerIndex);
    setActiveGif(gifUrl);

    setIsAnimating(true);
    setAnswerStates({ [answer.id]: 'correct' });

    // Store in summary
    setAnswersSummary(prev => [
      ...prev,
      { question: currentQuestion.question, answer: answer.text }
    ]);

    // Step 1 — brief highlight pause, then flip to back face showing GIF
    setTimeout(() => setCardPhase('flipping'), 320);

    // Step 2 — give time to enjoy the GIF, then fly upward
    setTimeout(() => setCardPhase('flying'), 1850);
  }, [isAnimating, currentQuestion]);

  return (
    <motion.section
      className={styles.game}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      aria-label="Question game"
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <header className={styles.header}>
        <p className={styles.headerSub}>our little story</p>
        <h2 className={styles.headerTitle}>
          Question {Math.min(currentIdx + 1, questions.length)} of {questions.length}
        </h2>
        <div className={styles.progressBar} role="progressbar" aria-valuenow={progressPct}>
          <motion.div
            className={styles.progressFill}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </header>

      {/* ── Completed circles row ───────────────────────────── */}
      <div className={styles.completedRow} aria-label="Completed questions">
        <AnimatePresence>
          {completed.map(q => (
            <CompletedCircle key={q.id} />
          ))}
        </AnimatePresence>
        {/* Empty slot placeholders */}
        {Array.from({ length: Math.max(0, questions.length - completed.length) }).map((_, i) => (
          <div key={`slot-${i}`} className={styles.emptySlot} aria-hidden="true" />
        ))}
      </div>

      {/* ── Active circle area ──────────────────────────────── */}
      <div className={styles.circleArea}>
        <AnimatePresence mode="wait">
          {showNext && (
            <motion.div
              key={`card-${currentQuestion.id}`}
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className={styles.cardWrapper}
            >
              <ActiveCard
                question={currentQuestion}
                phase={cardPhase}
                activeGif={activeGif}
                onFlipDone={handleFlipDone}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Answer buttons ──────────────────────────────────── */}
      <div className={styles.answersGrid} role="group" aria-label="Answer choices">
        <AnimatePresence mode="wait">
          <motion.div
            key={`answers-${currentQuestion.id}`}
            className={styles.answersInner}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.38 }}
          >
            {currentQuestion.answers.map((answer, index) => (
              <AnswerButton
                key={answer.id}
                answer={answer}
                onClick={(ans) => handleAnswer(ans, index + 1)}
                state={answerStates[answer.id] || ''}
                disabled={isAnimating}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hidden zero-opacity warm-up for all 5 GIFs so they are instantly cached & decoded */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <img src="/crying dude.gif" alt="" />
        <img src="/yes-lets-go.gif" alt="" />
        <img src="/angry dog.gif" alt="" />
        <img src="/choking dude.gif" alt="" />
        <img src="/yamete.gif" alt="" />
      </div>
    </motion.section>
  );
}
