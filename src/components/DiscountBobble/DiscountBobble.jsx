import React from 'react';
import cn from 'classnames';
import styles from './discountBobble.module.scss';

const DiscountBobble = ({ present, top, right, left, small = false, vip }) => {
    return (
        <div
            className={cn(styles.discountBobble, {
                [styles.small]: small,
                [styles.vip]: vip,
            })}
            style={{ top, right, left }}
        >
            <div>-{present.toFixed(0)}%</div>
            {vip && <div className={styles.vipText}>VIP</div>}
        </div>
    );
};

export default DiscountBobble;
