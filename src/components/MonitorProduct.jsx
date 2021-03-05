import React from 'react';
import { Alert, Button, Spinner } from 'reactstrap';
import useGetProductMonitorQuery from '../graphql/queries/getProductMonitor';
import useProductMonitorMutation from '../graphql/mutations/productMonitor';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import tracking from '../helpers/tracking.js';

const MonitorProduct = ({ productId }) => {
    const location = useLocation();
    const { isAuthenticated } = React.useContext(AuthContext);
    const [showMustLoginAlert, setShowMustLoginAlert] = React.useState(false);
    const { loading, error, data, refetch } = useGetProductMonitorQuery(
        productId
    );
    const [monitorProduct] = useProductMonitorMutation();

    return (
        <div>
            <p className="text-muted">
                Vi har desverre ikke denne varen på lager lenger. Du kan trykke
                på knappen under for å få beskjed når vi får den tilbake.
            </p>
            {loading && <Spinner />}
            {error && <Alert color="danger">Noe skjedde</Alert>}
            {!loading && !error && data && (
                <>
                    {data.product.isMonitoring && (
                        <p>
                            Du har meldt deg på oppdatering. Du vil få beskjed
                            når varen er tilbake på lager.
                        </p>
                    )}
                    {!data.product.isMonitoring && (
                        <Button
                            className="my-2"
                            color="warning"
                            block
                            size="lg"
                            onClick={async () => {
                                if (!isAuthenticated) {
                                    return setShowMustLoginAlert(true);
                                }

                                tracking.event(
                                    'Overvåk produkt module',
                                    'Overvåk produkt',
                                    String(productId)
                                );

                                await monitorProduct({
                                    variables: { productId },
                                });
                                refetch();
                            }}
                        >
                            Overvåk
                        </Button>
                    )}
                    {showMustLoginAlert && (
                        <Alert color="warning">
                            <p>Du må være innlogget for å overvåke produkter</p>
                            <Button
                                color="warning"
                                tag={Link}
                                to={`/login?redirectUrl=${
                                    location.pathname + location.search
                                }`}
                                onClick={() => {
                                    tracking.event(
                                        'Overvåk produkt module',
                                        '"Logg inn" clicked'
                                    );
                                }}
                            >
                                Logg inn
                            </Button>
                            <Button
                                color="warning"
                                tag={Link}
                                to="/register"
                                className="ml-2"
                                onClick={() => {
                                    tracking.event(
                                        'Overvåk produkt module',
                                        '"Lag bruker" clicked'
                                    );
                                }}
                            >
                                Lag bruker
                            </Button>
                        </Alert>
                    )}
                </>
            )}
        </div>
    );
};

export default MonitorProduct;
