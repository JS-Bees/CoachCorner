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
        t.field(gqlTypes.Coachee.mantra);
        t.field(gqlTypes.Coachee.affiliations);
        t.field(gqlTypes.Coachee.bio);
        t.field(gqlTypes.Coachee.profilePicture);
        t.field(gqlTypes.Coachee.moviesGenres);
        t.field(gqlTypes.Coachee.games);
        t.field(gqlTypes.Coachee.hobbies);
    },
});

export const CreateCoachInput = inputObjectType({
    name: 'CreateCoachInput',
    definition(t) {
        t.field(gqlTypes.Coach.birthday);
        t.field(gqlTypes.Coach.email);
        t.field(gqlTypes.Coach.firstName);
        t.field(gqlTypes.Coach.lastName);
        t.field(gqlTypes.Coach.password);
        t.field(gqlTypes.Coach.workplaceAddress);
        t.field(gqlTypes.Coach.mantra);
        t.field(gqlTypes.Coach.affiliations);
        t.field(gqlTypes.Coach.bio);
        t.field(gqlTypes.Coach.profilePicture);
        t.field(gqlTypes.Coach.sport);
        t.field(gqlTypes.Coach.moviesGenres);
        t.field(gqlTypes.Coach.games);
        t.field(gqlTypes.Coach.hobbies);
    },
});

export const UpdateCoacheeProfileInput = inputObjectType({
    name: 'UpdateCoacheeProfileInput',
    definition(t) {
        t.field(gqlTypes.Coachee.address);
        t.field(gqlTypes.Coachee.affiliations);
        t.field(gqlTypes.Coachee.bio);
        t.field(gqlTypes.Coachee.mantra);
        t.field(gqlTypes.Coachee.profilePicture);
    },
});

export const UpdateCoachProfileInput = inputObjectType({
    name: 'UpdateCoachProfileInput',
    definition(t) {
        t.field(gqlTypes.Coach.workplaceAddress);
        t.field(gqlTypes.Coach.affiliations);
        t.field(gqlTypes.Coach.bio);
        t.field(gqlTypes.Coach.mantra);
        t.field(gqlTypes.Coach.profilePicture);
    },
});

export const CreateCoachingRelationshipInput = inputObjectType({
    name: 'CreateCoachingRelationshipInput',
    definition(t) {
        t.field(gqlTypes.CoachingRelationship.coachId);
        t.field(gqlTypes.CoachingRelationship.coacheeId);
    },
});

export const MessagingStartedInput = inputObjectType({
    name: 'MessagingStartedInput',
    definition(t) {
        t.field(gqlTypes.CoachingRelationship.messagingStarted);
    },
});

export const CreateBookingInput = inputObjectType({
    name: 'CreateBookingInput',
    definition(t) {
        t.field(gqlTypes.Booking.coacheeId);
        t.field(gqlTypes.Booking.coachId);
        t.field(gqlTypes.Booking.serviceType);
        t.field(gqlTypes.Booking.status);
        t.field(gqlTypes.Booking.additionalNotes);
    },
});

export const CreateBookingSlotInput = inputObjectType({
    name: 'CreateBookingSlotInput',
    definition(t) {
        t.field(gqlTypes.BookingSlot.date);
        t.field(gqlTypes.BookingSlot.startTime);
        t.field(gqlTypes.BookingSlot.endTime);
    },
});

export const UpdateBookingStatusInput = inputObjectType({
    name: 'UpdateBookingStatusInput',
    definition(t) {
        t.field(gqlTypes.Booking.status);
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
