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
    "mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n\nmutation CreateReview($input: CreateReviewInput!) {\n  createReview(input: $input) {\n    coach {\n      firstName\n      lastName\n      reviews {\n        coachee {\n          id\n          firstName\n          lastName\n        }\n        starRating\n        comment\n      }\n    }\n  }\n}\n\nmutation CreateBooking($input: CreateBookingInput!, $slotsInput: [CreateBookingSlotInput!]!) {\n  createBooking(input: $input, slotsInput: $slotsInput) {\n    id\n    coach {\n      firstName\n      lastName\n    }\n    coachee {\n      firstName\n      lastName\n    }\n    serviceType\n    additionalNotes\n    status\n    bookingSlots {\n      id\n      date\n      startTime\n      endTime\n      status\n    }\n  }\n}": types.CreateCoachDocument,
    "query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      type\n      name\n    }\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      type\n      name\n    }\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindCoachesBySport($sportType: String!) {\n  findCoachesBySport(sportType: $sportType) {\n    id\n    firstName\n    lastName\n    bio\n    address\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindFavoriteCoaches($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    contacts {\n      coachId\n      contactedStatus\n      coach {\n        firstName\n        lastName\n        bio\n        address\n        sports {\n          type\n        }\n        reviews {\n          starRating\n          comment\n        }\n      }\n    }\n  }\n}\n\nquery FindCoacheesOfCoach($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    contacts {\n      coacheeId\n      contactedStatus\n      coachee {\n        firstName\n        lastName\n        profilePicture\n      }\n    }\n  }\n}\n\nquery FindBookingsOfCoach($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    bookings {\n      id\n      status\n      coacheeId\n      coachee {\n        firstName\n        lastName\n        profilePicture\n      }\n      serviceType\n      additionalNotes\n      bookingSlots {\n        id\n        date\n        startTime\n        endTime\n      }\n    }\n  }\n}\n\nquery FindBookingsOfCoachee($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    bookings {\n      id\n      status\n      coachId\n      coach {\n        firstName\n        lastName\n        profilePicture\n      }\n      serviceType\n      additionalNotes\n      bookingSlots {\n        date\n        startTime\n        endTime\n      }\n    }\n  }\n}\n\nquery GetCoachReviews($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    firstName\n    lastName\n    reviews {\n      coachee {\n        firstName\n        lastName\n      }\n      starRating\n      comment\n    }\n  }\n}\n\nquery GetSortedCoaches {\n  coaches {\n    id\n    firstName\n    lastName\n    bio\n    address\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    interests {\n      type\n      name\n    }\n  }\n}": types.FindCoachByEmailAndPasswordDocument,
    "mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    coachId\n    coacheeId\n    contactedStatus\n  }\n}\n\nmutation UpdateBookingStatus($updateBookingStatusId: Int!, $input: UpdateBookingStatusInput!) {\n  updateBookingStatus(id: $updateBookingStatusId, input: $input) {\n    id\n    status\n    bookingSlots {\n      endTime\n      startTime\n      date\n    }\n    serviceType\n    additionalNotes\n  }\n}\n\nmutation UpdateBookingData($bookingId: Int!, $updateSlotsIds: [Int!]!, $deleteSlotsIds: [Int!]!, $bookingData: UpdateBookingInput!, $updateSlots: [UpdateBookingSlotInput!]!, $addSlots: [CreateBookingSlotInput!]!) {\n  updatePendingBooking(\n    bookingId: $bookingId\n    updateSlotsIds: $updateSlotsIds\n    deleteSlotsIds: $deleteSlotsIds\n    bookingData: $bookingData\n    updateSlots: $updateSlots\n    addSlots: $addSlots\n  ) {\n    id\n    bookingSlots {\n      id\n      date\n      endTime\n      startTime\n    }\n    serviceType\n    additionalNotes\n  }\n}": types.UpdateCoacheeProfileDocument,
    "mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n\nmutation CreateReview($input: CreateReviewInput!) {\n  createReview(input: $input) {\n    coach {\n      firstName\n      lastName\n      reviews {\n        coachee {\n          id\n          firstName\n          lastName\n        }\n        starRating\n        comment\n      }\n    }\n  }\n}\n\nmutation CreateCoachTask($input: CreateCoachTaskInput!) {\n  createCoachTask(input: $input) {\n    coach {\n      firstName\n      lastName\n      tasks {\n        id\n        description\n        completionStatus\n      }\n    }\n  }\n}\n\nmutation CreateCoacheeTask($input: CreateCoacheeTaskInput!) {\n  createCoacheeTask(input: $input) {\n    coachee {\n      firstName\n      lastName\n      tasks {\n        id\n        description\n        completionStatus\n      }\n    }\n  }\n}": types.CreateCoachDocument,
    "query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      id\n      type\n      name\n    }\n    reviews {\n      starRating\n      comment\n    }\n    tasks {\n      active\n      completionStatus\n      createdAt\n      date\n      description\n      id\n      title\n      updatedAt\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      id\n      type\n      name\n    }\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    tasks {\n      active\n      completionStatus\n      createdAt\n      date\n      description\n      id\n      title\n      updatedAt\n    }\n  }\n}\n\nquery FindCoachesBySport($sportType: String!) {\n  findCoachesBySport(sportType: $sportType) {\n    id\n    firstName\n    lastName\n    bio\n    address\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindFavoriteCoaches($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    contacts {\n      coachId\n      contactedStatus\n      coach {\n        firstName\n        lastName\n        bio\n        address\n        sports {\n          type\n        }\n        reviews {\n          starRating\n          comment\n        }\n      }\n    }\n  }\n}\n\nquery GetCoachReviews($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    firstName\n    lastName\n    reviews {\n      coachee {\n        firstName\n        lastName\n      }\n      starRating\n      comment\n    }\n  }\n}\n\nquery GetSortedCoaches {\n  coaches {\n    id\n    firstName\n    lastName\n    bio\n    address\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    interests {\n      type\n      name\n    }\n  }\n}": types.FindCoachByEmailAndPasswordDocument,
    "mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    coachId\n    coacheeId\n    contactedStatus\n  }\n}\n\nmutation UpdateCoachTask($updateCoachTaskId: Int!, $input: UpdateCoachTaskInput!) {\n  updateCoachTask(id: $updateCoachTaskId, input: $input) {\n    coach {\n      firstName\n      lastName\n      tasks {\n        active\n        description\n        id\n      }\n    }\n    description\n    id\n    title\n    updatedAt\n    completionStatus\n    createdAt\n    date\n    active\n  }\n}\n\nmutation UpdateCoacheeTask($updateCoachTaskId: Int!, $input: UpdateCoacheeTaskInput!) {\n  updateCoacheeTask(id: $updateCoachTaskId, input: $input) {\n    coachee {\n      firstName\n      lastName\n      tasks {\n        active\n        description\n        id\n      }\n    }\n    description\n    id\n    title\n    updatedAt\n    completionStatus\n    createdAt\n    date\n    active\n  }\n}\n\nmutation UpdateCoachInterests($input: [UpdateCoachInterestInput!]!) {\n  updateCoachInterests(input: $input) {\n    id\n    name\n    type\n    updatedAt\n  }\n}\n\nmutation UpdateCoacheeInterests($input: [UpdateCoacheeInterestInput!]!) {\n  updateCoacheeInterests(input: $input) {\n    id\n    name\n    type\n    updatedAt\n  }\n}": types.UpdateCoacheeProfileDocument,
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
export function graphql(source: "mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n\nmutation CreateReview($input: CreateReviewInput!) {\n  createReview(input: $input) {\n    coach {\n      firstName\n      lastName\n      reviews {\n        coachee {\n          id\n          firstName\n          lastName\n        }\n        starRating\n        comment\n      }\n    }\n  }\n}\n\nmutation CreateBooking($input: CreateBookingInput!, $slotsInput: [CreateBookingSlotInput!]!) {\n  createBooking(input: $input, slotsInput: $slotsInput) {\n    id\n    coach {\n      firstName\n      lastName\n    }\n    coachee {\n      firstName\n      lastName\n    }\n    serviceType\n    additionalNotes\n    status\n    bookingSlots {\n      id\n      date\n      startTime\n      endTime\n      status\n    }\n  }\n}"): (typeof documents)["mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n\nmutation CreateReview($input: CreateReviewInput!) {\n  createReview(input: $input) {\n    coach {\n      firstName\n      lastName\n      reviews {\n        coachee {\n          id\n          firstName\n          lastName\n        }\n        starRating\n        comment\n      }\n    }\n  }\n}\n\nmutation CreateBooking($input: CreateBookingInput!, $slotsInput: [CreateBookingSlotInput!]!) {\n  createBooking(input: $input, slotsInput: $slotsInput) {\n    id\n    coach {\n      firstName\n      lastName\n    }\n    coachee {\n      firstName\n      lastName\n    }\n    serviceType\n    additionalNotes\n    status\n    bookingSlots {\n      id\n      date\n      startTime\n      endTime\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      type\n      name\n    }\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      type\n      name\n    }\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindCoachesBySport($sportType: String!) {\n  findCoachesBySport(sportType: $sportType) {\n    id\n    firstName\n    lastName\n    bio\n    address\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindFavoriteCoaches($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    contacts {\n      coachId\n      contactedStatus\n      coach {\n        firstName\n        lastName\n        bio\n        address\n        sports {\n          type\n        }\n        reviews {\n          starRating\n          comment\n        }\n      }\n    }\n  }\n}\n\nquery FindCoacheesOfCoach($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    contacts {\n      coacheeId\n      contactedStatus\n      coachee {\n        firstName\n        lastName\n        profilePicture\n      }\n    }\n  }\n}\n\nquery FindBookingsOfCoach($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    bookings {\n      id\n      status\n      coacheeId\n      coachee {\n        firstName\n        lastName\n        profilePicture\n      }\n      serviceType\n      additionalNotes\n      bookingSlots {\n        id\n        date\n        startTime\n        endTime\n      }\n    }\n  }\n}\n\nquery FindBookingsOfCoachee($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    bookings {\n      id\n      status\n      coachId\n      coach {\n        firstName\n        lastName\n        profilePicture\n      }\n      serviceType\n      additionalNotes\n      bookingSlots {\n        date\n        startTime\n        endTime\n      }\n    }\n  }\n}\n\nquery GetCoachReviews($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    firstName\n    lastName\n    reviews {\n      coachee {\n        firstName\n        lastName\n      }\n      starRating\n      comment\n    }\n  }\n}\n\nquery GetSortedCoaches {\n  coaches {\n    id\n    firstName\n    lastName\n    bio\n    address\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    interests {\n      type\n      name\n    }\n  }\n}"): (typeof documents)["query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      type\n      name\n    }\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      type\n      name\n    }\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindCoachesBySport($sportType: String!) {\n  findCoachesBySport(sportType: $sportType) {\n    id\n    firstName\n    lastName\n    bio\n    address\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindFavoriteCoaches($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    contacts {\n      coachId\n      contactedStatus\n      coach {\n        firstName\n        lastName\n        bio\n        address\n        sports {\n          type\n        }\n        reviews {\n          starRating\n          comment\n        }\n      }\n    }\n  }\n}\n\nquery FindCoacheesOfCoach($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    contacts {\n      coacheeId\n      contactedStatus\n      coachee {\n        firstName\n        lastName\n        profilePicture\n      }\n    }\n  }\n}\n\nquery FindBookingsOfCoach($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    bookings {\n      id\n      status\n      coacheeId\n      coachee {\n        firstName\n        lastName\n        profilePicture\n      }\n      serviceType\n      additionalNotes\n      bookingSlots {\n        id\n        date\n        startTime\n        endTime\n      }\n    }\n  }\n}\n\nquery FindBookingsOfCoachee($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    bookings {\n      id\n      status\n      coachId\n      coach {\n        firstName\n        lastName\n        profilePicture\n      }\n      serviceType\n      additionalNotes\n      bookingSlots {\n        date\n        startTime\n        endTime\n      }\n    }\n  }\n}\n\nquery GetCoachReviews($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    firstName\n    lastName\n    reviews {\n      coachee {\n        firstName\n        lastName\n      }\n      starRating\n      comment\n    }\n  }\n}\n\nquery GetSortedCoaches {\n  coaches {\n    id\n    firstName\n    lastName\n    bio\n    address\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    interests {\n      type\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    coachId\n    coacheeId\n    contactedStatus\n  }\n}\n\nmutation UpdateBookingStatus($updateBookingStatusId: Int!, $input: UpdateBookingStatusInput!) {\n  updateBookingStatus(id: $updateBookingStatusId, input: $input) {\n    id\n    status\n    bookingSlots {\n      endTime\n      startTime\n      date\n    }\n    serviceType\n    additionalNotes\n  }\n}\n\nmutation UpdateBookingData($bookingId: Int!, $updateSlotsIds: [Int!]!, $deleteSlotsIds: [Int!]!, $bookingData: UpdateBookingInput!, $updateSlots: [UpdateBookingSlotInput!]!, $addSlots: [CreateBookingSlotInput!]!) {\n  updatePendingBooking(\n    bookingId: $bookingId\n    updateSlotsIds: $updateSlotsIds\n    deleteSlotsIds: $deleteSlotsIds\n    bookingData: $bookingData\n    updateSlots: $updateSlots\n    addSlots: $addSlots\n  ) {\n    id\n    bookingSlots {\n      id\n      date\n      endTime\n      startTime\n    }\n    serviceType\n    additionalNotes\n  }\n}"): (typeof documents)["mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    coachId\n    coacheeId\n    contactedStatus\n  }\n}\n\nmutation UpdateBookingStatus($updateBookingStatusId: Int!, $input: UpdateBookingStatusInput!) {\n  updateBookingStatus(id: $updateBookingStatusId, input: $input) {\n    id\n    status\n    bookingSlots {\n      endTime\n      startTime\n      date\n    }\n    serviceType\n    additionalNotes\n  }\n}\n\nmutation UpdateBookingData($bookingId: Int!, $updateSlotsIds: [Int!]!, $deleteSlotsIds: [Int!]!, $bookingData: UpdateBookingInput!, $updateSlots: [UpdateBookingSlotInput!]!, $addSlots: [CreateBookingSlotInput!]!) {\n  updatePendingBooking(\n    bookingId: $bookingId\n    updateSlotsIds: $updateSlotsIds\n    deleteSlotsIds: $deleteSlotsIds\n    bookingData: $bookingData\n    updateSlots: $updateSlots\n    addSlots: $addSlots\n  ) {\n    id\n    bookingSlots {\n      id\n      date\n      endTime\n      startTime\n    }\n    serviceType\n    additionalNotes\n  }\n}"];
export function graphql(source: "mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n\nmutation CreateReview($input: CreateReviewInput!) {\n  createReview(input: $input) {\n    coach {\n      firstName\n      lastName\n      reviews {\n        coachee {\n          id\n          firstName\n          lastName\n        }\n        starRating\n        comment\n      }\n    }\n  }\n}\n\nmutation CreateCoachTask($input: CreateCoachTaskInput!) {\n  createCoachTask(input: $input) {\n    coach {\n      firstName\n      lastName\n      tasks {\n        id\n        description\n        completionStatus\n      }\n    }\n  }\n}\n\nmutation CreateCoacheeTask($input: CreateCoacheeTaskInput!) {\n  createCoacheeTask(input: $input) {\n    coachee {\n      firstName\n      lastName\n      tasks {\n        id\n        description\n        completionStatus\n      }\n    }\n  }\n}"): (typeof documents)["mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n\nmutation CreateReview($input: CreateReviewInput!) {\n  createReview(input: $input) {\n    coach {\n      firstName\n      lastName\n      reviews {\n        coachee {\n          id\n          firstName\n          lastName\n        }\n        starRating\n        comment\n      }\n    }\n  }\n}\n\nmutation CreateCoachTask($input: CreateCoachTaskInput!) {\n  createCoachTask(input: $input) {\n    coach {\n      firstName\n      lastName\n      tasks {\n        id\n        description\n        completionStatus\n      }\n    }\n  }\n}\n\nmutation CreateCoacheeTask($input: CreateCoacheeTaskInput!) {\n  createCoacheeTask(input: $input) {\n    coachee {\n      firstName\n      lastName\n      tasks {\n        id\n        description\n        completionStatus\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      id\n      type\n      name\n    }\n    reviews {\n      starRating\n      comment\n    }\n    tasks {\n      active\n      completionStatus\n      createdAt\n      date\n      description\n      id\n      title\n      updatedAt\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      id\n      type\n      name\n    }\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    tasks {\n      active\n      completionStatus\n      createdAt\n      date\n      description\n      id\n      title\n      updatedAt\n    }\n  }\n}\n\nquery FindCoachesBySport($sportType: String!) {\n  findCoachesBySport(sportType: $sportType) {\n    id\n    firstName\n    lastName\n    bio\n    address\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindFavoriteCoaches($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    contacts {\n      coachId\n      contactedStatus\n      coach {\n        firstName\n        lastName\n        bio\n        address\n        sports {\n          type\n        }\n        reviews {\n          starRating\n          comment\n        }\n      }\n    }\n  }\n}\n\nquery GetCoachReviews($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    firstName\n    lastName\n    reviews {\n      coachee {\n        firstName\n        lastName\n      }\n      starRating\n      comment\n    }\n  }\n}\n\nquery GetSortedCoaches {\n  coaches {\n    id\n    firstName\n    lastName\n    bio\n    address\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    interests {\n      type\n      name\n    }\n  }\n}"): (typeof documents)["query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      id\n      type\n      name\n    }\n    reviews {\n      starRating\n      comment\n    }\n    tasks {\n      active\n      completionStatus\n      createdAt\n      date\n      description\n      id\n      title\n      updatedAt\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    profilePicture\n    interests {\n      id\n      type\n      name\n    }\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    tasks {\n      active\n      completionStatus\n      createdAt\n      date\n      description\n      id\n      title\n      updatedAt\n    }\n  }\n}\n\nquery FindCoachesBySport($sportType: String!) {\n  findCoachesBySport(sportType: $sportType) {\n    id\n    firstName\n    lastName\n    bio\n    address\n    reviews {\n      starRating\n      comment\n    }\n  }\n}\n\nquery FindFavoriteCoaches($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    contacts {\n      coachId\n      contactedStatus\n      coach {\n        firstName\n        lastName\n        bio\n        address\n        sports {\n          type\n        }\n        reviews {\n          starRating\n          comment\n        }\n      }\n    }\n  }\n}\n\nquery GetCoachReviews($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    firstName\n    lastName\n    reviews {\n      coachee {\n        firstName\n        lastName\n      }\n      starRating\n      comment\n    }\n  }\n}\n\nquery GetSortedCoaches {\n  coaches {\n    id\n    firstName\n    lastName\n    bio\n    address\n    sports {\n      type\n    }\n    reviews {\n      starRating\n      comment\n    }\n    interests {\n      type\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    coachId\n    coacheeId\n    contactedStatus\n  }\n}\n\nmutation UpdateCoachTask($updateCoachTaskId: Int!, $input: UpdateCoachTaskInput!) {\n  updateCoachTask(id: $updateCoachTaskId, input: $input) {\n    coach {\n      firstName\n      lastName\n      tasks {\n        active\n        description\n        id\n      }\n    }\n    description\n    id\n    title\n    updatedAt\n    completionStatus\n    createdAt\n    date\n    active\n  }\n}\n\nmutation UpdateCoacheeTask($updateCoachTaskId: Int!, $input: UpdateCoacheeTaskInput!) {\n  updateCoacheeTask(id: $updateCoachTaskId, input: $input) {\n    coachee {\n      firstName\n      lastName\n      tasks {\n        active\n        description\n        id\n      }\n    }\n    description\n    id\n    title\n    updatedAt\n    completionStatus\n    createdAt\n    date\n    active\n  }\n}\n\nmutation UpdateCoachInterests($input: [UpdateCoachInterestInput!]!) {\n  updateCoachInterests(input: $input) {\n    id\n    name\n    type\n    updatedAt\n  }\n}\n\nmutation UpdateCoacheeInterests($input: [UpdateCoacheeInterestInput!]!) {\n  updateCoacheeInterests(input: $input) {\n    id\n    name\n    type\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    profilePicture\n  }\n}\n\nmutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    coachId\n    coacheeId\n    contactedStatus\n  }\n}\n\nmutation UpdateCoachTask($updateCoachTaskId: Int!, $input: UpdateCoachTaskInput!) {\n  updateCoachTask(id: $updateCoachTaskId, input: $input) {\n    coach {\n      firstName\n      lastName\n      tasks {\n        active\n        description\n        id\n      }\n    }\n    description\n    id\n    title\n    updatedAt\n    completionStatus\n    createdAt\n    date\n    active\n  }\n}\n\nmutation UpdateCoacheeTask($updateCoachTaskId: Int!, $input: UpdateCoacheeTaskInput!) {\n  updateCoacheeTask(id: $updateCoachTaskId, input: $input) {\n    coachee {\n      firstName\n      lastName\n      tasks {\n        active\n        description\n        id\n      }\n    }\n    description\n    id\n    title\n    updatedAt\n    completionStatus\n    createdAt\n    date\n    active\n  }\n}\n\nmutation UpdateCoachInterests($input: [UpdateCoachInterestInput!]!) {\n  updateCoachInterests(input: $input) {\n    id\n    name\n    type\n    updatedAt\n  }\n}\n\nmutation UpdateCoacheeInterests($input: [UpdateCoacheeInterestInput!]!) {\n  updateCoacheeInterests(input: $input) {\n    id\n    name\n    type\n    updatedAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;