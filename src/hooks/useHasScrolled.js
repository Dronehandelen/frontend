import React from 'react';
import useScroll from './useScroll';

export default (callback, deps) => {
    const didMountRef = React.useRef(false);
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const { scrollY } = useScroll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => setHasScrolled(false), [setHasScrolled, ...deps]);

    React.useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }

        if (!hasScrolled) {
            setHasScrolled(true);
            callback();
        }
    }, [scrollY, setHasScrolled, callback, hasScrolled]);
};
