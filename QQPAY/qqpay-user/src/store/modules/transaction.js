export default {
    namespaced: true,
    state: {
        transaction_details: {
            "target_amount": null,
            "target_country": null,
            "source_amount": null,
            "source_country": null,
            "delivery_method": null,
            "ourFee": null,
            "exchangerate": null,



            "payment_mode_cd": null,
            "trans_comments": null,
            "source_of_fund_cd": null,
            "reason_of_remittance_cd": null,
            "Remittee_id": null,
            "is_self": false,

        }
    },
    getters: {
        transaction_details: (state) => {
            return state.transaction_details;
        }
    },
    mutations: {
        source_amount(state, payload) {
            state.transaction_details.source_amount = payload.source_amount
        },
        target_amount(state, payload) {
            state.transaction_details.target_amount = payload.target_amount
        },
        source_country(state, payload) {
            state.transaction_details.source_country = payload.source_country
        },
        target_country(state, payload) {
            state.transaction_details.target_country = payload.target_country
        },
        exchangerate(state, payload) {
            state.transaction_details.exchangerate = payload.exchangerate
        },
        transfer_fee(state, payload) {
            state.transaction_details.ourFee = payload.ourFee
        },
        delivery_method(state, payload) {
            state.transaction_details.delivery_method = payload.delivery_method
        },
        is_self(state, payload) {
            state.transaction_details.is_self = payload.is_self
        },
        Remittee_ID(state, payload) {
            state.transaction_details.Remittee_ID = payload.Remittee_ID
        },


    },
    actions: {

    }
};