import React from 'react';
import formatPrice from '../../../../helpers/formatPrice.js';
import appConfig from '../../../../config/app.js';
import AlternativeWrapper from '../AlternativeWrapper.jsx';
import BringSP from './BringSP.jsx';
import PostNordMyPack from './PostNordMyPack';

const DeliveryAlternatives = ({
    postalCode,
    selectedPostalOfficeId,
    onUpdateDeliveryMethod,
    deliveryType,
    isUpdatingCheckout,
    alternatives,
}) => {
    const hasAlternative = (alternative) =>
        alternatives.some((a) => a.id === alternative);

    const alternativePrice = (alternative) =>
        alternatives.find((a) => a.id === alternative).price;

    React.useEffect(() => {
        if (alternatives.length === 0) {
            return;
        }

        if (alternatives.some((a) => a.id === deliveryType)) {
            return;
        }

        onUpdateDeliveryMethod(alternatives[0].id);
    }, [deliveryType, alternatives]);

    return (
        <>
            {hasAlternative(appConfig.deliveryTypes.POSTNORD_MYPACK) && (
                <PostNordMyPack
                    postalCode={postalCode}
                    selectedPostalOfficeId={selectedPostalOfficeId}
                    onUpdateDeliveryMethod={(postalOffice) =>
                        onUpdateDeliveryMethod(
                            appConfig.deliveryTypes.POSTNORD_MYPACK,
                            postalOffice
                        )
                    }
                    selected={
                        appConfig.deliveryTypes.POSTNORD_MYPACK === deliveryType
                    }
                    isUpdatingCheckout={isUpdatingCheckout}
                    price={alternativePrice(
                        appConfig.deliveryTypes.POSTNORD_MYPACK
                    )}
                />
            )}
            {hasAlternative(
                appConfig.deliveryTypes.POSTNORD_MYPACK_HOME_SMALL
            ) && (
                <AlternativeWrapper
                    title={
                        <span>
                            Pakke i postkassen (
                            {formatPrice(
                                alternativePrice(
                                    appConfig.deliveryTypes
                                        .POSTNORD_MYPACK_HOME_SMALL
                                )
                            )}
                            ){' '}
                            <img
                                src="/postnord.svg"
                                width="100"
                                alt=""
                                className="ml-2"
                            />
                        </span>
                    }
                    onSelect={() =>
                        onUpdateDeliveryMethod(
                            appConfig.deliveryTypes.POSTNORD_MYPACK_HOME_SMALL,
                            null
                        )
                    }
                    selected={
                        appConfig.deliveryTypes.POSTNORD_MYPACK_HOME_SMALL ===
                        deliveryType
                    }
                >
                    <p>
                        <i>Leveres til postkassen din.</i>
                    </p>
                </AlternativeWrapper>
            )}
            {hasAlternative(appConfig.deliveryTypes.BRING_SP) && (
                <BringSP
                    postalCode={postalCode}
                    selectedPostalOfficeId={selectedPostalOfficeId}
                    onUpdateDeliveryMethod={(postalOffice) =>
                        onUpdateDeliveryMethod(
                            appConfig.deliveryTypes.BRING_SP,
                            postalOffice
                        )
                    }
                    selected={appConfig.deliveryTypes.BRING_SP === deliveryType}
                    isUpdatingCheckout={isUpdatingCheckout}
                    price={alternativePrice(appConfig.deliveryTypes.BRING_SP)}
                />
            )}
            {hasAlternative(appConfig.deliveryTypes.BRING_PIP) && (
                <AlternativeWrapper
                    title={
                        <span>
                            Pakke i postkassen (
                            {formatPrice(
                                alternativePrice(
                                    appConfig.deliveryTypes.BRING_PIP
                                )
                            )}
                            ) <img src="/posten.svg" alt="" className="ml-2" />
                        </span>
                    }
                    onSelect={() =>
                        onUpdateDeliveryMethod(
                            appConfig.deliveryTypes.BRING_PIP,
                            null
                        )
                    }
                    selected={
                        appConfig.deliveryTypes.BRING_PIP === deliveryType
                    }
                >
                    <p>
                        <i>Leveres til postkassen din.</i>
                    </p>
                </AlternativeWrapper>
            )}
            {hasAlternative(appConfig.deliveryTypes.GET_SELF) && (
                <AlternativeWrapper
                    title={`Hente selv (${formatPrice(
                        alternativePrice(appConfig.deliveryTypes.GET_SELF)
                    )})`}
                    onSelect={() =>
                        onUpdateDeliveryMethod(
                            appConfig.deliveryTypes.GET_SELF,
                            null
                        )
                    }
                    selected={appConfig.deliveryTypes.GET_SELF === deliveryType}
                >
                    <p>
                        <i>
                            Bor du i nærheten av Myre kan du hente pakken selv.
                            Adressen er Gisløy, 8430 Myre. Ta kontakt med oss
                            for å avtale henting.
                        </i>
                    </p>
                </AlternativeWrapper>
            )}
        </>
    );
};

export default DeliveryAlternatives;
