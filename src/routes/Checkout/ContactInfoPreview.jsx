import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'reactstrap';

const Table = styled.table`
    width: 100%;

    td {
        padding: 7px 5px;
        vertical-align: top;
    }
`;

const ContactInfoPreview = ({
    placeholder,
    deliveryInfo,
    email,
    onChange,
    onChangeEmail,
}) => {
    return (
        <Card body className="mt-3" style={{ opacity: placeholder ? 0.5 : 1 }}>
            <div style={{ fontSize: '1.3em' }}>Leveringsinformasjon</div>
            {!placeholder && (
                <>
                    <Table className="mt-2">
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Navn</strong>
                                </td>
                                <td>
                                    {deliveryInfo.firstName}{' '}
                                    {deliveryInfo.lastName}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Adresse</strong>
                                </td>
                                <td>
                                    <div>{deliveryInfo.address.co}</div>
                                    <div>
                                        {deliveryInfo.address.address},{' '}
                                        {deliveryInfo.address.postalCode}{' '}
                                        {deliveryInfo.address.postalPlace}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>E-post</strong>
                                </td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Telefon</strong>
                                </td>
                                <td>{deliveryInfo.phone}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div>
                        <Button className="mt-4" onClick={onChange}>
                            Endre
                        </Button>
                        <Button className="mt-4 ml-2" onClick={onChangeEmail}>
                            Endre e-post
                        </Button>
                    </div>
                </>
            )}
        </Card>
    );
};

export default ContactInfoPreview;
