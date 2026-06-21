import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Disc3, Heart, Map, Disc } from 'lucide-react';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { moods } from '@/data/moods';

const NavBar = () => {
  const location = useLocation();
  const { getFavoritesCount } = useFavoritesStore();
  const count = getFavoritesCount();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="glass-panel rounded-2xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Disc3
                  size={28}
                  className="text-warm-300 group-hover:animate-vinyl-spin transition-all"
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-display text-warm-300 text-lg text-neon-warm leading-none">
                  深夜唱片行
                </div>
                <div className="font-hand text-warm-200/60 text-xs mt-0.5">
                  Midnight Record Store
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-1 md:gap-2">
              <Link
                to="/"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all text-sm md:text-base ${
                  isActive('/') && !location.pathname.startsWith('/map') && !location.pathname.startsWith('/shelves') && !location.pathname.startsWith('/record') && !location.pathname.startsWith('/favorites')
                    ? 'bg-warm-300/20 text-warm-300 border border-warm-300/30'
                    : 'text-warm-100/70 hover:text-warm-300 hover:bg-warm-300/10'
                }`}
              >
                <Home size={16} />
                <span className="hidden md:inline">街角</span>
              </Link>

              <Link
                to="/map"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all text-sm md:text-base ${
                  location.pathname.startsWith('/map')
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                    : 'text-warm-100/70 hover:text-neon-cyan hover:bg-neon-cyan/10'
                }`}
              >
                <Map size={16} />
                <span className="hidden md:inline">城市</span>
              </Link>

              <Link
                to="/albums"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all text-sm md:text-base ${
                  location.pathname.startsWith('/album')
                    ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30'
                    : 'text-warm-100/70 hover:text-neon-pink hover:bg-neon-pink/10'
                }`}
              >
                <Disc size={16} />
                <span className="hidden md:inline">专辑</span>
              </Link>

              <div className="hidden sm:flex items-center gap-0.5">
                {moods.slice(0, 2).map((m) => (
                  <Link
                    key={m.id}
                    to={`/shelves/${m.id}`}
                    className={`px-3 py-2 rounded-xl transition-all text-sm ${
                      location.pathname === `/shelves/${m.id}`
                        ? `${m.neonBorderClass} border bg-white/5 ${m.neonTextClass}`
                        : 'text-warm-100/70 hover:text-white hover:bg-white/5'
                    }`}
                    style={
                      location.pathname === `/shelves/${m.id}`
                        ? { color: m.neonColor }
                        : {}
                    }
                  >
                    {m.emoji} {m.name}
                  </Link>
                ))}
                <div className="relative group">
                  <button className="px-3 py-2 rounded-xl transition-all text-sm text-warm-100/70 hover:text-white hover:bg-white/5">
                    更多 ▾
                  </button>
                  <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="glass-panel rounded-xl p-2 min-w-[120px]">
                      {moods.slice(2).map((m) => (
                        <Link
                          key={m.id}
                          to={`/shelves/${m.id}`}
                          className="block px-3 py-2 rounded-lg text-sm text-warm-100/80 hover:bg-white/10 transition-colors"
                        >
                          {m.emoji} {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/favorites"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all text-sm md:text-base relative ${
                  isActive('/favorites')
                    ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30'
                    : 'text-warm-100/70 hover:text-neon-pink hover:bg-neon-pink/10'
                }`}
              >
                <Heart size={16} fill={isActive('/favorites') ? 'currentColor' : 'none'} />
                <span className="hidden md:inline">心情</span>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={count}
                    className="absolute -top-1 -right-1 bg-neon-pink text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ boxShadow: '0 0 8px rgba(255, 107, 157, 0.6)' }}
                  >
                    {count > 99 ? '99+' : count}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
