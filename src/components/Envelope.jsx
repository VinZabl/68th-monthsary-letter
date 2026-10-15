/* ============================================================
   Envelope.jsx — CSS/SVG interactive envelope
   ============================================================ */
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Envelope.module.css';

export default function Envelope({ onOpen }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (clicked) return;
    setClicked(true);
    // Let the open animation play, then trigger parent after delay
    setTimeout(() => onOpen(), 1600);
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.tapHint}>tap the envelope to open ♡</p>

      <motion.div
        className={styles.envelopeContainer}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Open the love letter envelope"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleClick()}
        whileHover={!clicked ? { y: -6, scale: 1.03 } : {}}
        whileTap={!clicked ? { scale: 0.97 } : {}}
        animate={clicked ? { scale: 1.08, y: -12 } : {}}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* ── Envelope ──────────────────────────────────── */}
        <div className={styles.envelope}>
          {/* Back panel */}
          <div className={styles.envBack} />

          {/* Letter placed behind front folds */}
          <motion.div
            className={styles.letterCard}
            initial={{ y: 25, opacity: 0, scale: 0.9 }}
            animate={
              clicked
                ? { y: -125, opacity: 1, scale: 1.04, zIndex: 30 }
                : { y: 25, opacity: 0, scale: 0.9, zIndex: 2 }
            }
            transition={{
              duration: 0.85,
              delay: clicked ? 0.35 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
          >
            <div className={styles.letterCardInner}>
              <div className={styles.letterMiniLines}>
                <div className={styles.miniLine} style={{ width: '45%' }} />
                <div className={styles.miniLine} style={{ width: '80%' }} />
                <div className={styles.miniLine} style={{ width: '65%' }} />
              </div>
              <span className={styles.letterMiniHeart}>♡</span>
            </div>
          </motion.div>

          {/* Bottom triangle fold */}
          <div className={styles.envBottomFold} />

          {/* Left and right side folds */}
          <div className={styles.envLeftFold} />
          <div className={styles.envRightFold} />

          {/* Top flap */}
          <motion.div
            className={styles.envFlap}
            animate={
              clicked
                ? { rotateX: -180, zIndex: 1 }
                : { rotateX: 0, zIndex: 12 }
            }
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
          />

          {/* Heart seal */}
          <motion.div
            className={styles.heartSeal}
            animate={clicked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            aria-hidden="true"
          >
            ♥
          </motion.div>
        </div>
      </motion.div>

      {/* Floating pulse rings */}
      {!clicked && (
        <>
          <motion.div
            className={styles.pulseRing}
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className={styles.pulseRing}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.4, delay: 0.7, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
