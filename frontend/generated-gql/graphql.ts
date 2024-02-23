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
  status: Scalars['String']['output'];
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
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Coach = {
  __typename?: 'Coach';
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  birthday: Scalars['DateTime']['output'];
  bookings: Array<Booking>;
  coachingRole: Scalars['Boolean']['output'];
  contacts: Array<Contact>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  interests: Array<CoachInterest>;
  lastName: Scalars['String']['output'];
  mantra: Scalars['String']['output'];
  password: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  reviews: Array<Review>;
  sports: Array<Sport>;
  tasks: Array<CoachTask>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CoachInterest = {
  __typename?: 'CoachInterest';
  active: Scalars['Boolean']['output'];
  coach: Coach;
  coachId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CoachTask = {
  __typename?: 'CoachTask';
  active: Scalars['Boolean']['output'];
  coach: Coach;
  coachId: Scalars['Int']['output'];
  completionStatus: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Coachee = {
  __typename?: 'Coachee';
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  birthday: Scalars['DateTime']['output'];
  bookings: Array<Booking>;
  coachingRole: Scalars['Boolean']['output'];
  contacts: Array<Contact>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  interests: Array<CoacheeInterest>;
  lastName: Scalars['String']['output'];
  mantra: Scalars['String']['output'];
  password: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  reviews: Array<Review>;
  tasks: Array<CoacheeTask>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CoacheeInterest = {
  __typename?: 'CoacheeInterest';
  active: Scalars['Boolean']['output'];
  coachee: Coachee;
  coacheeId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CoacheeTask = {
  __typename?: 'CoacheeTask';
  active: Scalars['Boolean']['output'];
  coachee: Coachee;
  coacheeId: Scalars['Int']['output'];
  completionStatus: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  active: Scalars['Boolean']['output'];
  coach: Coach;
  coachId: Scalars['Int']['output'];
  coachee: Coachee;
  coacheeId: Scalars['Int']['output'];
  contactedStatus: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  messages: Array<Message>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateBookingInput = {
  additionalNotes: Scalars['String']['input'];
  coachId: Scalars['Int']['input'];
  coacheeId: Scalars['Int']['input'];
  serviceType: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type CreateBookingSlotInput = {
  date: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
  startTime: Scalars['DateTime']['input'];
  status: Scalars['String']['input'];
};

export type CreateCoachInput = {
  address: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  coachingRole: Scalars['Boolean']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type CreateCoachInterestInput = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateCoachTaskInput = {
  coachId: Scalars['Int']['input'];
  completionStatus: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateCoacheeInput = {
  address: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  birthday: Scalars['DateTime']['input'];
  coachingRole: Scalars['Boolean']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type CreateCoacheeInterestInput = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateCoacheeTaskInput = {
  coacheeId: Scalars['Int']['input'];
  completionStatus: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateContactInput = {
  coachId: Scalars['Int']['input'];
  coacheeId: Scalars['Int']['input'];
  contactedStatus: Scalars['Boolean']['input'];
};

export type CreateMessageInput = {
  contactId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
};

export type CreateReviewInput = {
  coachId: Scalars['Int']['input'];
  coacheeId: Scalars['Int']['input'];
  comment: Scalars['String']['input'];
  starRating: Scalars['Int']['input'];
};

export type CreateSportInput = {
  type: Scalars['String']['input'];
};

export type CreateSportsCredentialsInput = {
  credentialPicture: Scalars['String']['input'];
  sportId: Scalars['Int']['input'];
};

export type Message = {
  __typename?: 'Message';
  contact: Contact;
  contactId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: Booking;
  createCoach: Coach;
  createCoachTask: CoachTask;
  createCoachee: Coachee;
  createCoacheeTask: CoacheeTask;
  createContact: Contact;
  createReview: Review;
  createSportsCredentials: SportsCredential;
  updateBookingStatus: Booking;
  updateCoachProfile: Coach;
  updateCoacheeProfile: Coachee;
  updateContactedStatus: Contact;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
  slotsInput: Array<CreateBookingSlotInput>;
};


export type MutationCreateCoachArgs = {
  input: CreateCoachInput;
  interestsInput: Array<CreateCoachInterestInput>;
  sportsInput: Array<CreateSportInput>;
};


export type MutationCreateCoachTaskArgs = {
  input: CreateCoachTaskInput;
};


export type MutationCreateCoacheeArgs = {
  input: CreateCoacheeInput;
  interestsInput: Array<CreateCoacheeInterestInput>;
};


export type MutationCreateCoacheeTaskArgs = {
  input: CreateCoacheeTaskInput;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateSportsCredentialsArgs = {
  input: CreateSportsCredentialsInput;
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


export type MutationUpdateContactedStatusArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContactedStatusInput;
};

export type Query = {
  __typename?: 'Query';
  coachees: Array<Coachee>;
  coaches: Array<Coach>;
  findBookingByID: Booking;
  findBookingsByStatusAndCoachID: Array<Booking>;
  findBookingsByStatusAndCoacheeID: Array<Booking>;
  findCoachByEmailAndPassword: Coach;
  findCoachByID: Coach;
  findCoacheeByEmailAndPassword: Coachee;
  findCoacheeByID: Coachee;
  findCoachesBySport: Array<Coach>;
  findNonContactCoachesBySport: Array<Coach>;
};


export type QueryFindBookingByIdArgs = {
  bookingID: Scalars['Int']['input'];
};


export type QueryFindBookingsByStatusAndCoachIdArgs = {
  coachID: Scalars['Int']['input'];
  status: Scalars['String']['input'];
};


export type QueryFindBookingsByStatusAndCoacheeIdArgs = {
  coacheeID: Scalars['Int']['input'];
  status: Scalars['String']['input'];
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
  sportType: Scalars['String']['input'];
};


export type QueryFindNonContactCoachesBySportArgs = {
  coacheeID: Scalars['Int']['input'];
  sportType: Scalars['String']['input'];
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

export type Sport = {
  __typename?: 'Sport';
  active: Scalars['Boolean']['output'];
  coach: Coach;
  coachId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  sportsCredentials: Array<SportsCredential>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SportsCredential = {
  __typename?: 'SportsCredential';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  credentialPicture: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  sport: Sport;
  sportId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateBookingStatusInput = {
  status: Scalars['String']['input'];
};

export type UpdateCoachProfileInput = {
  address: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type UpdateCoacheeProfileInput = {
  address: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  mantra: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type UpdateContactedStatusInput = {
  contactedStatus: Scalars['Boolean']['input'];
};

export type CreateCoachMutationVariables = Exact<{
  input: CreateCoachInput;
  interestsInput: Array<CreateCoachInterestInput> | CreateCoachInterestInput;
  sportsInput: Array<CreateSportInput> | CreateSportInput;
}>;


export type CreateCoachMutation = { __typename?: 'Mutation', createCoach: { __typename?: 'Coach', id: number, firstName: string, lastName: string } };

export type CreateCoacheeMutationVariables = Exact<{
  input: CreateCoacheeInput;
  interestsInput: Array<CreateCoacheeInterestInput> | CreateCoacheeInterestInput;
}>;


export type CreateCoacheeMutation = { __typename?: 'Mutation', createCoachee: { __typename?: 'Coachee', id: number, firstName: string, lastName: string, email: string } };

export type FindCoachByEmailAndPasswordQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type FindCoachByEmailAndPasswordQuery = { __typename?: 'Query', findCoachByEmailAndPassword: { __typename?: 'Coach', id: number, firstName: string, lastName: string } };

export type FindCoacheeByEmailAndPasswordQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type FindCoacheeByEmailAndPasswordQuery = { __typename?: 'Query', findCoacheeByEmailAndPassword: { __typename?: 'Coachee', id: number, firstName: string, lastName: string } };

export type FindCoacheeByIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FindCoacheeByIdQuery = { __typename?: 'Query', findCoacheeByID: { __typename?: 'Coachee', id: number, firstName: string, lastName: string } };

export type FindCoachByIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FindCoachByIdQuery = { __typename?: 'Query', findCoachByID: { __typename?: 'Coach', id: number, firstName: string, lastName: string } };


export const CreateCoachDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoach"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoachInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interestsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoachInterestInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sportsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSportInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoach"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"interestsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interestsInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"sportsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sportsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<CreateCoachMutation, CreateCoachMutationVariables>;
export const CreateCoacheeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoachee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoacheeInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interestsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoacheeInterestInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoachee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"interestsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interestsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateCoacheeMutation, CreateCoacheeMutationVariables>;
export const FindCoachByEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachByEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FindCoachByEmailAndPasswordQuery, FindCoachByEmailAndPasswordQueryVariables>;
export const FindCoacheeByEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoacheeByEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FindCoacheeByEmailAndPasswordQuery, FindCoacheeByEmailAndPasswordQueryVariables>;
export const FindCoacheeByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoacheeByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FindCoacheeByIdQuery, FindCoacheeByIdQueryVariables>;
export const FindCoachByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FindCoachByIdQuery, FindCoachByIdQueryVariables>;