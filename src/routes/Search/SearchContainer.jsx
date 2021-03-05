import React from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Row,
} from 'reactstrap';
import tracking from '../../helpers/tracking.js';
import ProductWithFiltersContainer from '../../components/ProductWithFilters/ProductWithFiltersContainer.jsx';

const SearchContainer = ({ searchString }) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h3>Produkter</h3>
                    </Col>
                </Row>
            </Container>
            <ProductWithFiltersContainer
                baseFilters={{ search: searchString }}
                listName={'Category page'}
            />
        </>
    );
};

const getCurrentUrlQuery = (location) => {
    const query = queryString.parse(location.search);

    if (query.q && query.q.length !== 0) {
        return query.q;
    }

    return '';
};

export default (props) => {
    const [search, setSearch] = React.useState(() =>
        getCurrentUrlQuery(props.location)
    );
    const [actualSearch, setActualSearch] = React.useState(() =>
        getCurrentUrlQuery(props.location)
    );

    React.useEffect(() => {
        props.history.push(`${props.match.url}?q=${actualSearch}`);

        if (actualSearch.length !== 0) {
            tracking.search(actualSearch);
        }
    }, [actualSearch, props.history, props.match.url]);

    return (
        <>
            <Helmet title="Søk" />
            <Container>
                <Row>
                    <Col>
                        <h1>Søk</h1>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Form
                            inline
                            onSubmit={(e) => {
                                e.preventDefault();
                                setActualSearch(search);
                            }}
                        >
                            <FormGroup className="flex-grow-1">
                                <Input
                                    className="w-100"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </FormGroup>
                            <Button>Søk</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {actualSearch.length !== 0 && (
                <SearchContainer {...props} searchString={actualSearch} />
            )}
        </>
    );
};
