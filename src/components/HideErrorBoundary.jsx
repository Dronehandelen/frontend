import React from 'react';

class HideErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <React.Fragment />;
        }

        return this.props.children;
    }
}
export default HideErrorBoundary;
