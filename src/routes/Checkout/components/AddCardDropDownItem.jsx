import React from 'react';

const AddCardDropDownItem = () => {
    return (
        <div className="d-flex">
            <div>
                <i className="fa fa-plus-circle fa-2x" />
            </div>
            <div className="d-flex flex-column justify-content-center ml-3">
                Legg til kort
            </div>
        </div>
    );
};

export default AddCardDropDownItem;
