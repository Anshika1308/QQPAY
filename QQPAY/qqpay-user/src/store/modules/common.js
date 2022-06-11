export default {
    namespaced: true,
    state: {
        user_details: {
            name: 'naren'
        }
    },
    getters: {
        user_details: (state) => {
            return state.user_details;
        }
    },
    mutations: {
        set_user_details: (state, payload) => {
            state.user_details = payload;
        }
    },
    actions: {

    }
};