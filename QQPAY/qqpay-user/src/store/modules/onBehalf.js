export default {
    namespaced: true,
    state: {
        on_behalf_details: null
    },
    getters: {
        on_behalf_details: (state) => {
            return state.on_behalf_details;
        }
    },
    mutations: {
        on_behalf_details(state, payload) {
            state.on_behalf_details = payload.on_behalf_details
        },
    },
    actions: {

    }
};