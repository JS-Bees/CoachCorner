import * as gqlTypes from 'nexus-prisma';
import { inputObjectType } from 'nexus';

export const CreateCoacheeInput = inputObjectType({
    name: 'CreateCoacheeInput',
    definition(t) {
        t.field(gqlTypes.Coachee.address);
        t.field(gqlTypes.Coachee.birthday);
        t.field(gqlTypes.Coachee.email);
        t.field(gqlTypes.Coachee.firstName);
        t.field(gqlTypes.Coachee.lastName);
        t.field(gqlTypes.Coachee.password);
        t.field(gqlTypes.Coachee.profilePicture);
        t.field(gqlTypes.Coachee.bio);

        // Handle the generation of the sport and interest objects in the mutations
    },
});

export const CreateCoachInput = inputObjectType({
    name: 'CreateCoachInput',
    definition(t) {
        t.field(gqlTypes.Coach.address);
        t.field(gqlTypes.Coach.birthday);
        t.field(gqlTypes.Coach.email);
        t.field(gqlTypes.Coach.firstName);
        t.field(gqlTypes.Coach.lastName);
        t.field(gqlTypes.Coach.password);
        t.field(gqlTypes.Coach.profilePicture);
        t.field(gqlTypes.Coach.bio);
    },
});

export const CreateBookingInput = inputObjectType({
    name: 'CreateBookingInput',
    definition(t) {
        t.field(gqlTypes.Booking.coacheeId);
        t.field(gqlTypes.Booking.coachId);
        t.field(gqlTypes.Booking.serviceType);
        t.field(gqlTypes.Booking.additionalNotes);
        t.field(gqlTypes.Booking.status);
    },
});

export const CreateBookingSlotInput = inputObjectType({
    name: 'CreateBookingSlotInput',
    definition(t) {
        t.field(gqlTypes.BookingSlot.date);
        t.field(gqlTypes.BookingSlot.startTime);
        t.field(gqlTypes.BookingSlot.endTime);
        t.field(gqlTypes.BookingSlot.status);
    },
});

export const CreateReviewInput = inputObjectType({
    name: 'CreateReviewInput',
    definition(t) {
        t.field(gqlTypes.Review.starRating);
        t.field(gqlTypes.Review.comment);
        t.field(gqlTypes.Review.coachId);
        t.field(gqlTypes.Review.coacheeId);
    },
});

// New Additions
export const CreateCoachTaskInput = inputObjectType({
    name: 'CreateCoachTaskInput',
    definition(t) {
        t.field(gqlTypes.CoachTask.coachId);
        t.field(gqlTypes.CoachTask.title);
        t.field(gqlTypes.CoachTask.description);
        t.field(gqlTypes.CoachTask.completionStatus);
        t.field(gqlTypes.CoachTask.date);
    },
});

export const CreateCoacheeTaskInput = inputObjectType({
    name: 'CreateCoacheeTaskInput',
    definition(t) {
        t.field(gqlTypes.CoacheeTask.coacheeId);
        t.field(gqlTypes.CoacheeTask.title);
        t.field(gqlTypes.CoacheeTask.description);
        t.field(gqlTypes.CoacheeTask.completionStatus);
        t.field(gqlTypes.CoacheeTask.date);
    },
});

export const CreateCoachInterestInput = inputObjectType({
    name: 'CreateCoachInterestInput',
    definition(t) {
        t.field(gqlTypes.CoachInterest.type);
        t.field(gqlTypes.CoachInterest.name);
    },
});

export const CreateCoacheeInterestInput = inputObjectType({
    name: 'CreateCoacheeInterestInput',
    definition(t) {
        t.field(gqlTypes.CoacheeInterest.type);
        t.field(gqlTypes.CoacheeInterest.name);
    },
});

export const CreateContactInput = inputObjectType({
    name: 'CreateContactInput',
    definition(t) {
        t.field(gqlTypes.Contact.coachId);
        t.field(gqlTypes.Contact.coacheeId);
        t.field(gqlTypes.Contact.contactedStatus);
    },
});

export const CreateMessageInput = inputObjectType({
    name: 'CreateMessageInput',
    definition(t) {
        t.field(gqlTypes.Message.contactId);
        t.field(gqlTypes.Message.content);
    },
});

