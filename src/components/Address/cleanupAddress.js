import defaultValues from './defaultValues.js';

export default (address) =>
    Object.entries(address).reduce((newAddress, [key, value]) => {
        if (Object.keys(defaultValues).indexOf(key) !== -1) {
            newAddress[key] = value;
        }
        return newAddress;
    }, {});
