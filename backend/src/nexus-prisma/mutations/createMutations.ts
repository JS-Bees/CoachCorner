import { mutationField, nonNull, arg, list } from 'nexus';
import { Context } from '../context';
import bcrypt from 'bcrypt';
import {
    CreateBookingInput,
    CreateBookingSlotInput,
    CreateCoacheeInput,
    CreateCoachingRelationshipInput,
    CreateCoachInput,
} from '../inputTypes';
import { Coachee, Coach, CoachingRelationship, Booking } from '../objectTypes';

export const createCoachee = mutationField('createCoachee', {
    type: Coachee,
    args: {
        input: nonNull(arg({ type: CreateCoacheeInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        const hashedPassword = await bcrypt.hash(input.password, 10); // Hash the password with 10 salt rounds
        const coacheeData = { ...input, password: hashedPassword };
        return context.db.coachee.create({
            data: coacheeData,
        });
    },
});

export const createCoach = mutationField('createCoach', {
    type: Coach,
    args: {
        input: nonNull(arg({ type: CreateCoachInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        const hashedPassword = await bcrypt.hash(input.password, 10); // Hash the password with 10 salt rounds
        const coachData = { ...input, password: hashedPassword };
        return context.db.coach.create({
            data: coachData,
        });
    },
});

// haven't tested yet
export const createCoachingRelationship = mutationField(
    'createCoachingRelationship',
    {
        type: CoachingRelationship,
        args: {
            input: nonNull(arg({ type: CreateCoachingRelationshipInput })),
        },
        resolve: async (_, { input }, context: Context) => {
            // Perform validation and create the coaching relationship in your database.
            // You can access input.coacheeId and input.coachId to create the relationship.

            const { coacheeId, coachId } = input;

            // Validate if the Coachee and Coach exist in your database, and other validation checks if needed.

            const existingCoachee = await context.db.coachee.findUnique({
                where: { id: coacheeId },
            });
            const existingCoach = await context.db.coach.findUnique({
                where: { id: coachId },
            });

            if (!existingCoachee || !existingCoach) {
                throw new Error('Coachee or Coach not found.');
            }

            // Create the coaching relationship
            const coachingRelationship =
                await context.db.coachingRelationship.create({
                    data: {
                        coacheeId,
                        coachId,
                    },
                });

            return coachingRelationship;
        },
    },
);

// HAVEN'T TESTED
export const createBooking = mutationField('createBooking', {
    type: Booking,
    args: {
        input: nonNull(arg({ type: CreateBookingInput })),
        slotsInput: nonNull(list(nonNull(CreateBookingSlotInput))),
    },
    resolve: async (_, { input, slotsInput }, context: Context) => {
        // Create the booking in your database
        const booking = await context.db.booking.create({
            data: {
                coacheeId: input.coacheeId,
                coachId: input.coachId,
                serviceType: input.serviceType,
                status: input.status,
                additionalNotes: input.additionalNotes,
                // Other relevant fields from input
            },
        });

        // Create booking slots based on user input using a for loop
        const bookingSlots = [];

        for (const slotInput of slotsInput) {
            const createdSlot = await context.db.bookingSlot.create({
                data: {
                    bookingId: booking.id,
                    date: slotInput.date,
                    startTime: slotInput.startTime,
                    endTime: slotInput.endTime,
                    // Other relevant fields from slotInput
                },
            });
            bookingSlots.push(createdSlot);
        }

        // Update the booking object with the associated booking slots in the database
        await context.db.booking.update({
            where: { id: booking.id },
            data: {
                bookingSlots: {
                    connect: bookingSlots.map((slot) => ({ id: slot.id })),
                },
            },
        });

        // Fetch the updated booking with booking slots
        const updatedBooking = await context.db.booking.findUnique({
            where: { id: booking.id },
            include: {
                bookingSlots: true,
            },
        });

        if (!updatedBooking) {
            // Handle the case where the booking couldn't be retrieved
            throw new Error('Booking not found.');
        }

        return updatedBooking;
    },
});

// HAVEN'T TESTED
// export const createBooking = mutationField('createBooking', {
//     type: Booking,
//     args: {
//         input: nonNull(arg({ type: CreateBookingInput })),
//         slotsInput: nonNull(list(nonNull(CreateBookingSlotInput))),
//     },
//     resolve: async (_, { input, slotsInput }, context: Context) => {
//         // Create the booking in your database
//         const booking = await context.db.booking.create({
//             data: {
//                 coacheeId: input.coacheeId,
//                 coachId: input.coachId,
//                 serviceType: input.serviceType,
//                 status: input.status,
//                 additionalNotes: input.additionalNotes,
//                 // Other relevant fields from input
//             },
//         });

//         // Create booking slots based on user input
//         const bookingSlots = await Promise.all(
//             slotsInput.map(async (slotInput) => {
//                 const createdSlot = await context.db.bookingSlot.create({
//                     data: {
//                         bookingId: booking.id,
//                         date: slotInput.date,
//                         startTime: slotInput.startTime,
//                         endTime: slotInput.endTime,
//                         // Other relevant fields from slotInput
//                     },
//                 });
//                 return createdSlot;
//             }),
//         );

//         // Update the booking object with the associated booking slots in the database
//         await context.db.booking.update({
//             where: { id: booking.id },
//             data: {
//                 bookingSlots: {
//                     connect: bookingSlots.map((slot) => ({ id: slot.id })),
//                 },
//             },
//         });

//         // Fetch the updated booking with booking slots
//         const updatedBooking = await context.db.booking.findUnique({
//             where: { id: booking.id },
//             include: {
//                 bookingSlots: true,
//             },
//         });

//         return updatedBooking;
//     },
// });
