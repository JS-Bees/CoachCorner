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

export enum BookingStatus {
    Cancelled = 'CANCELLED',
    Completed = 'COMPLETED',
    Confirmed = 'CONFIRMED',
    Pending = 'PENDING',
}

export type Coach = {
    __typename?: 'Coach';
    email: Scalars['String']['output'];
    firstName: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    lastName: Scalars['String']['output'];
    sport: Sport;
};

export type Coachee = {
    __typename?: 'Coachee';
    firstName: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    lastName: Scalars['String']['output'];
};

export enum Games {
    Arknights = 'ARKNIGHTS',
    Azurelane = 'AZURELANE',
    Callofduty = 'CALLOFDUTY',
    Candycrush = 'CANDYCRUSH',
    Clashofclans = 'CLASHOFCLANS',
    Counterstrike = 'COUNTERSTRIKE',
    Dota = 'DOTA',
    Genshinimpact = 'GENSHINIMPACT',
    Lol = 'LOL',
    Minecraft = 'MINECRAFT',
    Mobilelegends = 'MOBILELEGENDS',
    Overwatch = 'OVERWATCH',
    Pubg = 'PUBG',
    Streetfighter = 'STREETFIGHTER',
    Tekken = 'TEKKEN',
    Valorant = 'VALORANT',
}

export enum Hobbies {
    Baking = 'BAKING',
    Cooking = 'COOKING',
    Dancing = 'DANCING',
    Hiking = 'HIKING',
    Painting = 'PAINTING',
    Photography = 'PHOTOGRAPHY',
    Reading = 'READING',
    Singing = 'SINGING',
    Travelling = 'TRAVELLING',
    Writing = 'WRITING',
}

export enum MovieGenres {
    Action = 'ACTION',
    Adventure = 'ADVENTURE',
    Anime = 'ANIME',
    Comedy = 'COMEDY',
    Documentary = 'DOCUMENTARY',
    Drama = 'DRAMA',
    Fantasy = 'FANTASY',
    Horror = 'HORROR',
    KDrama = 'KDrama',
    Musical = 'MUSICAL',
    Mystery = 'MYSTERY',
    Romance = 'ROMANCE',
    Scifi = 'SCIFI',
    Thriller = 'THRILLER',
}

export type Query = {
    __typename?: 'Query';
    coachees: Array<Coachee>;
    coaches: Array<Coach>;
};

export enum Sport {
    Badminton = 'BADMINTON',
    Basketball = 'BASKETBALL',
    Soccer = 'SOCCER',
    Swimming = 'SWIMMING',
    Volleyball = 'VOLLEYBALL',
}

export type GetAllCoachesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCoachesQuery = {
    __typename?: 'Query';
    coaches: Array<{
        __typename?: 'Coach';
        id: number;
        firstName: string;
        lastName: string;
        sport: Sport;
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
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetAllCoachesQuery, GetAllCoachesQueryVariables>;
