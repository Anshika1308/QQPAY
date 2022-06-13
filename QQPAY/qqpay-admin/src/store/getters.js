export const getters = {
    isAppLoaded: (state) => {
        return state.app.config != null
    },
    config: (state) => state.app ? state.app.config : '',
    token: state => {
        return state.app.token;
    },
    base_url: state => {
        console.log('state', state)
        return state.app.base_url;
    },
    selected_deal_id: state => {
        return state.app.selected_deal_id;
    },
    selected_settlement_id: state => {
        return state.app.selected_settlement_id;
    },
}