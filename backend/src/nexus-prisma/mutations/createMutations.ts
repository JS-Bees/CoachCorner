import { mutationField, nonNull, arg, list, stringArg } from 'nexus';
import { Context } from '../context';
import { supabase } from '../context';
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
    CreateMessageInput,
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
    Message,
    CoacheeJwt,
    CoachJwt,
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
    loginSchema,
    reviewSchema,
    sportSchema,
    sportsCredentialsSchema,
} from '../validation';
import { publishNewMessage } from '../subscriptions/subscriptions';
import jwt from 'jsonwebtoken';

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

            // Convert email to lowercase
            const lowerCaseEmail = input.email.toLowerCase();

            // Validate the interests input
            interestListSchema.validateSync(interestsInput);

            const hashedPassword = await bcrypt.hash(input.password, 2); // Hash the password with  10 salt rounds

            // Need this for Email Verification
            const { data, error } = await supabase.auth.signUp({
                email: lowerCaseEmail,
                password: input.password,
            });

            if (error) {
                console.log('error 1');
                console.log(error);
                throw error;
            }

            console.log(data);
            // End of Email Verification

            const coacheeData = {
                ...input,
                password: hashedPassword,
                email: lowerCaseEmail,
            };
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

            // // Need this for Email Verification
            // const { data, error } = await supabase.auth.signUp({
            //     email: coachee.email,
            //     password: input.password,
            // });

            // if (error) {
            //     console.log('error 1');
            //     console.log(error);
            //     throw error;
            // }

            // console.log(data);
            // // End of Email Verification

            return coachee;
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            console.log('error 2');
            console.log(error);
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

            // Convert email to lowercase
            const lowerCaseEmail = input.email.toLowerCase();

            // Validate the interests input
            interestListSchema.validateSync(interestsInput);

            // Validate each sport in the sportsInput array
            for (const sport of sportsInput) {
                sportSchema.validateSync(sport);
            }

            const hashedPassword = await bcrypt.hash(input.password, 2); // Hash the password with  10 salt rounds

            // Need this for Email Verification
            const { data, error } = await supabase.auth.signUp({
                email: lowerCaseEmail,
                password: input.password,
            });

            if (error) {
                console.log('error 1');
                console.log(error);
                throw error;
            }

            console.log(data);
            // End of Email Verification

            const coachData = {
                ...input,
                password: hashedPassword,
                email: lowerCaseEmail,
            };
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

            // // Need this for Email Verification
            // const { data, error } = await supabase.auth.signUp({
            //     email: coach.email,
            //     password: input.password,
            // });

            // if (error) {
            //     throw error;
            // }

            // console.log(data);
            // // End of email verification

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
                    status: 'COMPLETED',
                },
                // include: {
                //     bookingSlots: {
                //         where: {
                //             status: 'COMPLETED',
                //         },
                //     },
                // },
            });

            // Check if the booking exists and has a completed booking slot
            if (!booking) {
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

// createMessage
export const createMessage = mutationField('createMessage', {
    type: Message,
    args: {
        input: nonNull(arg({ type: CreateMessageInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            // Create the message in the database
            const message = await context.db.message.create({
                data: input,
            });

            // Publish the new message to all subscribed clients
            // have to specify this to only work with specific coach and coachee
            publishNewMessage(message);
            console.log('Publishing message:', message);

            return message;
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

export const coachLogin = mutationField('coachLogin', {
    type: Coach,
    args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
    },
    resolve: async (_, { email, password }, context: Context) => {
        try {
            // Validate arguments using the yup schema
            loginSchema.validateSync({ email, password });

            // Convert email to lowercase
            const lowerCaseEmail = email.toLowerCase();

            // Use Supabase to find the user by email
            const { data: user, error } = await supabase
                .from('profiles') // Adjust the table name according to your Supabase setup
                .select('*')
                .eq('email', lowerCaseEmail);
            // .single(); // Assuming you want to find a single user

            if (user) {
                console.log('sp user', user);
                if (user[0].email_confirmed_at == null) {
                    console.log('user email not confirmed');
                    throw new Error('User email not confirmed.');
                }
            }

            if (error) {
                console.log('sp error: ', error);
                throw new Error('User not found or an error occurred.');
            }

            const coach = await context.db.coach.findUnique({
                where: { email: lowerCaseEmail, active: true },
            });

            if (coach) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    coach.password,
                );
                if (passwordMatch) {
                    const token = jwt.sign(
                        {
                            userId: coach.id,
                            email: coach.email,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1hr' }, // Token expires after 1 hour
                    );
                    return { ...coach, token };
                } else {
                    throw new Error('Incorrect email/password.');
                }
            } else {
                throw new Error('Incorrect email/password.');
            }
        } catch (error) {
            // Handle validation errors
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const coacheeLogin = mutationField('coacheeLogin', {
    type: Coachee,
    args: {
        email: stringArg(),
        password: stringArg(),
    },
    resolve: async (_, { email, password }, context: Context) => {
        try {
            // Validate arguments using the yup schema
            loginSchema.validateSync({ email, password });

            // Convert email to lowercase
            const lowerCaseEmail = email.toLowerCase();

            // Use Supabase to find the user by email
            const { data: user, error } = await supabase
                .from('profiles') // Adjust the table name according to your Supabase setup
                .select('*')
                .eq('email', lowerCaseEmail);
            // .single(); // Assuming you want to find a single user

            if (user) {
                console.log('sp user', user);
                if (user[0].email_confirmed_at == null) {
                    console.log('user email not confirmed');
                    throw new Error('User email not confirmed.');
                }
            }

            if (error) {
                console.log('sp error: ', error);
                throw new Error('User not found or an error occurred.');
            }

            // Search for a Coachee with the provided email
            const coachee = await context.db.coachee.findUnique({
                where: { email: lowerCaseEmail, active: true }, // Include the 'active' condition
            });

            if (coachee) {
                // If a Coachee is found, compare the password
                const passwordMatch = await bcrypt.compare(
                    password,
                    coachee.password,
                );
                if (passwordMatch) {
                    const token = jwt.sign(
                        {
                            userId: coachee.id,
                            email: coachee.email,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1hr' }, // Token expires after 1 hour
                    );
                    return { ...coachee, token };
                } else {
                    throw new Error('Incorrect email/password.');
                }
            } else {
                throw new Error('Incorrect email/password.');
            }
        } catch (error) {
            // Handle validation errors
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});
