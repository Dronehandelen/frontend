import * as React from 'react';
import { Alert, Spinner } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import getGraphqlError from '../helpers/getGraphqlError.js';
import NotFound from '../components/NotFound.jsx';

export default ({
    children,
    queryHookData,
    backgroundUpdate = false,
    handleNotFound = false,
}) => {
    const { t } = useTranslation();
    const { loading, error, ...dataProps } = queryHookData;

    if (
        loading &&
        (!backgroundUpdate ||
            dataProps.data == null ||
            Object.keys(dataProps.data).length === 0)
    ) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner />
            </div>
        );
    }

    if (error) {
        const parsedError = getGraphqlError(error);

        if (handleNotFound && parsedError.type === 'not_found') {
            return <NotFound />;
        }

        return <Alert color="danger">{t('Something happened')}</Alert>;
    }

    return children(dataProps);
};
