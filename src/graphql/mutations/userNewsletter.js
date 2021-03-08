import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const MUTATION = gql`
    mutation UserNewsletter($newsletter: Boolean!) {
        userNewsletter(newsletter: $newsletter)
    }
`;

export default () => useMutation(MUTATION);
