import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import NavBar from '@/components/layout/NavBar';
import FilmGrain, { FilmScratches } from '@/components/layout/FilmGrain';
import WarmLightOverlay from '@/components/layout/WarmLight';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ShelfPage = lazy(() => import('@/pages/ShelfPage'));
const RecordDetailPage = lazy(() => import('@/pages/RecordDetailPage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const CityMapPage = lazy(() => import('@/pages/CityMapPage'));
const AlbumTimelinePage = lazy(() => import('@/pages/AlbumTimelinePage'));
const AlbumDetailPage = lazy(() => import('@/pages/AlbumDetailPage'));
const ConcertTourPage = lazy(() => import('@/pages/ConcertTourPage'));
const ConcertDetailPage = lazy(() => import('@/pages/ConcertDetailPage'));
const LiveClipsPage = lazy(() => import('@/pages/LiveClipsPage'));
const ConcertStatsPage = lazy(() => import('@/pages/ConcertStatsPage'));
const SongGraphPage = lazy(() => import('@/pages/SongGraphPage'));
const StyleEvolutionPage = lazy(() => import('@/pages/StyleEvolutionPage'));
const MoodClusterPage = lazy(() => import('@/pages/MoodClusterPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="text-center">
      <div className="text-5xl mb-4 animate-warm-glow">🎵</div>
      <div className="font-hand text-warm-200/60 text-lg">加载中...</div>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-x-hidden">
        <NavBar />
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/song-graph" element={<SongGraphPage />} />
            <Route path="/style-evolution" element={<StyleEvolutionPage />} />
            <Route path="/mood-cluster" element={<MoodClusterPage />} />
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
        </Suspense>

        <WarmLightOverlay />
        <FilmGrain />
        <FilmScratches />
      </div>
    </Router>
  );
}
