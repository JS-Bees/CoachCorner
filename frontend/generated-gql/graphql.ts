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
  additionalNotes: Scalars['String']['output'];
  bookingSlots: Array<BookingSlot>;
  coach: Coach;
  coachId: Scalars['Int']['output'];
  coachee: Coachee;
  coacheeId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  serviceType: Scalars['String']['output'];
  status: BookingStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type BookingSlot = {
  __typename?: 'BookingSlot';
  active: Scalars['Boolean']['output'];
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
  affiliations: Scalars['String']['output'];
  bio: Scalars['String']['output'];
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
  mantra: Scalars['String']['output'];
  moviesGenres: Array<MovieGenres>;
  password: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  reviews: Array<Review>;
  sport: Sport;
  updatedAt: Scalars['DateTime']['output'];
  workplaceAddress: Scalars['String']['output'];
};

export type Coachee = {
  __typename?: 'Coachee';
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  affiliations: Scalars['String']['output'];
  bio: Scalars['String']['output'];
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
  mantra: Scalars['String']['output'];
  moviesGenres: Array<MovieGenres>;
  password: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  reviews: Array<Review>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CoachingRelationship = {
  __typename?: 'CoachingRelationship';
  active: Scalars['Boolean']['output'];
  coach: Coach;
  coachId: Scalars['Int']['output'];
  coachee: Coachee;
  coacheeId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  messagingStarted: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateBookingInput = {
  additionalNotes: Scalars['String']['input'];
  coachId: Scalars['Int']['input'];
  coacheeId: Scalars['Int']['input'];
  serviceType: Scalars['String']['input'];
  status: BookingStatus;
};

export type CreateBookingSlotInput = {
  date: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
  startTime: Scalars['DateTime']['input'];
};

export type CreateCoachInput = {
  affiliations: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  games: Array<Games>;
  hobbies: Array<Hobbies>;
  lastName: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  moviesGenres: Array<MovieGenres>;
  password: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  sport: Sport;
  workplaceAddress: Scalars['String']['input'];
};

export type CreateCoacheeInput = {
  address: Scalars['String']['input'];
  affiliations: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  games: Array<Games>;
  hobbies: Array<Hobbies>;
  lastName: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  moviesGenres: Array<MovieGenres>;
  password: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type CreateCoachingRelationshipInput = {
  coachId: Scalars['Int']['input'];
  coacheeId: Scalars['Int']['input'];
};

export type CreateReviewInput = {
  coachId: Scalars['Int']['input'];
  coacheeId: Scalars['Int']['input'];
  comment: Scalars['String']['input'];
  starRating: Scalars['Int']['input'];
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

export type MessagingStartedInput = {
  messagingStarted: Scalars['Boolean']['input'];
};

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
  createBooking: Booking;
  createCoach: Coach;
  createCoachee: Coachee;
  createCoachingRelationship: CoachingRelationship;
  createReview: Review;
  updateBookingStatus: Booking;
  updateCoachProfile: Coach;
  updateCoacheeProfile: Coachee;
  updateMessagingStartedCoachingRelationship: CoachingRelationship;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
  slotsInput: Array<CreateBookingSlotInput>;
};


export type MutationCreateCoachArgs = {
  input: CreateCoachInput;
};


export type MutationCreateCoacheeArgs = {
  input: CreateCoacheeInput;
};


export type MutationCreateCoachingRelationshipArgs = {
  input: CreateCoachingRelationshipInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationUpdateBookingStatusArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBookingStatusInput;
};


export type MutationUpdateCoachProfileArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCoachProfileInput;
};


export type MutationUpdateCoacheeProfileArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCoacheeProfileInput;
};


export type MutationUpdateMessagingStartedCoachingRelationshipArgs = {
  id: Scalars['Int']['input'];
  input: MessagingStartedInput;
};

export type Query = {
  __typename?: 'Query';
  coachees: Array<Coachee>;
  coaches: Array<Coach>;
  findBookingByID: Booking;
  findCoachByEmailAndPassword: Coach;
  findCoachByID: Coach;
  findCoacheeByEmailAndPassword: Coachee;
  findCoacheeByID: Coachee;
  findCoachesBySport: Array<Coach>;
  findUnaddedCoachesBySport: Array<Coach>;
};


export type QueryFindBookingByIdArgs = {
  bookingID: Scalars['Int']['input'];
};


export type QueryFindCoachByEmailAndPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryFindCoachByIdArgs = {
  userID: Scalars['Int']['input'];
};


export type QueryFindCoacheeByEmailAndPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryFindCoacheeByIdArgs = {
  userID: Scalars['Int']['input'];
};


export type QueryFindCoachesBySportArgs = {
  sport: Sport;
};


export type QueryFindUnaddedCoachesBySportArgs = {
  coacheeID: Scalars['Int']['input'];
  sport: Sport;
};

export type Review = {
  __typename?: 'Review';
  active: Scalars['Boolean']['output'];
  coach: Coach;
  coachId: Scalars['Int']['output'];
  coachee: Coachee;
  coacheeId: Scalars['Int']['output'];
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  starRating: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum Sport {
  Badminton = 'BADMINTON',
  Basketball = 'BASKETBALL',
  Soccer = 'SOCCER',
  Swimming = 'SWIMMING',
  Volleyball = 'VOLLEYBALL'
}

export type UpdateBookingStatusInput = {
  status: BookingStatus;
};

export type UpdateCoachProfileInput = {
  affiliations: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  workplaceAddress: Scalars['String']['input'];
};

export type UpdateCoacheeProfileInput = {
  address: Scalars['String']['input'];
  affiliations: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type CreateCoacheeMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  address: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  affiliations: Scalars['String']['input'];
  games: Array<Games> | Games;
  hobbies: Array<Hobbies> | Hobbies;
  moviesGenres: Array<MovieGenres> | MovieGenres;
}>;


export type CreateCoacheeMutation = { __typename?: 'Mutation', createCoachee: { __typename?: 'Coachee', id: number, email: string } };

export type CreateCoachMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  workplaceAddress: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  affiliations: Scalars['String']['input'];
  sport: Sport;
  games: Array<Games> | Games;
  hobbies: Array<Hobbies> | Hobbies;
  moviesGenres: Array<MovieGenres> | MovieGenres;
}>;


export type CreateCoachMutation = { __typename?: 'Mutation', createCoach: { __typename?: 'Coach', id: number, email: string } };

export type CreateCoachingRelationshipMutationVariables = Exact<{
  coachId: Scalars['Int']['input'];
  coacheeId: Scalars['Int']['input'];
}>;


export type CreateCoachingRelationshipMutation = { __typename?: 'Mutation', createCoachingRelationship: { __typename?: 'CoachingRelationship', id: number, coachId: number, coacheeId: number, messagingStarted: boolean, active: boolean, createdAt: any } };

export type CreateBookingMutationVariables = Exact<{
  input: CreateBookingInput;
  slotsInput: Array<CreateBookingSlotInput> | CreateBookingSlotInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: number, coacheeId: number, coachId: number, serviceType: string, status: BookingStatus, additionalNotes: string, bookingSlots: Array<{ __typename?: 'BookingSlot', id: number, bookingId: number, date: any, startTime: any, endTime: any }> } };

