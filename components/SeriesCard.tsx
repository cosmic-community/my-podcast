import Link from 'next/link';
import type { SeriesObject } from '@/types';

interface SeriesCardProps {
  series: SeriesObject;
  episodeCount?: number;
}

export default function SeriesCard({ series, episodeCount }: SeriesCardProps) {
  const coverImage = series.metadata?.cover_image?.imgix_url;
  const description = series.metadata?.description || series.metadata?.name;

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group block rounded-2xl bg-dark-900/50 border border-dark-800/50 hover:border-podcast-500/30 overflow-hidden transition-all duration-300 glow-effect-hover"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {coverImage ? (
          <img
            src={`${coverImage}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={series.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-podcast-700 via-podcast-800 to-dark-900 flex items-center justify-center">
            <svg className="w-14 h-14 text-white/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent" />
        {episodeCount != null && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-podcast-600/90 backdrop-blur-sm text-xs font-bold text-white">
            {episodeCount} {episodeCount === 1 ? 'Episode' : 'Episodes'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white group-hover:text-podcast-300 transition-colors mb-2">
          {series.title}
        </h3>
        {description && (
          <p className="text-sm text-dark-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}