// app/series/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EpisodeCard from '@/components/EpisodeCard';
import { getSeriesBySlug, getEpisodesBySeries, getSeries } from '@/lib/cosmic';

export const revalidate = 60;

export async function generateStaticParams() {
  const allSeries = await getSeries();
  return allSeries.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    return { title: 'Series Not Found | My Podcast' };
  }

  return {
    title: `${series.title} | My Podcast`,
    description: series.metadata?.description || `Explore the ${series.title} series on My Podcast.`,
  };
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  const episodes = await getEpisodesBySeries(series.id);
  const coverImage = series.metadata?.cover_image?.imgix_url;
  const description = series.metadata?.description;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-500 mb-8">
        <Link href="/" className="hover:text-podcast-400 transition-colors">
          Home
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/series" className="hover:text-podcast-400 transition-colors">
          Series
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-dark-300 truncate">{series.title}</span>
      </nav>

      {/* Series Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12 pb-12 border-b border-dark-800/50">
        {/* Cover Image */}
        <div className="md:w-64 lg:w-80 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden glow-effect">
            {coverImage ? (
              <img
                src={`${coverImage}?w=640&h=360&fit=crop&auto=format,compress`}
                alt={series.title}
                width={320}
                height={180}
                className="w-full aspect-[16/9] object-cover"
              />
            ) : (
              <div className="w-full aspect-[16/9] bg-gradient-to-br from-podcast-700 via-podcast-800 to-dark-900 flex items-center justify-center">
                <svg className="w-14 h-14 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Series Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-lg bg-podcast-600/20 text-podcast-300 text-xs font-bold uppercase tracking-wider">
              Series
            </span>
            <span className="text-sm text-dark-400">
              {episodes.length} episode{episodes.length !== 1 ? 's' : ''}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">{series.title}</h1>
          {description && (
            <p className="text-dark-300 text-lg leading-relaxed">{description}</p>
          )}
        </div>
      </div>

      {/* Episodes */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Episodes in this Series
        </h2>
        {episodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-dark-900/40 border border-dark-800/50">
            <p className="text-dark-400">No episodes in this series yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}