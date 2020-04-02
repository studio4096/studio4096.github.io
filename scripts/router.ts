import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

export default new VueRouter({ 
    mode: "history",
    routes: [
        { path: '/', name: 'home', component: () => import('./views/Artworks.vue') },
        // { path: '/about', name: 'about', component: () => import('./views/About.vue') },
        { path: '/contact', name: 'contact', component: () => import('./views/Contact.vue') },
    ],
})
