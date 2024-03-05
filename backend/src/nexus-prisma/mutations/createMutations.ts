import { mutationField, nonNull, arg, list } from 'nexus';
import { Context } from '../context';
import bcrypt from 'bcrypt';
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
} from '../objectTypes';

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
        const hashedPassword = await bcrypt.hash(input.password, 10); // Hash the password with   10 salt rounds
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
    },
});

export const createBooking = mutationField('createBooking', {
    type: Booking,
    args: {
        input: nonNull(arg({ type: CreateBookingInput })),
        slotsInput: nonNull(list(nonNull(CreateBookingSlotInput))),
    },
    resolve: async (_, { input, slotsInput }, context: Context) => {
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
    },
});

export const createReview = mutationField('createReview', {
    type: Review,
    args: {
        input: nonNull(arg({ type: CreateReviewInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        const createdReview = await context.db.review.create({
            data: {
                starRating: input.starRating,
                comment: input.comment,
                coacheeId: input.coacheeId,
                coachId: input.coachId,
            },
        });

        return createdReview;
    },
});

// createCoachTask
export const createCoachTask = mutationField('createCoachTask', {
    type: CoachTask,
    args: {
        input: nonNull(arg({ type: CreateCoachTaskInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        const coachTask = await context.db.coachTask.create({
            data: input,
        });

        return coachTask;
    },
});

// createCoacheeTask
export const createCoacheeTask = mutationField('createCoacheeTask', {
    type: CoacheeTask,
    args: {
        input: nonNull(arg({ type: CreateCoacheeTaskInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        // Create the coachee task in your database
        const coacheeTask = await context.db.coacheeTask.create({
            data: input,
        });

        return coacheeTask;
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
            // Create the sports credentials in your database
            const sportsCredentials = await context.db.sportsCredential.create({
                data: input,
            });

            return sportsCredentials;
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
        // Create the contact in your database
        const contact = await context.db.contact.create({
            data: input,
        });

        return contact;
    },
});
