import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Network,
  Search,
  Music,
  UserPen,
  UserCog2,
  Disc,
  Sparkles,
  X,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Filter,
} from 'lucide-react';
import {
  buildSongGraph,
  songDetails,
  getRelatedSongs,
  getSongById,
  type GraphNode,
  type SongDetail,
} from '@/data/songRelations';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

type FilterType = 'all' | 'song' | 'lyricist' | 'composer' | 'album' | 'style';

const typeIcons: Record<string, typeof Music> = {
  song: Music,
  lyricist: UserPen,
  composer: UserCog2,
  album: Disc,
  style: Sparkles,
};

const typeLabels: Record<string, string> = {
  song: '歌曲',
  lyricist: '作词人',
  composer: '作曲人',
  album: '专辑',
  style: '风格',
  theme: '主题',
};

const typeColors: Record<string, string> = {
  song: '#f5e6c8',
  lyricist: '#ff6b9d',
  composer: '#4ecdc4',
  album: '#f4c542',
  style: '#a855f7',
};

const typeEmoji: Record<string, string> = {
  song: '🎵',
  lyricist: '✍️',
  composer: '🎹',
  album: '💿',
  style: '✨',
  theme: '💭',
};

export default function SongGraphPage() {
  const { nodes: initialNodes, edges } = useMemo(() => buildSongGraph(), []);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(
    new Set(['all'])
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const { isLowPerf, animationEnabled } = usePerformanceMode();

  const layoutedNodes = useMemo(() => {
    const width = 900;
    const height = 700;
    const centerX = width / 2;
    const centerY = height / 2;

    const groups: Record<string, GraphNode[]> = {};
    initialNodes.forEach((node) => {
      const key = node.type;
      if (!groups[key]) groups[key] = [];
      groups[key].push(node);
    });

    const typeAngles: Record<string, number> = {
      song: 0,
      lyricist: -120,
      composer: 120,
      album: -60,
      style: 60,
    };

    const typeRadii: Record<string, number> = {
      song: 0,
      lyricist: 260,
      composer: 260,
      album: 140,
      style: 140,
    };

    return initialNodes.map((node) => {
      const group = groups[node.type];
      const idx = group.indexOf(node);
      const total = group.length;

      if (node.type === 'song') {
        const angleStep = (2 * Math.PI) / Math.max(total, 1);
        const baseRadius = 60 + (idx % 3) * 50;
        const angle = idx * angleStep + (Math.random() - 0.5) * 0.3;
        return {
          ...node,
          x: centerX + Math.cos(angle) * baseRadius,
          y: centerY + Math.sin(angle) * baseRadius,
        };
      }

      const baseAngle = (typeAngles[node.type] * Math.PI) / 180;
      const spread = 80;
      const radius = typeRadii[node.type];
      const offsetIdx = idx - Math.floor(total / 2);
      const perpAngle = baseAngle + Math.PI / 2;

      return {
        ...node,
        x:
          centerX +
          Math.cos(baseAngle) * radius +
          Math.cos(perpAngle) * offsetIdx * (spread / Math.max(total, 1)),
        y:
          centerY +
          Math.sin(baseAngle) * radius +
          Math.sin(perpAngle) * offsetIdx * (spread / Math.max(total, 1)),
      };
    });
  }, [initialNodes]);

  const visibleNodes = useMemo(() => {
    return layoutedNodes.filter((node) => {
      const filterMatch =
        activeFilters.has('all') || activeFilters.has(node.type as FilterType);
      const searchMatch =
        !searchTerm ||
        node.name.toLowerCase().includes(searchTerm.toLowerCase());
      return filterMatch && searchMatch;
    });
  }, [layoutedNodes, activeFilters, searchTerm]);

  const visibleNodeIds = useMemo(
    () => new Set(visibleNodes.map((n) => n.id)),
    [visibleNodes]
  );

  const visibleEdges = useMemo(() => {
    return edges.filter(
      (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
    );
  }, [edges, visibleNodeIds]);

  const highlightedEdges = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const ids = new Set<string>();
    edges.forEach((e) => {
      if (e.source === selectedNode.id || e.target === selectedNode.id) {
        ids.add(`${e.source}-${e.target}`);
      }
    });
    return ids;
  }, [selectedNode, edges]);

  const connectedNodes = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const ids = new Set<string>([selectedNode.id]);
    edges.forEach((e) => {
      if (e.source === selectedNode.id) ids.add(e.target);
      if (e.target === selectedNode.id) ids.add(e.source);
    });
    return ids;
  }, [selectedNode, edges]);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (filter === 'all') {
        return new Set(['all']);
      }
      next.delete('all');
      if (next.has(filter)) {
        if (next.size === 1) return new Set(['all']);
        next.delete(filter);
      } else {
        next.add(filter);
      }
      if (next.size === 0) return new Set(['all']);
      return next;
    });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.min(Math.max(0.4, z * delta), 2.5));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const selectedSongId = selectedNode?.type === 'song' ? selectedNode.id.replace('song-', '') : null;
  const relatedForPanel = selectedSongId ? getRelatedSongs(selectedSongId, 6) : [];

  const filterOptions: { id: FilterType; label: string; icon: typeof Music }[] = [
    { id: 'all', label: '全部', icon: Network },
    { id: 'song', label: '歌曲', icon: Music },
    { id: 'lyricist', label: '作词', icon: UserPen },
    { id: 'composer', label: '作曲', icon: UserCog2 },
    { id: 'album', label: '专辑', icon: Disc },
    { id: 'style', label: '风格', icon: Sparkles },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 30% 0%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 70%, rgba(255, 107, 157, 0.08) 0%, transparent 40%),
                      radial-gradient(ellipse at 20% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 40%),
                      linear-gradient(180deg, #14100c 0%, #0d0a08 100%)`,
        }}
      />

      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="text-5xl md:text-6xl animate-warm-glow">🕸️</div>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-4">
            歌曲关系图谱
          </h1>
          <p className="font-hand text-warm-200/60 text-base md:text-lg max-w-2xl mx-auto">
            探索每首歌背后的制作人故事，从作词人、作曲人到专辑，发现隐藏的音乐脉络
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="wooden-frame rounded-2xl p-4 md:p-5 mb-6"
        >
          <div className="glass-panel rounded-xl p-4 md:p-5">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-300/50"
                />
                <input
                  type="text"
                  placeholder="搜索歌曲、作词人、作曲人、专辑或风格..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-night-500/50 border border-warm-500/10 text-warm-100 placeholder-warm-200/30 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={16} className="text-warm-300/60 ml-2" />
                {filterOptions.map((opt) => {
                  const Icon = opt.icon;
                  const active = activeFilters.has(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleFilter(opt.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        active
                          ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40'
                          : 'text-warm-100/60 hover:text-warm-100 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon size={14} />
                      <span className="hidden sm:inline">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-warm-500/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 flex-wrap">
                {Object.entries(typeLabels).slice(0, 5).map(([type, label]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: typeColors[type],
                        boxShadow: `0 0 6px ${typeColors[type]}66`,
                      }}
                    />
                    <span className="font-hand text-warm-200/50 text-xs">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoom((z) => Math.min(2.5, z * 1.2))}
                  className="p-2 rounded-lg bg-night-500/50 text-warm-200/60 hover:text-warm-100 hover:bg-white/10 transition-all"
                  title="放大"
                >
                  <ZoomIn size={16} />
                </button>
                <div className="font-display text-warm-200/50 text-xs w-12 text-center">
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={() => setZoom((z) => Math.max(0.4, z / 1.2))}
                  className="p-2 rounded-lg bg-night-500/50 text-warm-200/60 hover:text-warm-100 hover:bg-white/10 transition-all"
                  title="缩小"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  onClick={resetView}
                  className="p-2 rounded-lg bg-night-500/50 text-warm-200/60 hover:text-warm-100 hover:bg-white/10 transition-all ml-1"
                  title="重置视图"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-3 wooden-frame rounded-2xl p-4 md:p-5"
          >
            <div
              ref={canvasRef}
              className="glass-panel rounded-xl overflow-hidden relative cursor-grab active:cursor-grabbing"
              style={{ height: '620px' }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at center, rgba(244, 197, 66, 0.03) 0%, transparent 70%)`,
                }}
              />

              <svg
                viewBox="0 0 900 700"
                className="w-full h-full"
                style={{
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                }}
              >
                <defs>
                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f4c542" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f4c542" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {visibleEdges.map((edge, i) => {
                  const source = visibleNodes.find((n) => n.id === edge.source);
                  const target = visibleNodes.find((n) => n.id === edge.target);
                  if (!source || !target) return null;
                  const isHighlighted = highlightedEdges.has(
                    `${edge.source}-${edge.target}`
                  );
                  const dimmed = selectedNode && !isHighlighted;

                  return (
                    <line
                      key={`edge-${i}`}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={
                        isHighlighted ? '#f4c542' : 'rgba(244, 197, 66, 0.15)'
                      }
                      strokeWidth={isHighlighted ? 2 : 1}
                      opacity={dimmed ? 0.08 : isHighlighted ? 0.9 : 0.35}
                      style={{
                        filter: isHighlighted
                          ? 'drop-shadow(0 0 4px rgba(244, 197, 66, 0.5))'
                          : 'none',
                        transition: 'opacity 0.2s ease-out, stroke 0.2s ease-out',
                      }}
                    />
                  );
                })}

                {visibleNodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isHovered = hoveredNode?.id === node.id;
                  const isConnected = connectedNodes.has(node.id);
                  const dimmed =
                    selectedNode && !isSelected && !isConnected;
                  const scale = isSelected ? 1.2 : isHovered ? 1.1 : 1;
                  const emoji = typeEmoji[node.type] || '🎵';

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNode(isSelected ? null : node);
                      }}
                      style={{ cursor: 'pointer' }}
                      className="graph-node"
                    >
                      {(isSelected || isHovered) && (
                        <circle
                          r={node.size + 14}
                          fill="url(#nodeGlow)"
                          opacity={0.8}
                          style={{ transition: 'opacity 0.2s ease-out' }}
                        />
                      )}

                      <circle
                        r={node.size * scale}
                        fill={node.color + '33'}
                        stroke={node.color}
                        strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                        opacity={dimmed ? 0.2 : 1}
                        style={{
                          filter:
                            isSelected || isHovered
                              ? `drop-shadow(0 0 8px ${node.color}88)`
                              : 'none',
                          transition: 'all 0.15s ease-out',
                        }}
                      />

                      <circle
                        r={node.size * 0.55 * scale}
                        fill={node.color + '66'}
                        opacity={dimmed ? 0.15 : 0.9}
                        style={{ transition: 'all 0.15s ease-out' }}
                      />

                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={Math.max(node.size * 0.7, 10)}
                        opacity={dimmed ? 0.3 : 1}
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {emoji}
                      </text>

                      {(!isLowPerf || isHovered || isSelected || node.size >= 24) && (
                        <text
                          y={node.size + 14}
                          textAnchor="middle"
                          fill={isSelected ? node.color : '#f5e6c8'}
                          fontSize={node.size >= 24 ? 11 : 9}
                          fontWeight={isSelected ? 700 : 500}
                          opacity={dimmed ? 0.2 : isHovered || isSelected ? 0.9 : 0.6}
                          className="font-display pointer-events-none select-none"
                          style={{ transition: 'opacity 0.2s ease-out' }}
                        >
                          {node.name.length > 8
                            ? node.name.slice(0, 7) + '…'
                            : node.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {selectedNode && (
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-night-500/80 text-warm-200/60 hover:text-warm-100 hover:bg-white/20 transition-all"
                >
                  <X size={16} />
                </button>
              )}

              {visibleNodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="font-hand text-warm-200/50">
                      没有找到匹配的节点，试试调整搜索词或筛选条件
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="wooden-frame rounded-2xl p-4 md:p-5">
              <div className="glass-panel rounded-xl p-4 md:p-5 h-full">
                {selectedNode ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedNode.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: selectedNode.color + '33',
                            border: `2px solid ${selectedNode.color}`,
                            boxShadow: `0 0 12px ${selectedNode.color}44`,
                          }}
                        >
                          {(() => {
                            const Icon =
                              typeIcons[selectedNode.type] || Music;
                            return <Icon size={22} color={selectedNode.color} />;
                          })()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="font-hand text-xs mb-1"
                            style={{ color: selectedNode.color }}
                          >
                            {typeLabels[selectedNode.type] || selectedNode.type}
                          </div>
                          <h3 className="font-display text-xl text-warm-100 truncate">
                            {selectedNode.name}
                          </h3>
                        </div>
                      </div>

                      {selectedNode.type === 'song' && (() => {
                        const songId = selectedNode.id.replace('song-', '');
                        const song = getSongById(songId);
                        if (!song) return null;
                        return (
                          <div className="space-y-3">
                            <div
                              className="p-3 rounded-xl"
                              style={{
                                background: `linear-gradient(135deg, ${song.coverColors[0]}33, ${song.coverColors[1]}22)`,
                                border: `1px solid ${song.coverColors[0]}44`,
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-3xl">{song.coverEmoji}</div>
                                <div className="flex-1">
                                  <div className="font-hand text-warm-200/60 text-xs">
                                    {song.year} · {song.album}
                                  </div>
                                  <div className="font-display text-warm-100 text-sm">
                                    《{song.title}》
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t border-white/10">
                                <p className="font-hand text-warm-200/70 text-sm italic">
                                  "{song.lyricQuote}"
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {song.style.map((st) => (
                                <span
                                  key={st}
                                  className="px-2 py-1 rounded-md text-xs font-hand text-neon-cyan"
                                  style={{
                                    backgroundColor: 'rgba(78, 205, 196, 0.12)',
                                    border: '1px solid rgba(78, 205, 196, 0.3)',
                                  }}
                                >
                                  {st}
                                </span>
                              ))}
                              {song.themes.map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-1 rounded-md text-xs font-hand text-neon-pink"
                                  style={{
                                    backgroundColor: 'rgba(255, 107, 157, 0.12)',
                                    border: '1px solid rgba(255, 107, 157, 0.3)',
                                  }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="p-2 rounded-lg bg-night-500/40">
                                <span className="font-hand text-warm-200/50">
                                  作词：
                                </span>
                                <span className="font-display text-neon-pink">
                                  {song.lyricist}
                                </span>
                              </div>
                              <div className="p-2 rounded-lg bg-night-500/40">
                                <span className="font-hand text-warm-200/50">
                                  作曲：
                                </span>
                                <span className="font-display text-neon-cyan">
                                  {song.composer}
                                </span>
                              </div>
                            </div>

                            <Link
                              to={`/record/${songId}`}
                              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-neon-purple/30 to-neon-pink/30 border border-neon-purple/40 text-neon-purple hover:from-neon-purple/40 hover:to-neon-pink/40 transition-all"
                            >
                              <span className="font-display text-sm">
                                查看歌曲详情
                              </span>
                              <ChevronRight size={16} />
                            </Link>
                          </div>
                        );
                      })()}

                      <div className="mt-4 pt-4 border-t border-warm-500/10">
                        <div className="font-hand text-warm-200/50 text-xs mb-2">
                          关联数量
                        </div>
                        <div className="font-display text-2xl text-warm-100">
                          {Array.from(connectedNodes).length - 1}
                          <span className="text-sm font-hand text-warm-200/40 ml-2">
                            个节点
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3 opacity-50">🎵</div>
                    <p className="font-hand text-warm-200/50 text-sm">
                      点击图谱中的任意节点
                      <br />
                      查看详细信息和关联关系
                    </p>
                  </div>
                )}
              </div>
            </div>

            {relatedForPanel.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="wooden-frame rounded-2xl p-4 md:p-5"
              >
                <div className="glass-panel rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-neon-warm/20 flex items-center justify-center">
                      <Network size={14} className="text-neon-warm" />
                    </div>
                    <h3 className="font-display text-lg text-warm-100">
                      相关作品推荐
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {relatedForPanel.map((item, i) => (
                      <Link
                        key={item.song.id}
                        to={`/record/${item.song.id}`}
                        className="block p-2.5 rounded-lg bg-night-500/40 hover:bg-night-500/60 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-xl">{item.song.coverEmoji}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display text-warm-100 text-sm truncate group-hover:text-neon-warm transition-colors">
                              {i + 1}.《{item.song.title}》
                            </div>
                            <div className="font-hand text-warm-200/40 text-xs truncate">
                              {item.reasons.slice(0, 2).join(' / ')}
                            </div>
                          </div>
                          <ChevronRight
                            size={14}
                            className="text-warm-200/30 group-hover:text-neon-warm opacity-0 group-hover:opacity-100 transition-all"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="wooden-frame rounded-2xl p-4 md:p-5"
            >
              <div className="glass-panel rounded-xl p-4 md:p-5">
                <h3 className="font-display text-lg text-warm-100 mb-3">
                  📊 快速导航
                </h3>
                <div className="space-y-2">
                  {songDetails.slice(0, 5).map((song) => (
                    <button
                      key={song.id}
                      onClick={() => {
                        const node = layoutedNodes.find(
                          (n) => n.id === `song-${song.id}`
                        );
                        if (node) {
                          setSelectedNode(node);
                        }
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-lg text-left hover:bg-white/5 transition-all"
                    >
                      <span className="text-lg">{song.coverEmoji}</span>
                      <span className="font-hand text-warm-200/70 text-sm">
                        {song.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
