import React from 'react';
import { Card } from 'reactstrap';
import useGetCheckoutDeliveryProductsQuery from '../../../../graphql/queries/getCheckoutDeliveryProducts.js';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import DeliveryAlternatives from './DeliveryAlternatives.jsx';
import tracking from '../../../../helpers/tracking.js';

const DeliveryAlternativesContainer = (props) => {
    React.useEffect(() => {
        tracking.checkoutAction(3);
    }, []);

    return (
        <div className="mt-3">
            <DefaultHookQuery
                queryHookData={useGetCheckoutDeliveryProductsQuery()}
            >
                {({ data }) => (
                    <DeliveryAlternatives
                        {...props}
                        alternatives={data.checkoutDeliveryOptions}
                    />
                )}
            </DefaultHookQuery>
        </div>
    );
};

export default ({ placeholder, ...props }) => {
    return (
        <Card
            body
            className="mt-2 bg-light"
            style={{ opacity: placeholder ? 0.5 : 1 }}
        >
            <div style={{ fontSize: '1.3em' }}>
                Hvordan skal varene leveres?
            </div>
            {!placeholder && <DeliveryAlternativesContainer {...props} />}
        </Card>
    );
};
