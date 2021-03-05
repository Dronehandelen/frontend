import React from 'react';
import {
    default as ProductHelper,
    getDefaultProductImageUrl,
} from '../../../../helpers/product.js';
import styles from './cartProduct.module.scss';
import { Button, Input, Spinner } from 'reactstrap';
import formatPrice from '../../../../helpers/formatPrice.js';
import QuantityInput from '../../../../components/QuantityInput.jsx';
import { Link } from 'react-router-dom';
import ProductStockStatus from '../../../../components/ProductStockStatus.jsx';

const CartProduct = ({ product, amount, onSetAmount, isMobile }) => {
    const [deleting, setDeleting] = React.useState(false);
    const [tempAmount, setTempAmount] = React.useState(amount);
    const augmentedProduct = ProductHelper(product);

    React.useEffect(() => setTempAmount(amount), [amount, setTempAmount]);

    React.useEffect(() => {
        if (tempAmount === amount) {
            return;
        }

        const id = setTimeout(() => {
            onSetAmount(tempAmount);
        }, 500);

        return () => {
            clearTimeout(id);
        };
    }, [tempAmount]);

    return (
        <tr
            style={{
                backgroundColor:
                    augmentedProduct.totalCountAvailable() < amount &&
                    '#f8d7da',
            }}
        >
            <td>
                <div className={styles.imageWrapper}>
                    <img src={getDefaultProductImageUrl(product)} alt="" />
                </div>
            </td>
            <td>
                <div className={styles.title}>
                    <div>
                        <h4>
                            <Link
                                to={'/p/' + product.alias}
                                className="text-dark"
                            >
                                {product.title}
                            </Link>
                        </h4>
                        <div>{product.shortDescription}</div>
                        <ProductStockStatus
                            className="mt-2"
                            stock={product.stock}
                            countAvailableForBackorder={
                                product.countAvailableForBackorder
                            }
                            backorderMessage={product.backorderMessage}
                        />
                    </div>
                </div>
                {isMobile && (
                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            <QuantityInput
                                value={tempAmount}
                                onChange={(value) =>
                                    setTempAmount(value < 0 ? 0 : value)
                                }
                                max={product.stock}
                            />
                        </div>
                        <div className="pt-2 ">
                            <strong>
                                {formatPrice(amount * product.price)}
                            </strong>
                        </div>
                    </div>
                )}
            </td>
            {!isMobile && (
                <>
                    <td>
                        <div className={styles.input}>
                            <Input
                                type="number"
                                value={tempAmount}
                                onChange={(e) =>
                                    setTempAmount(parseInt(e.target.value))
                                }
                                min={1}
                                max={augmentedProduct.totalCountAvailable()}
                            />
                        </div>
                    </td>
                    <td className="text-right">
                        <strong>{product.price},-</strong>
                    </td>
                    <td className="text-right">
                        <strong>{amount * product.price},-</strong>
                    </td>
                    <td className="text-right">
                        <Button
                            color="danger"
                            onClick={() => {
                                setDeleting(true);
                                onSetAmount(0).then(() => setDeleting(false));
                            }}
                            disabled={deleting}
                        >
                            {deleting ? <Spinner /> : 'Slett'}
                        </Button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default CartProduct;
