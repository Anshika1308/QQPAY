// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n)

const messages = {
  en: {
    email: "Email",
    accountType: "Account Type",
    country: "Country",
    security: "2FA",
    name: "Your Name",
    setPwd: "Set Password",
    createQQPay: 'Create QQPay Account',
    signupProcess: `let's start the sign up process with your personal/professional Email ID`,
    emailID: 'Email ID',
    next: 'Next',
    signupAgree: 'By Signing up your agree to our Terms&Conditions and Privacy Policy',
    alreadyAccount: 'Already have an Account? Log in',
    openaccountType: 'what kind of account would you like to open?',
    accountSelection: 'Account type selection',
    personal: 'Personal',
    business: 'Business',
    personalQuotes: 'Send,spend and receive around the world for less',
    businessQuotes: 'Do business or freelance work internationally',
    backLabel: 'Back',
    nextLabel: 'Next',
    countryResiding: 'Select the Country you are currently residing',
    sourceCountry: 'This will be the source country for all of your transactions',
    verifyPhone: 'Verify your phone number with a OTP',
    helpups: 'it helps us keep your account secure',
    phoneNumber: ' Phone Number',
    getOTP: 'Get OTP',
    goodName: 'Let us Know your Good Name',
    finisProcess: 'you are almost there to finish the sign up process!',
    fName: 'First Name',
    lName: 'Last Name',
    setAccountPass: 'Set Your Account password',
    setStrongPassword: 'Set a strong password and finish the sign up process!',
    currentPass: 'Password',
    confirmPass: 'Re-Enter Password',
    passwordStrength: 'Min. 8 characters, one upper & lowercase,one number, one special character.',
    createAccount: 'Create Account',
    loginScreen: {
      paymentAccrossGlb: 'Payment Across The Globe Got Easier',
      paymentSubheader: 'We remove complexities and introducing you to fast,cost-effective international payments with greater transparency',
      signin: 'Sign In',
      someoneExample: '',
      password: '',
      forgotPassword: 'Forgot Password',
      singnupOption: 'Sign-up options',
    },
    beneficiary: {
      addBeneficiary: 'Add Beneficiary',
      accountType: 'Account Type',
      basicDetails: 'Basic Details',
      address: 'Address',
      bankDetails: 'Bank Details',
      kindOfBenficiary: 'What kind of beneficiary would you like to add',
      individual: 'Individual',
      business: 'Business',
      individualSubHeader: 'send,spend and receive around the world for less',
      businessSubHeader: 'Do business or freelance work internationally',
      next: 'Next',
      letusSomeBasic: 'Let us get some basic details of the beneficiary',
      fullName: 'Full name of the beneficiary',
      country: 'Beneficiary Country',
      relationship: 'Relationship',
      phoneNumber: 'Phone Number',
      emailAddress: 'Email Address',
      optional: 'optional',
      enterAddressBeneficiary: 'Please enter address of the beneficiary',
      state: 'State',
      city: 'City',
      bankAccuntDetails: 'Please enter bank account details of the beneficiary',
      bankAccountNumber: 'Bank Account Number',
      renterBankAccount: 'Re-Enter Account Number',
      swiftCode: 'SWIFT/BIC Code',
      createBeneficiary: 'Create Beneficiary',
    },
    forgetPassowrd: {
      forgotPassword: 'Forgot Password',
      enterEmailId: '',
      getOtp: 'Get OTP',
    },
    fundTransfers: {
      fundTransfer: 'Fund Transfer',
      amount: 'Amount',
      you: 'You',
      receipient: 'Recipient',
      transactionDetails: 'Transaction Details',
      reviewPay: 'Review & Pay',
      howMuchTransfer: 'How much would you like to transfer?',
      malaysia: 'MALAYSIA',
      deliveryMethod: 'Delivery Method',
      bankAccount: 'Bank Account',
      wallet: 'Wallet',
      homeDelivery: 'Home Delivery',
      pickup: 'Pick Up',
      ourFee: 'Our fee',
      totalFee: 'Total fee',
      amountConvert: `Amount we'll convert`,
      guarantteRate: 'guaranteed rate(24 hrs)',
      india: 'INDIA',
      nepal: 'NEPAL',
      inr: 'INR',
      isThisPersonalTransaction: 'Is this a personal transaction or on behalf of someone else?',
      myAccount: 'My Account',
      payingFromOwnAccount: `if you're paying from your own account`,
      onBehalf: 'On behalf',
      payingOnBehalfSomeone: `if you're paying on behalf of someone else`,
      whoAreYouSendingMoney: 'Who are you sending money to',
      clear: 'Clear',
      name: 'Name',
      country: 'Country',
      type: 'Type',
      relationship: 'Relationship',
      letusKnowWhySend: 'Let us Know why and how You Want to send the money',
      paymentMethod: 'Payment Method',
      transactionReason: 'Transaction Reason',
      sourceFund: 'Source of Fund',
      remarks: 'Remarks',
      uploadBankReceipt: 'Upload Bank Receipt',
      letsReviewTransaction: `Let's review and proceed with the transaction`,
      sourceAmount: 'SOURCE_AMOUNT',
      targetAmount: 'TARGET_AMOUNT',
      sourceCountry: 'SOURCE_COUNTRY',
      targetCountry: 'TARGET_COUNTRY',
      method: 'METHOD',
      delivery: 'DELIVERY',
      reason: 'REASON',
      fundSource: 'FUND_SOURCE',
      remarksReview: 'REMARKS',
    },
    profile: {
      profileCompleteNess: 'Profile Completeness',
      emailVerification: 'Email Verification',
      mobileVerify: 'Mobile Number Verification',
      accountType: 'Account type',
      business: 'Business',
      malasia: 'Malaysia',
      update:'Update',
      Company: 'Company'
    },
    setting:{
      notify: 'Notification Settings',
      transaction: 'Transactional Notifications',
      transData: 'these are to keep you updated about the transactions happening over QQ Pay,QQ Pay vowes to share the details f the money transfor happening',
      feature:'Feature updates Notifications',
      fdata: 'these are to keep you updated about the new features updates released by QQ Pay,as QQ Pay is evolving to make remittance easy as click,we would love to keep you updated about it',
      promotion:'Promotional Notifications',
      pdata: 'these are to keep you updated about the new personlised offers we got just for you,so that you can make the most of it ',
      privacy: 'Data Privacy',
      share: 'Share data with our partners',
      shareData: 'Allow QQ Pay to share non-sensitive data with our banking and non-banking  partners, so as to we can roll out best in class offers for you',
      app: 'App Data Usage',
      appData: 'Allow QQ Pay to collect data related to the app usage, the data gathered is completely non-sensitive, this helps QQ Pay to fix Bugs, improve the user exeperiance,bring in new features'
   },
   helpCentre:{
    intro:'Hi, how can we help?',
    faq: 'FAQs',
    ques:'in which countries QQ Pay operate?',
    ans:'QQ Pay operates in Malaysia,australia,indonesia,us,india,uk at present instance, but to make remittance easier,we are expanding to other countries, stay tuned in to know about it',
    contact: 'Contact Us',
    email: 'Email',
    helpLine: 'support@qqpay.com'
  },
  kyc: {
    demographics: 'Demographics',
    incomeSource: 'Income Source',
    currentAddress: 'Current Address',
    identityProof: 'Identity proof',
    nationality: 'Nationality',
    DOB: 'Date of Birth',
    gender: 'Gender',
    fundSource: 'Fund Source',
    occupation: 'Occupation',
    employer: 'Employer',
    incomeRange: 'Income Range',
    address: 'Address',
    addressLinn1: 'Address Line1',
    addressLine2: 'Address line2',
    country: 'Country',
    state: 'State',
    city: 'City',
    IDProof: 'ID Proof',
    passport: 'Passport',
    idNumber: 'ID Number',
    uploadPassport: 'Upload ID',
    uploadSelfieId: 'Upload Selfie With ID',
    faceToFaceKYC: 'Face to Face KYC',
  }
  },
  ch: {
    email: "邮箱" ,
    accountType: "账户类型" ,
    country: "国家",
    security: "2FA",
    name: "您的姓名",
    setPwd: "设置密码",
    createQQPay: '创建QQPay账户',
    signupProcess: '开始使用您的个人/专业邮箱ID注册',
    emailID: '邮箱ID',
    next: '下一步',
    signupAgree: '注册即表示，您同意我们的条款和条件及隐私政策',
    alreadyAccount: '已有账户？登录',
    openaccountType: '您想开什么类型的账户？',
    accountSelection: '账户类型选择',
    personal: '个人账户',
    business: '公司账户',
    personalQuotes: '花更少的钱在世界各地转账、消费和收款',
    businessQuotes: '在国际上开展公司业务或者自由职业',
    backLabel: '返回',
    nextLabel: '下一步',
    countryResiding: '请选择您目前居住的国家',
    sourceCountry: '这将是您所有交易的来源国家',
    verifyPhone: '通过验证码验证您的电话号码',
    helpups: '它能帮助我们确保您的账户安全',
    phoneNumber: '电话号码',
    getOTP: '收取验证码',
    goodName: '让我们知道您的名字',
    finisProcess: '即将完成注册！',
    fName: '名字',
    lName: '姓氏',
    setAccountPass: '设置您的账户密码',
    setStrongPassword: '设置一个强密码并完成注册！',
    currentPass: '密码',
    confirmPass: '重新输入密码',
    passwordStrength: '最少8个字符，并含有一个大写字母和小写字母、一个数字，以及一个特殊字符。',
    createAccount: '创建账户',
    loginScreen: {
      paymentAccrossGlb: '全球支付更加便捷',
      paymentSubheader: '我们消除了复杂的操作，为您带来快速、低费率、高透明度的国际支付体验',
      signin: '登录',
      someoneExample: '',
      password: '',
      forgotPassword: '忘记密码',
      singnupOption: '注册选项',
    },
    beneficiary: {
      addBeneficiary: '添加收款人',
      accountType: '账户类型',
      basicDetails: '基本的细节',
      address: '地址',
      bankDetails: '银行资料',
      kindOfBenficiary: '您想要增加什么样的收款人',
      individual: '个人',
      business: '公司账户',
      individualSubHeader: '花更少的钱在世界各地转账、消费和收款',
      businessSubHeader: '在国际上开展公司业务或者自由职业',
      next: '下一步',
      letusSomeBasic: '让我们来了解一下收款人的基本信息',
      fullName: '收款人全名',
      country: '收款人国家',
      relationship: '关系',
      phoneNumber: '电话号码',
      emailAddress: '电子邮件地址',
      optional: '可选',
      enterAddressBeneficiary: '请输入收款人地址',
      state: '邦',
      city: '城市',
      bankAccuntDetails: '请输入收款人的银行账户资料',
      bankAccountNumber: '银行账户号码',
      renterBankAccount: '重新输入账号',
      swiftCode: 'SWIFT/BIC代码',
      createBeneficiary: '创建收款人',
    },
    forgetPassowrd: {
      forgotPassword: '忘记密码',
      enterEmailId: '',
      getOtp: '收取验证码',
    },
    fundTransfers: {
      fundTransfer: '转账',
      amount: '金额',
      you: '您',
      receipient: '收款人',
      transactionDetails: '交易详情',
      reviewPay: '审核和支付',
      howMuchTransfer: '您要转多少钱？',
      malaysia: '马来西亚',
      deliveryMethod: '送货方式',
      bankAccount: '银行账户',
      wallet: '钱包',
      homeDelivery: '送货上门',
      pickup: '签收',
      ourFee: '我们的费率',
      totalFee: '总费用',
      amountConvert: '我们将转换的金额',
      guarantteRate: '保证率(24小时)',
      india: '印度',
      nepal: '尼泊尔',
      inr: 'INR',
      isThisPersonalTransaction: '这是私人交易还是代表别人？',
      myAccount: '我的账户',
      payingFromOwnAccount: '如果您在用自己的账户付款',
      onBehalf: '代表',
      payingOnBehalfSomeone: '如果您在替别人付款',
      whoAreYouSendingMoney: '您要把款汇给谁',
      clear: '清除',
      name: '姓名',
      country: '国家',
      type: '类型',
      relationship: '关系',
      letusKnowWhySend: '告诉我们您为什么以及如何汇款',
      paymentMethod: '支付方式',
      transactionReason: '交易原因',
      sourceFund: '资金来源',
      remarks: '备注',
      uploadBankReceipt: '上传银行收据',
      letsReviewTransaction: '让我们回顾并继续处理该交易',
      sourceAmount: '来源金额',
      targetAmount: '目标金额',
      sourceCountry: '来源国',
      targetCountry: '目标国',
      method: '方法',
      delivery: '交付',
      reason: '原因',
      fundSource: '资金来源',
      remarksReview: '备注',
    },
    profile: {
      profileCompleteNess: '个人资料完整度',
      emailVerification: '电子邮件验证',
      mobileVerify: '手机号码验证',
      accountType: '账户类型',
      business: '公司账户',
      malasia: '马来西亚',
      update:'更新',
      Company: '当前国家'
    },
    setting:{
      notify: '通知设置',
      transaction: '交易通知',
      transData: '此通知是为了让您随时了解QQPay上的交易情况，QQPay承诺会分享这笔交易的详情',
      feature:'功能更新通知',
      fdata: '此通知是为了让您了解QQPay最新发布的新功能更新，随着QQPay的发展，汇款变得将非常便捷，只需点击几下就可以了，我们希望您能随时了解最新情况',
      promotion:'促销通知',
      pdata: '此通知是为了让您随时了解我们为您提供的全新个性化服务，以便您可以知晓并使用这些服务。',
      privacy: '数据隐私',
      share: '与我们的合作伙伴共享数据',
      shareData: '允许QQPay与我们的银行和非银行合作伙伴共享非敏感数据，以便我们可以为您提供最好的服务',
      app: '应用数据使用',
      appData: '允许QQPay收集与应用使用相关的数据，收集的数据完全是非敏感信息，这有助于QQPay修复bug，提升用户体验，并带来新功能'
   },
   helpCentre:{
    intro:'您好，有什么可以帮您的吗？',
    faq: '常见问题',
    ques:'QQPay在哪些国家运营？',
    ans:'QQPay目前在马来西亚、澳大利亚、印尼、美国、印度和英国都有业务，但为了让汇款更容易，我们正在向其他国家扩展业务，敬请关注',
    contact: '联系我们',
    email: '邮箱',
    helpLine: '帮助热线'
  },
  kyc: {
    demographics: '人口统计资料',
    incomeSource: '收入来源',
    currentAddress: '当前地址',
    identityProof: '身份证明',
    nationality: '国籍',
    DOB: '出生日期',
    gender: '性别',
    fundSource: '资金来源',
    occupation: '职业',
    employer: '雇主',
    incomeRange: '收入范围',
    address: '地址',
    addressLinn1: '地址行1',
    addressLine2: '地址行2',
    country: '国家',
    state: '邦',
    city: '城市',
    IDProof: '身份证明',
    idNumber: '身份证号码',
    uploadPassport: '上传身份证',
    uploadSelfieId: '上传持身份证自拍',
    faceToFaceKYC: '面对面KYC',

  }
  }
}
  
// 2. Create i18n instance with options
export const i18n = new VueI18n({
  locale: 'en',
  messages,
});