/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateBookingInput: { // input type
    additionalNotes: string; // String!
    coachId: number; // Int!
    coacheeId: number; // Int!
    serviceType: string; // String!
    status: string; // String!
  }
  CreateBookingSlotInput: { // input type
    date: NexusGenScalars['DateTime']; // DateTime!
    endTime: NexusGenScalars['DateTime']; // DateTime!
    startTime: NexusGenScalars['DateTime']; // DateTime!
    status: string; // String!
  }
  CreateCoachInput: { // input type
    address: string; // String!
    bio: string; // String!
    birthday: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
    profilePicture: string; // String!
  }
  CreateCoachInterestInput: { // input type
    name: string; // String!
    type: string; // String!
  }
  CreateCoachTaskInput: { // input type
    coachId: number; // Int!
    completionStatus: string; // String!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    title: string; // String!
  }
  CreateCoacheeInput: { // input type
    address: string; // String!
    bio: string; // String!
    birthday: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
    profilePicture: string; // String!
    sport: string; // String!
  }
  CreateCoacheeInterestInput: { // input type
    name: string; // String!
    type: string; // String!
  }
  CreateCoacheeTaskInput: { // input type
    coacheeId: number; // Int!
    completionStatus: string; // String!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    title: string; // String!
  }
  CreateContactInput: { // input type
    coachId: number; // Int!
    coacheeId: number; // Int!
    contactedStatus: boolean; // Boolean!
  }
  CreateMessageInput: { // input type
    contactId: number; // Int!
    content: string; // String!
  }
  CreateNewCoachInterestInput: { // input type
    coachId: number; // Int!
    name: string; // String!
    type: string; // String!
  }
  CreateNewCoacheeInterestInput: { // input type
    coacheeId: number; // Int!
    name: string; // String!
    type: string; // String!
  }
  CreateReviewInput: { // input type
    coachId: number; // Int!
    coacheeId: number; // Int!
    comment: string; // String!
    starRating: number; // Int!
  }
  CreateSportInput: { // input type
    type: string; // String!
  }
  CreateSportsCredentialsInput: { // input type
    credentialPicture: string; // String!
    sportId: number; // Int!
  }
  UpdateBookingInput: { // input type
    additionalNotes: string; // String!
    serviceType: string; // String!
  }
  UpdateBookingSlotInput: { // input type
    date: NexusGenScalars['DateTime']; // DateTime!
    endTime: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    startTime: NexusGenScalars['DateTime']; // DateTime!
    status: string; // String!
  }
  UpdateBookingSlotStatusInput: { // input type
    status: string; // String!
  }
  UpdateBookingStatusInput: { // input type
    status: string; // String!
  }
  UpdateCoachInterestInput: { // input type
    id: number; // Int!
    name: string; // String!
    type: string; // String!
  }
  UpdateCoachProfileInput: { // input type
    address: string; // String!
    bio: string; // String!
    profilePicture: string; // String!
  }
  UpdateCoachTaskInput: { // input type
    completionStatus: string; // String!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    title: string; // String!
  }
  UpdateCoacheeInterestInput: { // input type
    id: number; // Int!
    name: string; // String!
    type: string; // String!
  }
  UpdateCoacheeProfileInput: { // input type
    address: string; // String!
    bio: string; // String!
    profilePicture: string; // String!
  }
  UpdateCoacheeTaskInput: { // input type
    completionStatus: string; // String!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    title: string; // String!
  }
  UpdateContactedStatusInput: { // input type
    contactedStatus: boolean; // Boolean!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Booking: { // root type
    active: boolean; // Boolean!
    additionalNotes: string; // String!
    coachId: number; // Int!
    coacheeId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    serviceType: string; // String!
    status: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  BookingSlot: { // root type
    active: boolean; // Boolean!
    bookingId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    endTime: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    startTime: NexusGenScalars['DateTime']; // DateTime!
    status: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Coach: { // root type
    active: boolean; // Boolean!
    address: string; // String!
    bio: string; // String!
    birthday: NexusGenScalars['DateTime']; // DateTime!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    password: string; // String!
    profilePicture: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CoachInterest: { // root type
    active: boolean; // Boolean!
    coachId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CoachTask: { // root type
    active: boolean; // Boolean!
    coachId: number; // Int!
    completionStatus: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Coachee: { // root type
    active: boolean; // Boolean!
    address: string; // String!
    bio: string; // String!
    birthday: NexusGenScalars['DateTime']; // DateTime!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    password: string; // String!
    profilePicture: string; // String!
    sport: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CoacheeInterest: { // root type
    active: boolean; // Boolean!
    coacheeId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CoacheeTask: { // root type
    active: boolean; // Boolean!
    coacheeId: number; // Int!
    completionStatus: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Contact: { // root type
    active: boolean; // Boolean!
    coachId: number; // Int!
    coacheeId: number; // Int!
    contactedStatus: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Message: { // root type
    contactId: number; // Int!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
  }
  Mutation: {};
  Query: {};
  Review: { // root type
    active: boolean; // Boolean!
    coachId: number; // Int!
    coacheeId: number; // Int!
    comment: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    starRating: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  SlotTime: {};
  Sport: { // root type
    active: boolean; // Boolean!
    coachId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  SportsCredential: { // root type
    active: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    credentialPicture: string; // String!
    id: number; // Int!
    sportId: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Subscription: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Booking: { // field return type
    active: boolean; // Boolean!
    additionalNotes: string; // String!
    bookingSlots: Array<NexusGenRootTypes['BookingSlot'] | null> | null; // [BookingSlot]
    coach: NexusGenRootTypes['Coach'] | null; // Coach
    coachId: number; // Int!
    coachee: NexusGenRootTypes['Coachee'] | null; // Coachee
    coacheeId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    serviceType: string; // String!
    status: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  BookingSlot: { // field return type
    active: boolean; // Boolean!
    booking: NexusGenRootTypes['Booking'] | null; // Booking
    bookingId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    endTime: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    startTime: NexusGenScalars['DateTime']; // DateTime!
    status: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Coach: { // field return type
    active: boolean; // Boolean!
    address: string; // String!
    bio: string; // String!
    birthday: NexusGenScalars['DateTime']; // DateTime!
    bookings: Array<NexusGenRootTypes['Booking'] | null> | null; // [Booking]
    contacts: Array<NexusGenRootTypes['Contact'] | null> | null; // [Contact]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    interests: Array<NexusGenRootTypes['CoachInterest'] | null> | null; // [CoachInterest]
    lastName: string; // String!
    password: string; // String!
    profilePicture: string; // String!
    reviews: Array<NexusGenRootTypes['Review'] | null> | null; // [Review]
    sports: Array<NexusGenRootTypes['Sport'] | null> | null; // [Sport]
    tasks: Array<NexusGenRootTypes['CoachTask'] | null> | null; // [CoachTask]
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CoachInterest: { // field return type
    active: boolean; // Boolean!
    coach: NexusGenRootTypes['Coach'] | null; // Coach
    coachId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CoachTask: { // field return type
    active: boolean; // Boolean!
    coach: NexusGenRootTypes['Coach'] | null; // Coach
    coachId: number; // Int!
    completionStatus: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Coachee: { // field return type
    active: boolean; // Boolean!
    address: string; // String!
    bio: string; // String!
    birthday: NexusGenScalars['DateTime']; // DateTime!
    bookings: Array<NexusGenRootTypes['Booking'] | null> | null; // [Booking]
    contacts: Array<NexusGenRootTypes['Contact'] | null> | null; // [Contact]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    interests: Array<NexusGenRootTypes['CoacheeInterest'] | null> | null; // [CoacheeInterest]
    lastName: string; // String!
    password: string; // String!
    profilePicture: string; // String!
    reviews: Array<NexusGenRootTypes['Review'] | null> | null; // [Review]
    sport: string; // String!
    tasks: Array<NexusGenRootTypes['CoacheeTask'] | null> | null; // [CoacheeTask]
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CoacheeInterest: { // field return type
    active: boolean; // Boolean!
    coachee: NexusGenRootTypes['Coachee'] | null; // Coachee
    coacheeId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CoacheeTask: { // field return type
    active: boolean; // Boolean!
    coachee: NexusGenRootTypes['Coachee'] | null; // Coachee
    coacheeId: number; // Int!
    completionStatus: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Contact: { // field return type
    active: boolean; // Boolean!
    coach: NexusGenRootTypes['Coach'] | null; // Coach
    coachId: number; // Int!
    coachee: NexusGenRootTypes['Coachee'] | null; // Coachee
    coacheeId: number; // Int!
    contactedStatus: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    messages: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Message: { // field return type
    contact: NexusGenRootTypes['Contact'] | null; // Contact
    contactId: number; // Int!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
  }
  Mutation: { // field return type
    coachLogin: NexusGenRootTypes['Coach'] | null; // Coach
    coacheeLogin: NexusGenRootTypes['Coachee'] | null; // Coachee
    createBooking: NexusGenRootTypes['Booking'] | null; // Booking
    createCoach: NexusGenRootTypes['Coach'] | null; // Coach
    createCoachInterest: NexusGenRootTypes['CoachInterest'] | null; // CoachInterest
    createCoachTask: NexusGenRootTypes['CoachTask'] | null; // CoachTask
    createCoachee: NexusGenRootTypes['Coachee'] | null; // Coachee
    createCoacheeInterest: NexusGenRootTypes['CoacheeInterest'] | null; // CoacheeInterest
    createCoacheeTask: NexusGenRootTypes['CoacheeTask'] | null; // CoacheeTask
    createContact: NexusGenRootTypes['Contact'] | null; // Contact
    createMessage: NexusGenRootTypes['Message'] | null; // Message
    createReview: NexusGenRootTypes['Review'] | null; // Review
    createSportsCredentials: NexusGenRootTypes['SportsCredential'] | null; // SportsCredential
    updateBookingSlotStatus: NexusGenRootTypes['BookingSlot'] | null; // BookingSlot
    updateBookingStatus: NexusGenRootTypes['Booking'] | null; // Booking
    updateCoachInterests: Array<NexusGenRootTypes['CoachInterest'] | null> | null; // [CoachInterest]
    updateCoachProfile: NexusGenRootTypes['Coach'] | null; // Coach
    updateCoachTask: NexusGenRootTypes['CoachTask'] | null; // CoachTask
    updateCoacheeInterests: Array<NexusGenRootTypes['CoacheeInterest'] | null> | null; // [CoacheeInterest]
    updateCoacheeProfile: NexusGenRootTypes['Coachee'] | null; // Coachee
    updateCoacheeTask: NexusGenRootTypes['CoacheeTask'] | null; // CoacheeTask
    updateContactedStatus: NexusGenRootTypes['Contact'] | null; // Contact
    updatePendingBooking: NexusGenRootTypes['Booking'] | null; // Booking
  }
  Query: { // field return type
    coachees: Array<NexusGenRootTypes['Coachee'] | null> | null; // [Coachee]
    coaches: Array<NexusGenRootTypes['Coach'] | null> | null; // [Coach]
    findBookingByID: NexusGenRootTypes['Booking'] | null; // Booking
    findBookingsByStatusAndCoachID: Array<NexusGenRootTypes['Booking'] | null> | null; // [Booking]
    findBookingsByStatusAndCoacheeID: Array<NexusGenRootTypes['Booking'] | null> | null; // [Booking]
    findCoachByEmailAndPassword: NexusGenRootTypes['Coach'] | null; // Coach
    findCoachByID: NexusGenRootTypes['Coach'] | null; // Coach
    findCoacheeByEmailAndPassword: NexusGenRootTypes['Coachee'] | null; // Coachee
    findCoacheeByID: NexusGenRootTypes['Coachee'] | null; // Coachee
    findCoachesBySport: Array<NexusGenRootTypes['Coach'] | null> | null; // [Coach]
    findContactsOfCoach: Array<NexusGenRootTypes['Contact'] | null> | null; // [Contact]
    findContactsOfCoachDespiteContactedStatus: Array<NexusGenRootTypes['Contact'] | null> | null; // [Contact]
    findMessagesByContactId: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    findMessagesForCoachList: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    findMessagesForCoacheeList: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    findNonContactCoachesBySport: Array<NexusGenRootTypes['Coach'] | null> | null; // [Coach]
    findOneToOneServiceSlotsByCoachId: Array<NexusGenRootTypes['SlotTime'] | null>; // [SlotTime]!
    findfilteredMessagesByContactId: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
  }
  Review: { // field return type
    active: boolean; // Boolean!
    coach: NexusGenRootTypes['Coach'] | null; // Coach
    coachId: number; // Int!
    coachee: NexusGenRootTypes['Coachee'] | null; // Coachee
    coacheeId: number; // Int!
    comment: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    starRating: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  SlotTime: { // field return type
    date: NexusGenScalars['DateTime'] | null; // DateTime
    endTime: NexusGenScalars['DateTime'] | null; // DateTime
    startTime: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Sport: { // field return type
    active: boolean; // Boolean!
    coach: NexusGenRootTypes['Coach'] | null; // Coach
    coachId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    sportsCredentials: Array<NexusGenRootTypes['SportsCredential'] | null> | null; // [SportsCredential]
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  SportsCredential: { // field return type
    active: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    credentialPicture: string; // String!
    id: number; // Int!
    sport: NexusGenRootTypes['Sport'] | null; // Sport
    sportId: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Subscription: { // field return type
    newMessage: NexusGenRootTypes['Message'] | null; // Message
  }
}

export interface NexusGenFieldTypeNames {
  Booking: { // field return type name
    active: 'Boolean'
    additionalNotes: 'String'
    bookingSlots: 'BookingSlot'
    coach: 'Coach'
    coachId: 'Int'
    coachee: 'Coachee'
    coacheeId: 'Int'
    createdAt: 'DateTime'
    id: 'Int'
    serviceType: 'String'
    status: 'String'
    updatedAt: 'DateTime'
  }
  BookingSlot: { // field return type name
    active: 'Boolean'
    booking: 'Booking'
    bookingId: 'Int'
    createdAt: 'DateTime'
    date: 'DateTime'
    endTime: 'DateTime'
    id: 'Int'
    startTime: 'DateTime'
    status: 'String'
    updatedAt: 'DateTime'
  }
  Coach: { // field return type name
    active: 'Boolean'
    address: 'String'
    bio: 'String'
    birthday: 'DateTime'
    bookings: 'Booking'
    contacts: 'Contact'
    createdAt: 'DateTime'
    email: 'String'
    firstName: 'String'
    id: 'Int'
    interests: 'CoachInterest'
    lastName: 'String'
    password: 'String'
    profilePicture: 'String'
    reviews: 'Review'
    sports: 'Sport'
    tasks: 'CoachTask'
    updatedAt: 'DateTime'
  }
  CoachInterest: { // field return type name
    active: 'Boolean'
    coach: 'Coach'
    coachId: 'Int'
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    type: 'String'
    updatedAt: 'DateTime'
  }
  CoachTask: { // field return type name
    active: 'Boolean'
    coach: 'Coach'
    coachId: 'Int'
    completionStatus: 'String'
    createdAt: 'DateTime'
    date: 'DateTime'
    description: 'String'
    id: 'Int'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Coachee: { // field return type name
    active: 'Boolean'
    address: 'String'
    bio: 'String'
    birthday: 'DateTime'
    bookings: 'Booking'
    contacts: 'Contact'
    createdAt: 'DateTime'
    email: 'String'
    firstName: 'String'
    id: 'Int'
    interests: 'CoacheeInterest'
    lastName: 'String'
    password: 'String'
    profilePicture: 'String'
    reviews: 'Review'
    sport: 'String'
    tasks: 'CoacheeTask'
    updatedAt: 'DateTime'
  }
  CoacheeInterest: { // field return type name
    active: 'Boolean'
    coachee: 'Coachee'
    coacheeId: 'Int'
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    type: 'String'
    updatedAt: 'DateTime'
  }
  CoacheeTask: { // field return type name
    active: 'Boolean'
    coachee: 'Coachee'
    coacheeId: 'Int'
    completionStatus: 'String'
    createdAt: 'DateTime'
    date: 'DateTime'
    description: 'String'
    id: 'Int'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Contact: { // field return type name
    active: 'Boolean'
    coach: 'Coach'
    coachId: 'Int'
    coachee: 'Coachee'
    coacheeId: 'Int'
    contactedStatus: 'Boolean'
    createdAt: 'DateTime'
    id: 'Int'
    messages: 'Message'
    updatedAt: 'DateTime'
  }
  Message: { // field return type name
    contact: 'Contact'
    contactId: 'Int'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
  }
  Mutation: { // field return type name
    coachLogin: 'Coach'
    coacheeLogin: 'Coachee'
    createBooking: 'Booking'
    createCoach: 'Coach'
    createCoachInterest: 'CoachInterest'
    createCoachTask: 'CoachTask'
    createCoachee: 'Coachee'
    createCoacheeInterest: 'CoacheeInterest'
    createCoacheeTask: 'CoacheeTask'
    createContact: 'Contact'
    createMessage: 'Message'
    createReview: 'Review'
    createSportsCredentials: 'SportsCredential'
    updateBookingSlotStatus: 'BookingSlot'
    updateBookingStatus: 'Booking'
    updateCoachInterests: 'CoachInterest'
    updateCoachProfile: 'Coach'
    updateCoachTask: 'CoachTask'
    updateCoacheeInterests: 'CoacheeInterest'
    updateCoacheeProfile: 'Coachee'
    updateCoacheeTask: 'CoacheeTask'
    updateContactedStatus: 'Contact'
    updatePendingBooking: 'Booking'
  }
  Query: { // field return type name
    coachees: 'Coachee'
    coaches: 'Coach'
    findBookingByID: 'Booking'
    findBookingsByStatusAndCoachID: 'Booking'
    findBookingsByStatusAndCoacheeID: 'Booking'
    findCoachByEmailAndPassword: 'Coach'
    findCoachByID: 'Coach'
    findCoacheeByEmailAndPassword: 'Coachee'
    findCoacheeByID: 'Coachee'
    findCoachesBySport: 'Coach'
    findContactsOfCoach: 'Contact'
    findContactsOfCoachDespiteContactedStatus: 'Contact'
    findMessagesByContactId: 'Message'
    findMessagesForCoachList: 'Message'
    findMessagesForCoacheeList: 'Message'
    findNonContactCoachesBySport: 'Coach'
    findOneToOneServiceSlotsByCoachId: 'SlotTime'
    findfilteredMessagesByContactId: 'Message'
  }
  Review: { // field return type name
    active: 'Boolean'
    coach: 'Coach'
    coachId: 'Int'
    coachee: 'Coachee'
    coacheeId: 'Int'
    comment: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    starRating: 'Int'
    updatedAt: 'DateTime'
  }
  SlotTime: { // field return type name
    date: 'DateTime'
    endTime: 'DateTime'
    startTime: 'DateTime'
  }
  Sport: { // field return type name
    active: 'Boolean'
    coach: 'Coach'
    coachId: 'Int'
    createdAt: 'DateTime'
    id: 'Int'
    sportsCredentials: 'SportsCredential'
    type: 'String'
    updatedAt: 'DateTime'
  }
  SportsCredential: { // field return type name
    active: 'Boolean'
    createdAt: 'DateTime'
    credentialPicture: 'String'
    id: 'Int'
    sport: 'Sport'
    sportId: 'Int'
    updatedAt: 'DateTime'
  }
  Subscription: { // field return type name
    newMessage: 'Message'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    coachLogin: { // args
      email: string; // String!
      password: string; // String!
    }
    coacheeLogin: { // args
      email: string; // String!
      password: string; // String!
    }
    createBooking: { // args
      input: NexusGenInputs['CreateBookingInput']; // CreateBookingInput!
      slotsInput: NexusGenInputs['CreateBookingSlotInput'][]; // [CreateBookingSlotInput!]!
    }
    createCoach: { // args
      input: NexusGenInputs['CreateCoachInput']; // CreateCoachInput!
      interestsInput: NexusGenInputs['CreateCoachInterestInput'][]; // [CreateCoachInterestInput!]!
      sportsInput: NexusGenInputs['CreateSportInput'][]; // [CreateSportInput!]!
    }
    createCoachInterest: { // args
      input: NexusGenInputs['CreateNewCoachInterestInput']; // CreateNewCoachInterestInput!
    }
    createCoachTask: { // args
      input: NexusGenInputs['CreateCoachTaskInput']; // CreateCoachTaskInput!
    }
    createCoachee: { // args
      input: NexusGenInputs['CreateCoacheeInput']; // CreateCoacheeInput!
      interestsInput: NexusGenInputs['CreateCoacheeInterestInput'][]; // [CreateCoacheeInterestInput!]!
    }
    createCoacheeInterest: { // args
      input: NexusGenInputs['CreateNewCoacheeInterestInput']; // CreateNewCoacheeInterestInput!
    }
    createCoacheeTask: { // args
      input: NexusGenInputs['CreateCoacheeTaskInput']; // CreateCoacheeTaskInput!
    }
    createContact: { // args
      input: NexusGenInputs['CreateContactInput']; // CreateContactInput!
    }
    createMessage: { // args
      input: NexusGenInputs['CreateMessageInput']; // CreateMessageInput!
    }
    createReview: { // args
      input: NexusGenInputs['CreateReviewInput']; // CreateReviewInput!
    }
    createSportsCredentials: { // args
      input: NexusGenInputs['CreateSportsCredentialsInput']; // CreateSportsCredentialsInput!
    }
    updateBookingSlotStatus: { // args
      id: number; // Int!
      input: NexusGenInputs['UpdateBookingSlotStatusInput']; // UpdateBookingSlotStatusInput!
    }
    updateBookingStatus: { // args
      id: number; // Int!
      input: NexusGenInputs['UpdateBookingStatusInput']; // UpdateBookingStatusInput!
    }
    updateCoachInterests: { // args
      input: Array<NexusGenInputs['UpdateCoachInterestInput'] | null>; // [UpdateCoachInterestInput]!
    }
    updateCoachProfile: { // args
      id: number; // Int!
      input: NexusGenInputs['UpdateCoachProfileInput']; // UpdateCoachProfileInput!
    }
    updateCoachTask: { // args
      id: number; // Int!
      input: NexusGenInputs['UpdateCoachTaskInput']; // UpdateCoachTaskInput!
    }
    updateCoacheeInterests: { // args
      input: Array<NexusGenInputs['UpdateCoacheeInterestInput'] | null>; // [UpdateCoacheeInterestInput]!
    }
    updateCoacheeProfile: { // args
      id: number; // Int!
      input: NexusGenInputs['UpdateCoacheeProfileInput']; // UpdateCoacheeProfileInput!
    }
    updateCoacheeTask: { // args
      id: number; // Int!
      input: NexusGenInputs['UpdateCoacheeTaskInput']; // UpdateCoacheeTaskInput!
    }
    updateContactedStatus: { // args
      id: number; // Int!
      input: NexusGenInputs['UpdateContactedStatusInput']; // UpdateContactedStatusInput!
    }
    updatePendingBooking: { // args
      addSlots?: Array<NexusGenInputs['CreateBookingSlotInput'] | null> | null; // [CreateBookingSlotInput]
      bookingData: NexusGenInputs['UpdateBookingInput']; // UpdateBookingInput!
      bookingId: number; // Int!
      deleteSlotsIds?: Array<number | null> | null; // [Int]
      updateSlots?: Array<NexusGenInputs['UpdateBookingSlotInput'] | null> | null; // [UpdateBookingSlotInput]
      updateSlotsIds?: Array<number | null> | null; // [Int]
    }
  }
  Query: {
    findBookingByID: { // args
      bookingID: number; // Int!
    }
    findBookingsByStatusAndCoachID: { // args
      coachID: number; // Int!
      status: string; // String!
    }
    findBookingsByStatusAndCoacheeID: { // args
      coacheeID: number; // Int!
      status: string; // String!
    }
    findCoachByEmailAndPassword: { // args
      email: string; // String!
      password: string; // String!
    }
    findCoachByID: { // args
      userID: number; // Int!
    }
    findCoacheeByEmailAndPassword: { // args
      email: string; // String!
      password: string; // String!
    }
    findCoacheeByID: { // args
      userID: number; // Int!
    }
    findCoachesBySport: { // args
      sportType: string; // String!
    }
    findContactsOfCoach: { // args
      coachId: number; // Int!
    }
    findContactsOfCoachDespiteContactedStatus: { // args
      coachId: number; // Int!
    }
    findMessagesByContactId: { // args
      contactId: number; // Int!
    }
    findMessagesForCoachList: { // args
      coacheeId: number; // Int!
    }
    findMessagesForCoacheeList: { // args
      coachId: number; // Int!
    }
    findNonContactCoachesBySport: { // args
      coacheeID: number; // Int!
      sportType: string; // String!
    }
    findOneToOneServiceSlotsByCoachId: { // args
      coachId: number; // Int!
    }
    findfilteredMessagesByContactId: { // args
      contactId: number; // Int!
      numberOfMessages: number; // Int!
    }
  }
  Subscription: {
    newMessage: { // args
      channelName: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}