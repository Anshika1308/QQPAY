import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Beneficiary from '../views/beneficiary/Beneficiary.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/beneficiary',
        name: 'Beneficiary',
        component: Beneficiary
    },
    {
        path: '/beneficiarysummary',
        name: 'BeneficiarySummary',
        component: () =>
            import ('../views/beneficiary/BeneficiarySummary.vue')
    },
    {
        path: '/transactionsummary',
        name: 'TransactionSummary',
        component: () =>
            import ('../views/transaction/TransactionSummary.vue')
    },
    {
        path: '/transaction',
        name: 'Transaction',
        component: () =>
            import ('../views/transaction/Transaction.vue')
    },
    {
        path: '/settings',
        name: 'settings',
        component: () =>
            import ('../views/settings/Settings.vue')
    },
    {
        path: '/help',
        name: 'Help',
        component: () =>
            import ('../views/settings/Help.vue')
    },
    {
        path: '/businessdetails',
        name: 'BusinessDetails',
        component: () =>
            import ('../views/settings/business/BusinessDetails.vue')
    },
    {
        path: '/businessdocuments',
        name: 'BusinessDocuments',
        component: () =>
            import ('../views/settings/business/BusinessDocuments.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/authentication/Login.vue')
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: () =>
            import ('../views/authentication/ForgotPassword.vue')
    },
    {
        path: '/updatepassword',
        name: 'UpdatePassword',
        component: () =>
            import ('../views/authentication/UpdatePassword.vue')
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () =>
            import ('../views/authentication/SignUp.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('../views/profile/Profile.vue')
    },
    {
        path: '/kyc',
        name: 'KYC',
        component: () =>
            import ('../views/profile/KYC.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router