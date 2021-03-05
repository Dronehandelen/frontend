import moment from 'moment';

export const getDefaultProductImageUrl = (product) => {
    if (product.primaryImage) {
        return product.primaryImage.url;
    }

    if (product.images.length !== 0) {
        return product.images[0].url;
    }

    return '/image-placeholder.png';
};

export const generateProductAlias = ({ title }) =>
    title
        .replace(/[^a-z0-9]/gim, '-')
        .replace(/\s+/g, ' ')
        .replace(/-+/g, '-')
        .replace(/^-+/g, '')
        .replace(/-+$/g, '')
        .toLowerCase();

const hasPromotion = (obj) => obj.price !== obj.originalPrice;

const calculatePresent = (originalPrice, newPrice) =>
    ((originalPrice - newPrice) * 100) / originalPrice;
const promotionPresent = (obj, shouldShowVip) => {
    if (obj.originalPrice === obj.price && shouldShowVip) {
        return calculatePresent(obj.originalPrice, obj.vipPromotionPrice.price);
    }

    return calculatePresent(obj.originalPrice, obj.price);
};

const showVIP = (product) => {
    if (!product.pricing.vipPromotionPrice) {
        return false;
    }

    if (
        product.pricing.price === product.pricing.vipPromotionPrice.price &&
        (!product.pricing.openPromotionPrice ||
            product.pricing.vipPromotionPrice.price <
                product.pricing.openPromotionPrice.price)
    ) {
        return true;
    }

    if (
        product.pricing.price === product.pricing.originalPrice &&
        product.pricing.vipPromotionPrice.price < product.pricing.price
    ) {
        return true;
    }

    return false;
};

export const promotion = (product) => {
    const shouldShowVip = showVIP(product);

    return {
        hasPromotion: hasPromotion(product.pricing),
        promotionPresent: promotionPresent(product.pricing, shouldShowVip),
        shopVIP: shouldShowVip,
    };
};

export default (product) => {
    const competitorPrice = (competitorId) => {
        if (!product || !product.competitorPrices) {
            throw new Error('Missing competitor prices');
        }

        const elefunPrice = product.competitorPrices.find(
            (cp) => cp.competitorId === competitorId
        );

        return elefunPrice ? elefunPrice.price : null;
    };

    return {
        ...product,
        competitorPrice,
        expectedPriceBasedOnCompetitors: () => {
            const elefunPrice = competitorPrice(1);

            if (elefunPrice < 200) {
                return elefunPrice;
            }

            return Math.round((elefunPrice - 20) / 10) * 10 - 1;
        },
        inStockCount: () => {
            if (product.stock < 5) {
                return product.stock;
            }

            if (product.stock <= 10) {
                return '5-10';
            }

            if (product.stock <= 25) {
                return '10-25';
            }

            return '25+';
        },
        isNew: () => {
            if (!product.createdAt) {
                throw new Error('createdAt must be defined');
            }

            return moment(product.createdAt).isAfter(
                moment().subtract(14, 'days')
            );
        },
        totalCountAvailable: () => {
            if (product.stock === undefined) {
                throw new Error('stock must be defined');
            }

            if (product.countAvailableForBackorder === undefined) {
                throw new Error('countAvailableForBackorder must be defined');
            }

            return product.stock + product.countAvailableForBackorder;
        },
    };
};
