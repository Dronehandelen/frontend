import React from 'react';
import AlternativeWrapper from '../AlternativeWrapper.jsx';
import useGetPostalOfficesQuery from '../../../../graphql/queries/getPostalOffices.js';
import DropDown from '../../../../components/Dropdown/DropDown.jsx';
import DropDownToggle from '../../../../components/Dropdown/DropDownToggle.jsx';
import DropDownMenu from '../../../../components/Dropdown/DropDownMenu.jsx';
import DropDownItem from '../../../../components/Dropdown/DropDownItem.jsx';
import formatPrice from '../../../../helpers/formatPrice.js';

const BringAny = ({
    postalCode,
    selectedPostalOfficeId,
    onUpdateDeliveryMethod,
    selected,
    price,
}) => {
    const { loading, error, data } = useGetPostalOfficesQuery(postalCode);
    const [inSelectionProcess, setInSelectionProcess] = React.useState(false);

    React.useEffect(() => {
        if (!data || (!selected && !inSelectionProcess)) {
            return;
        }

        if (inSelectionProcess) {
            onUpdateDeliveryMethod(data.postalOffices[0]);
            setInSelectionProcess(false);
            return;
        }

        if (
            selectedPostalOfficeId &&
            data.postalOffices.some(
                (postalOffice) => postalOffice.id === selectedPostalOfficeId
            )
        ) {
            return;
        }

        onUpdateDeliveryMethod(data.postalOffices[0]);
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
        data.postalOffices &&
        data.postalOffices.find((po) => po.id === selectedPostalOfficeId);

    return (
        <AlternativeWrapper
            title={
                <span>
                    Til butikken i nærheten ({formatPrice(price)}){' '}
                    <img src="/posten.svg" alt="" className="ml-2" />
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
                            {data.postalOffices.map((postalOffice, index) => (
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

export default BringAny;
