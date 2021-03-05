import React from 'react';
import { Button, Spinner } from 'reactstrap';
import CartContext from '../contexts/cartContext.js';
import ProductHelper from '../helpers/product.js';

const BuyButton = ({ product }) => {
    const augmentedProduct = ProductHelper(product);
    const { addProduct } = React.useContext(CartContext);
    const [adding, setAdding] = React.useState(false);

    const isSoldOut = augmentedProduct.totalCountAvailable() === 0;
    return (
        <>
            {!isSoldOut && (
                <Button
                    color="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setAdding(true);
                        addProduct(product, 1).then(() => setAdding(false));
                    }}
                    disabled={adding}
                >
                    {adding ? <Spinner /> : 'Kjøp'}
                </Button>
            )}
            {isSoldOut && <Button color="danger">Utsolgt</Button>}
        </>
    );
};

export default BuyButton;
