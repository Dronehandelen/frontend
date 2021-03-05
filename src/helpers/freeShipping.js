import appConfig from '../config/app';

export default (price) =>
    appConfig.freeShippingLimit === -1
        ? false
        : price >= appConfig.freeShippingLimit;
