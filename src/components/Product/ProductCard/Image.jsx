import React from 'react';
import styled from 'styled-components';
import { getDefaultProductImageUrl } from '../../../helpers/product.js';
import { getImageUrlWithMaxSize } from '../../../helpers/image';

const ProductImage = styled.div`
    height: ${(props) => props.imageHeight}px;
    max-width: 100%;
    background: url('${(props) => props.src}') center center no-repeat;
    background-size: contain;
`;

export default ({ product, imageHeight = 200 }) => {
    let imgUrl = getDefaultProductImageUrl(product);

    return (
        <ProductImage
            src={getImageUrlWithMaxSize(imgUrl, { maxHeight: imageHeight })}
            imageHeight={imageHeight}
        />
    );
};
