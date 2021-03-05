import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Date from '../../../../../../../helpers/date.js';

const StyledArticle = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: none;
        color: inherit;

        div.title {
            color: #0277bd;
        }
    }
`;

const Image = styled.div`
    height: ${(props) => props.imageHeight}px;
    max-width: 100%;
    background: url('${(props) => props.src}') center center no-repeat;
    background-size: contain;
`;

const Title = styled.div`
    font-size: 1.3em;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
`;

const Meta = styled.div`
    font-style: italic;
    color: #828d96;
    margin-top: 10px;
    text-align: center;
`;

const Article = ({ article }) => {
    return (
        <StyledArticle to={`/community/articles/${article.id}`}>
            {article.headerImage && (
                <Image src={article.headerImage.url} imageHeight={200} />
            )}
            <Title className="title">{article.title}</Title>
            <Meta>{Date.niceReadableDate(article.createdAt)}</Meta>
        </StyledArticle>
    );
};

export default Article;
