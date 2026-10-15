/* ============================================================
   IntroScreen.jsx — Opening screen
   ============================================================ */
import { motion } from 'framer-motion';
import styles from './IntroScreen.module.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } },
};

export default function IntroScreen({ onStart }) {
  const polaroids = [
    { src: '/image1.png', alt: 'Memory 1', angle: -6,  posClass: styles.polaroid1 },
    { src: '/image2.png', alt: 'Memory 2', angle: 5,   posClass: styles.polaroid2 },
    { src: '/image3.png', alt: 'Memory 3', angle: -4,  posClass: styles.polaroid3 },
    { src: '/image4.png', alt: 'Memory 4', angle: 7,   posClass: styles.polaroid4 },
  ];

  return (
    <motion.section
      className={styles.intro}
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      aria-label="Welcome screen"
    >
      {/* ── Background Polaroids ─────────────────────────────────── */}
      <div className={styles.polaroidsContainer} aria-hidden="true">
        {polaroids.map((p, idx) => (
          <motion.div
            key={idx}
            className={`${styles.polaroid} ${p.posClass}`}
            initial={{ opacity: 0, scale: 0.85, rotate: p.angle }}
            animate={{ opacity: 0.75, scale: 1, rotate: p.angle }}
            transition={{ duration: 0.9, delay: 0.2 + idx * 0.15, ease: 'easeOut' }}
            whileHover={{ opacity: 1, scale: 1.05, rotate: p.angle * 0.5, zIndex: 3 }}
          >
            <div className={styles.polaroidPhoto}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </div>
            <div className={styles.polaroidPin}>♡</div>
          </motion.div>
        ))}
      </div>

      <motion.h1 variants={item} className={styles.title}>
        Happy 68th Monthsary,
        <br />
        <em>My Love</em>
      </motion.h1>

      <motion.div variants={item}>
        <motion.button
          className={styles.startBtn}
          onClick={onStart}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(139,50,82,0.30)' }}
          whileTap={{ scale: 0.96 }}
          aria-label="mwa"
        >
          mwa ♡
        </motion.button>
      </motion.div>

      <motion.p variants={item} className={styles.hint}>
        ↓ &nbsp; three little questions await &nbsp; ↓
      </motion.p>
    </motion.section>
  );
}
