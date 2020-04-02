import { Module } from 'vuex';
import { ArtworksState, RootState } from '@/store/types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: ArtworksState = {
    artworks: [],
};

export const artworks: Module<ArtworksState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
