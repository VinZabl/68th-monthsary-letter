/* ============================================================
   App.jsx — Main application, screen orchestration
   ============================================================ */
import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts   from './components/FloatingHearts.jsx';
import PolaroidStory    from './components/PolaroidStory.jsx';
import IntroScreen      from './components/IntroScreen.jsx';
import QuestionGame     from './components/QuestionGame.jsx';
import QuestionSummary  from './components/QuestionSummary.jsx';
import LoveReveal       from './components/LoveReveal.jsx';
import LoveLetter       from './components/LoveLetter.jsx';
import './index.css';

// Application screens in order:
// Story (Polaroids) -> Intro -> Game -> Summary (Screenshot) -> Reveal ("I LOVE YOU") -> Letter
const SCREENS = {
  STORY:    'story',
  INTRO:    'intro',
  GAME:     'game',
  SUMMARY:  'summary',
  REVEAL:   'reveal',
  LETTER:   'letter',
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.STORY);
  const [answersSummary, setAnswersSummary] = useState([]);

  // Preload all reaction GIFs as soon as the app mounts
  useEffect(() => {
    const gifList = [
      '/crying dude.gif',
      '/yes-lets-go.gif',
      '/angry dog.gif',
      '/choking dude.gif',
      '/yamete.gif',
    ];
    gifList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const goTo = useCallback((next) => setScreen(next), []);

  const handleGameComplete = useCallback((summary) => {
    setAnswersSummary(summary);
    setScreen(SCREENS.SUMMARY);
  }, []);

  const handleReset = useCallback(() => {
    // Reset back to story screen
    setAnswersSummary([]);
    setScreen(SCREENS.STORY);
  }, []);

  return (
    <>
      {/* Ambient floating hearts (visible on all screens except letter overlay) */}
      {screen !== SCREENS.LETTER && <FloatingHearts />}

      <main>
        <AnimatePresence mode="wait">
          {screen === SCREENS.STORY && (
            <PolaroidStory
              key="story"
              onFinish={() => goTo(SCREENS.INTRO)}
            />
          )}

          {screen === SCREENS.INTRO && (
            <IntroScreen
              key="intro"
              onStart={() => goTo(SCREENS.GAME)}
            />
          )}

          {screen === SCREENS.GAME && (
            <QuestionGame
              key="game"
              onComplete={handleGameComplete}
            />
          )}

          {screen === SCREENS.SUMMARY && (
            <QuestionSummary
              key="summary"
              answersSummary={answersSummary}
              onContinue={() => goTo(SCREENS.REVEAL)}
            />
          )}

          {screen === SCREENS.REVEAL && (
            <LoveReveal
              key="reveal"
              onLetterOpen={() => goTo(SCREENS.LETTER)}
            />
          )}
        </AnimatePresence>

        {/* Letter renders on top via fixed overlay */}
        <AnimatePresence>
          {screen === SCREENS.LETTER && (
            <LoveLetter
              key="letter"
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
