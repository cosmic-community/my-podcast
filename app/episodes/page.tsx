import type { Metadata } from 'next';
import EpisodeCard from '@/components/EpisodeCard';
import { getEpisodes } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'All Episodes | My Podcast',
  description: 'Browse all podcast episodes with show notes, guest info, and audio.',
};

export const revalidate = 60;

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-podcast-600/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-podcast-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">All Episodes</h1>
        </div>
        <p className="text-dark-400 text-lg max-w-2xl">
          Explore our full catalog of {episodes.length} episode{episodes.length !== 1 ? 's' : ''}. Each one packed with insights, stories, and engaging conversation.
        </p>
      </div>

      {/* Episodes Grid */}
      {episodes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-dark-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No episodes yet</h3>
          <p className="text-dark-400">Check back soon for new episodes!</p>
        </div>
      )}
    </div>
  );
}