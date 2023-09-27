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
        t.field(gqlTypes.Coachee.moviesGenres);
        t.field(gqlTypes.Coachee.games);
        t.field(gqlTypes.Coachee.hobbies);
        t.field(gqlTypes.Coachee.affiliations);
        t.field(gqlTypes.Coachee.bio);
        t.field(gqlTypes.Coachee.mantra);
        t.field(gqlTypes.Coachee.profilePicture);
        // t.field(gqlTypes.Coachee.bookings);
        t.list.field('bookings', {
            type: 'Booking',
            resolve: (coachee, _args, ctx) => {
                return ctx.db.booking.findMany({
                    where: { coacheeId: coachee.id },
                });
            },
        });
        // t.field(gqlTypes.Coachee.coachingRelationships);
        t.list.field('coachingRelationships', {
            type: 'CoachingRelationship',
            resolve: (coachee, _args, ctx: Context) => {
                return ctx.db.coachingRelationship.findMany({
                    where: { coacheeId: coachee.id },
                });
            },
        });
        // t.field(gqlTypes.Coachee.reviews);
        t.list.field('reviews', {
            type: 'Review',
            resolve: (coachee, _args, ctx) => {
                return ctx.db.review.findMany({
                    where: { coacheeId: coachee.id },
                });
            },
        });
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
        t.field(gqlTypes.Coach.mantra);
        t.field(gqlTypes.Coach.profilePicture);
        // t.field(gqlTypes.Coach.bookings);
        t.list.field('bookings', {
            type: 'Booking',
            resolve: (coach, _args, ctx) => {
                return ctx.db.booking.findMany({
                    where: { coachId: coach.id },
                });
            },
        });
        // t.field(gqlTypes.Coach.coachingRelationships);
        t.list.field('coachingRelationships', {
            type: 'CoachingRelationship',
            resolve: (coach, _args, ctx: Context) => {
                return ctx.db.coachingRelationship.findMany({
                    where: { coachId: coach.id },
                });
            },
        });
        // t.field(gqlTypes.Coach.reviews);
        t.list.field('reviews', {
            type: 'Review',
            resolve: (coach, _args, ctx) => {
                return ctx.db.review.findMany({
                    where: { coachId: coach.id },
                });
            },
        });
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
        t.field(gqlTypes.CoachingRelationship.coachId);
        t.field(gqlTypes.CoachingRelationship.coacheeId);
        t.field(gqlTypes.CoachingRelationship.active);
        t.field(gqlTypes.CoachingRelationship.createdAt);
        t.field(gqlTypes.CoachingRelationship.updatedAt);
        // t.field(gqlTypes.CoachingRelationship.coach);
        t.field('coach', {
            type: 'Coach',
            resolve: (relationship, _args, ctx) => {
                return ctx.db.coach.findUnique({
                    where: { id: relationship.coachId },
                });
            },
        });
        // t.field(gqlTypes.CoachingRelationship.coachee);
        t.field('coachee', {
            type: 'Coachee',
            resolve: (relationship, _args, ctx) => {
                return ctx.db.coachee.findUnique({
                    where: { id: relationship.coacheeId },
                });
            },
        });
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
                    where: { id: bookingSlot.bookingId },
                });
            },
        });
        // ^IDK if this works test by running query in playground (if bookingSlots can return booking objects), seems like it works
        t.field(gqlTypes.BookingSlot.date);
        t.field(gqlTypes.BookingSlot.startTime);
        t.field(gqlTypes.BookingSlot.endTime);
        t.field(gqlTypes.BookingSlot.active);
        t.field(gqlTypes.BookingSlot.createdAt);
        t.field(gqlTypes.BookingSlot.updatedAt);
    },
});

export const Booking = objectType({
    name: 'Booking',
    definition(t) {
        t.field(gqlTypes.Booking.id);
        // t.field(gqlTypes.Booking.bookingSlots);
        t.list.field('bookingSlots', {
            type: 'BookingSlot',
            resolve: (booking, _args, ctx: Context) => {
                return ctx.db.bookingSlot.findMany({
                    where: { bookingId: booking.id },
                });
            },
        });
        // t.field(gqlTypes.Booking.coach);
        t.field('coach', {
            type: 'Coach',
            resolve: (booking, _args, ctx) => {
                return ctx.db.coach.findUnique({
                    where: { id: booking.coachId },
                });
            },
        });
        t.field(gqlTypes.Booking.coachId);
        // t.field(gqlTypes.Booking.coachee);
        t.field('coachee', {
            type: 'Coachee',
            resolve: (booking, _args, ctx) => {
                return ctx.db.coachee.findUnique({
                    where: { id: booking.coacheeId },
                });
            },
        });
        t.field(gqlTypes.Booking.coacheeId);
        t.field(gqlTypes.Booking.serviceType);
        t.field(gqlTypes.Booking.status);
        t.field(gqlTypes.Booking.additionalNotes);
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
                    where: { id: review.coachId },
                });
            },
        });
        // t.field(gqlTypes.Review.coachee);
        t.field('coachee', {
            type: 'Coachee',
            resolve: (review, _args, ctx) => {
                return ctx.db.coachee.findUnique({
                    where: { id: review.coacheeId },
                });
            },
        });
        t.field(gqlTypes.Review.active);
        t.field(gqlTypes.Review.createdAt);
        t.field(gqlTypes.Review.updatedAt);
    },
});
