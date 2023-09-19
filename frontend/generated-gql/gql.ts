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
    "mutation createCoachee($firstName: String!, $lastName: String!, $address: String!, $birthday: DateTime!, $email: String!, $password: String!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoachee(\n    input: {firstName: $firstName, lastName: $lastName, address: $address, birthday: $birthday, email: $email, password: $password, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation createCoach($firstName: String!, $lastName: String!, $birthday: DateTime!, $email: String!, $password: String!, $workplaceAddress: String!, $sport: Sport!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoach(\n    input: {firstName: $firstName, lastName: $lastName, birthday: $birthday, email: $email, password: $password, workplaceAddress: $workplaceAddress, sport: $sport, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}": types.CreateCoacheeDocument,
    "query getAllCoaches {\n  coaches {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n  }\n}\n\nquery FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n  }\n}": types.GetAllCoachesDocument,
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
export function graphql(source: "mutation createCoachee($firstName: String!, $lastName: String!, $address: String!, $birthday: DateTime!, $email: String!, $password: String!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoachee(\n    input: {firstName: $firstName, lastName: $lastName, address: $address, birthday: $birthday, email: $email, password: $password, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation createCoach($firstName: String!, $lastName: String!, $birthday: DateTime!, $email: String!, $password: String!, $workplaceAddress: String!, $sport: Sport!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoach(\n    input: {firstName: $firstName, lastName: $lastName, birthday: $birthday, email: $email, password: $password, workplaceAddress: $workplaceAddress, sport: $sport, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}"): (typeof documents)["mutation createCoachee($firstName: String!, $lastName: String!, $address: String!, $birthday: DateTime!, $email: String!, $password: String!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoachee(\n    input: {firstName: $firstName, lastName: $lastName, address: $address, birthday: $birthday, email: $email, password: $password, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}\n\nmutation createCoach($firstName: String!, $lastName: String!, $birthday: DateTime!, $email: String!, $password: String!, $workplaceAddress: String!, $sport: Sport!, $games: [Games!]!, $hobbies: [Hobbies!]!, $moviesGenres: [MovieGenres!]!) {\n  createCoach(\n    input: {firstName: $firstName, lastName: $lastName, birthday: $birthday, email: $email, password: $password, workplaceAddress: $workplaceAddress, sport: $sport, games: $games, hobbies: $hobbies, moviesGenres: $moviesGenres}\n  ) {\n    id\n    email\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getAllCoaches {\n  coaches {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n  }\n}\n\nquery FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n  }\n}"): (typeof documents)["query getAllCoaches {\n  coaches {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n  }\n}\n\nquery FindCoacheeByEmailAndPassword($email: String!, $password: String!) {\n  findCoacheeByEmailAndPassword(email: $email, password: $password) {\n    id\n    address\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n  }\n}\n\nquery FindCoachByEmailAndPassword($email: String!, $password: String!) {\n  findCoachByEmailAndPassword(email: $email, password: $password) {\n    id\n    birthday\n    email\n    firstName\n    games\n    hobbies\n    lastName\n    moviesGenres\n    sport\n    workplaceAddress\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;