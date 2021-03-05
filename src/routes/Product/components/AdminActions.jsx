import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const AdminActions = ({ product }) => {
    return (
        <Row className="mb-3">
            <Col>
                <Button
                    tag={Link}
                    to={`/admin/products/${product.id}`}
                    className="ml-1"
                    color="success"
                >
                    Til admin
                </Button>
            </Col>
        </Row>
    );
};

export default AdminActions;
