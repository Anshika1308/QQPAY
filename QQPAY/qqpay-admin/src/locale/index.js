// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n)

const messages = {
  en: {
    loginScreen: {
      paymentAccrossGlb: 'Payment Employe Admin Portal',
      paymentSubheader: 'We remove complexities and introducing you to fast,cost-effective international payments with greater transparency',
      signin: 'Sign In',
      someoneExample: '',
      password: '',
      forgotPassword: 'Forgot Password',
      singnupOption: 'Sign-up options',
    },
    
  },
  ch: {
    
    loginScreen: {
      paymentAccrossGlb: '全球支付更加便捷',
      paymentSubheader: '我们消除了复杂的操作，为您带来快速、低费率、高透明度的国际支付体验',
      signin: '登录',
      someoneExample: '',
      password: '',
      forgotPassword: '忘记密码',
      singnupOption: '注册选项',
    },
    }
}
  
// 2. Create i18n instance with options
export const i18n = new VueI18n({
  locale: 'en',
  messages,
});