export type CreateReviewMutationVariables = Exact<{
  starRating: Scalars['Int']['input'];
  comment: Scalars['String']['input'];
  coachId: Scalars['Int']['input'];
  coacheeId: Scalars['Int']['input'];
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: number, starRating: number, comment: string, coachId: number, coacheeId: number } };

export type GetAllCoachesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCoachesQuery = { __typename?: 'Query', coaches: Array<{ __typename?: 'Coach', id: number, birthday: any, email: string, firstName: string, games: Array<Games>, hobbies: Array<Hobbies>, lastName: string, moviesGenres: Array<MovieGenres>, sport: Sport, workplaceAddress: string, isCoach: boolean }> };

export type FindCoacheeByEmailAndPasswordQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type FindCoacheeByEmailAndPasswordQuery = { __typename?: 'Query', findCoacheeByEmailAndPassword: { __typename?: 'Coachee', id: number, address: string, birthday: any, email: string, firstName: string, games: Array<Games>, hobbies: Array<Hobbies>, lastName: string, moviesGenres: Array<MovieGenres>, isCoach: boolean } };

export type FindCoachByEmailAndPasswordQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type FindCoachByEmailAndPasswordQuery = { __typename?: 'Query', findCoachByEmailAndPassword: { __typename?: 'Coach', id: number, birthday: any, email: string, firstName: string, games: Array<Games>, hobbies: Array<Hobbies>, lastName: string, moviesGenres: Array<MovieGenres>, sport: Sport, workplaceAddress: string, isCoach: boolean } };

export type FindCoacheeByIdQueryVariables = Exact<{
  userID: Scalars['Int']['input'];
}>;


export type FindCoacheeByIdQuery = { __typename?: 'Query', findCoacheeByID: { __typename?: 'Coachee', id: number, address: string, birthday: any, email: string, firstName: string, games: Array<Games>, hobbies: Array<Hobbies>, lastName: string, bio: string, affiliations: string, mantra: string, profilePicture: string, moviesGenres: Array<MovieGenres>, isCoach: boolean, coachingRelationships: Array<{ __typename?: 'CoachingRelationship', coach: { __typename?: 'Coach', firstName: string, lastName: string, sport: Sport } }> } };

