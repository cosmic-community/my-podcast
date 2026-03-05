import type { Metadata } from 'next';
import SeriesCard from '@/components/SeriesCard';
import { getSeries, getEpisodes } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Series | My Podcast',
  description: 'Explore our podcast series - curated collections of related episodes.',
};

export const revalidate = 60;

export default async function SeriesPage() {
  const [allSeries, episodes] = await Promise.all([getSeries(), getEpisodes()]);

  // Count episodes per series
  const seriesEpisodeCounts: Record<string, number> = {};
  for (const episode of episodes) {
    const seriesId = episode.metadata?.series?.id;
    if (seriesId) {
      seriesEpisodeCounts[seriesId] = (seriesEpisodeCounts[seriesId] ?? 0) + 1;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-podcast-600/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-podcast-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Series</h1>
        </div>
        <p className="text-dark-400 text-lg max-w-2xl">
          Discover our curated series - thoughtfully grouped episodes on specific topics and themes.
        </p>
      </div>

      {/* Series Grid */}
      {allSeries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allSeries.map((s) => (
            <SeriesCard
              key={s.id}
              series={s}
              episodeCount={seriesEpisodeCounts[s.id] ?? 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-dark-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No series yet</h3>
          <p className="text-dark-400">Series will appear here once created.</p>
        </div>
      )}
    </div>
  );
}