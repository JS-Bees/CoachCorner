import { mutationField, nonNull, arg, list } from 'nexus';
import { Context } from '../context';
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import {
    CreateBookingInput,
    CreateBookingSlotInput,
    CreateCoacheeInput,
    CreateCoacheeInterestInput,
    CreateCoachInput,
    CreateCoachInterestInput,
    CreateCoachTaskInput,
    CreateSportInput,
    CreateReviewInput,
    CreateCoacheeTaskInput,
    CreateSportsCredentialsInput,
    CreateContactInput,
    CreateNewCoachInterestInput,
    CreateNewCoacheeInterestInput,
} from '../inputTypes';
import {
    Coachee,
    Coach,
    Booking,
    Review,
    CoachTask,
    CoacheeTask,
    SportsCredential,
    Contact,
    CoachInterest,
    CoacheeInterest,
} from '../objectTypes';
import {
    bookingSchema,
    bookingSlotSchema,
    coachSchema,
    coachTaskSchema,
    coacheeSchema,
    coacheeTaskSchema,
    contactSchema,
    interestListSchema,
    interestSchema,
    reviewSchema,
    sportSchema,
    sportsCredentialsSchema,
} from '../validation';

// Make this accept coachee interest input
export const createCoachee = mutationField('createCoachee', {
    type: Coachee,
    args: {
        input: nonNull(arg({ type: CreateCoacheeInput })),
        interestsInput: nonNull(
            list(nonNull(arg({ type: CreateCoacheeInterestInput }))),
        ),
        // ^ not sure if this needs to be revised to not include arg
        // if there's an issue with the args in the resolve portion start backend to generate interface
    },
    resolve: async (_, { input, interestsInput }, context: Context) => {
        try {
            // Validate the coachee input
            coacheeSchema.validateSync(input);

            // Validate the interests input
            interestListSchema.validateSync(interestsInput);

            const hashedPassword = await bcrypt.hash(input.password, 10); // Hash the password with  10 salt rounds
            const coacheeData = { ...input, password: hashedPassword };
            // Create the coachee and its interests in a single transaction
            const coachee = await context.db.coachee.create({
                data: {
                    ...coacheeData,
                    interests: {
                        create: interestsInput,
                    },
                },
                include: {
                    interests: true,
                },
            });

            return coachee;
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

// Make this accept coach interest and sports input
export const createCoach = mutationField('createCoach', {
    type: Coach,
    args: {
        input: nonNull(arg({ type: CreateCoachInput })),
        interestsInput: nonNull(
            list(nonNull(arg({ type: CreateCoachInterestInput }))),
        ),
        sportsInput: nonNull(list(nonNull(arg({ type: CreateSportInput })))), // Add this line
    },
    resolve: async (
        _,
        { input, interestsInput, sportsInput },
        context: Context,
    ) => {
        try {
            // Validate the coach input
            coachSchema.validateSync(input);

            // Validate the interests input
            interestListSchema.validateSync(interestsInput);

            // Validate each sport in the sportsInput array
            for (const sport of sportsInput) {
                sportSchema.validateSync(sport);
            }

            const hashedPassword = await bcrypt.hash(input.password, 10); // Hash the password with  10 salt rounds
            const coachData = { ...input, password: hashedPassword };
            // Create the coach, its interests, and its sports in a single transaction
            const coach = await context.db.coach.create({
                data: {
                    ...coachData,
                    interests: {
                        create: interestsInput,
                    },
                    sports: {
                        create: sportsInput,
                    },
                },
                include: {
                    interests: true,
                    sports: true,
                },
            });

            return coach;
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

export const createBooking = mutationField('createBooking', {
    type: Booking,
    args: {
        input: nonNull(arg({ type: CreateBookingInput })),
        slotsInput: nonNull(list(nonNull(CreateBookingSlotInput))),
    },
    resolve: async (_, { input, slotsInput }, context: Context) => {
        try {
            // Validate the booking input
            bookingSchema.validateSync(input);

            // Validate each slot in the slotsInput array
            for (const slot of slotsInput) {
                bookingSlotSchema.validateSync(slot);
            }

            // Create the booking and its slots in a single transaction
            const booking = await context.db.booking.create({
                data: {
                    ...input,
                    bookingSlots: {
                        create: slotsInput,
                    },
                },
                include: {
                    bookingSlots: true,
                },
            });

            return booking;
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

export const createReview = mutationField('createReview', {
    type: Review,
    args: {
        input: nonNull(arg({ type: CreateReviewInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Validate the review input
            reviewSchema.validateSync(input);

            // Find a booking that matches both the coach ID and the coachee ID
            const booking = await context.db.booking.findFirst({
                where: {
                    coachId: input.coachId,
                    coacheeId: input.coacheeId,
                },
                include: {
                    bookingSlots: {
                        where: {
                            status: 'COMPLETED',
                        },
                    },
                },
            });

            // Check if the booking exists and has a completed booking slot
            if (!booking || booking.bookingSlots.length === 0) {
                throw new Error(
                    'A completed booking slot is required to create a review.',
                );
            }

            // Create the review in the database
            const review = await context.db.review.create({
                data: input,
            });

            return review;
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

// createCoachTask
export const createCoachTask = mutationField('createCoachTask', {
    type: CoachTask,
    args: {
        input: nonNull(arg({ type: CreateCoachTaskInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Validate the task input
            coachTaskSchema.validateSync(input);

            // Create the coach task in the database
            const coachTask = await context.db.coachTask.create({
                data: input,
            });

            return coachTask;
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

// createCoacheeTask
export const createCoacheeTask = mutationField('createCoacheeTask', {
    type: CoacheeTask,
    args: {
        input: nonNull(arg({ type: CreateCoacheeTaskInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Validate the task input
            coacheeTaskSchema.validateSync(input);
            // Create the coachee task in the database
            const coacheeTask = await context.db.coacheeTask.create({
                data: input,
            });

            return coacheeTask;
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

// createCoachInterest
export const createCoachInterest = mutationField('createCoachInterest', {
    type: CoachInterest,
    args: {
        input: nonNull(arg({ type: CreateNewCoachInterestInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Validate the interest input
            interestSchema.validateSync(input);

            // Create the coach interest in the database
            const coachInterest = await context.db.coachInterest.create({
                data: input,
            });

            return coachInterest;
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

// createCoacheeInterest
export const createCoacheeInterest = mutationField('createCoacheeInterest', {
    type: CoacheeInterest,
    args: {
        input: nonNull(arg({ type: CreateNewCoacheeInterestInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Validate the interest input
            interestSchema.validateSync(input);

            // Create the coachee interest in the database
            const coacheeInterest = await context.db.coacheeInterest.create({
                data: input,
            });

            return coacheeInterest;
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

// createSportCredentials
export const createSportsCredentials = mutationField(
    'createSportsCredentials',
    {
        type: SportsCredential,
        args: {
            input: nonNull(arg({ type: CreateSportsCredentialsInput })),
        },
        resolve: async (_, { input }, context: Context) => {
            try {
                // Validate the sports credentials input
                sportsCredentialsSchema.validateSync(input);

                // Create the sports credentials in the database
                const sportsCredentials =
                    await context.db.sportsCredential.create({
                        data: input,
                    });

                return sportsCredentials;
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

// createContact
export const createContact = mutationField('createContact', {
    type: Contact,
    args: {
        input: nonNull(arg({ type: CreateContactInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Validate the contact input
            contactSchema.validateSync(input);

            const existingContact = await context.db.contact.findFirst({
                where: {
                    coachId: input.coachId,
                    coacheeId: input.coacheeId,
                    active: true,
                },
            });

            if (existingContact) {
                throw new Error('Already added this coach to contacts!');
            }

            // Create the contact in the database
            const contact = await context.db.contact.create({
                data: input,
            });

            return contact;
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
