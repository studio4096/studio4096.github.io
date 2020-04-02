import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { artworks } from './Artwork';

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    artworks,
  },
};

export default new Vuex.Store<RootState>(store);
