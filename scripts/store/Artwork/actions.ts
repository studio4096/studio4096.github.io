import { ActionTree } from 'vuex';
import { ArtworksState, RootState, Artwork } from '@/store/types';
import axios from 'axios'

import config from '~/config'
import { Cloudinary } from 'cloudinary-core'


const actions: ActionTree<ArtworksState, RootState> = {
    load: async ({ commit }) => {

        // const cloudinary = Cloudinary.new(this.$config.cloudinary.options)
        // const thumbOptions = this.$config.cloudinary.thumbOptions
        const cloudinary = Cloudinary.new(config.cloudinary.options)
        const thumbOptions = config.cloudinary.thumbOptions

        return axios.get(cloudinary.url('artworks.json', {resource_type: 'raw'})).then(response => {
            const data = response.data;

            const mainThumbs = new Map<string, string>();
            commit('setMain', {
                key: data.main_visual.key,
                url: cloudinary.url(data.main_visual.key),
                thumbs: mainThumbs,
            });

            const artworks: Artwork[] = data.list.map(artwork => {
                const thumbs = new Map<string, string>();
                thumbs.set('grid_s', cloudinary.url(key, thumbOptions));
                thumbs.set('grid_m', cloudinary.url(key, thumbOptions));
                thumbs.set('grid_l', cloudinary.url(key, thumbOptions));
                return {
                    key: artwork.key;
                    url: cloudinary.url(key);
                    thumbs: Map<string, string>;
                }
            })
            commit('setList', artworks);
        });
        return;
    },
};

export default actions;
