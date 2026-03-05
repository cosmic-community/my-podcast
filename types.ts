export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface GuestObject extends CosmicObject {
  type: 'guests';
  metadata: {
    name?: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    website?: string;
  };
}

export interface SeriesObject extends CosmicObject {
  type: 'series';
  metadata: {
    name?: string;
    description?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface EpisodeObject extends CosmicObject {
  type: 'episodes';
  metadata: {
    audio_url?: string;
    description?: string;
    show_notes?: string;
    episode_number?: number;
    publish_date?: string;
    series?: SeriesObject;
    guests?: GuestObject[];
    cover_image?: {
      url: string;
      imgix_url: string;
    };
  };
}