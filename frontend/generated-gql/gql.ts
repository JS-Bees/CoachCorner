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
    "mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}": types.CreateCoachDocument,
    "query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    interests {\n      type\n      name\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    interests {\n      type\n      name\n    }\n    sports {\n      type\n    }\n  }\n}": types.FindCoachByEmailAndPasswordDocument,
    "mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    mantra\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    mantra\n    profilePicture\n  }\n}": types.UpdateCoacheeProfileDocument,
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
export function graphql(source: "mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}"): (typeof documents)["mutation CreateCoach($input: CreateCoachInput!, $interestsInput: [CreateCoachInterestInput!]!, $sportsInput: [CreateSportInput!]!) {\n  createCoach(\n    input: $input\n    interestsInput: $interestsInput\n    sportsInput: $sportsInput\n  ) {\n    id\n    firstName\n    lastName\n  }\n}\n\nmutation CreateCoachee($input: CreateCoacheeInput!, $interestsInput: [CreateCoacheeInterestInput!]!) {\n  createCoachee(input: $input, interestsInput: $interestsInput) {\n    id\n    firstName\n    lastName\n    email\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    interests {\n      type\n      name\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    interests {\n      type\n      name\n    }\n    sports {\n      type\n    }\n  }\n}"): (typeof documents)["query FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    firstName\n    lastName\n  }\n}\n\nquery FindCoacheeByID($userId: Int!) {\n  findCoacheeByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    interests {\n      type\n      name\n    }\n  }\n}\n\nquery FindCoachByID($userId: Int!) {\n  findCoachByID(userID: $userId) {\n    id\n    firstName\n    lastName\n    email\n    password\n    bio\n    address\n    interests {\n      type\n      name\n    }\n    sports {\n      type\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    mantra\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    mantra\n    profilePicture\n  }\n}"): (typeof documents)["mutation UpdateCoacheeProfile($updateCoacheeProfileId: Int!, $input: UpdateCoacheeProfileInput!) {\n  updateCoacheeProfile(id: $updateCoacheeProfileId, input: $input) {\n    address\n    bio\n    mantra\n    profilePicture\n  }\n}\n\nmutation UpdateCoachProfile($updateCoachProfileId: Int!, $input: UpdateCoachProfileInput!) {\n  updateCoachProfile(id: $updateCoachProfileId, input: $input) {\n    address\n    bio\n    mantra\n    profilePicture\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;