export type FindCoachByIdQueryVariables = Exact<{
  userID: Scalars['Int']['input'];
}>;


export type FindCoachByIdQuery = { __typename?: 'Query', findCoachByID: { __typename?: 'Coach', id: number, birthday: any, email: string, firstName: string, games: Array<Games>, hobbies: Array<Hobbies>, lastName: string, sport: Sport, moviesGenres: Array<MovieGenres>, workplaceAddress: string, bio: string, affiliations: string, mantra: string, profilePicture: string, isCoach: boolean, coachingRelationships: Array<{ __typename?: 'CoachingRelationship', coachee: { __typename?: 'Coachee', firstName: string, lastName: string } }> } };

export type FindCoachesBySportQueryVariables = Exact<{
  sport: Sport;
}>;


export type FindCoachesBySportQuery = { __typename?: 'Query', findCoachesBySport: Array<{ __typename?: 'Coach', id: number, firstName: string, sport: Sport, email: string, lastName: string, birthday: any, password: string, workplaceAddress: string, games: Array<Games>, hobbies: Array<Hobbies>, moviesGenres: Array<MovieGenres>, affiliations: string, bio: string, mantra: string, profilePicture: string, isCoach: boolean, active: boolean, coachingRelationships: Array<{ __typename?: 'CoachingRelationship', id: number, coacheeId: number }> }> };

export type FindBookingByIdQueryVariables = Exact<{
  bookingID: Scalars['Int']['input'];
}>;


export type FindBookingByIdQuery = { __typename?: 'Query', findBookingByID: { __typename?: 'Booking', id: number, coacheeId: number, coachId: number, serviceType: string, status: BookingStatus, additionalNotes: string, bookingSlots: Array<{ __typename?: 'BookingSlot', id: number, bookingId: number, date: any, startTime: any, endTime: any }> } };

export type FindUnaddedCoachesBySportQueryVariables = Exact<{
  sport: Sport;
  coacheeID: Scalars['Int']['input'];
}>;


export type FindUnaddedCoachesBySportQuery = { __typename?: 'Query', findUnaddedCoachesBySport: Array<{ __typename?: 'Coach', id: number, firstName: string, lastName: string, email: string, sport: Sport, bio: string, workplaceAddress: string, affiliations: string, coachingRelationships: Array<{ __typename?: 'CoachingRelationship', coacheeId: number }> }> };

export type FindCoachByIdReviewQueryVariables = Exact<{
  userID: Scalars['Int']['input'];
}>;


export type FindCoachByIdReviewQuery = { __typename?: 'Query', findCoachByID: { __typename?: 'Coach', id: number, firstName: string, lastName: string, reviews: Array<{ __typename?: 'Review', coacheeId: number, starRating: number, comment: string, coachee: { __typename?: 'Coachee', firstName: string, lastName: string } }> } };

export type UpdateCoacheeProfileMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  address: Scalars['String']['input'];
  affiliations: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
}>;


export type UpdateCoacheeProfileMutation = { __typename?: 'Mutation', updateCoacheeProfile: { __typename?: 'Coachee', address: string, affiliations: string, bio: string, mantra: string, profilePicture: string } };

export type UpdateCoachProfileMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  workplaceAddress: Scalars['String']['input'];
  affiliations: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
}>;


export type UpdateCoachProfileMutation = { __typename?: 'Mutation', updateCoachProfile: { __typename?: 'Coach', workplaceAddress: string, affiliations: string, bio: string, mantra: string, profilePicture: string } };

export type UpdateMessagingStartedCoachingRelationshipMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  messagingStarted: Scalars['Boolean']['input'];
}>;


export type UpdateMessagingStartedCoachingRelationshipMutation = { __typename?: 'Mutation', updateMessagingStartedCoachingRelationship: { __typename?: 'CoachingRelationship', id: number, coachId: number, coacheeId: number, messagingStarted: boolean, active: boolean, updatedAt: any } };

export type UpdateBookingStatusMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  status: BookingStatus;
}>;


export type UpdateBookingStatusMutation = { __typename?: 'Mutation', updateBookingStatus: { __typename?: 'Booking', id: number, status: BookingStatus } };


