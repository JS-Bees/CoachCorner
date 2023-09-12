/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never;
      };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type Coach = {
    __typename?: 'Coach';
    firstName: Scalars['String']['output'];
    hobbies: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    lastName: Scalars['String']['output'];
    sport: Scalars['String']['output'];
};

export type Person = {
    __typename?: 'Person';
    familyName: Scalars['String']['output'];
    givenName: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    surveyResults: Scalars['Int']['output'];
};

export type Query = {
    __typename?: 'Query';
    coaches: Array<Coach>;
    hello: Scalars['String']['output'];
    herro: Scalars['String']['output'];
    people: Array<Person>;
};

export type GetAllCoachesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCoachesQuery = {
    __typename?: 'Query';
    coaches: Array<{
        __typename?: 'Coach';
        id: number;
        firstName: string;
        lastName: string;
        sport: string;
        hobbies: string;
    }>;
};

export const GetAllCoachesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'getAllCoaches' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'coaches' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'firstName' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lastName' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'sport' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'hobbies' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetAllCoachesQuery, GetAllCoachesQueryVariables>;
