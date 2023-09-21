/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Booking = {
  __typename?: 'Booking';
  active: Scalars['Boolean']['output'];
  additionalNotes?: Maybe<Scalars['String']['output']>;
  bookingSlots: Array<BookingSlot>;
  coach: Coach;
  coachId: Scalars['Int']['output'];
  coachName: Scalars['String']['output'];
  coachee: Coachee;
  coacheeId: Scalars['Int']['output'];
  coacheeName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  serviceType: Scalars['String']['output'];
  status: BookingStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type BookingSlot = {
  __typename?: 'BookingSlot';
  booking: Booking;
  bookingId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  startTime: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum BookingStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type Coach = {
  __typename?: 'Coach';
  active: Scalars['Boolean']['output'];
  affiliations?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  birthday: Scalars['DateTime']['output'];
  bookings: Array<Booking>;
  coachingRelationships: Array<CoachingRelationship>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  games: Array<Games>;
  hobbies: Array<Hobbies>;
  id: Scalars['Int']['output'];
  isCoach: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  moviesGenres: Array<MovieGenres>;
  password: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  sport: Sport;
  updatedAt: Scalars['DateTime']['output'];
  workplaceAddress: Scalars['String']['output'];
};

export type Coachee = {
  __typename?: 'Coachee';
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  affiliations?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  birthday: Scalars['DateTime']['output'];
  bookings: Array<Booking>;
  coachingRelationships: Array<CoachingRelationship>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  games: Array<Games>;
  hobbies: Array<Hobbies>;
  id: Scalars['Int']['output'];
  isCoach: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  moviesGenres: Array<MovieGenres>;
  password: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CoachingRelationship = {
  __typename?: 'CoachingRelationship';
  coach: Coach;
  coachId: Scalars['Int']['output'];
  coachee: Coachee;
  coacheeId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCoachInput = {
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  games: Array<Games>;
  hobbies: Array<Hobbies>;
  lastName: Scalars['String']['input'];
  moviesGenres: Array<MovieGenres>;
  password: Scalars['String']['input'];
  sport: Sport;
  workplaceAddress: Scalars['String']['input'];
};

export type CreateCoacheeInput = {
  address: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  games: Array<Games>;
  hobbies: Array<Hobbies>;
  lastName: Scalars['String']['input'];
  moviesGenres: Array<MovieGenres>;
  password: Scalars['String']['input'];
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
  Valorant = 'VALORANT'
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
  Writing = 'WRITING'
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
  Kdrama = 'KDRAMA',
  Musical = 'MUSICAL',
  Mystery = 'MYSTERY',
  Romance = 'ROMANCE',
  Scifi = 'SCIFI',
  Thriller = 'THRILLER'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCoach?: Maybe<Coach>;
  createCoachee?: Maybe<Coachee>;
};


export type MutationCreateCoachArgs = {
  input: CreateCoachInput;
};


export type MutationCreateCoacheeArgs = {
  input: CreateCoacheeInput;
};

export type Query = {
  __typename?: 'Query';
  coachees?: Maybe<Array<Maybe<Coachee>>>;
  coaches?: Maybe<Array<Maybe<Coach>>>;
  findCoachByEmailAndPassword?: Maybe<Coach>;
  findCoacheeByEmailAndPassword?: Maybe<Coachee>;
};


export type QueryFindCoachByEmailAndPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryFindCoacheeByEmailAndPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum Sport {
  Badminton = 'BADMINTON',
  Basketball = 'BASKETBALL',
  Soccer = 'SOCCER',
  Swimming = 'SWIMMING',
  Volleyball = 'VOLLEYBALL'
}

export type CreateCoacheeMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  address: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  games: Array<Games> | Games;
  hobbies: Array<Hobbies> | Hobbies;
  moviesGenres: Array<MovieGenres> | MovieGenres;
}>;


export type CreateCoacheeMutation = { __typename?: 'Mutation', createCoachee?: { __typename?: 'Coachee', id: number, email: string } | null };

export type CreateCoachMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  workplaceAddress: Scalars['String']['input'];
  sport: Sport;
  games: Array<Games> | Games;
  hobbies: Array<Hobbies> | Hobbies;
  moviesGenres: Array<MovieGenres> | MovieGenres;
}>;


export type CreateCoachMutation = { __typename?: 'Mutation', createCoach?: { __typename?: 'Coach', id: number, email: string } | null };

export type GetAllCoachesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCoachesQuery = {
  length: number; __typename?: 'Query', coaches?: Array<{ __typename?: 'Coach', id: number, birthday: any, email: string, firstName: string, games: Array<Games>, hobbies: Array<Hobbies>, lastName: string, moviesGenres: Array<MovieGenres>, sport: Sport, workplaceAddress: string, isCoach: boolean } | null> | null 
};

export type FindCoacheeByEmailAndPasswordQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type FindCoacheeByEmailAndPasswordQuery = { __typename?: 'Query', findCoacheeByEmailAndPassword?: { __typename?: 'Coachee', id: number, address: string, birthday: any, email: string, firstName: string, games: Array<Games>, hobbies: Array<Hobbies>, lastName: string, moviesGenres: Array<MovieGenres>, isCoach: boolean } | null };

export type FindCoachByEmailAndPasswordQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type FindCoachByEmailAndPasswordQuery = { __typename?: 'Query', findCoachByEmailAndPassword?: { __typename?: 'Coach', id: number, birthday: any, email: string, firstName: string, games: Array<Games>, hobbies: Array<Hobbies>, lastName: string, moviesGenres: Array<MovieGenres>, sport: Sport, workplaceAddress: string, isCoach: boolean } | null };


export const CreateCoacheeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCoachee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"games"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Games"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hobbies"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Hobbies"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moviesGenres"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieGenres"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoachee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"birthday"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"games"},"value":{"kind":"Variable","name":{"kind":"Name","value":"games"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hobbies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hobbies"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"moviesGenres"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moviesGenres"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateCoacheeMutation, CreateCoacheeMutationVariables>;
export const CreateCoachDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCoach"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sport"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sport"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"games"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Games"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hobbies"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Hobbies"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moviesGenres"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieGenres"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoach"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"birthday"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sport"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sport"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"games"},"value":{"kind":"Variable","name":{"kind":"Name","value":"games"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hobbies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hobbies"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"moviesGenres"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moviesGenres"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateCoachMutation, CreateCoachMutationVariables>;
export const GetAllCoachesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllCoaches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coaches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"workplaceAddress"}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}}]}}]}}]} as unknown as DocumentNode<GetAllCoachesQuery, GetAllCoachesQueryVariables>;
export const FindCoacheeByEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoacheeByEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}}]}}]}}]} as unknown as DocumentNode<FindCoacheeByEmailAndPasswordQuery, FindCoacheeByEmailAndPasswordQueryVariables>;
export const FindCoachByEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachByEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"workplaceAddress"}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}}]}}]}}]} as unknown as DocumentNode<FindCoachByEmailAndPasswordQuery, FindCoachByEmailAndPasswordQueryVariables>;