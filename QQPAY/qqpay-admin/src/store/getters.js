export const getters = {
    isAppLoaded: (state) => {
        return state.app.config != null
    },
    config: (state) => state.app?.config
}