import getEnvVariable from '../helpers/getEnvVariable.js';

const environment = process.env.NODE_ENV || 'development';

export default {
    releaseHash: getEnvVariable('RAZZLE_RELEASE_HASH'),
    releaseDate: getEnvVariable('RAZZLE_RELEASE_DATE', 'dev'),
    environment,
    isProduction: environment === 'production',
    stripePublicKey: getEnvVariable(
        'RAZZLE_STRIPE_PUBLIC_KEY',
        'pk_test_87h4u1LJhcqxKZeTqmsE3YlN00gyA6PICv'
    ),
    sentryUrl: getEnvVariable('RAZZLE_SENTRY_FRONTEND'),
    sentrySSRUrl: getEnvVariable('RAZZLE_SENTRY_SSR'),
    supportEmail: 'support@dronehandelen.no',
    frakt: 99,
    bringGenericShippingPrice: 99,
    freeShippingLimit: -1,
    criticalStockAmount: 2,
    appUrl: 'https://www.dronehandelen.no',
    appName: 'Dronehandelen',
    appNameDomain: 'Dronehandelen.no',
    isServerSide: typeof window === 'undefined',
    social: {
        facebook: 'https://www.facebook.com/dronehandelen',
    },
    owner: {
        name: 'Norfpv AS',
        orgnr: '922737045MVA',
    },
    deliveryTypes: {
        GET_SELF: 'get_self',
        BRING: 'bring',
        BRING_PIP: '3584',
        BRING_SP: '5800',
        POSTNORD_MYPACK: 'postnord_mypack',
        POSTNORD_MYPACK_HOME_SMALL: 'postnord_mypack_home_small',
    },
    carriers: {
        BRING: 'bring',
        POSTNORD: 'postnord',
    },
    productTypes: {
        PRODUCT: 'product',
        PACKAGE: 'package',
    },
    paymentMethods: {
        STRIPE: 'stripe',
        VIPPS: 'vipps',
    },
};
