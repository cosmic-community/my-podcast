import Link from 'next/link';
import EpisodeCard from '@/components/EpisodeCard';
import SeriesCard from '@/components/SeriesCard';
import GuestCard from '@/components/GuestCard';
import { getEpisodes, getSeries, getGuests } from '@/lib/cosmic';

export const revalidate = 60;

export default async function HomePage() {
  const [episodes, allSeries, guests] = await Promise.all([
    getEpisodes(),
    getSeries(),
    getGuests(),
  ]);

  const latestEpisodes = episodes.slice(0, 3);
  const featuredSeries = allSeries.slice(0, 3);
  const featuredGuests = guests.slice(0, 4);

  const latestEpisode = episodes[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-podcast-950/50 via-dark-950 to-dark-950" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-podcast-600 rounded-full blur-[128px]" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-podcast-400 rounded-full blur-[96px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-podcast-500/10 border border-podcast-500/20 text-podcast-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-podcast-400 animate-pulse" />
              {episodes.length > 0 ? `${episodes.length} episodes available` : 'New episodes coming soon'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-podcast-400 to-podcast-200">
                My Podcast
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-dark-300 leading-relaxed mb-8 max-w-2xl">
              Engaging conversations, inspiring stories, and thought-provoking discussions delivered straight to your ears. Dive in and discover something new.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/episodes"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-podcast-600 hover:bg-podcast-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-podcast-600/25 hover:shadow-podcast-500/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Browse Episodes
              </Link>
              <Link
                href="/series"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-dark-800 hover:bg-dark-700 text-white font-semibold transition-colors border border-dark-700"
              >
                Explore Series
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episode Feature */}
      {latestEpisode && (
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-podcast-500 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Latest Episode</h2>
            </div>
            <Link
              href={`/episodes/${latestEpisode.slug}`}
              className="group block rounded-2xl bg-dark-900/60 border border-dark-800/50 hover:border-podcast-500/30 overflow-hidden transition-all duration-300 glow-effect-hover"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-80 lg:w-96 aspect-square md:aspect-auto flex-shrink-0 overflow-hidden">
                  {latestEpisode.metadata?.cover_image?.imgix_url ? (
                    <img
                      src={`${latestEpisode.metadata.cover_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                      alt={latestEpisode.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full min-h-[240px] bg-gradient-to-br from-podcast-600 to-podcast-900 flex items-center justify-center">
                      <svg className="w-20 h-20 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      </svg>
                    </div>
                  )}
                  {latestEpisode.metadata?.audio_url && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                      <div className="w-16 h-16 rounded-full bg-podcast-600 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    {latestEpisode.metadata?.episode_number != null && (
                      <span className="px-3 py-1 rounded-lg bg-podcast-600/20 text-podcast-300 text-xs font-bold">
                        EP {latestEpisode.metadata.episode_number}
                      </span>
                    )}
                    {latestEpisode.metadata?.series?.title && (
                      <span className="text-xs text-dark-400 font-medium">
                        {latestEpisode.metadata.series.title}
                      </span>
                    )}
                    {latestEpisode.metadata?.publish_date && (
                      <span className="text-xs text-dark-500">
                        {new Date(latestEpisode.metadata.publish_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-podcast-300 transition-colors mb-3">
                    {latestEpisode.title}
                  </h3>
                  {latestEpisode.metadata?.description && (
                    <p className="text-dark-400 leading-relaxed line-clamp-3">
                      {latestEpisode.metadata.description}
                    </p>
                  )}
                  {latestEpisode.metadata?.guests && Array.isArray(latestEpisode.metadata.guests) && latestEpisode.metadata.guests.length > 0 && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-dark-500">Featuring:</span>
                      <div className="flex flex-wrap gap-2">
                        {latestEpisode.metadata.guests.map((guest) => (
                          <span
                            key={guest.id}
                            className="px-2 py-0.5 rounded-md bg-dark-800 text-dark-300 text-xs font-medium"
                          >
                            {guest.metadata?.name || guest.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Episodes Grid */}
      {latestEpisodes.length > 1 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-podcast-500 rounded-full" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Recent Episodes</h2>
              </div>
              <Link
                href="/episodes"
                className="text-sm font-medium text-podcast-400 hover:text-podcast-300 transition-colors flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestEpisodes.slice(0, 3).map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Series Section */}
      {featuredSeries.length > 0 && (
        <section className="py-16 sm:py-20 bg-dark-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-podcast-500 rounded-full" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Series</h2>
              </div>
              <Link
                href="/series"
                className="text-sm font-medium text-podcast-400 hover:text-podcast-300 transition-colors flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSeries.map((s) => (
                <SeriesCard key={s.id} series={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guests Section */}
      {featuredGuests.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-podcast-500 rounded-full" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Guests</h2>
              </div>
              <Link
                href="/guests"
                className="text-sm font-medium text-podcast-400 hover:text-podcast-300 transition-colors flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGuests.map((guest) => (
                <GuestCard key={guest.id} guest={guest} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}