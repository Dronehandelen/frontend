import React from 'react';
import { gql, useQuery } from '@apollo/client';
import AlternativeWrapper from '../AlternativeWrapper.jsx';
import DropDown from '../../../../components/Dropdown/DropDown.jsx';
import DropDownToggle from '../../../../components/Dropdown/DropDownToggle.jsx';
import DropDownMenu from '../../../../components/Dropdown/DropDownMenu.jsx';
import DropDownItem from '../../../../components/Dropdown/DropDownItem.jsx';
import formatPrice from '../../../../helpers/formatPrice.js';
import appConfig from '../../../../config/app';

const GET_POST_OFFICE_QUERY = gql`
    query GetPostalOffices($carrier: String!, $postalCode: String!) {
        postalOffices2(carrier: $carrier, postalCode: $postalCode) {
            id
            name
        }
    }
`;

const PostNordMyPack = ({
    postalCode,
    selectedPostalOfficeId,
    onUpdateDeliveryMethod,
    selected,
    price,
}) => {
    const { loading, error, data } = useQuery(GET_POST_OFFICE_QUERY, {
        variables: {
            postalCode,
            carrier: appConfig.carriers.POSTNORD,
        },
    });

    const [inSelectionProcess, setInSelectionProcess] = React.useState(false);

    React.useEffect(() => {
        if (!data || (!selected && !inSelectionProcess)) {
            return;
        }

        if (inSelectionProcess) {
            onUpdateDeliveryMethod(data.postalOffices2[0]);
            setInSelectionProcess(false);
            return;
        }

        if (
            selectedPostalOfficeId &&
            data.postalOffices2.some(
                (postalOffice) => postalOffice.id === selectedPostalOfficeId
            )
        ) {
            return;
        }

        onUpdateDeliveryMethod(data.postalOffices2[0]);
    }, [
        data,
        selectedPostalOfficeId,
        onUpdateDeliveryMethod,
        selected,
        inSelectionProcess,
        setInSelectionProcess,
    ]);

    const selectedPostalOffice =
        data &&
        data.postalOffices2 &&
        data.postalOffices2.find((po) => po.id === selectedPostalOfficeId);

    return (
        <AlternativeWrapper
            title={
                <span>
                    Til butikken i nærheten ({formatPrice(price)}){' '}
                    <img
                        src="/postnord.svg"
                        width="100"
                        alt=""
                        className="ml-2"
                    />
                </span>
            }
            selected={selected}
            onSelect={() => setInSelectionProcess(true)}
        >
            <div className="mt-3">
                {!loading && !error && (
                    <DropDown>
                        <DropDownToggle style={{ backgroundColor: 'white' }}>
                            {selectedPostalOffice && selectedPostalOffice.name}
                        </DropDownToggle>
                        <DropDownMenu>
                            {data.postalOffices2.map((postalOffice, index) => (
                                <DropDownItem
                                    key={index}
                                    onClick={() =>
                                        onUpdateDeliveryMethod(postalOffice)
                                    }
                                    selected={
                                        selectedPostalOfficeId ===
                                        postalOffice.id
                                    }
                                >
                                    {postalOffice.name}
                                </DropDownItem>
                            ))}
                        </DropDownMenu>
                    </DropDown>
                )}
            </div>
        </AlternativeWrapper>
    );
};

export default PostNordMyPack;
