import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {
        async getArticles(context, page) {
            let res = await axios({
                url: `/everything?q=general&page=${page}`,
                method: 'GET'
            })
            return res;
        }
    }
})