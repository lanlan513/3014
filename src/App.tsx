import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from '@/pages/HomePage';
import ShelfPage from '@/pages/ShelfPage';
import RecordDetailPage from '@/pages/RecordDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import CityMapPage from '@/pages/CityMapPage';
import AlbumTimelinePage from '@/pages/AlbumTimelinePage';
import AlbumDetailPage from '@/pages/AlbumDetailPage';
import ConcertTourPage from '@/pages/ConcertTourPage';
import ConcertDetailPage from '@/pages/ConcertDetailPage';
import LiveClipsPage from '@/pages/LiveClipsPage';
import ConcertStatsPage from '@/pages/ConcertStatsPage';
import NavBar from '@/components/layout/NavBar';
import FilmGrain, { FilmScratches } from '@/components/layout/FilmGrain';
import WarmLightOverlay from '@/components/layout/WarmLight';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-x-hidden">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<CityMapPage />} />
            <Route path="/shelves/:mood" element={<ShelfPage />} />
            <Route path="/record/:id" element={<RecordDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/albums" element={<AlbumTimelinePage />} />
            <Route path="/album/:id" element={<AlbumDetailPage />} />
            <Route path="/concerts" element={<ConcertTourPage />} />
            <Route path="/concert/:id" element={<ConcertDetailPage />} />
            <Route path="/live-clips" element={<LiveClipsPage />} />
            <Route path="/concert-stats" element={<ConcertStatsPage />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center pt-20">
                  <div className="text-center">
                    <div className="text-7xl mb-6 animate-warm-glow">🎵</div>
                    <h2 className="font-display text-warm-100 text-2xl md:text-3xl mb-4">
                      唱片跑到别的轨道去了
                    </h2>
                    <a
                      href="/"
                      className="font-hand text-warm-300 hover:text-warm-200 text-lg"
                    >
                      ← 回到街角吧
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </AnimatePresence>

        <WarmLightOverlay />
        <FilmGrain />
        <FilmScratches />
      </div>
    </Router>
  );
}
