import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../../../../../../components/Helmet.jsx';
import gql from 'graphql-tag';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { useQuery } from '@apollo/react-hooks';
import Article from './components/Article.jsx';

const query = gql`
    query GetArticlesOverview {
        articles {
            edges {
                node {
                    id
                    title
                    SEODescription
                    creator {
                        firstName
                        lastName
                    }
                    updatedAt
                    createdAt
                    headerImage {
                        fileId
                        url
                    }
                }
            }
        }
    }
`;

const Home = () => {
    return (
        <>
            <Helmet title="Artikler" />
            <Container>
                <Row className="mt-3">
                    <DefaultHookQuery queryHookData={useQuery(query)}>
                        {({ data }) => {
                            if (data.articles.edges.length === 0) {
                                return <Col>Ingen artikler funnet</Col>;
                            }

                            return data.articles.edges.map((edge) => (
                                <Col xs={6} md={3} key={edge.node.id}>
                                    <Article article={edge.node} />
                                </Col>
                            ));
                        }}
                    </DefaultHookQuery>
                </Row>
            </Container>
        </>
    );
};

export default Home;
