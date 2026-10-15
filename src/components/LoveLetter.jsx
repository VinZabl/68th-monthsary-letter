/* ============================================================
   LoveLetter.jsx — Paper letter reading experience
   ============================================================ */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { letterContent } from '../data/letter.js';
import styles from './LoveLetter.module.css';

export default function LoveLetter({ onReset }) {
  const paragraphs = letterContent.body.split('\n\n').filter(Boolean);
  const signatureLines = letterContent.signature.split('\n');

  return (
    <motion.section
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      aria-label="Love letter"
    >
      {/* Soft dimmed backdrop */}
      <div className={styles.backdrop} />

      {/* Letter paper card */}
      <motion.article
        className={styles.letter}
        initial={{ opacity: 0, y: 40, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Your love letter"
      >
        {/* Decorative top */}
        <div className={styles.letterTop} aria-hidden="true">
          <span>✦</span>
          <span className={styles.letterTopHeart}>♡</span>
          <span>✦</span>
        </div>

        {/* Letter content */}
        <div className={styles.letterBody}>
          <p className={styles.greeting}>{letterContent.greeting}</p>

          <p className={styles.opening}>{letterContent.opening}</p>

          <div className={styles.paragraphs}>
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className={styles.paragraph}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.p
            className={styles.closing}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {letterContent.closing}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={styles.signatureDivider}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            aria-hidden="true"
          />

          {/* Signature */}
          <motion.div
            className={styles.signature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            {signatureLines.map((line, i) => (
              <p key={i} className={i === 0 ? styles.signatureLine : styles.signatureName}>
                {line}
              </p>
            ))}
          </motion.div>

          {/* Decorative bottom heart */}
          <motion.div
            className={styles.bottomHeart}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.9, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            aria-hidden="true"
          >
            ♡
          </motion.div>
        </div>

        {/* Reset / Start over button */}
        <motion.div
          className={styles.resetWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <button
            className={styles.resetBtn}
            onClick={onReset}
            aria-label="Start over"
          >
            ↩ Start over
          </button>
        </motion.div>
      </motion.article>
    </motion.section>
  );
}
