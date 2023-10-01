/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation createCoachee($firstName: String!, $lastName: String!, $address: String!, $birthday: DateTime!, $email: String!, $password: String!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoachee(\n    input: {firstName: $firstName, lastName: $lastName, address: $address, birthday: $birthday, email: $email, password: $password, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation createCoach($firstName: String!, $lastName: String!, $birthday: DateTime!, $email: String!, $password: String!, $workplaceAddress: String!, $sport: Sport!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoach(\n    input: {firstName: $firstName, lastName: $lastName, birthday: $birthday, email: $email, password: $password, workplaceAddress: $workplaceAddress, sport: $sport, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation CreateCoachingRelationship($coachId: Int!, $coacheeId: Int!) {\n  createCoachingRelationship(input: {coachId: $coachId, coacheeId: $coacheeId}) {\n    id\n    coachId\n    coacheeId\n    messagingStarted\n    active\n    createdAt\n  }\n}\n\nmutation CreateBooking($input: CreateBookingInput!, $slotsInput: [CreateBookingSlotInput!]!) {\n  createBooking(input: $input, slotsInput: $slotsInput) {\n    id\n    coacheeId\n    coachId\n    serviceType\n    status\n    additionalNotes\n    bookingSlots {\n      id\n      bookingId\n      date\n      startTime\n      endTime\n    }\n  }\n}\n\nmutation CreateReview($starRating: Int!, $comment: String!, $coachId: Int!, $coacheeId: Int!) {\n  createReview(\n    input: {starRating: $starRating, comment: $comment, coachId: $coachId, coacheeId: $coacheeId}\n  ) {\n    id\n    starRating\n    comment\n    coachId\n    coacheeId\n  }\n}": types.CreateCoacheeDocument,
    "query getAllCoaches {\n  coaches {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    isCoach\n  }\n}\n\nquery FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoacheeByID($userID: Int!) {\n  findCoacheeByID(userID: $userID) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    isCoach\n  }\n}\n\nquery FindCoachByID($userID: Int!) {\n  findCoachByID(userID: $userID) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoachesBySport($sport: Sport!) {\n  findCoachesBySport(sport: $sport) {\n    id\n    firstName\n    sport\n    email\n    lastName\n    birthday\n    password\n    workplaceAddress\n    games\n    hobbies\n    moviesGenres\n    affiliations\n    bio\n    mantra\n    profilePicture\n    coachingRelationships {\n      id\n      coacheeId\n    }\n    isCoach\n    active\n  }\n}\n\nquery FindBookingByID($bookingID: Int!) {\n  findBookingByID(bookingID: $bookingID) {\n    id\n    coacheeId\n    coachId\n    serviceType\n    status\n    additionalNotes\n    bookingSlots {\n      id\n      bookingId\n      date\n      startTime\n      endTime\n    }\n  }\n}": types.GetAllCoachesDocument,
    "mutation UpdateCoacheeProfile($id: Int!, $address: String!, $affiliations: String, $bio: String, $mantra: String) {\n  updateCoacheeProfile(\n    id: $id\n    input: {address: $address, affiliations: $affiliations, bio: $bio, mantra: $mantra}\n  ) {\n    address\n    affiliations\n    bio\n    mantra\n  }\n}\n\nmutation UpdateCoachProfile($id: Int!, $workplaceAddress: String!, $affiliations: String, $bio: String, $mantra: String) {\n  updateCoachProfile(\n    id: $id\n    input: {workplaceAddress: $workplaceAddress, affiliations: $affiliations, bio: $bio, mantra: $mantra}\n  ) {\n    workplaceAddress\n    affiliations\n    bio\n    mantra\n  }\n}\n\nmutation UpdateMessagingStartedCoachingRelationship($id: Int!, $messagingStarted: Boolean!) {\n  updateMessagingStartedCoachingRelationship(\n    id: $id\n    input: {messagingStarted: $messagingStarted}\n  ) {\n    id\n    coachId\n    coacheeId\n    messagingStarted\n    active\n    updatedAt\n  }\n}\n\nmutation UpdateBookingStatus($id: Int!, $status: BookingStatus!) {\n  updateBookingStatus(id: $id, input: {status: $status}) {\n    id\n    status\n  }\n}": types.UpdateCoacheeProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createCoachee($firstName: String!, $lastName: String!, $address: String!, $birthday: DateTime!, $email: String!, $password: String!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoachee(\n    input: {firstName: $firstName, lastName: $lastName, address: $address, birthday: $birthday, email: $email, password: $password, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation createCoach($firstName: String!, $lastName: String!, $birthday: DateTime!, $email: String!, $password: String!, $workplaceAddress: String!, $sport: Sport!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoach(\n    input: {firstName: $firstName, lastName: $lastName, birthday: $birthday, email: $email, password: $password, workplaceAddress: $workplaceAddress, sport: $sport, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation CreateCoachingRelationship($coachId: Int!, $coacheeId: Int!) {\n  createCoachingRelationship(input: {coachId: $coachId, coacheeId: $coacheeId}) {\n    id\n    coachId\n    coacheeId\n    messagingStarted\n    active\n    createdAt\n  }\n}\n\nmutation CreateBooking($input: CreateBookingInput!, $slotsInput: [CreateBookingSlotInput!]!) {\n  createBooking(input: $input, slotsInput: $slotsInput) {\n    id\n    coacheeId\n    coachId\n    serviceType\n    status\n    additionalNotes\n    bookingSlots {\n      id\n      bookingId\n      date\n      startTime\n      endTime\n    }\n  }\n}\n\nmutation CreateReview($starRating: Int!, $comment: String!, $coachId: Int!, $coacheeId: Int!) {\n  createReview(\n    input: {starRating: $starRating, comment: $comment, coachId: $coachId, coacheeId: $coacheeId}\n  ) {\n    id\n    starRating\n    comment\n    coachId\n    coacheeId\n  }\n}"): (typeof documents)["mutation createCoachee($firstName: String!, $lastName: String!, $address: String!, $birthday: DateTime!, $email: String!, $password: String!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoachee(\n    input: {firstName: $firstName, lastName: $lastName, address: $address, birthday: $birthday, email: $email, password: $password, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation createCoach($firstName: String!, $lastName: String!, $birthday: DateTime!, $email: String!, $password: String!, $workplaceAddress: String!, $sport: Sport!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoach(\n    input: {firstName: $firstName, lastName: $lastName, birthday: $birthday, email: $email, password: $password, workplaceAddress: $workplaceAddress, sport: $sport, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation CreateCoachingRelationship($coachId: Int!, $coacheeId: Int!) {\n  createCoachingRelationship(input: {coachId: $coachId, coacheeId: $coacheeId}) {\n    id\n    coachId\n    coacheeId\n    messagingStarted\n    active\n    createdAt\n  }\n}\n\nmutation CreateBooking($input: CreateBookingInput!, $slotsInput: [CreateBookingSlotInput!]!) {\n  createBooking(input: $input, slotsInput: $slotsInput) {\n    id\n    coacheeId\n    coachId\n    serviceType\n    status\n    additionalNotes\n    bookingSlots {\n      id\n      bookingId\n      date\n      startTime\n      endTime\n    }\n  }\n}\n\nmutation CreateReview($starRating: Int!, $comment: String!, $coachId: Int!, $coacheeId: Int!) {\n  createReview(\n    input: {starRating: $starRating, comment: $comment, coachId: $coachId, coacheeId: $coacheeId}\n  ) {\n    id\n    starRating\n    comment\n    coachId\n    coacheeId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getAllCoaches {\n  coaches {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    isCoach\n  }\n}\n\nquery FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoacheeByID($userID: Int!) {\n  findCoacheeByID(userID: $userID) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    isCoach\n  }\n}\n\nquery FindCoachByID($userID: Int!) {\n  findCoachByID(userID: $userID) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoachesBySport($sport: Sport!) {\n  findCoachesBySport(sport: $sport) {\n    id\n    firstName\n    sport\n    email\n    lastName\n    birthday\n    password\n    workplaceAddress\n    games\n    hobbies\n    moviesGenres\n    affiliations\n    bio\n    mantra\n    profilePicture\n    coachingRelationships {\n      id\n      coacheeId\n    }\n    isCoach\n    active\n  }\n}\n\nquery FindBookingByID($bookingID: Int!) {\n  findBookingByID(bookingID: $bookingID) {\n    id\n    coacheeId\n    coachId\n    serviceType\n    status\n    additionalNotes\n    bookingSlots {\n      id\n      bookingId\n      date\n      startTime\n      endTime\n    }\n  }\n}"): (typeof documents)["query getAllCoaches {\n  coaches {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    isCoach\n  }\n}\n\nquery FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoacheeByID($userID: Int!) {\n  findCoacheeByID(userID: $userID) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    isCoach\n  }\n}\n\nquery FindCoachByID($userID: Int!) {\n  findCoachByID(userID: $userID) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n    isCoach\n  }\n}\n\nquery FindCoachesBySport($sport: Sport!) {\n  findCoachesBySport(sport: $sport) {\n    id\n    firstName\n    sport\n    email\n    lastName\n    birthday\n    password\n    workplaceAddress\n    games\n    hobbies\n    moviesGenres\n    affiliations\n    bio\n    mantra\n    profilePicture\n    coachingRelationships {\n      id\n      coacheeId\n    }\n    isCoach\n    active\n  }\n}\n\nquery FindBookingByID($bookingID: Int!) {\n  findBookingByID(bookingID: $bookingID) {\n    id\n    coacheeId\n    coachId\n    serviceType\n    status\n    additionalNotes\n    bookingSlots {\n      id\n      bookingId\n      date\n      startTime\n      endTime\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCoacheeProfile($id: Int!, $address: String!, $affiliations: String, $bio: String, $mantra: String) {\n  updateCoacheeProfile(\n    id: $id\n    input: {address: $address, affiliations: $affiliations, bio: $bio, mantra: $mantra}\n  ) {\n    address\n    affiliations\n    bio\n    mantra\n  }\n}\n\nmutation UpdateCoachProfile($id: Int!, $workplaceAddress: String!, $affiliations: String, $bio: String, $mantra: String) {\n  updateCoachProfile(\n    id: $id\n    input: {workplaceAddress: $workplaceAddress, affiliations: $affiliations, bio: $bio, mantra: $mantra}\n  ) {\n    workplaceAddress\n    affiliations\n    bio\n    mantra\n  }\n}\n\nmutation UpdateMessagingStartedCoachingRelationship($id: Int!, $messagingStarted: Boolean!) {\n  updateMessagingStartedCoachingRelationship(\n    id: $id\n    input: {messagingStarted: $messagingStarted}\n  ) {\n    id\n    coachId\n    coacheeId\n    messagingStarted\n    active\n    updatedAt\n  }\n}\n\nmutation UpdateBookingStatus($id: Int!, $status: BookingStatus!) {\n  updateBookingStatus(id: $id, input: {status: $status}) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation UpdateCoacheeProfile($id: Int!, $address: String!, $affiliations: String, $bio: String, $mantra: String) {\n  updateCoacheeProfile(\n    id: $id\n    input: {address: $address, affiliations: $affiliations, bio: $bio, mantra: $mantra}\n  ) {\n    address\n    affiliations\n    bio\n    mantra\n  }\n}\n\nmutation UpdateCoachProfile($id: Int!, $workplaceAddress: String!, $affiliations: String, $bio: String, $mantra: String) {\n  updateCoachProfile(\n    id: $id\n    input: {workplaceAddress: $workplaceAddress, affiliations: $affiliations, bio: $bio, mantra: $mantra}\n  ) {\n    workplaceAddress\n    affiliations\n    bio\n    mantra\n  }\n}\n\nmutation UpdateMessagingStartedCoachingRelationship($id: Int!, $messagingStarted: Boolean!) {\n  updateMessagingStartedCoachingRelationship(\n    id: $id\n    input: {messagingStarted: $messagingStarted}\n  ) {\n    id\n    coachId\n    coacheeId\n    messagingStarted\n    active\n    updatedAt\n  }\n}\n\nmutation UpdateBookingStatus($id: Int!, $status: BookingStatus!) {\n  updateBookingStatus(id: $id, input: {status: $status}) {\n    id\n    status\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;