export const CreateCoacheeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCoachee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mantra"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"affiliations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"games"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Games"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hobbies"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Hobbies"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moviesGenres"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieGenres"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoachee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"birthday"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"profilePicture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mantra"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mantra"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"affiliations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"affiliations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"games"},"value":{"kind":"Variable","name":{"kind":"Name","value":"games"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hobbies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hobbies"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"moviesGenres"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moviesGenres"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateCoacheeMutation, CreateCoacheeMutationVariables>;
export const CreateCoachDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCoach"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mantra"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"affiliations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sport"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sport"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"games"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Games"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hobbies"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Hobbies"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moviesGenres"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieGenres"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoach"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"birthday"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"profilePicture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mantra"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mantra"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"affiliations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"affiliations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sport"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sport"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"games"},"value":{"kind":"Variable","name":{"kind":"Name","value":"games"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hobbies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hobbies"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"moviesGenres"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moviesGenres"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateCoachMutation, CreateCoachMutationVariables>;
export const CreateCoachingRelationshipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoachingRelationship"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coachId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coacheeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoachingRelationship"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"coachId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coachId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"coacheeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coacheeId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coachId"}},{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}},{"kind":"Field","name":{"kind":"Name","value":"messagingStarted"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateCoachingRelationshipMutation, CreateCoachingRelationshipMutationVariables>;
export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slotsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingSlotInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"slotsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slotsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}},{"kind":"Field","name":{"kind":"Name","value":"coachId"}},{"kind":"Field","name":{"kind":"Name","value":"serviceType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"additionalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"bookingSlots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"starRating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coachId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coacheeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"starRating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"starRating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"coachId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coachId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"coacheeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coacheeId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"coachId"}},{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const GetAllCoachesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllCoaches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coaches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"workplaceAddress"}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}}]}}]}}]} as unknown as DocumentNode<GetAllCoachesQuery, GetAllCoachesQueryVariables>;
export const FindCoacheeByEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoacheeByEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}}]}}]}}]} as unknown as DocumentNode<FindCoacheeByEmailAndPasswordQuery, FindCoacheeByEmailAndPasswordQueryVariables>;
export const FindCoachByEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachByEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"workplaceAddress"}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}}]}}]}}]} as unknown as DocumentNode<FindCoachByEmailAndPasswordQuery, FindCoachByEmailAndPasswordQueryVariables>;
export const FindCoacheeByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoacheeByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"}},{"kind":"Field","name":{"kind":"Name","value":"mantra"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}},{"kind":"Field","name":{"kind":"Name","value":"coachingRelationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindCoacheeByIdQuery, FindCoacheeByIdQueryVariables>;
export const FindCoachByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"workplaceAddress"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"}},{"kind":"Field","name":{"kind":"Name","value":"mantra"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}},{"kind":"Field","name":{"kind":"Name","value":"coachingRelationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindCoachByIdQuery, FindCoachByIdQueryVariables>;
export const FindCoachesBySportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachesBySport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sport"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachesBySport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sport"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sport"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"workplaceAddress"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"moviesGenres"}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"mantra"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"coachingRelationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isCoach"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<FindCoachesBySportQuery, FindCoachesBySportQueryVariables>;
export const FindBookingByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindBookingByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findBookingByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}},{"kind":"Field","name":{"kind":"Name","value":"coachId"}},{"kind":"Field","name":{"kind":"Name","value":"serviceType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"additionalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"bookingSlots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}}]} as unknown as DocumentNode<FindBookingByIdQuery, FindBookingByIdQueryVariables>;
export const FindUnaddedCoachesBySportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUnaddedCoachesBySport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sport"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sport"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coacheeID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUnaddedCoachesBySport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sport"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sport"}}},{"kind":"Argument","name":{"kind":"Name","value":"coacheeID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coacheeID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"workplaceAddress"}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"}},{"kind":"Field","name":{"kind":"Name","value":"coachingRelationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}}]}}]}}]}}]} as unknown as DocumentNode<FindUnaddedCoachesBySportQuery, FindUnaddedCoachesBySportQueryVariables>;
export const FindCoachByIdReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachByIdReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindCoachByIdReviewQuery, FindCoachByIdReviewQueryVariables>;
export const UpdateCoacheeProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoacheeProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"affiliations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mantra"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoacheeProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"affiliations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"affiliations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mantra"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mantra"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"profilePicture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"mantra"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]} as unknown as DocumentNode<UpdateCoacheeProfileMutation, UpdateCoacheeProfileMutationVariables>;
export const UpdateCoachProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoachProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"affiliations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mantra"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoachProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"affiliations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"affiliations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mantra"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mantra"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"profilePicture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workplaceAddress"}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"mantra"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]} as unknown as DocumentNode<UpdateCoachProfileMutation, UpdateCoachProfileMutationVariables>;
export const UpdateMessagingStartedCoachingRelationshipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMessagingStartedCoachingRelationship"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messagingStarted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMessagingStartedCoachingRelationship"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"messagingStarted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messagingStarted"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coachId"}},{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}},{"kind":"Field","name":{"kind":"Name","value":"messagingStarted"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateMessagingStartedCoachingRelationshipMutation, UpdateMessagingStartedCoachingRelationshipMutationVariables>;
export const UpdateBookingStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookingStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookingStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookingStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>;