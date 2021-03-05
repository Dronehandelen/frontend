import React from 'react';
import { Alert } from 'reactstrap';

const VacationWarning = ({ className }) => {
    return (
        <Alert color="warning" className={className}>
            Alle bestillinger som er gjort mellom 22. desember og 3. januar vil
            bli sendt 4. januar
        </Alert>
    );
};

export default VacationWarning;
