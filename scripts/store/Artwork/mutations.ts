import { MutationTree } from 'vuex';
import { ArtworksState, Artwork } from '@/store/types';

const mutations: MutationTree<ArtworksState> = {
    setMain: (state, artwork: Artwork) => {
        state.main = artwork;
    },
    setList: (state, artworks: Artwork[]) => {
        state.artworks = artworks;
    },
    /*
    add: (state, artwork: Artwork) => {
        state.artworks.push(artwork);
    },
    remove: (state, id: string) => {
        state.artworks = state.artworks.filter((e: Artwork) => e.id !== id);
    },
    */
};

export default mutations;
