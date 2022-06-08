export default {
    namespaced: true,
    state: {
        remitteUserList: null
    },
    getters: {
        remitteUserList: (state) => {
            return state.remitteUserList;
        }
    },
    mutations: {
        remitteUserList(state, payload) {
            state.remitteUserList = payload.remitteUserList
        }
    },
    actions: {

    }
};