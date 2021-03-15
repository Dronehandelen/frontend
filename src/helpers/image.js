export const getImageUrlWithMaxSize = (url, { maxWidth, maxHeight }) => {
    const newUrl = new URL(url);

    if (maxWidth) {
        newUrl.searchParams.append('maxWidth', maxWidth);
    }

    if (maxHeight) {
        newUrl.searchParams.append('maxHeight', maxHeight);
    }

    return newUrl.href;
};
