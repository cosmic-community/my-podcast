import Link from 'next/link';
import type { EpisodeObject } from '@/types';

interface EpisodeCardProps {
  episode: EpisodeObject;
  variant?: 'default' | 'compact';
}

export default function EpisodeCard({ episode, variant = 'default' }: EpisodeCardProps) {
  const coverImage = episode.metadata?.cover_image?.imgix_url;
  const episodeNumber = episode.metadata?.episode_number;
  const publishDate = episode.metadata?.publish_date;
  const description = episode.metadata?.description;
  const seriesTitle = episode.metadata?.series?.title;
  const audioUrl = episode.metadata?.audio_url;

  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  if (variant === 'compact') {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className="group flex items-center gap-4 p-4 rounded-xl bg-dark-900/50 border border-dark-800/50 hover:border-podcast-500/30 hover:bg-dark-800/50 transition-all duration-300"
      >
        {coverImage ? (
          <img
            src={`${coverImage}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={episode.title}
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-podcast-600 to-podcast-800 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            </svg>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            {episodeNumber != null && (
              <span className="text-xs font-semibold text-podcast-400">EP {episodeNumber}</span>
            )}
            {formattedDate && (
              <span className="text-xs text-dark-500">{formattedDate}</span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-white group-hover:text-podcast-300 transition-colors truncate">
            {episode.title}
          </h3>
          {seriesTitle && (
            <p className="text-xs text-dark-500 mt-0.5">{seriesTitle}</p>
          )}
        </div>
        {audioUrl && (
          <div className="w-10 h-10 rounded-full bg-podcast-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-podcast-600/30 transition-colors">
            <svg className="w-4 h-4 text-podcast-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group block rounded-2xl bg-dark-900/50 border border-dark-800/50 hover:border-podcast-500/30 overflow-hidden transition-all duration-300 glow-effect-hover"
    >
      {/* Cover Image */}
      <div className="relative aspect-square overflow-hidden">
        {coverImage ? (
          <img
            src={`${coverImage}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={episode.title}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-podcast-600 via-podcast-700 to-dark-900 flex items-center justify-center">
            <svg className="w-16 h-16 text-white/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7zm4 7.93A7.001 7.001 0 0 1 5 13H3a9.001 9.001 0 0 0 8 8.93V24h2v-2.07A9.001 9.001 0 0 0 21 13h-2a7.001 7.001 0 0 1-6 6.93v.07h-2v-.07z" />
            </svg>
          </div>
        )}
        {/* Play Button Overlay */}
        {audioUrl && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-podcast-600 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        {/* Episode Number Badge */}
        {episodeNumber != null && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-dark-950/80 backdrop-blur-sm text-xs font-bold text-podcast-300">
            EP {episodeNumber}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {seriesTitle && (
            <span className="text-xs font-medium text-podcast-400 uppercase tracking-wider">
              {seriesTitle}
            </span>
          )}
          {formattedDate && (
            <>
              {seriesTitle && <span className="text-dark-600">·</span>}
              <span className="text-xs text-dark-500">{formattedDate}</span>
            </>
          )}
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-podcast-300 transition-colors mb-2 line-clamp-2">
          {episode.title}
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