import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Helmet from '../../../../../components/Helmet.jsx';
import { gql } from '@apollo/client';
import DefaultHookQuery from '../../../../../containers/DefaultHookQuery.jsx';
import { useQuery } from '@apollo/client';
import Editor from '../../../../../components/Editor/index.js';
import { convertFromRaw, EditorState } from 'draft-js';
import appConfig from '../../../../../config/app.js';
import tracking from '../../../../../helpers/tracking.js';

const query = gql`
    query GetArticle($id: Int!) {
        article(id: $id) {
            id
            isPublished
            title
            SEODescription
            description
            headerImage {
                fileId
                url
            }
            creator {
                firstName
                lastName
            }
        }
    }
`;

const Article = ({ article }) => {
    React.useEffect(() => {
        if (article) {
            tracking.articleEvent(article.id, 'view');
        }
    }, [article]);

    return (
        <>
            <Helmet
                title={article.title}
                description={article.SEODescription}
            />
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <Container fluid>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/">{appConfig.appName}</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to="/community/articles">
                                        Artikler
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    {article.title}
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Editor
                                editorState={EditorState.createWithContent(
                                    convertFromRaw(
                                        JSON.parse(article.description)
                                    )
                                )}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

const ArticleContainer = ({ match }) => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(query, {
                variables: { id: parseInt(match.params.articleId) },
            })}
        >
            {({ data }) => {
                return <Article article={data.article} />;
            }}
        </DefaultHookQuery>
    );
};

export default ArticleContainer;
