import React from 'react';
import { Button, Input, Spinner } from 'reactstrap';
import CartContext from '../../../contexts/cartContext.js';

const AddToCartButton = ({ onAdd, max }) => {
    const { loading } = React.useContext(CartContext);
    const [amount, setAmount] = React.useState(1);

    return (
        <div className="d-flex mt-2">
            <div style={{ width: 90 }} className="pr-1">
                <Input
                    style={{ height: '100%' }}
                    type="number"
                    min={1}
                    max={max}
                    step={1}
                    onChange={(e) => {
                        if (!isNaN(e.target.value)) {
                            const newAmount = parseInt(e.target.value);
                            setAmount(newAmount);
                        }
                    }}
                    value={amount}
                />
            </div>
            <Button
                color={'primary'}
                block
                size="lg"
                onClick={() => {
                    if (amount > max) {
                        setAmount(max);
                    } else {
                        onAdd(amount);
                    }
                }}
                disabled={loading}
            >
                {loading ? <Spinner /> : 'Legg til i handlekurven'}
            </Button>
        </div>
    );
};

export default AddToCartButton;
