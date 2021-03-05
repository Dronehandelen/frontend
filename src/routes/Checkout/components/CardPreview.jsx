import React from 'react';

const cardBrandLogo = {
    visa: '/cards/light_visa.png',
    mastercard: '/cards/light_mastercard.png',
};
const CardPreview = ({ brand, last4, expYear, expMonth }) => {
    const image = cardBrandLogo[brand];

    return (
        <div className="d-flex">
            <div>
                {image && (
                    <img
                        src={image}
                        alt={brand}
                        style={{ maxHeight: '40px' }}
                    />
                )}
                {!image && brand}
            </div>
            <div className="ml-3">
                <div>**** **** **** {last4}</div>
                <div>
                    {expYear}/{expMonth}
                </div>
            </div>
        </div>
    );
};

export default CardPreview;
