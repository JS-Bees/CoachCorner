import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:5050/graphql',
    documents: ['./graphql/**/*.graphql'], // changed .tsx to .graphql (check docs)
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './generated-gql/': {
            preset: 'client',
        },
    },
};

export default config;
