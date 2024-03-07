import { objectType } from 'nexus';
import * as gqlTypes from 'nexus-prisma';
import { DateTime } from 'nexus-prisma/scalars';
import { Context } from './context';

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
        t.field(gqlTypes.Coachee.profilePicture);
        t.field(gqlTypes.Coachee.bio);

        // t.field(gqlTypes.Coachee.interests);
        t.list.field('interests', {
            type: 'CoacheeInterest',
            resolve: (coachee, _args, ctx) => {
                // should be coacheeInterest (singular)
                return ctx.db.coacheeInterest.findMany({
                    where: { coacheeId: coachee.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coachee.tasks);
        t.list.field('tasks', {
            type: 'CoacheeTask',
            resolve: (coachee, _args, ctx) => {
                return ctx.db.coacheeTask.findMany({
                    where: { coacheeId: coachee.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coachee.bookings);
        t.list.field('bookings', {
            type: 'Booking',
            resolve: (coachee, _args, ctx) => {
                return ctx.db.booking.findMany({
                    where: { coacheeId: coachee.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coachee.reviews);
        t.list.field('reviews', {
            type: 'Review',
            resolve: (coachee, _args, ctx) => {
                return ctx.db.review.findMany({
                    where: { coacheeId: coachee.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coachee.contacts);
        t.list.field('contacts', {
            type: 'Contact',
            resolve: (coachee, _args, ctx) => {
                return ctx.db.contact.findMany({
                    where: { coacheeId: coachee.id, active: true },
                });
            },
        });

        t.field(gqlTypes.Coachee.active);
        t.field(gqlTypes.Coachee.createdAt);
        t.field(gqlTypes.Coachee.updatedAt);
    },
});

export const Coach = objectType({
    name: 'Coach',
    definition(t) {
        t.field(gqlTypes.Coach.id);
        t.field(gqlTypes.Coach.address);
        t.field(gqlTypes.Coach.birthday);
        t.field(gqlTypes.Coach.email);
        t.field(gqlTypes.Coach.firstName);
        t.field(gqlTypes.Coach.lastName);
        t.field(gqlTypes.Coach.password);
        t.field(gqlTypes.Coach.profilePicture);
        t.field(gqlTypes.Coach.bio);

        // t.field(gqlTypes.Coach.interests);
        t.list.field('interests', {
            type: 'CoachInterest',
            resolve: (coach, _args, ctx) => {
                return ctx.db.coachInterest.findMany({
                    where: { coachId: coach.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coach.tasks);
        t.list.field('tasks', {
            type: 'CoachTask',
            resolve: (coach, _args, ctx) => {
                return ctx.db.coachTask.findMany({
                    where: { coachId: coach.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coach.bookings);
        t.list.field('bookings', {
            type: 'Booking',
            resolve: (coach, _args, ctx) => {
                return ctx.db.booking.findMany({
                    where: { coachId: coach.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coach.reviews);
        t.list.field('reviews', {
            type: 'Review',
            resolve: (coach, _args, ctx) => {
                return ctx.db.review.findMany({
                    where: { coachId: coach.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coach.contacts);
        t.list.field('contacts', {
            type: 'Contact',
            resolve: (coach, _args, ctx) => {
                return ctx.db.contact.findMany({
                    where: { coachId: coach.id, active: true },
                });
            },
        });

        // t.field(gqlTypes.Coach.sports);
        t.list.field('sports', {
            type: 'Sport',
            resolve: (coach, _args, ctx) => {
                return ctx.db.sport.findMany({
                    where: { coachId: coach.id, active: true },
                });
            },
        });

        t.field(gqlTypes.Coach.active);
        t.field(gqlTypes.Coach.createdAt);
        t.field(gqlTypes.Coach.updatedAt);
    },
});

export const BookingSlot = objectType({
    name: 'BookingSlot',
    definition(t) {
        t.field(gqlTypes.BookingSlot.id);
        t.field(gqlTypes.BookingSlot.bookingId);

        // t.field(gqlTypes.BookingSlot.booking);
        t.field('booking', {
            type: 'Booking',
            resolve: (bookingSlot, _args, ctx) => {
                return ctx.db.booking.findUnique({
                    where: { id: bookingSlot.bookingId, active: true },
                });
            },
        });

        t.field(gqlTypes.BookingSlot.date);
        t.field(gqlTypes.BookingSlot.startTime);
        t.field(gqlTypes.BookingSlot.endTime);
        t.field(gqlTypes.BookingSlot.status);

        t.field(gqlTypes.BookingSlot.active);
        t.field(gqlTypes.BookingSlot.createdAt);
        t.field(gqlTypes.BookingSlot.updatedAt);
    },
});

export const Booking = objectType({
    name: 'Booking',
    definition(t) {
        t.field(gqlTypes.Booking.id);
        t.field(gqlTypes.Booking.coacheeId);
        t.field(gqlTypes.Booking.coachId);

        // t.field(gqlTypes.Booking.bookingSlots);
        t.list.field('bookingSlots', {
            type: 'BookingSlot',
            resolve: (booking, _args, ctx: Context) => {
                return ctx.db.bookingSlot.findMany({
                    where: { bookingId: booking.id, active: true },
                });
            },
        });
        // t.field(gqlTypes.Booking.coach);
        t.field('coach', {
            type: 'Coach',
            resolve: (booking, _args, ctx) => {
                return ctx.db.coach.findUnique({
                    where: { id: booking.coachId, active: true },
                });
            },
        });
        // t.field(gqlTypes.Booking.coachee);
        t.field('coachee', {
            type: 'Coachee',
            resolve: (booking, _args, ctx) => {
                return ctx.db.coachee.findUnique({
                    where: { id: booking.coacheeId, active: true },
                });
            },
        });

        t.field(gqlTypes.Booking.serviceType);
        t.field(gqlTypes.Booking.additionalNotes);
        t.field(gqlTypes.Booking.status);

        t.field(gqlTypes.Booking.active);
        t.field(gqlTypes.Booking.createdAt);
        t.field(gqlTypes.Booking.updatedAt);
    },
});

export const Review = objectType({
    name: 'Review',
    definition(t) {
        t.field(gqlTypes.Review.id);
        t.field(gqlTypes.Review.starRating);
        t.field(gqlTypes.Review.comment);
        t.field(gqlTypes.Review.coacheeId);
        t.field(gqlTypes.Review.coachId);

        // t.field(gqlTypes.Review.coach);
        t.field('coach', {
            type: 'Coach',
            resolve: (review, _args, ctx) => {
                return ctx.db.coach.findUnique({
                    where: { id: review.coachId, active: true },
                });
            },
        });
        // t.field(gqlTypes.Review.coachee);
        t.field('coachee', {
            type: 'Coachee',
            resolve: (review, _args, ctx) => {
                return ctx.db.coachee.findUnique({
                    where: { id: review.coacheeId, active: true },
                });
            },
        });

        t.field(gqlTypes.Review.active);
        t.field(gqlTypes.Review.createdAt);
        t.field(gqlTypes.Review.updatedAt);
    },
});

export const Sport = objectType({
    name: 'Sport',
    definition(t) {
        t.field(gqlTypes.Sport.id);
        t.field(gqlTypes.Sport.type);
        t.field(gqlTypes.Sport.coachId);

        // t.field(gqlTypes.Sport.coach);
        t.field('coach', {
            type: 'Coach',
            resolve: (sport, _args, ctx) => {
                return ctx.db.coach.findUnique({
                    where: { id: sport.coachId, active: true },
                });
            },
        });
        // t.field(gqlTypes.Sport.sportsCredentials);
        t.list.field('sportsCredentials', {
            type: 'SportsCredential',
            resolve: (sport, _args, ctx: Context) => {
                return ctx.db.sportsCredential.findMany({
                    where: { sportId: sport.id, active: true },
                });
            },
        });

        t.field(gqlTypes.Sport.active);
        t.field(gqlTypes.Sport.createdAt);
        t.field(gqlTypes.Sport.updatedAt);
    },
});

export const SportsCredential = objectType({
    name: 'SportsCredential',
    definition(t) {
        t.field(gqlTypes.SportsCredential.id);
        t.field(gqlTypes.SportsCredential.credentialPicture);
        t.field(gqlTypes.SportsCredential.sportId);

        // t.field(gqlTypes.SportsCredential.sports);
        t.field('sport', {
            type: 'Sport',
            resolve: (sportsCredential, _args, ctx) => {
                return ctx.db.sport.findUnique({
                    where: { id: sportsCredential.sportId, active: true },
                });
            },
        });

        t.field(gqlTypes.SportsCredential.active);
        t.field(gqlTypes.SportsCredential.createdAt);
        t.field(gqlTypes.SportsCredential.updatedAt);
    },
});

export const CoachInterest = objectType({
    name: 'CoachInterest',
    definition(t) {
        t.field(gqlTypes.CoachInterest.id);
        t.field(gqlTypes.CoachInterest.type);
        t.field(gqlTypes.CoachInterest.name);
        t.field(gqlTypes.CoachInterest.coachId);

        // t.field(gqlTypes.CoachInterest.coach);
        t.field('coach', {
            type: 'Coach',
            resolve: (coachInterest, _args, ctx) => {
                return ctx.db.coach.findUnique({
                    where: { id: coachInterest.coachId, active: true },
                });
            },
        });

        t.field(gqlTypes.CoachInterest.active);
        t.field(gqlTypes.CoachInterest.createdAt);
        t.field(gqlTypes.CoachInterest.updatedAt);
    },
});

export const CoacheeInterest = objectType({
    name: 'CoacheeInterest',
    definition(t) {
        t.field(gqlTypes.CoacheeInterest.id);
        t.field(gqlTypes.CoacheeInterest.type);
        t.field(gqlTypes.CoacheeInterest.name);
        t.field(gqlTypes.CoacheeInterest.coacheeId);

        // t.field(gqlTypes.CoacheeInterest.coachee);
        t.field('coachee', {
            type: 'Coachee',
            resolve: (coacheeInterest, _args, ctx) => {
                return ctx.db.coachee.findUnique({
                    where: { id: coacheeInterest.coacheeId, active: true },
                });
            },
        });

        t.field(gqlTypes.CoacheeInterest.active);
        t.field(gqlTypes.CoacheeInterest.createdAt);
        t.field(gqlTypes.CoacheeInterest.updatedAt);
    },
});

export const CoachTask = objectType({
    name: 'CoachTask',
    definition(t) {
        t.field(gqlTypes.CoachTask.id);
        t.field(gqlTypes.CoachTask.title);
        t.field(gqlTypes.CoachTask.description);
        t.field(gqlTypes.CoachTask.completionStatus);
        t.field(gqlTypes.CoachTask.date);
        t.field(gqlTypes.CoachTask.coachId);

        // t.field(gqlTypes.CoachTask.coach);
        t.field('coach', {
            type: 'Coach',
            resolve: (coachTask, _args, ctx) => {
                return ctx.db.coach.findUnique({
                    where: { id: coachTask.coachId, active: true },
                });
            },
        });

        t.field(gqlTypes.CoachTask.active);
        t.field(gqlTypes.CoachTask.createdAt);
        t.field(gqlTypes.CoachTask.updatedAt);
    },
});

export const CoacheeTask = objectType({
    name: 'CoacheeTask',
    definition(t) {
        t.field(gqlTypes.CoacheeTask.id);
        t.field(gqlTypes.CoacheeTask.title);
        t.field(gqlTypes.CoacheeTask.description);
        t.field(gqlTypes.CoacheeTask.completionStatus);
        t.field(gqlTypes.CoacheeTask.date);
        t.field(gqlTypes.CoacheeTask.coacheeId);

        // t.field(gqlTypes.CoacheeTask.coachee);
        t.field('coachee', {
            type: 'Coachee',
            resolve: (coacheeTask, _args, ctx) => {
                return ctx.db.coachee.findUnique({
                    where: { id: coacheeTask.coacheeId, active: true },
                });
            },
        });

        t.field(gqlTypes.CoacheeTask.active);
        t.field(gqlTypes.CoacheeTask.createdAt);
        t.field(gqlTypes.CoacheeTask.updatedAt);
    },
});

export const Contact = objectType({
    name: 'Contact',
    definition(t) {
        t.field(gqlTypes.Contact.id);
        t.field(gqlTypes.Contact.coacheeId);
        t.field(gqlTypes.Contact.coachId);
        t.field(gqlTypes.Contact.contactedStatus);

        // t.field(gqlTypes.Contact.coach);
        t.field('coach', {
            type: 'Coach',
            resolve: (contact, _args, ctx) => {
                return ctx.db.coach.findUnique({
                    where: { id: contact.coachId, active: true },
                });
            },
        });
        // t.field(gqlTypes.Contact.coachee);
        t.field('coachee', {
            type: 'Coachee',
            resolve: (contact, _args, ctx) => {
                return ctx.db.coachee.findUnique({
                    where: { id: contact.coacheeId, active: true },
                });
            },
        });
        // t.field(gqlTypes.Contact.messages);
        t.list.field('messages', {
            type: 'Message',
            resolve: (contact, _args, ctx) => {
                return ctx.db.message.findMany({
                    where: { contactId: contact.id },
                });
            },
        });

        t.field(gqlTypes.Contact.active);
        t.field(gqlTypes.Contact.createdAt);
        t.field(gqlTypes.Contact.updatedAt);
    },
});

export const Message = objectType({
    name: 'Message',
    definition(t) {
        t.field(gqlTypes.Message.id);
        t.field(gqlTypes.Message.content);
        t.field(gqlTypes.Message.contactId);

        // t.field(gqlTypes.Message.contact);
        t.field('contact', {
            type: 'Contact',
            resolve: (message, _args, ctx) => {
                return ctx.db.contact.findUnique({
                    where: { id: message.contactId, active: true },
                });
            },
        });

        t.field(gqlTypes.Message.createdAt);
    },
});
