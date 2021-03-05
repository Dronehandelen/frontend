import React from 'react';
import cn from 'classnames';
import styles from './newBobble.module.scss';

const NewBobble = ({ top, right, left, small = false }) => {
    return (
        <div
            className={cn(styles.newBobble, {
                [styles.small]: small,
            })}
            style={{ top, right, left }}
        >
            Ny
        </div>
    );
};

export default NewBobble;
