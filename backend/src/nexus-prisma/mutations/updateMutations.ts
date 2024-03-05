import { mutationField, nonNull, arg } from 'nexus';
import { Context } from '../context';
import { Coachee, Coach, Booking, Contact } from '../objectTypes';
import {
    UpdateBookingStatusInput,
    UpdateCoacheeProfileInput,
    UpdateCoachProfileInput,
    UpdateContactedStatusInput,
} from '../inputTypes';

export const updateCoacheeProfile = mutationField('updateCoacheeProfile', {
    type: Coachee,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the coachee to update
        input: nonNull(arg({ type: UpdateCoacheeProfileInput })), // Input with fields to update
    },
    resolve: async (_, { id, input }, context: Context) => {
        // Check if the coachee with the given ID exists
        const existingCoachee = await context.db.coachee.findUnique({
            where: { id },
        });

        if (!existingCoachee) {
            throw new Error(`Coachee with ID ${id} not found.`);
        }

        // Perform the update using Prisma
        const updatedCoachee = await context.db.coachee.update({
            where: { id },
            data: input,
        });

        return updatedCoachee;
    },
});

export const updateCoachProfile = mutationField('updateCoachProfile', {
    type: Coach,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the coach to update
        input: nonNull(arg({ type: UpdateCoachProfileInput })), // Input with fields to update
    },
    resolve: async (_, { id, input }, context: Context) => {
        // Check if the coach with the given ID exists
        const existingCoach = await context.db.coach.findUnique({
            where: { id },
        });

        if (!existingCoach) {
            throw new Error(`Coach with ID ${id} not found.`);
        }

        // Perform the update using Prisma
        const updatedCoach = await context.db.coach.update({
            where: { id },
            data: input,
        });

        return updatedCoach;
    },
});

export const updateBookingStatus = mutationField('updateBookingStatus', {
    type: Booking,
    args: {
        id: nonNull(arg({ type: 'Int' })),
        input: nonNull(arg({ type: UpdateBookingStatusInput })),
    },
    resolve: async (_, { id, input }, context: Context) => {
        // Check if the booking with the given ID exists
        const existingBooking = await context.db.booking.findUnique({
            where: { id },
        });

        if (!existingBooking) {
            throw new Error(`Booking with ID ${id} not found.`);
        }

        // Update the booking status
        const updatedBooking = await context.db.booking.update({
            where: { id },
            data: { status: input.status },
        });

        return updatedBooking;
    },
});

export const updateContactedStatus = mutationField('updateContactedStatus', {
    type: Contact,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the contact to update
        input: nonNull(arg({ type: UpdateContactedStatusInput })), // Input with fields to update
    },
    resolve: async (_, { id, input }, context: Context) => {
        // Check if the contact with the given ID exists
        const existingContact = await context.db.contact.findUnique({
            where: { id },
        });

        if (!existingContact) {
            throw new Error(`Contact with ID ${id} not found.`);
        }

        // Perform the update using Prisma
        const updatedContact = await context.db.contact.update({
            where: { id },
            data: {
                contactedStatus: input.contactedStatus,
            },
        });

        return updatedContact;
    },
});
