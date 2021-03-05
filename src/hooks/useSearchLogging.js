import React from 'react';
import { useDebounce } from 'moment-hooks';
import tracking from '../helpers/tracking.js';

export default (input, location = 'header') => {
    const debouncedInput = useDebounce(input, 1500);

    React.useEffect(() => {
        if (debouncedInput !== '') {
            tracking.event(
                'Search',
                `${location} search`,
                debouncedInput.toLowerCase()
            );
        }
    }, [debouncedInput, location]);
};
