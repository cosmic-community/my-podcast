import Link from 'next/link';
import type { GuestObject } from '@/types';

interface GuestCardProps {
  guest: GuestObject;
}

export default function GuestCard({ guest }: GuestCardProps) {
  const photo = guest.metadata?.photo?.imgix_url;
  const bio = guest.metadata?.bio;
  const website = guest.metadata?.website;
  const name = guest.metadata?.name || guest.title;

  return (
    <Link
      href={`/guests/${guest.slug}`}
      className="group block rounded-2xl bg-dark-900/50 border border-dark-800/50 hover:border-podcast-500/30 overflow-hidden transition-all duration-300 glow-effect-hover"
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden">
        {photo ? (
          <img
            src={`${photo}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-podcast-600 to-dark-800 flex items-center justify-center">
            <svg className="w-20 h-20 text-white/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white group-hover:text-podcast-300 transition-colors mb-1">
          {name}
        </h3>
        {bio && (
          <p className="text-sm text-dark-400 line-clamp-2 leading-relaxed mb-3">
            {bio}
          </p>
        )}
        {website && (
          <span className="inline-flex items-center gap-1 text-xs text-podcast-400 font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Website
          </span>
        )}
      </div>
    </Link>
  );
}