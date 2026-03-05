// app/episodes/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEpisodeBySlug, getEpisodes } from '@/lib/cosmic';

export const revalidate = 60;

export async function generateStaticParams() {
  const episodes = await getEpisodes();
  return episodes.map((episode) => ({
    slug: episode.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    return { title: 'Episode Not Found | My Podcast' };
  }

  return {
    title: `${episode.title} | My Podcast`,
    description: episode.metadata?.description || `Listen to ${episode.title} on My Podcast.`,
  };
}

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const coverImage = episode.metadata?.cover_image?.imgix_url;
  const audioUrl = episode.metadata?.audio_url;
  const description = episode.metadata?.description;
  const showNotes = episode.metadata?.show_notes;
  const episodeNumber = episode.metadata?.episode_number;
  const publishDate = episode.metadata?.publish_date;
  const series = episode.metadata?.series;
  const guests = episode.metadata?.guests;

  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-500 mb-8">
        <Link href="/" className="hover:text-podcast-400 transition-colors">
          Home
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/episodes" className="hover:text-podcast-400 transition-colors">
          Episodes
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-dark-300 truncate">{episode.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column - Cover & Audio */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24">
            {/* Cover Image */}
            <div className="rounded-2xl overflow-hidden glow-effect mb-6">
              {coverImage ? (
                <img
                  src={`${coverImage}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={episode.title}
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-podcast-600 via-podcast-700 to-dark-900 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7zm4 7.93A7.001 7.001 0 0 1 5 13H3a9.001 9.001 0 0 0 8 8.93V24h2v-2.07A9.001 9.001 0 0 0 21 13h-2a7.001 7.001 0 0 1-6 6.93v.07h-2v-.07z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Audio Link */}
            {audioUrl && (
              <a
                href={audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-podcast-600 hover:bg-podcast-500 text-white font-semibold transition-colors shadow-lg shadow-podcast-600/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Listen Now
              </a>
            )}

            {/* Series Link */}
            {series && (
              <Link
                href={`/series/${series.slug}`}
                className="flex items-center gap-3 mt-4 p-4 rounded-xl bg-dark-900/60 border border-dark-800/50 hover:border-podcast-500/30 transition-all"
              >
                {series.metadata?.cover_image?.imgix_url && (
                  <img
                    src={`${series.metadata.cover_image.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={series.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-xs text-dark-500 uppercase tracking-wider">Series</p>
                  <p className="text-sm font-semibold text-white truncate">{series.title}</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 min-w-0">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {episodeNumber != null && (
              <span className="px-3 py-1 rounded-lg bg-podcast-600/20 text-podcast-300 text-sm font-bold">
                Episode {episodeNumber}
              </span>
            )}
            {formattedDate && (
              <span className="text-sm text-dark-400">{formattedDate}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
            {episode.title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg text-dark-300 leading-relaxed mb-8 pb-8 border-b border-dark-800/50">
              {description}
            </p>
          )}

          {/* Guest Profiles */}
          {guests && Array.isArray(guests) && guests.length > 0 && (
            <div className="mb-8 pb-8 border-b border-dark-800/50">
              <h2 className="text-xl font-bold text-white mb-4">
                Guest{guests.length > 1 ? 's' : ''} on this Episode
              </h2>
              <div className="space-y-4">
                {guests.map((guest) => (
                  <Link
                    key={guest.id}
                    href={`/guests/${guest.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/60 border border-dark-800/50 hover:border-podcast-500/30 transition-all group"
                  >
                    {guest.metadata?.photo?.imgix_url ? (
                      <img
                        src={`${guest.metadata.photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                        alt={guest.metadata?.name || guest.title}
                        width={64}
                        height={64}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-podcast-600/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-podcast-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-podcast-300 transition-colors">
                        {guest.metadata?.name || guest.title}
                      </h3>
                      {guest.metadata?.bio && (
                        <p className="text-sm text-dark-400 line-clamp-1">{guest.metadata.bio}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Show Notes */}
          {showNotes && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Show Notes</h2>
              <div
                className="prose prose-invert prose-sm max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-p:text-dark-300 prose-p:leading-relaxed
                  prose-a:text-podcast-400 prose-a:no-underline hover:prose-a:text-podcast-300
                  prose-strong:text-white
                  prose-ul:text-dark-300 prose-ol:text-dark-300
                  prose-li:marker:text-podcast-500"
                dangerouslySetInnerHTML={{ __html: showNotes }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}