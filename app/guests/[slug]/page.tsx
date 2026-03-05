// app/guests/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EpisodeCard from '@/components/EpisodeCard';
import { getGuestBySlug, getEpisodesByGuest, getGuests } from '@/lib/cosmic';

export const revalidate = 60;

export async function generateStaticParams() {
  const guests = await getGuests();
  return guests.map((guest) => ({
    slug: guest.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);

  if (!guest) {
    return { title: 'Guest Not Found | My Podcast' };
  }

  const name = guest.metadata?.name || guest.title;
  return {
    title: `${name} | My Podcast`,
    description: guest.metadata?.bio || `Learn more about ${name} on My Podcast.`,
  };
}

export default async function GuestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);

  if (!guest) {
    notFound();
  }

  const episodes = await getEpisodesByGuest(guest.id);
  const photo = guest.metadata?.photo?.imgix_url;
  const bio = guest.metadata?.bio;
  const website = guest.metadata?.website;
  const name = guest.metadata?.name || guest.title;

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
        <Link href="/guests" className="hover:text-podcast-400 transition-colors">
          Guests
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-dark-300 truncate">{name}</span>
      </nav>

      {/* Guest Profile Header */}
      <div className="flex flex-col sm:flex-row items-start gap-8 mb-12 pb-12 border-b border-dark-800/50">
        {/* Photo */}
        <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 rounded-2xl overflow-hidden glow-effect">
          {photo ? (
            <img
              src={`${photo}?w=400&h=400&fit=crop&auto=format,compress`}
              alt={name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-podcast-600 to-dark-800 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <span className="px-3 py-1 rounded-lg bg-podcast-600/20 text-podcast-300 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Guest
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">{name}</h1>
          {bio && (
            <p className="text-dark-300 text-lg leading-relaxed mb-4">{bio}</p>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-podcast-400 hover:text-podcast-300 font-medium text-sm transition-all border border-dark-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Website
            </a>
          )}
        </div>
      </div>

      {/* Episodes */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Episodes with {name}
        </h2>
        {episodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-dark-900/40 border border-dark-800/50">
            <p className="text-dark-400">No episodes featuring this guest yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}