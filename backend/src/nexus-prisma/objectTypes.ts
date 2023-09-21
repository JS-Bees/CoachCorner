import { objectType } from 'nexus';
import * as gqlTypes from 'nexus-prisma';
import { DateTime } from 'nexus-prisma/scalars';
// import { Context } from './context';

export const custom = DateTime; // this is for the dateTime fields in all files

export const Coachee = objectType({
    name: 'Coachee',
    definition(t) {
        t.field(gqlTypes.Coachee.id);
        t.field(gqlTypes.Coachee.address);
        t.field(gqlTypes.Coachee.birthday);
        t.field(gqlTypes.Coachee.email);
        t.field(gqlTypes.Coachee.firstName);
        t.field(gqlTypes.Coachee.lastName);
        t.field(gqlTypes.Coachee.password);
        t.field(gqlTypes.Coachee.moviesGenres);
        t.field(gqlTypes.Coachee.games);
        t.field(gqlTypes.Coachee.hobbies);
        t.field(gqlTypes.Coachee.affiliations);
        t.field(gqlTypes.Coachee.bio);
        t.field(gqlTypes.Coachee.profilePicture);
        t.field(gqlTypes.Coachee.bookings);
        t.field(gqlTypes.Coachee.coachingRelationships);
        t.field(gqlTypes.Coachee.isCoach);
        t.field(gqlTypes.Coachee.active);
        t.field(gqlTypes.Coachee.createdAt);
        t.field(gqlTypes.Coachee.updatedAt);
    },
});

export const Coach = objectType({
    name: 'Coach',
    definition(t) {
        t.field(gqlTypes.Coach.id);
        t.field(gqlTypes.Coach.birthday);
        t.field(gqlTypes.Coach.email);
        t.field(gqlTypes.Coach.firstName);
        t.field(gqlTypes.Coach.lastName);
        t.field(gqlTypes.Coach.password);
        t.field(gqlTypes.Coach.workplaceAddress);
        t.field(gqlTypes.Coach.sport);
        t.field(gqlTypes.Coach.moviesGenres);
        t.field(gqlTypes.Coach.games);
        t.field(gqlTypes.Coach.hobbies);
        t.field(gqlTypes.Coach.affiliations);
        t.field(gqlTypes.Coach.bio);
        t.field(gqlTypes.Coach.profilePicture);
        t.field(gqlTypes.Coach.bookings);
        t.field(gqlTypes.Coach.coachingRelationships);
        t.field(gqlTypes.Coach.isCoach);
        t.field(gqlTypes.Coach.active);
        t.field(gqlTypes.Coach.createdAt);
        t.field(gqlTypes.Coach.updatedAt);
    },
});

export const CoachingRelationship = objectType({
    name: 'CoachingRelationship',
    definition(t) {
        t.field(gqlTypes.CoachingRelationship.id);
        t.field(gqlTypes.CoachingRelationship.coach);
        t.field(gqlTypes.CoachingRelationship.coachId);
        t.field(gqlTypes.CoachingRelationship.coachee);
        t.field(gqlTypes.CoachingRelationship.coacheeId);
        t.field(gqlTypes.CoachingRelationship.createdAt);
        t.field(gqlTypes.CoachingRelationship.updatedAt);
    },
});

export const BookingSlot = objectType({
    name: 'BookingSlot',
    definition(t) {
        t.field(gqlTypes.BookingSlot.id);
        t.field(gqlTypes.BookingSlot.bookingId);
        t.field(gqlTypes.BookingSlot.booking);
        t.field(gqlTypes.BookingSlot.date);
        t.field(gqlTypes.BookingSlot.startTime);
        t.field(gqlTypes.BookingSlot.endTime);
        t.field(gqlTypes.BookingSlot.createdAt);
        t.field(gqlTypes.BookingSlot.updatedAt);
    },
});

export const Booking = objectType({
    name: 'Booking',
    definition(t) {
        t.field(gqlTypes.Booking.id);
        t.field(gqlTypes.Booking.bookingSlots);
        t.field(gqlTypes.Booking.coach);
        t.field(gqlTypes.Booking.coachId);
        t.field(gqlTypes.Booking.coachee);
        t.field(gqlTypes.Booking.coacheeId);
        t.field(gqlTypes.Booking.coachName);
        t.field(gqlTypes.Booking.coacheeName);
        t.field(gqlTypes.Booking.serviceType);
        t.field(gqlTypes.Booking.status);
        t.field(gqlTypes.Booking.additionalNotes);
        t.field(gqlTypes.Booking.active);
        t.field(gqlTypes.Booking.createdAt);
        t.field(gqlTypes.Booking.updatedAt);
    },
});
