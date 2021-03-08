import React from 'react';
import Home from './Home';
import Helmet from '../../components/Helmet.jsx';
import windowHelper from '../../helpers/window';
import { gql } from '@apollo/client';
import { productFragment } from '../../components/Product/Product.jsx';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';
import { useQuery } from '@apollo/client';

const HomeQuery = gql`
    query HomeQuery {
        highlightedProducts: products(
            filters: { onlyAvailableForOrder: true }
            pagination: { count: 8 }
            orderBy: "featuredAt"
        ) {
            edges {
                node {
                    ...ProductFragment
                }
            }
        }
        newProducts: products(
            filters: { onlyAvailableForOrder: true }
            pagination: { count: 4 }
            orderBy: "id"
        ) {
            edges {
                node {
                    ...ProductFragment
                }
            }
        }
        popularProducts: products(
            filters: { onlyAvailableForOrder: true }
            pagination: { count: 20 }
            orderBy: "popularity"
        ) {
            edges {
                node {
                    ...ProductFragment
                }
            }
        }
    }
    ${productFragment}
`;

const HomeContainer = (props) => {
    return (
        <>
            <Helmet
                title="Alt til drone, quadcopter, bygge selv eller RTF"
                description="Norsk nettbutikk for alt relatert til droner, quadcopter eller multicopter, enten du skal bygge selv eller ønsker ferdigbygget."
            >
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        url: windowHelper.origin(),
                        potentialAction: {
                            '@type': 'SearchAction',
                            target: `${windowHelper.origin()}/search?q={search_term_string}`,
                            'query-input': 'required name=search_term_string',
                        },
                    })}
                </script>
            </Helmet>
            <DefaultHookQuery queryHookData={useQuery(HomeQuery)}>
                {({ data }) => <Home {...props} data={data} />}
            </DefaultHookQuery>
        </>
    );
};

export default HomeContainer;
