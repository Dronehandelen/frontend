import { useLazyQuery, gql } from '@apollo/client';

const EMAIL_EXISTS = gql`
    query EmailExists($email: String!) {
        emailExists(email: $email)
    }
`;

export default () => {
    const [emailExists, { loading, error, data }] = useLazyQuery(EMAIL_EXISTS);
    return [
        emailExists,
        { loading, error, emailExists: data ? data.emailExists : null },
    ];
};
