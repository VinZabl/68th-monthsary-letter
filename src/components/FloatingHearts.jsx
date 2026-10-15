/* ============================================================
   FloatingHearts — ambient background decoration
   ============================================================ */

const hearts = [
  { top: '8%',  left: '5%',  size: '0.7rem', dur: '7s',  delay: '0s'   },
  { top: '15%', left: '90%', size: '0.9rem', dur: '9s',  delay: '1.2s' },
  { top: '35%', left: '3%',  size: '0.55rem',dur: '6s',  delay: '2.5s' },
  { top: '55%', left: '93%', size: '0.75rem',dur: '8s',  delay: '0.8s' },
  { top: '75%', left: '7%',  size: '0.6rem', dur: '7.5s',delay: '3.1s' },
  { top: '85%', left: '85%', size: '0.8rem', dur: '6.5s',delay: '1.8s' },
  { top: '45%', left: '96%', size: '0.5rem', dur: '10s', delay: '4s'   },
  { top: '92%', left: '20%', size: '0.65rem',dur: '8.5s',delay: '0.3s' },
];

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            top: h.top,
            left: h.left,
            fontSize: h.size,
            '--duration': h.dur,
            '--delay': h.delay,
          }}
        >
          ♡
        </span>
      ))}
    </div>
  );
}
