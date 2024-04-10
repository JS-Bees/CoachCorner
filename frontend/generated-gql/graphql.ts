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
  contacts: Array<Contact>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  interests: Array<CoachInterest>;
  lastName: Scalars['String']['output'];
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
  contacts: Array<Contact>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  interests: Array<CoacheeInterest>;
  lastName: Scalars['String']['output'];
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
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
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
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
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

export type CreateNewCoachInterestInput = {
  coachId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateNewCoacheeInterestInput = {
  coacheeId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
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
  createCoachInterest: CoachInterest;
  createCoachTask: CoachTask;
  createCoachee: Coachee;
  createCoacheeInterest: CoacheeInterest;
  createCoacheeTask: CoacheeTask;
  createContact: Contact;
  createReview: Review;
  createSportsCredentials: SportsCredential;
  updateBookingSlotStatus: BookingSlot;
  updateBookingStatus: Booking;
  updateCoachInterests: Array<CoachInterest>;
  updateCoachProfile: Coach;
  updateCoachTask: CoachTask;
  updateCoacheeInterests: Array<CoacheeInterest>;
  updateCoacheeProfile: Coachee;
  updateCoacheeTask: CoacheeTask;
  updateContactedStatus: Contact;
  updatePendingBooking: Booking;
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


export type MutationCreateCoachInterestArgs = {
  input: CreateNewCoachInterestInput;
};


export type MutationCreateCoachTaskArgs = {
  input: CreateCoachTaskInput;
};


export type MutationCreateCoacheeArgs = {
  input: CreateCoacheeInput;
  interestsInput: Array<CreateCoacheeInterestInput>;
};


export type MutationCreateCoacheeInterestArgs = {
  input: CreateNewCoacheeInterestInput;
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


export type MutationUpdateBookingSlotStatusArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBookingSlotStatusInput;
};


export type MutationUpdateBookingStatusArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBookingStatusInput;
};


export type MutationUpdateCoachInterestsArgs = {
  input: Array<UpdateCoachInterestInput>;
};


export type MutationUpdateCoachProfileArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCoachProfileInput;
};


export type MutationUpdateCoachTaskArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCoachTaskInput;
};


export type MutationUpdateCoacheeInterestsArgs = {
  input: Array<UpdateCoacheeInterestInput>;
};


export type MutationUpdateCoacheeProfileArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCoacheeProfileInput;
};


export type MutationUpdateCoacheeTaskArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCoacheeTaskInput;
};


export type MutationUpdateContactedStatusArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContactedStatusInput;
};


