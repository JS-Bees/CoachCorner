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
        id: nonNull(arg({ type: 'Int' })),
        input: nonNull(arg({ type: UpdateCoacheeProfileInput })),
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
            idSchema.validateSync({ id });

            updateProfileSchema.validateSync(input);


 
            const tokenUserId = context.decoded.userId;
            if (tokenUserId !== id) {
                throw new Error("ID doesn't match");
            }

    

            const existingCoachee = await context.db.coachee.findUnique({
                where: { id },
            });

            if (!existingCoachee) {
                throw new Error(`Coachee with ID ${id} not found.`);
            }

            const updatedCoachee = await context.db.coachee.update({
                where: { id },
                data: input,
            });

            return updatedCoachee;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                throw new Error(error.message);
            }

            throw error;
        }
    },
});

export const updateCoachProfile = mutationField('updateCoachProfile', {
    type: Coach,
    args: {
        id: nonNull(arg({ type: 'Int' })),
        input: nonNull(arg({ type: UpdateCoachProfileInput })),
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
            idSchema.validateSync({ id });

            updateProfileSchema.validateSync(input);


    
            const tokenUserId = context.decoded.userId;
            if (tokenUserId !== id) {
                throw new Error("ID doesn't match");
            }


            const existingCoach = await context.db.coach.findUnique({
                where: { id },
            });

            if (!existingCoach) {
                throw new Error(`Coach with ID ${id} not found.`);
            }

            const updatedCoach = await context.db.coach.update({
                where: { id },
                data: input,
            });

            return updatedCoach;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                throw new Error(error.message);
            }

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
            idSchema.validateSync({ id });

            updateBookingStatusSchema.validateSync(input);

            const existingBooking = await context.db.booking.findUnique({
                where: { id },
            });

            if (!existingBooking) {
                throw new Error(`Booking with ID ${id} not found.`);
            }

            const updatedBooking = await context.db.booking.update({
                where: { id },
                data: { status: input.status },
            });

            return updatedBooking;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                throw new Error(error.message);
            }

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
                idSchema.validateSync({ id });

                updateBookingSlotStatusSchema.validateSync(input);

                const existingBookingSlot =
                    await context.db.bookingSlot.findUnique({
                        where: { id },
                    });

                if (!existingBookingSlot) {
                    throw new Error(`Booking slot with ID ${id} not found.`);
                }

                const updatedBookingSlot = await context.db.bookingSlot.update({
                    where: { id },
                    data: { status: input.status },
                });

                return updatedBookingSlot;
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    throw new Error(error.message);
                }

                throw error;
            }
        },
    },
);

export const updateContactedStatus = mutationField('updateContactedStatus', {
    type: Contact,
    args: {
        id: nonNull(arg({ type: 'Int' })),
        input: nonNull(arg({ type: UpdateContactedStatusInput })), 
    },
    resolve: async (_, { id, input }, context: Context) => {
        try {
          
            idSchema.validateSync({ id });

            updateContactedStatusSchema.validateSync(input);

            const existingContact = await context.db.contact.findUnique({
                where: { id },
            });

            if (!existingContact) {
                throw new Error(`Contact with ID ${id} not found.`);
            }


            const updatedContact = await context.db.contact.update({
                where: { id },
                data: { contactedStatus: input.contactedStatus },
            });

            return updatedContact;
        } catch (error) {
      
            if (error instanceof yup.ValidationError) {
           
                throw new Error(error.message);
            }
       
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

            input.forEach((interest) => interestSchema.validateSync(interest));
 
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
        
            if (error instanceof yup.ValidationError) {
           
                throw new Error(error.message);
            }
        
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
       
            input.forEach((interest) => interestSchema.validateSync(interest));
 
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
      
            if (error instanceof yup.ValidationError) {
     
                throw new Error(error.message);
            }
        
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
   
            idSchema.validateSync({ id });
        
            updateTaskSchema.validateSync(input);

            const existingCoachTask = await context.db.coachTask.findUnique({
                where: { id },
            });
            if (!existingCoachTask) {
                throw new Error(`Coach task with ID ${id} not found.`);
            }

            const updatedCoachTask = await context.db.coachTask.update({
                where: { id },
                data: input,
            });
            return updatedCoachTask;
        } catch (error) {

            if (error instanceof yup.ValidationError) {
    
                throw new Error(error.message);
            }
        
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
   
            idSchema.validateSync({ id });

       
            updateTaskSchema.validateSync(input);


            const existingCoacheeTask = await context.db.coacheeTask.findUnique(
                {
                    where: { id },
                },
            );

            if (!existingCoacheeTask) {
                throw new Error(`Coachee task with ID ${id} not found.`);
            }

            const updatedCoacheeTask = await context.db.coacheeTask.update({
                where: { id },
                data: input,
            });

            return updatedCoacheeTask;
        } catch (error) {
     
            if (error instanceof yup.ValidationError) {
            
                throw new Error(error.message);
            }
        
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

                updateSlots.forEach((slot: any) => {
                    updateBookingSlotSchema.validateSync(slot);
                });
            }

            if (addSlots) {
      
                addSlots.forEach((slot: any) => {
                    bookingSlotSchema.validateSync(slot);
                });
            }


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
                                 
                                      (slot: any) => slot.id === slotId,
                                  ) ?? {},
                          }),
                      )
                    : []),

                ...(addSlots && addSlots.length > 0
                    ? 
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



            return transaction[0];
        } catch (error) {
      
            if (error instanceof yup.ValidationError) {
              
                throw new Error(error.message);
            }
         
            throw error;
        }
    },
});
