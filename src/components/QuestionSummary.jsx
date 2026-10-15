/* ============================================================
   QuestionSummary.jsx — Shows the questions and user's answers
   Header: "Screenshot this and send it to me ♡"
   Button to proceed to the I LOVE YOU circles & envelope
   ============================================================ */
import { motion } from 'framer-motion';
import styles from './QuestionSummary.module.css';

export default function QuestionSummary({ answersSummary, onContinue }) {
  return (
    <motion.section
      className={styles.summarySection}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Answers Summary"
    >
      {/* Screenshot prompt header */}
      <div className={styles.headerBlock}>
        <motion.p
          className={styles.promptNotice}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Screenshot this and send it to me
        </motion.p>
        <h2 className={styles.title}>Your Answers ♡</h2>
      </div>

      {/* Summary Card with all questions and answers */}
      <motion.div
        className={styles.summaryCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.55 }}
      >
        <div className={styles.cardHeader}>
          <span>68th Monthsary Quiz</span>
          <span>♡</span>
        </div>

        <div className={styles.itemsList}>
          {answersSummary.map((item, idx) => (
            <motion.div
              key={idx}
              className={styles.summaryItem}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + idx * 0.15, duration: 0.4 }}
            >
              <div className={styles.qHeader}>
                <span className={styles.qNum}>Q{idx + 1}</span>
                <p className={styles.questionText}>{item.question}</p>
              </div>
              <div className={styles.answerBox}>
                <span className={styles.checkIcon}>✔</span>
                <p className={styles.answerText}>{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.footerNote}>Recorded with love & giggles ♡</span>
        </div>
      </motion.div>

      {/* Button to proceed to the next surprise */}
      <motion.div
        className={styles.actionBlock}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <motion.button
          className={styles.continueBtn}
          onClick={onContinue}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(139, 50, 82, 0.28)' }}
          whileTap={{ scale: 0.96 }}
        >
          See what's next ♡
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