export type MutationUpdatePendingBookingArgs = {
  addSlots: Array<CreateBookingSlotInput>;
  bookingData: UpdateBookingInput;
  bookingId: Scalars['Int']['input'];
  deleteSlotsIds: Array<Scalars['Int']['input']>;
  updateSlots: Array<UpdateBookingSlotInput>;
  updateSlotsIds: Array<Scalars['Int']['input']>;
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
  findContactsOfCoach: Array<Contact>;
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


export type QueryFindContactsOfCoachArgs = {
  coachId: Scalars['Int']['input'];
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

export type UpdateBookingInput = {
  additionalNotes: Scalars['String']['input'];
  serviceType: Scalars['String']['input'];
};

export type UpdateBookingSlotInput = {
  date: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
  id: Scalars['Int']['input'];
  startTime: Scalars['DateTime']['input'];
  status: Scalars['String']['input'];
};

export type UpdateBookingSlotStatusInput = {
  status: Scalars['String']['input'];
};

export type UpdateBookingStatusInput = {
  status: Scalars['String']['input'];
};

export type UpdateCoachInterestInput = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type UpdateCoachProfileInput = {
  address: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type UpdateCoachTaskInput = {
  completionStatus: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateCoacheeInterestInput = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type UpdateCoacheeProfileInput = {
  address: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type UpdateCoacheeTaskInput = {
  completionStatus: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
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

export type CreateReviewMutationVariables = Exact<{
  input: CreateReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', coach: { __typename?: 'Coach', firstName: string, lastName: string, reviews: Array<{ __typename?: 'Review', starRating: number, comment: string, coachee: { __typename?: 'Coachee', id: number, firstName: string, lastName: string } }> } } };

export type CreateBookingMutationVariables = Exact<{
  input: CreateBookingInput;
  slotsInput: Array<CreateBookingSlotInput> | CreateBookingSlotInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: number, serviceType: string, additionalNotes: string, status: string, coach: { __typename?: 'Coach', firstName: string, lastName: string }, coachee: { __typename?: 'Coachee', firstName: string, lastName: string }, bookingSlots: Array<{ __typename?: 'BookingSlot', id: number, date: any, startTime: any, endTime: any, status: string }> } };
export type CreateCoachTaskMutationVariables = Exact<{
  input: CreateCoachTaskInput;
}>;


export type CreateCoachTaskMutation = { __typename?: 'Mutation', createCoachTask: { __typename?: 'CoachTask', coach: { __typename?: 'Coach', firstName: string, lastName: string, tasks: Array<{ __typename?: 'CoachTask', id: number, description: string, completionStatus: string }> } } };

export type CreateCoacheeTaskMutationVariables = Exact<{
  input: CreateCoacheeTaskInput;
}>;


export type CreateCoacheeTaskMutation = { __typename?: 'Mutation', createCoacheeTask: { __typename?: 'CoacheeTask', coachee: { __typename?: 'Coachee', firstName: string, lastName: string, tasks: Array<{ __typename?: 'CoacheeTask', id: number, description: string, completionStatus: string }> } } };

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


export type FindCoacheeByIdQuery = { __typename?: 'Query', findCoacheeByID: { __typename?: 'Coachee', id: number, firstName: string, lastName: string, email: string, password: string, bio: string, address: string, profilePicture: string, interests: Array<{ __typename?: 'CoacheeInterest', id: number, type: string, name: string }>, reviews: Array<{ __typename?: 'Review', starRating: number, comment: string }>, tasks: Array<{ __typename?: 'CoacheeTask', active: boolean, completionStatus: string, createdAt: any, date: any, description: string, id: number, title: string, updatedAt: any }> } };

export type FindCoachByIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FindCoachByIdQuery = { __typename?: 'Query', findCoachByID: { __typename?: 'Coach', id: number, firstName: string, lastName: string, email: string, password: string, bio: string, address: string, profilePicture: string, interests: Array<{ __typename?: 'CoachInterest', id: number, type: string, name: string }>, sports: Array<{ __typename?: 'Sport', type: string }>, reviews: Array<{ __typename?: 'Review', starRating: number, comment: string }>, tasks: Array<{ __typename?: 'CoachTask', active: boolean, completionStatus: string, createdAt: any, date: any, description: string, id: number, title: string, updatedAt: any }> } };

export type FindCoachesBySportQueryVariables = Exact<{
  sportType: Scalars['String']['input'];
}>;


export type FindCoachesBySportQuery = { __typename?: 'Query', findCoachesBySport: Array<{ __typename?: 'Coach', id: number, firstName: string, lastName: string, bio: string, address: string, reviews: Array<{ __typename?: 'Review', starRating: number, comment: string }> }> };

export type FindFavoriteCoachesQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FindFavoriteCoachesQuery = { __typename?: 'Query', findCoacheeByID: { __typename?: 'Coachee', contacts: Array<{ __typename?: 'Contact', coachId: number, contactedStatus: boolean, coach: { __typename?: 'Coach', firstName: string, lastName: string, bio: string, address: string, sports: Array<{ __typename?: 'Sport', type: string }>, reviews: Array<{ __typename?: 'Review', starRating: number, comment: string }> } }> } };

export type FindCoacheesOfCoachQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FindCoacheesOfCoachQuery = { __typename?: 'Query', findCoachByID: { __typename?: 'Coach', contacts: Array<{ __typename?: 'Contact', coacheeId: number, contactedStatus: boolean, coachee: { __typename?: 'Coachee', firstName: string, lastName: string, profilePicture: string } }> } };

export type FindBookingsOfCoachQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FindBookingsOfCoachQuery = { __typename?: 'Query', findCoachByID: { __typename?: 'Coach', bookings: Array<{ __typename?: 'Booking', id: number, status: string, coacheeId: number, serviceType: string, additionalNotes: string, coachee: { __typename?: 'Coachee', firstName: string, lastName: string, profilePicture: string }, bookingSlots: Array<{ __typename?: 'BookingSlot', id: number, date: any, startTime: any, endTime: any }> }> } };

export type FindBookingsOfCoacheeQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FindBookingsOfCoacheeQuery = { __typename?: 'Query', findCoacheeByID: { __typename?: 'Coachee', bookings: Array<{ __typename?: 'Booking', id: number, status: string, coachId: number, serviceType: string, additionalNotes: string, coach: { __typename?: 'Coach', firstName: string, lastName: string, profilePicture: string }, bookingSlots: Array<{ __typename?: 'BookingSlot', date: any, startTime: any, endTime: any }> }> } };

export type GetCoachReviewsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetCoachReviewsQuery = { __typename?: 'Query', findCoachByID: { __typename?: 'Coach', firstName: string, lastName: string, reviews: Array<{ __typename?: 'Review', starRating: number, comment: string, coachee: { __typename?: 'Coachee', firstName: string, lastName: string } }> } };

export type GetSortedCoachesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSortedCoachesQuery = { __typename?: 'Query', coaches: Array<{ __typename?: 'Coach', id: number, firstName: string, lastName: string, bio: string, address: string, sports: Array<{ __typename?: 'Sport', type: string }>, reviews: Array<{ __typename?: 'Review', starRating: number, comment: string }>, interests: Array<{ __typename?: 'CoachInterest', type: string, name: string }> }> };

export type UpdateCoacheeProfileMutationVariables = Exact<{
  updateCoacheeProfileId: Scalars['Int']['input'];
  input: UpdateCoacheeProfileInput;
}>;


export type UpdateCoacheeProfileMutation = { __typename?: 'Mutation', updateCoacheeProfile: { __typename?: 'Coachee', address: string, bio: string, profilePicture: string } };

export type UpdateCoachProfileMutationVariables = Exact<{
  updateCoachProfileId: Scalars['Int']['input'];
  input: UpdateCoachProfileInput;
}>;


export type UpdateCoachProfileMutation = { __typename?: 'Mutation', updateCoachProfile: { __typename?: 'Coach', address: string, bio: string, profilePicture: string } };

export type CreateContactMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', coachId: number, coacheeId: number, contactedStatus: boolean } };

export type UpdateBookingStatusMutationVariables = Exact<{
  updateBookingStatusId: Scalars['Int']['input'];
  input: UpdateBookingStatusInput;
}>;


export type UpdateBookingStatusMutation = { __typename?: 'Mutation', updateBookingStatus: { __typename?: 'Booking', id: number, status: string, serviceType: string, additionalNotes: string, bookingSlots: Array<{ __typename?: 'BookingSlot', endTime: any, startTime: any, date: any }> } };

export type UpdateBookingDataMutationVariables = Exact<{
  bookingId: Scalars['Int']['input'];
  updateSlotsIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  deleteSlotsIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  bookingData: UpdateBookingInput;
  updateSlots: Array<UpdateBookingSlotInput> | UpdateBookingSlotInput;
  addSlots: Array<CreateBookingSlotInput> | CreateBookingSlotInput;
}>;


export type UpdateBookingDataMutation = { __typename?: 'Mutation', updatePendingBooking: { __typename?: 'Booking', id: number, serviceType: string, additionalNotes: string, bookingSlots: Array<{ __typename?: 'BookingSlot', id: number, date: any, endTime: any, startTime: any }> } };
export type UpdateCoachTaskMutationVariables = Exact<{
  updateCoachTaskId: Scalars['Int']['input'];
  input: UpdateCoachTaskInput;
}>;


export type UpdateCoachTaskMutation = { __typename?: 'Mutation', updateCoachTask: { __typename?: 'CoachTask', description: string, id: number, title: string, updatedAt: any, completionStatus: string, createdAt: any, date: any, active: boolean, coach: { __typename?: 'Coach', firstName: string, lastName: string, tasks: Array<{ __typename?: 'CoachTask', active: boolean, description: string, id: number }> } } };

export type UpdateCoacheeTaskMutationVariables = Exact<{
  updateCoachTaskId: Scalars['Int']['input'];
  input: UpdateCoacheeTaskInput;
}>;


export type UpdateCoacheeTaskMutation = { __typename?: 'Mutation', updateCoacheeTask: { __typename?: 'CoacheeTask', description: string, id: number, title: string, updatedAt: any, completionStatus: string, createdAt: any, date: any, active: boolean, coachee: { __typename?: 'Coachee', firstName: string, lastName: string, tasks: Array<{ __typename?: 'CoacheeTask', active: boolean, description: string, id: number }> } } };

export type UpdateCoachInterestsMutationVariables = Exact<{
  input: Array<UpdateCoachInterestInput> | UpdateCoachInterestInput;
}>;


export type UpdateCoachInterestsMutation = { __typename?: 'Mutation', updateCoachInterests: Array<{ __typename?: 'CoachInterest', id: number, name: string, type: string, updatedAt: any }> };

export type UpdateCoacheeInterestsMutationVariables = Exact<{
  input: Array<UpdateCoacheeInterestInput> | UpdateCoacheeInterestInput;
}>;


export type UpdateCoacheeInterestsMutation = { __typename?: 'Mutation', updateCoacheeInterests: Array<{ __typename?: 'CoacheeInterest', id: number, name: string, type: string, updatedAt: any }> };


export const CreateCoachDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoach"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoachInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interestsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoachInterestInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sportsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSportInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoach"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"interestsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interestsInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"sportsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sportsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<CreateCoachMutation, CreateCoachMutationVariables>;
export const CreateCoacheeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoachee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoacheeInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interestsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoacheeInterestInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoachee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"interestsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interestsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateCoacheeMutation, CreateCoacheeMutationVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReviewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slotsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingSlotInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"slotsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slotsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceType"}},{"kind":"Field","name":{"kind":"Name","value":"additionalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"bookingSlots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const CreateCoachTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoachTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoachTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoachTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"completionStatus"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateCoachTaskMutation, CreateCoachTaskMutationVariables>;
export const CreateCoacheeTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoacheeTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoacheeTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoacheeTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"completionStatus"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateCoacheeTaskMutation, CreateCoacheeTaskMutationVariables>;
export const FindCoachByEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachByEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FindCoachByEmailAndPasswordQuery, FindCoachByEmailAndPasswordQueryVariables>;
export const FindCoacheeByEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoacheeByEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FindCoacheeByEmailAndPasswordQuery, FindCoacheeByEmailAndPasswordQueryVariables>;
export const FindCoacheeByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoacheeByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"completionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindCoacheeByIdQuery, FindCoacheeByIdQueryVariables>;
export const FindCoachByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"completionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindCoachByIdQuery, FindCoachByIdQueryVariables>;
export const FindCoachesBySportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoachesBySport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sportType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachesBySport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sportType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sportType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]}}]} as unknown as DocumentNode<FindCoachesBySportQuery, FindCoachesBySportQueryVariables>;
export const FindFavoriteCoachesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindFavoriteCoaches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coachId"}},{"kind":"Field","name":{"kind":"Name","value":"contactedStatus"}},{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"sports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindFavoriteCoachesQuery, FindFavoriteCoachesQueryVariables>;
export const FindCoacheesOfCoachDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCoacheesOfCoach"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}},{"kind":"Field","name":{"kind":"Name","value":"contactedStatus"}},{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindCoacheesOfCoachQuery, FindCoacheesOfCoachQueryVariables>;
export const FindBookingsOfCoachDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindBookingsOfCoach"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}},{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceType"}},{"kind":"Field","name":{"kind":"Name","value":"additionalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"bookingSlots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindBookingsOfCoachQuery, FindBookingsOfCoachQueryVariables>;
export const FindBookingsOfCoacheeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindBookingsOfCoachee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoacheeByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"coachId"}},{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceType"}},{"kind":"Field","name":{"kind":"Name","value":"additionalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"bookingSlots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindBookingsOfCoacheeQuery, FindBookingsOfCoacheeQueryVariables>;
export const GetCoachReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCoachReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoachByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]}}]} as unknown as DocumentNode<GetCoachReviewsQuery, GetCoachReviewsQueryVariables>;
export const GetSortedCoachesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSortedCoaches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coaches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"sports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSortedCoachesQuery, GetSortedCoachesQueryVariables>;
export const UpdateCoacheeProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoacheeProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCoacheeProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCoacheeProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoacheeProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCoacheeProfileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]} as unknown as DocumentNode<UpdateCoacheeProfileMutation, UpdateCoacheeProfileMutationVariables>;
export const UpdateCoachProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoachProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCoachProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCoachProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoachProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCoachProfileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]} as unknown as DocumentNode<UpdateCoachProfileMutation, UpdateCoachProfileMutationVariables>;
export const CreateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coachId"}},{"kind":"Field","name":{"kind":"Name","value":"coacheeId"}},{"kind":"Field","name":{"kind":"Name","value":"contactedStatus"}}]}}]}}]} as unknown as DocumentNode<CreateContactMutation, CreateContactMutationVariables>;
export const UpdateBookingStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookingStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBookingStatusId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBookingStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookingStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBookingStatusId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"bookingSlots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceType"}},{"kind":"Field","name":{"kind":"Name","value":"additionalNotes"}}]}}]}}]} as unknown as DocumentNode<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>;
export const UpdateBookingDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookingData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSlotsIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteSlotsIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBookingInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSlots"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBookingSlotInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addSlots"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingSlotInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePendingBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateSlotsIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSlotsIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"deleteSlotsIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteSlotsIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookingData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingData"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateSlots"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSlots"}}},{"kind":"Argument","name":{"kind":"Name","value":"addSlots"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addSlots"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookingSlots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceType"}},{"kind":"Field","name":{"kind":"Name","value":"additionalNotes"}}]}}]}}]} as unknown as DocumentNode<UpdateBookingDataMutation, UpdateBookingDataMutationVariables>;
export const UpdateCoachTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoachTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCoachTaskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCoachTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoachTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCoachTaskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<UpdateCoachTaskMutation, UpdateCoachTaskMutationVariables>;
export const UpdateCoacheeTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoacheeTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCoachTaskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCoacheeTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoacheeTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCoachTaskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coachee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<UpdateCoacheeTaskMutation, UpdateCoacheeTaskMutationVariables>;
export const UpdateCoachInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoachInterests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCoachInterestInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoachInterests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCoachInterestsMutation, UpdateCoachInterestsMutationVariables>;
export const UpdateCoacheeInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoacheeInterests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCoacheeInterestInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoacheeInterests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCoacheeInterestsMutation, UpdateCoacheeInterestsMutationVariables>;
