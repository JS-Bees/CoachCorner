import { mutationField, nonNull, arg, list } from 'nexus';
import * as yup from 'yup';
import { Context } from '../context';
import {
    Coachee,
    Coach,
    Booking,
    Contact,
    CoacheeInterest,
    CoachInterest,
    BookingSlot,
    CoachTask,
    CoacheeTask,
} from '../objectTypes';
import {
    CreateBookingSlotInput,
    UpdateBookingInput,
    UpdateBookingSlotInput,
    UpdateBookingSlotStatusInput,
    UpdateBookingStatusInput,
    UpdateCoacheeInterestInput,
    UpdateCoacheeProfileInput,
    UpdateCoacheeTaskInput,
    UpdateCoachInterestInput,
    UpdateCoachProfileInput,
    UpdateCoachTaskInput,
    UpdateContactedStatusInput,
} from '../inputTypes';
import {
    bookingSlotSchema,
    idSchema,
    interestSchema,
    updateBookingSchema,
    updateBookingSlotSchema,
    updateBookingSlotStatusSchema,
    updateBookingStatusSchema,
    updateContactedStatusSchema,
    updateProfileSchema,
    updateTaskSchema,
} from '../validation';

export const updateCoacheeProfile = mutationField('updateCoacheeProfile', {
    type: Coachee,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the coachee to update
        input: nonNull(arg({ type: UpdateCoacheeProfileInput })), // Input with fields to update
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
            // Validate the ID using the idSchema
            idSchema.validateSync({ id });

            // Validate the input using the updateCoacheeSchema
            updateProfileSchema.validateSync(input);

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
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updateCoachProfile = mutationField('updateCoachProfile', {
    type: Coach,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the coach to update
        input: nonNull(arg({ type: UpdateCoachProfileInput })), // Input with fields to update
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
            // Validate the ID using the idSchema
            idSchema.validateSync({ id });

            // Validate the input using the updateCoachSchema
            updateProfileSchema.validateSync(input);

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
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updateBookingStatus = mutationField('updateBookingStatus', {
    type: Booking,
    args: {
        id: nonNull(arg({ type: 'Int' })),
        input: nonNull(arg({ type: UpdateBookingStatusInput })),
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
            // Validate the ID using the idSchema
            idSchema.validateSync({ id });

            // Validate the input using the updateBookingStatusSchema
            updateBookingStatusSchema.validateSync(input);

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
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updateBookingSlotStatus = mutationField(
    'updateBookingSlotStatus',
    {
        type: BookingSlot,
        args: {
            id: nonNull(arg({ type: 'Int' })),
            input: nonNull(arg({ type: UpdateBookingSlotStatusInput })),
        },
        resolve: async (_, { id, input }, context: Context) => {
            try {
                // Validate the ID using the idSchema
                idSchema.validateSync({ id });

                // Validate the input using the updateBookingSlotStatusSchema
                updateBookingSlotStatusSchema.validateSync(input);

                // Check if the booking slot with the given ID exists
                const existingBookingSlot =
                    await context.db.bookingSlot.findUnique({
                        where: { id },
                    });

                if (!existingBookingSlot) {
                    throw new Error(`Booking slot with ID ${id} not found.`);
                }

                // Update the booking slot status
                const updatedBookingSlot = await context.db.bookingSlot.update({
                    where: { id },
                    data: { status: input.status },
                });

                return updatedBookingSlot;
            } catch (error) {
                // Handle validation errors or other exceptions
                if (error instanceof yup.ValidationError) {
                    // You can customize the error message based on the validation error
                    throw new Error(error.message);
                }
                // Rethrow other errors
                throw error;
            }
        },
    },
);

export const updateContactedStatus = mutationField('updateContactedStatus', {
    type: Contact,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the contact to update
        input: nonNull(arg({ type: UpdateContactedStatusInput })), // Input with fields to update
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
            // Validate the ID using the idSchema
            idSchema.validateSync({ id });

            // Validate the input using the updateContactedStatusSchema
            updateContactedStatusSchema.validateSync(input);

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
                data: { contactedStatus: input.contactedStatus },
            });

            return updatedContact;
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updateCoacheeInterest = mutationField('updateCoacheeInterests', {
    type: list(CoacheeInterest),
    args: {
        input: nonNull(arg({ type: list(UpdateCoacheeInterestInput) })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Validate the input using the interestSchema
            input.forEach((interest) => interestSchema.validateSync(interest));
            // Perform the updates using Prisma
            const updatedCoacheeInterests = await Promise.all(
                input.map(async ({ id, ...data }) => {
                    const existingCoacheeInterest =
                        await context.db.coacheeInterest.findUnique({
                            where: { id },
                        });
                    if (!existingCoacheeInterest) {
                        throw new Error(
                            `Coachee interest with ID ${id} not found.`,
                        );
                    }
                    return context.db.coacheeInterest.update({
                        where: { id },
                        data,
                    });
                }),
            );
            return updatedCoacheeInterests;
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updateCoachInterest = mutationField('updateCoachInterests', {
    type: list(CoachInterest),
    args: {
        input: nonNull(arg({ type: list(UpdateCoachInterestInput) })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Validate the input using the interestSchema
            input.forEach((interest) => interestSchema.validateSync(interest));
            // Perform the updates using Prisma
            const updatedCoachInterests = await Promise.all(
                input.map(async ({ id, ...data }) => {
                    const existingCoachInterest =
                        await context.db.coachInterest.findUnique({
                            where: { id },
                        });
                    if (!existingCoachInterest) {
                        throw new Error(
                            `Coach interest with ID ${id} not found.`,
                        );
                    }
                    return context.db.coachInterest.update({
                        where: { id },
                        data,
                    });
                }),
            );
            return updatedCoachInterests;
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updateCoachTask = mutationField('updateCoachTask', {
    type: CoachTask,
    args: {
        id: nonNull(arg({ type: 'Int' })),
        input: nonNull(arg({ type: UpdateCoachTaskInput })),
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
            // Validate the ID using the idSchema
            idSchema.validateSync({ id });
            // Validate the input using the updateTaskSchema
            updateTaskSchema.validateSync(input);
            // Check if the coach task with the given ID exists
            const existingCoachTask = await context.db.coachTask.findUnique({
                where: { id },
            });
            if (!existingCoachTask) {
                throw new Error(`Coach task with ID ${id} not found.`);
            }
            // Perform the update using Prisma
            const updatedCoachTask = await context.db.coachTask.update({
                where: { id },
                data: input,
            });
            return updatedCoachTask;
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updateCoacheeTask = mutationField('updateCoacheeTask', {
    type: CoacheeTask,
    args: {
        id: nonNull(arg({ type: 'Int' })),
        input: nonNull(arg({ type: UpdateCoacheeTaskInput })),
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
            // Validate the ID using the idSchema
            idSchema.validateSync({ id });

            // Validate the input using the updateTaskSchema
            updateTaskSchema.validateSync(input);

            // Check if the coachee task with the given ID exists
            const existingCoacheeTask = await context.db.coacheeTask.findUnique(
                {
                    where: { id },
                },
            );

            if (!existingCoacheeTask) {
                throw new Error(`Coachee task with ID ${id} not found.`);
            }

            // Perform the update using Prisma
            const updatedCoacheeTask = await context.db.coacheeTask.update({
                where: { id },
                data: input,
            });

            return updatedCoacheeTask;
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updatePendingBooking = mutationField('updatePendingBooking', {
    type: Booking,
    args: {
        bookingId: nonNull(arg({ type: 'Int' })),
        updateSlotsIds: list(arg({ type: 'Int' })),
        deleteSlotsIds: list(arg({ type: 'Int' })),
        bookingData: nonNull(arg({ type: UpdateBookingInput })),
        updateSlots: list(arg({ type: UpdateBookingSlotInput })),
        addSlots: list(arg({ type: CreateBookingSlotInput })),
    },
    resolve: async (
        _,
        {
            bookingId,
            updateSlotsIds,
            deleteSlotsIds,
            bookingData,
            updateSlots,
            addSlots,
        },
        context: Context,
    ) => {
        try {
            // Validate the booking ID using the idSchema
            idSchema.validateSync({ id: bookingId });

            if (updateSlotsIds) {
                updateSlotsIds.forEach((slotId: number) => {
                    idSchema.validateSync({ id: slotId });
                });
            }

            if (deleteSlotsIds) {
                deleteSlotsIds.forEach((slotId: number) => {
                    idSchema.validateSync({ id: slotId });
                });
            }

            updateBookingSchema.validateSync(bookingData);

            if (updateSlots) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                updateSlots.forEach((slot: any) => {
                    updateBookingSlotSchema.validateSync(slot);
                });
            }

            if (addSlots) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                addSlots.forEach((slot: any) => {
                    bookingSlotSchema.validateSync(slot);
                });
            }

            // should have conditionals incase an arg is empty
            // Start a transaction to ensure all operations are atomic
            const transaction = await context.db.$transaction([
                context.db.booking.update({
                    where: { id: bookingId },
                    data: bookingData,
                }),

                ...(updateSlotsIds && updateSlotsIds.length > 0
                    ? updateSlotsIds.map((slotId: number) =>
                          context.db.bookingSlot.update({
                              where: { id: slotId },
                              data:
                                  updateSlots.find(
                                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      (slot: any) => slot.id === slotId,
                                  ) ?? {},
                          }),
                      )
                    : []),

                ...(addSlots && addSlots.length > 0
                    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      addSlots.map((slot: any) =>
                          context.db.bookingSlot.create({
                              data: {
                                  ...slot,
                                  bookingId: bookingId,
                              },
                          }),
                      )
                    : []),

                ...(deleteSlotsIds && deleteSlotsIds.length > 0
                    ? deleteSlotsIds.map((slotId: number) =>
                          context.db.bookingSlot.delete({
                              where: { id: slotId },
                          }),
                      )
                    : []),
            ]);

            // Assuming the first operation in the transaction is the booking update
            // and you want to return the updated booking
            return transaction[0];
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});
