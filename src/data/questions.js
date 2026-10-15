// ============================================================
// EDIT THIS FILE to customize the questions and answers.
// Set `correct: true` on exactly ONE answer per question.
// ============================================================

export const questions = [
  {
    id: 1,
    question: "Nag ma-mop ka ng sahig tapos nakita mong natapon ko kape ko, ano gagawin mo?",
    answers: [
      { id: "1a", text: "Grigripuhin ako" },
      { id: "1b", text: "Sa labas matutulog", correct: true },
      { id: "1c", text: "Bago ka pa magalit is ikikiss kita" },
      { id: "1d", text: "Gigilitan mo leeg ko " },
    ],
    // The word this circle reveals at the final "I LOVE YOU" screen
    reveal: "I",
  },
  {
    id: 2,
    question: "Sino mas mahal mo?",
    answers: [
      { id: "2a", text: "Me" },
      { id: "2b", text: "Also Me" },
      { id: "2c", text: "Syempre ako uli", correct: true },
      { id: "2d", text: "Miki (wag mong subukan)." },
    ],
    reveal: "LOVE",
  },
  {
    id: 3,
    question: "Miss na kitaa :<",
    answers: [
      { id: "3a", text: "Di kita miss" },
      { id: "3b", text: "Miss na miss rin kita :<" },
      { id: "3c", text: "Okaur" },
      { id: "3d", text: "Kilala mo kung sino miss ko? Mi...ki..", correct: true },
    ],
    reveal: "YOU",
  },
];
