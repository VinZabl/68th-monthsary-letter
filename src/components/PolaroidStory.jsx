/* ============================================================
   PolaroidStory.jsx — Story-like Polaroid photo stack before Intro
   Tap photo -> hearts burst -> card swipes away to the side ->
   advances to next photo -> transitions to IntroScreen after 3rd photo.
   ============================================================ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PolaroidStory.module.css';

const storyPhotos = [
  {
    id: 1,
    src: '/image1.png',
    caption: 'Our special moments... ♡',
    rotation: -3,
  },
  {
    id: 2,
    src: '/image2.png',
    caption: 'Every smile with you... ♡',
    rotation: 4,
  },
  {
    id: 3,
    src: '/image3.png',
    caption: '68 months and counting... ♡',
    rotation: -2,
  },
];

export default function PolaroidStory({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(1); // 1 = right, -1 = left

  const handleTap = (e) => {
    // Spawn floating heart particles at tap coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 60,
      size: Math.random() * 14 + 16,
      angle: (Math.random() - 0.5) * 40,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    // Alternate swipe directions
    setSwipeDirection((prev) => (prev === 1 ? -1 : 1));

    // After animation delay, advance to next or finish
    setTimeout(() => {
      if (currentIndex < storyPhotos.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onFinish();
      }
    }, 280);
  };

  const currentPhoto = storyPhotos[currentIndex];

  return (
    <motion.section
      className={styles.storySection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      aria-label="Polaroid Memories"
    >
      {/* Top indicator dots / story bars */}
      <div className={styles.storyBars}>
        {storyPhotos.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.bar} ${idx <= currentIndex ? styles.barActive : ''}`}
          />
        ))}
      </div>

      <div className={styles.hintContainer}>
        <span className={styles.tapPrompt}>tap anywhere, my love ♡</span>
      </div>

      {/* Main card stack area */}
      <div className={styles.cardArea}>
        <AnimatePresence mode="popLayout" custom={swipeDirection}>
          <motion.div
            key={currentPhoto.id}
            custom={swipeDirection}
            className={styles.polaroidCard}
            onClick={handleTap}
            initial={(dir) => ({
              opacity: 0,
              scale: 0.88,
              y: 40,
              rotate: currentPhoto.rotation,
            })}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: currentPhoto.rotation,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={(dir) => ({
              x: dir * 420,
              rotate: dir * 25,
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.4, ease: 'easeIn' },
            })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Polaroid frame */}
            <div className={styles.photoWrapper}>
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                className={styles.photoImg}
                draggable="false"
              />
            </div>
            <div className={styles.cardFooter}>
              <p className={styles.caption}>{currentPhoto.caption}</p>
              <span className={styles.footerHeart}>♥</span>
            </div>

            {/* Click Tulip Burst Effects */}
            {hearts.map((h) => (
              <motion.span
                key={h.id}
                className={styles.clickHeart}
                style={{
                  left: h.x,
                  top: h.y,
                  fontSize: `${h.size}px`,
                }}
                initial={{ opacity: 1, scale: 0.6, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.6,
                  y: -90,
                  x: (Math.random() - 0.5) * 50,
                  rotate: h.angle,
                }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                🌷
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
