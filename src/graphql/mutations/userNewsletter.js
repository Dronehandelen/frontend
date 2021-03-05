import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
    mutation UserNewsletter($newsletter: Boolean!) {
        userNewsletter(newsletter: $newsletter)
    }
`;

export default () => useMutation(MUTATION);
