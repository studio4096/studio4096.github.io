import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)


// TODO https://qiita.com/yam0918/items/68d4d6c74b06d589a195
// modules
const App = {
    namespaced: true,
    /*
    state,
    getters,
    modules,
    actions,
    mutations
    */
}
const actions = {}
const mutations = {}

export default new Vuex.Store({
    modules: {
        App,
    },
    actions,
    mutations,
    strict: process.env.NODE_ENV !== 'production', // refs. https://vuex.vuejs.org/ja/guide/strict.html
    plugins: !!parseInt(process.env.LOG_ENABLE)  ? [createLogger()] : [],
})

