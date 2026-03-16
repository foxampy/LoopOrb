"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { SimpleHeader } from "../components/SimpleNav";
import { WaterMascot, SpeechBubble } from "../components/WaterMascot";
import { Badge } from "../components/ProgressCard";

// Simple memory game
const waterEmojis = ["💧", "🌊", "🐟", "🦈", "🐠", "🐡", "🦀", "🐙"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function createCards(): Card[] {
  const pairs = [...waterEmojis, ...waterEmojis];
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
}

export default function SimplePlayPage() {
  const [cards, setCards] = useState<Card[]>(createCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleCardClick = (id: number) => {
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstCard = newCards.find((c) => c.id === first);
      const secondCard = newCards.find((c) => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          const newMatches = matches + 1;
          setMatches(newMatches);
          
          if (newMatches === waterEmojis.length) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <SimpleHeader title="Играем и учимся" />

      <div className="p-4">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 mb-6"
        >
          <WaterMascot size="small" emotion="excited" />
          <SpeechBubble>
            Найди пары водных животных! 🐠🐟
          </SpeechBubble>
        </motion.div>

        {/* Game Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{moves}</div>
            <div className="text-sm text-slate-500">Ходов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">{matches}</div>
            <div className="text-sm text-slate-500">Пар найдено</div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6 max-w-sm mx-auto">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isFlipped || card.isMatched ? 1 : 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all ${
                card.isMatched
                  ? "bg-green-200 border-2 border-green-400"
                  : card.isFlipped
                  ? "bg-white border-2 border-purple-400 shadow-md"
                  : "bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-transparent shadow-md"
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {card.emoji}
                </motion.span>
              ) : (
                <span className="text-white text-2xl">?</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors mb-6"
        >
          <RotateCcw size={20} />
          Начать заново
        </motion.button>

        {/* Game Complete Modal */}
        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 50 }}
                className="bg-white rounded-3xl p-6 max-w-sm w-full text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Поздравляем!
                </h2>
                <p className="text-slate-600 mb-4">
                  Ты нашёл все пары за {moves} ходов!
                </p>
                
                <Badge
                  icon="🏆"
                  name="Игрок"
                  description="Нашёл все пары в игре"
                  earned={true}
                  earnedDate="Сегодня"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-xl"
                >
                  Играть снова
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Sparkles size={20} className="text-amber-400" />
            Знаешь ли ты?
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">🐠</span>
              <span>Рыбы дышат кислородом, который растворён в воде</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">🦈</span>
              <span>Акулы существуют уже 400 миллионов лет!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">🐙</span>
              <span>У осьминога три сердца и голубая кровь</span>
            </li>
          </ul>
        </motion.div>

        {/* Spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
