export interface RootState {
  version: string;
}

export interface ArtworksState {
  main: Artwork;
  artworks: Artwork[];
}

export interface Artwork {
  key: string;
  url: string;
  thumbs: Map<string, string>;
}