export const CreateSportInput = inputObjectType({
    name: 'CreateSportInput',
    definition(t) {
        t.field(gqlTypes.Sport.type);
    },
});

export const CreateSportsCredentialsInput = inputObjectType({
    name: 'CreateSportsCredentialsInput',
    definition(t) {
        t.field(gqlTypes.SportsCredential.sportId);
        t.field(gqlTypes.SportsCredential.credentialPicture);
    },
});

export const CreateNewCoachInterestInput = inputObjectType({
    name: 'CreateNewCoachInterestInput',
    definition(t) {
        t.field(gqlTypes.CoachInterest.coachId);
        t.field(gqlTypes.CoachInterest.type);
        t.field(gqlTypes.CoachInterest.name);
    },
});

export const CreateNewCoacheeInterestInput = inputObjectType({
    name: 'CreateNewCoacheeInterestInput',
    definition(t) {
        t.field(gqlTypes.CoacheeInterest.coacheeId);
        t.field(gqlTypes.CoacheeInterest.type);
        t.field(gqlTypes.CoacheeInterest.name);
    },
});

// UPDATE INPUT TYPES

export const UpdateBookingStatusInput = inputObjectType({
    name: 'UpdateBookingStatusInput',
    definition(t) {
        t.field(gqlTypes.Booking.status);
    },
});

export const UpdateBookingSlotStatusInput = inputObjectType({
    name: 'UpdateBookingSlotStatusInput',
    definition(t) {
        t.field(gqlTypes.BookingSlot.status);
    },
});

export const UpdateCoacheeProfileInput = inputObjectType({
    name: 'UpdateCoacheeProfileInput',
    definition(t) {
        t.field(gqlTypes.Coachee.address);
        t.field(gqlTypes.Coachee.bio);
        t.field(gqlTypes.Coachee.profilePicture);
    },
});

export const UpdateCoachProfileInput = inputObjectType({
    name: 'UpdateCoachProfileInput',
    definition(t) {
        t.field(gqlTypes.Coach.address);
        t.field(gqlTypes.Coach.bio);
        t.field(gqlTypes.Coach.profilePicture);
    },
});

export const UpdateContactedStatusInput = inputObjectType({
    name: 'UpdateContactedStatusInput',
    definition(t) {
        t.field(gqlTypes.Contact.contactedStatus);
    },
});

export const UpdateCoachInterestInput = inputObjectType({
    name: 'UpdateCoachInterestInput',
    definition(t) {
        t.field(gqlTypes.CoachInterest.type);
        t.field(gqlTypes.CoachInterest.name);
    },
});

export const UpdateCoacheeInterestInput = inputObjectType({
    name: 'UpdateCoacheeInterestInput',
    definition(t) {
        t.field(gqlTypes.CoacheeInterest.type);
        t.field(gqlTypes.CoacheeInterest.name);
    },
});

export const UpdateCoachTaskInput = inputObjectType({
    name: 'UpdateCoachTaskInput',
    definition(t) {
        t.field(gqlTypes.CoachTask.title);
        t.field(gqlTypes.CoachTask.description);
        t.field(gqlTypes.CoachTask.completionStatus);
        t.field(gqlTypes.CoachTask.date);
    },
});

export const UpdateCoacheeTaskInput = inputObjectType({
    name: 'UpdateCoacheeTaskInput',
    definition(t) {
        t.field(gqlTypes.CoacheeTask.title);
        t.field(gqlTypes.CoacheeTask.description);
        t.field(gqlTypes.CoacheeTask.completionStatus);
        t.field(gqlTypes.CoacheeTask.date);
    },
});

export const UpdateBookingInput = inputObjectType({
    name: 'UpdateBookingInput',
    definition(t) {
        t.field(gqlTypes.Booking.serviceType);
        t.field(gqlTypes.Booking.additionalNotes);
    },
});

export const UpdateBookingSlotInput = inputObjectType({
    name: 'UpdateBookingSlotInput',
    definition(t) {
        t.field(gqlTypes.BookingSlot.id);
        t.field(gqlTypes.BookingSlot.date);
        t.field(gqlTypes.BookingSlot.startTime);
        t.field(gqlTypes.BookingSlot.endTime);
        t.field(gqlTypes.BookingSlot.status);
    },
});
