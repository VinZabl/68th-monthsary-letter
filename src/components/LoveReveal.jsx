/* ============================================================
   LoveReveal.jsx — "I LOVE YOU" final reveal + envelope
   ============================================================ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions.js';
import Envelope from './Envelope.jsx';
import styles from './LoveReveal.module.css';

/* ── Heart burst particle ───────────────────────────────────── */
function HeartBurst({ delay }) {
  return (
    <motion.span
      className={styles.heartBurst}
      initial={{ opacity: 1, scale: 0, y: 0 }}
      animate={{
        opacity: [1, 1, 0],
        scale: [0, 1.4, 0.8],
        y: [-10, -40, -70],
        x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
      }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      aria-hidden="true"
    >
      ♡
    </motion.span>
  );
}

/* ── Single reveal circle ───────────────────────────────────── */
function RevealCircle({ word, index }) {
  const [showBursts, setShowBursts] = useState(false);

  return (
    <motion.div
      className={styles.revealCircle}
      initial={{ scale: 0, opacity: 0, rotate: -20 }}
      animate={{ scale: [0, 1.15, 1], opacity: 1, rotate: 0 }}
      transition={{
        duration: 0.65,
        delay: index * 0.55 + 0.35,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      onAnimationComplete={() => {
        setShowBursts(true);
      }}
      style={{ position: 'relative' }}
    >
      {showBursts && [0, 1, 2, 3].map(i => (
        <HeartBurst key={i} delay={i * 0.1} />
      ))}
      <motion.div
        className={styles.revealGlow}
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.span
        className={styles.revealWord}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.55 + 0.55, duration: 0.35 }}
      >
        {word}
      </motion.span>
    </motion.div>
  );
}

/* ── Main LoveReveal ────────────────────────────────────────── */
export default function LoveReveal({ onLetterOpen }) {
  return (
    <motion.section
      className={styles.reveal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      aria-label="Love reveal screen"
    >
      {/* ── Popping circles revealing "I", "LOVE", "YOU" ── */}
      <motion.div
        className={styles.circlesRow}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {questions.map((q, i) => (
          <RevealCircle key={q.id} word={q.reveal} index={i} />
        ))}
      </motion.div>

      {/* ── Message ─────────────────────────────────────── */}
      <motion.div
        className={styles.messageBlock}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.6 }}
      >
        <p className={styles.messageText}>
          You found your little surprise, my love.&nbsp;♡
        </p>
      </motion.div>

      {/* ── Envelope ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.6, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Envelope onOpen={onLetterOpen} />
      </motion.div>
    </motion.section>
  );
}
