import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:5050/graphql',
    documents: ['./graphql/**/*.graphql'], 
    ignoreNoDocuments: true, 
    generates: {
        './generated-gql/': {
            preset: 'client',
        },
    },
};

export default config;
