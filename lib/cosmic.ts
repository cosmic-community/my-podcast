import { createBucketClient } from '@cosmicjs/sdk';
import type { EpisodeObject, SeriesObject, GuestObject } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

// Episodes
export async function getEpisodes(): Promise<EpisodeObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'episodes' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(2);

    const episodes = response.objects as EpisodeObject[];
    return episodes.sort((a, b) => {
      const numA = a.metadata?.episode_number ?? 0;
      const numB = b.metadata?.episode_number ?? 0;
      return numB - numA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch episodes');
  }
}

export async function getEpisodeBySlug(slug: string): Promise<EpisodeObject | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'episodes', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at', 'type'])
      .depth(2);

    return response.object as EpisodeObject;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch episode');
  }
}

// Series
export async function getSeries(): Promise<SeriesObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'series' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);

    return response.objects as SeriesObject[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch series');
  }
}

export async function getSeriesBySlug(slug: string): Promise<SeriesObject | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'series', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at', 'type'])
      .depth(1);

    return response.object as SeriesObject;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch series');
  }
}

export async function getEpisodesBySeries(seriesId: string): Promise<EpisodeObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'episodes', 'metadata.series': seriesId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(2);

    const episodes = response.objects as EpisodeObject[];
    return episodes.sort((a, b) => {
      const numA = a.metadata?.episode_number ?? 0;
      const numB = b.metadata?.episode_number ?? 0;
      return numB - numA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch episodes for series');
  }
}

// Guests
export async function getGuests(): Promise<GuestObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'guests' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);

    return response.objects as GuestObject[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch guests');
  }
}

export async function getGuestBySlug(slug: string): Promise<GuestObject | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'guests', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at', 'type'])
      .depth(1);

    return response.object as GuestObject;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch guest');
  }
}

export async function getEpisodesByGuest(guestId: string): Promise<EpisodeObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'episodes', 'metadata.guests': guestId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(2);

    const episodes = response.objects as EpisodeObject[];
    return episodes.sort((a, b) => {
      const numA = a.metadata?.episode_number ?? 0;
      const numB = b.metadata?.episode_number ?? 0;
      return numB - numA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch episodes for guest');
  }
}