import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Heart, User, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { MapLocation } from '@/data/cityMap';
import { getMoodById } from '@/data/moods';
import { getRecordById } from '@/data/records';
import type { Record } from '@/data/records';

interface LocationModalProps {
  location: MapLocation | null;
  onClose: () => void;
}

export default function LocationModal({ location, onClose }: LocationModalProps) {
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [memoryAuthor, setMemoryAuthor] = useState('');
  const [memoryContent, setMemoryContent] = useState('');
  const [localMemories, setLocalMemories] = useState(location?.memories || []);

  if (!location) return null;

  const mood = getMoodById(location.mood);
  const associatedRecords: Record[] = location.associatedRecords
    .map((id) => getRecordById(id))
    .filter((r): r is Record => r !== undefined);

  const handleSubmitMemory = () => {
    if (!memoryAuthor.trim() || !memoryContent.trim()) return;
    const newMemory = {
      id: `local-${Date.now()}`,
      author: memoryAuthor,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      content: memoryContent,
    };
    setLocalMemories([newMemory, ...localMemories]);
    setMemoryAuthor('');
    setMemoryContent('');
    setShowMemoryForm(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass-panel rounded-3xl overflow-hidden border border-warm-300/20">
            <div
              className="relative h-56 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${mood?.neonColor}40 0%, transparent 70%), radial-gradient(ellipse at 30% 30%, ${mood?.neonColor}30 0%, transparent 50%), linear-gradient(180deg, #1a1410 0%, #0d0a08 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-film-grain opacity-30" />
              <div className="absolute top-6 right-6">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-night-300/80 border border-warm-300/30 flex items-center justify-center text-warm-100 hover:bg-night-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative h-full flex flex-col justify-end p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl border-2"
                    style={{
                      borderColor: mood?.neonColor,
                      boxShadow: `0 0 20px ${mood?.neonColor}50`,
                      background: `${mood?.neonColor}15`,
                    }}
                  >
                    {location.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl text-warm-100">
                      {location.name}
                    </h2>
                    <p className="font-hand text-warm-300 text-lg mt-1">
                      {location.subtitle}
                    </p>
                  </div>
                </motion.div>
                {mood && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
                    style={{
                      borderColor: `${mood.neonColor}60`,
                      background: `${mood.neonColor}15`,
                      color: mood.neonColor,
                      width: 'fit-content',
                    }}
                  >
                    <span className="text-lg">{mood.emoji}</span>
                    <span className="font-hand">{mood.name}</span>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <h3 className="font-display text-warm-300 text-lg mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-warm-300 rounded-full" />
                  关于这里
                </h3>
                <p className="text-warm-100/80 leading-relaxed text-lg">
                  {location.description}
                </p>
                {mood?.quote && (
                  <blockquote
                    className="mt-5 pl-6 border-l-4 py-2 italic text-warm-200"
                    style={{ borderColor: mood.neonColor }}
                  >
                    「{mood.quote}」
                  </blockquote>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-display text-warm-300 text-lg mb-4 flex items-center gap-2">
                  <Music size={18} />
                  这里的歌曲
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {associatedRecords.map((record, idx) => (
                    <motion.div
                      key={record.id}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.45 + idx * 0.1 }}
                    >
                      <Link
                        to={`/record/${record.id}`}
                        className="block group"
                        onClick={onClose}
                      >
                        <div className="flex gap-4 p-4 rounded-2xl border border-warm-300/10 hover:border-warm-300/30 bg-night-300/40 hover:bg-night-200/60 transition-all">
                          <div
                            className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl"
                            style={{
                              background: `linear-gradient(135deg, ${record.coverColors[0]}, ${record.coverColors[1]})`,
                            }}
                          >
                            {record.coverEmoji}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-display text-warm-100 text-lg truncate group-hover:text-warm-300 transition-colors">
                              {record.title}
                            </h4>
                            <p className="font-hand text-warm-200/60 text-sm">
                              {record.album} · {record.year}
                            </p>
                            <p className="text-warm-100/50 text-xs mt-1 line-clamp-2">
                              {record.lyricQuote}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-warm-300 text-lg flex items-center gap-2">
                    <Heart size={18} />
                    人们的回忆
                    <span className="text-warm-200/50 text-sm font-hand">
                      ({localMemories.length})
                    </span>
                  </h3>
                  <button
                    onClick={() => setShowMemoryForm(!showMemoryForm)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-hand transition-all"
                    style={{
                      background: showMemoryForm ? `${mood?.neonColor}20` : 'transparent',
                      color: mood?.neonColor,
                      border: `1px solid ${mood?.neonColor}40`,
                    }}
                  >
                    <Plus size={16} />
                    写下你的回忆
                  </button>
                </div>

                {showMemoryForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-5 p-5 rounded-2xl border border-warm-300/20 bg-night-300/50"
                  >
                    <input
                      type="text"
                      value={memoryAuthor}
                      onChange={(e) => setMemoryAuthor(e.target.value)}
                      placeholder="你的名字（可以匿名）"
                      className="w-full px-4 py-3 rounded-xl bg-night-500/50 border border-warm-300/20 text-warm-100 placeholder-warm-200/30 focus:outline-none focus:border-warm-300/50 mb-3"
                    />
                    <textarea
                      value={memoryContent}
                      onChange={(e) => setMemoryContent(e.target.value)}
                      placeholder="在这里写下属于你的故事..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-night-500/50 border border-warm-300/20 text-warm-100 placeholder-warm-200/30 focus:outline-none focus:border-warm-300/50 resize-none mb-4"
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowMemoryForm(false)}
                        className="px-5 py-2 rounded-xl text-warm-200/60 hover:text-warm-100 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleSubmitMemory}
                        className="px-6 py-2 rounded-xl font-hand transition-all"
                        style={{
                          background: mood?.neonColor,
                          color: '#0d0a08',
                        }}
                      >
                        分享回忆
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {localMemories.map((memory, idx) => (
                    <motion.div
                      key={memory.id}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.55 + idx * 0.08 }}
                      className="p-5 rounded-2xl bg-night-300/40 border border-warm-300/10 relative"
                    >
                      <div
                        className="absolute -top-2 left-5 w-10 h-4 rounded-b-lg opacity-50"
                        style={{ background: mood?.neonColor }}
                      />
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                            style={{
                              background: `${mood?.neonColor}20`,
                              color: mood?.neonColor,
                            }}
                          >
                            <User size={14} />
                          </div>
                          <span className="font-display text-warm-100">
                            {memory.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-warm-200/40 text-sm">
                          <Calendar size={12} />
                          {memory.date}
                        </div>
                      </div>
                      <p className="text-warm-100/80 leading-relaxed font-hand text-lg">
                        {memory.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
