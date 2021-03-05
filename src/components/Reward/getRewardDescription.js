export default (actionId) => {
    switch (actionId) {
        case 'order':
            return 'Bestilling';
        case 'product_review':
            return 'Produktanmeldelse';
        case 'daily_visit':
            return 'Daglig besøk';
        default:
            return '';
    }
};
