import { GetterTree } from 'vuex';
import { ArtworksState, RootState } from '@/store/types';

const getters: GetterTree<ArtworksState, RootState> = {
    size: (state: ArtworksState) => {
        return state.artworks.length;
    },
};

export default getters;
