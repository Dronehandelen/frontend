import React from 'react';
import { Button, Spinner } from 'reactstrap';
import useVisibilitySensor from '@rooks/use-visibility-sensor';

const LoadMore = ({ loadMore, loadingMore }) => {
    const loadMoreRef = React.useRef();

    const { isVisible } = useVisibilitySensor(loadMoreRef, {
        scrollCheck: true,
        resizeCheck: true,
        partialVisibility: true,
        scrollDebounce: 10,
    });

    React.useEffect(() => {
        if (isVisible) {
            loadMore();
        }
    }, [isVisible]);

    return (
        <Button
            onClick={loadMore}
            disabled={loadingMore}
            innerRef={loadMoreRef}
        >
            {loadingMore ? <Spinner /> : 'Last inn flere'}
        </Button>
    );
};

export default LoadMore;
