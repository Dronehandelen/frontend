import React from 'react';
import styled from 'styled-components';
import { getDefaultProductImageUrl } from '../../helpers/product.js';
import formatPrice from '../../helpers/formatPrice.js';

const Table = styled.table`
    width: 100%;
    font-weight: 400;

    td {
        padding-bottom: 10px;
    }

    td:first-child {
        padding-right: 20px;
    }
`;

const ImageCell = styled.td`
    width: 60px;

    & > img {
        max-width: 100%;
    }
`;

const ShippingRow = styled.tr`
    & > td:first-child {
        text-align: center;
        font-size: 1em;
    }
`;

const TotalRow = styled.tr`
    & > td {
        padding-top: 10px;
        font-size: 1.3em;
    }
`;

const ItemsTable = ({ checkoutProducts, shippingPrice, totalPrice }) => {
    return (
        <div className="mb-2">
            <h3 className="mb-4">Dine varer</h3>
            <Table>
                <tbody>
                    {checkoutProducts.map((checkoutProduct) => (
                        <tr key={checkoutProduct.product.id}>
                            <ImageCell>
                                <img
                                    src={getDefaultProductImageUrl(
                                        checkoutProduct.product
                                    )}
                                    alt=""
                                />
                            </ImageCell>
                            <td>
                                {checkoutProduct.product.title} (
                                {checkoutProduct.amount} stk.)
                            </td>
                            <td className="text-right">
                                {formatPrice(
                                    checkoutProduct.price *
                                        checkoutProduct.amount
                                )}
                            </td>
                        </tr>
                    ))}
                    <ShippingRow>
                        <td>
                            <div className="fa fa-truck" />
                        </td>
                        <td>Frakt</td>
                        <td className="text-right">
                            {formatPrice(shippingPrice)}
                        </td>
                    </ShippingRow>
                </tbody>
            </Table>
            <Table className="mt-4">
                <tbody>
                    <TotalRow>
                        <td />
                        <td style={{ verticalAlign: 'top' }}>
                            Totalt å betale
                        </td>
                        <td className="text-right">
                            <div>
                                <strong style={{ fontSize: '1.3em' }}>
                                    {formatPrice(totalPrice)}
                                </strong>
                            </div>
                            <div>
                                <i style={{ fontSize: '0.7em' }}>
                                    herav mva{' '}
                                    {formatPrice(
                                        (
                                            totalPrice -
                                            totalPrice / 1.25
                                        ).toFixed(2)
                                    )}
                                </i>
                            </div>
                        </td>
                    </TotalRow>
                </tbody>
            </Table>
        </div>
    );
};

export default ItemsTable;
