import { queryField, nonNull, stringArg, intArg, list } from 'nexus';
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import { Coachee, Coach, Booking, Contact, Message } from '../objectTypes';
import { Context } from '../context';
import {
    loginSchema,
    idSchema,
    idAndStatusSchema,
    sportSchema,
    idAndSportSchema,
} from '../validation';

export const findCoachByEmailAndPassword = queryField(
    'findCoachByEmailAndPassword',
    {
        type: Coach,
        args: {
            email: nonNull(stringArg()),
            password: nonNull(stringArg()),
        },
        resolve: async (_, { email, password }, context: Context) => {
            try {
                // Validate arguments using the yup schema
                loginSchema.validateSync({ email, password });

                const coach = await context.db.coach.findUnique({
                    where: { email, active: true },
                });

                if (coach) {
                    const passwordMatch = await bcrypt.compare(
                        password,
                        coach.password,
                    );
                    if (passwordMatch) {
                        return coach;
                    } else {
                        throw new Error('Incorrect password.');
                    }
                } else {
                    throw new Error('User not found.');
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
    },
);

export const findCoacheeByEmailAndPassword = queryField(
    'findCoacheeByEmailAndPassword',
    {
        type: Coachee,
        args: {
            email: nonNull(stringArg()),
            password: nonNull(stringArg()),
        },
        resolve: async (_, { email, password }, context: Context) => {
            try {
                // Validate arguments using the yup schema
                loginSchema.validateSync({ email, password });

                // Search for a Coachee with the provided email
                const coachee = await context.db.coachee.findUnique({
                    where: { email, active: true }, // Include the 'active' condition
                });

                if (coachee) {
                    // If a Coachee is found, compare the password
                    const passwordMatch = await bcrypt.compare(
                        password,
                        coachee.password,
                    );
                    if (passwordMatch) {
                        return coachee;
                    } else {
                        throw new Error('Incorrect password.');
                    }
                } else {
                    throw new Error('User not found.');
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
    },
);

export const findCoachByID = queryField('findCoachByID', {
    type: Coach,
    args: {
        userID: nonNull(intArg()), // Changed the argument to intArg for ID
    },
    resolve: async (_, { userID }, context: Context) => {
        try {
            // Validate userID using the idSchema
            idSchema.validateSync({ id: userID });

            // Search for a Coach by ID
            const coach = await context.db.coach.findUnique({
                where: { id: userID, active: true }, // Include the 'active' condition
            });

            if (coach) {
                return coach;
            } else {
                throw new Error(`Coach with ID ${userID} does not exist.`);
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

export const findCoacheeByID = queryField('findCoacheeByID', {
    type: Coachee,
    args: {
        userID: nonNull(intArg()), // Changed the argument to intArg for ID
    },
    resolve: async (_, { userID }, context: Context) => {
        try {
            // Validate id using the idSchema
            idSchema.validateSync({ id: userID });

            // Search for a Coachee by ID
            const coachee = await context.db.coachee.findUnique({
                where: { id: userID, active: true }, // Include the 'active' condition
            });

            if (coachee) {
                return coachee;
            } else {
                throw new Error('Coachee with ID ${userID} does not exist.');
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

export const findBookingByID = queryField('findBookingByID', {
    type: Booking,
    args: {
        bookingID: nonNull(intArg()),
    },
    resolve: async (_, { bookingID }, context: Context) => {
        try {
            // Validate bookingID using the idSchema
            idSchema.validateSync({ id: bookingID });

            // Search for a Booking by ID
            const booking = await context.db.booking.findUnique({
                where: { id: bookingID, active: true }, // Include the 'active' condition
            });

            if (booking) {
                return booking;
            } else {
                throw new Error(`Booking with ID ${bookingID} does not exist.`);
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

export const findBookingsByStatusAndCoachID = queryField(
    'findBookingsByStatusAndCoachID',
    {
        type: list(Booking),
        args: {
            status: nonNull(stringArg()), // Argument for BookingStatus
            coachID: nonNull(intArg()), // Argument for Coach ID
        },
        resolve: async (_, { status, coachID }, context: Context) => {
            try {
                // Validate arguments using the idAndStatusSchema
                idAndStatusSchema.validateSync({ status, id: coachID });

                // Search for bookings based on the where condition
                const bookings = await context.db.booking.findMany({
                    where: {
                        status: status,
                        coachId: coachID,
                        active: true,
                    },
                });

                return bookings;
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
    },
);

export const findBookingsByStatusAndCoacheeID = queryField(
    'findBookingsByStatusAndCoacheeID',
    {
        type: list(Booking),
        args: {
            status: nonNull(stringArg()),
            coacheeID: nonNull(intArg()),
        },
        resolve: async (_, { status, coacheeID }, context: Context) => {
            try {
                // Validate arguments using the idAndStatusSchema
                idAndStatusSchema.validateSync({ status, id: coacheeID });

                // Search for bookings based on the where condition
                const bookings = await context.db.booking.findMany({
                    where: {
                        status: status,
                        coacheeId: coacheeID,
                        active: true,
                    },
                });

                return bookings;
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
    },
);

// findCoachesBySport or findUnaddedCoachesBySport (make both)

export const findCoachesBySport = queryField('findCoachesBySport', {
    type: list(Coach),
    args: {
        sportType: nonNull(stringArg()),
    },
    resolve: async (_, { sportType }, context: Context) => {
        try {
            // Validate sport using the sportSchema
            sportSchema.validateSync({ type: sportType });

            // Search for coaches by sport
            const coaches = await context.db.coach.findMany({
                where: {
                    sports: {
                        some: {
                            type: sportType,
                        },
                    },
                    active: true,
                },
            });

            return coaches;
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

export const findNonContactCoachesBySport = queryField(
    'findNonContactCoachesBySport',
    {
        type: list(Coach),
        args: {
            sportType: nonNull(stringArg()),
            coacheeID: nonNull(intArg()),
        },
        resolve: async (_, { sportType, coacheeID }, context: Context) => {
            try {
                // Validate id and sport using the idAndSportSchema
                idAndSportSchema.validateSync({
                    id: coacheeID,
                    type: sportType,
                });

                // Search for coaches by sport who are not in contact with the current user
                const coaches = await context.db.coach.findMany({
                    where: {
                        sports: {
                            some: {
                                type: sportType,
                            },
                        },
                        active: true,
                        contacts: {
                            none: {
                                coachee: {
                                    id: coacheeID,
                                },
                            },
                        },
                    },
                });

                return coaches;
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
    },
);

export const findContactsOfCoach = queryField('findContactsOfCoach', {
    type: list(Contact),
    args: {
        coachId: nonNull(intArg()),
    },
    resolve: async (_, { coachId }, context: Context) => {
        try {
            // Validate coachId using the idSchema
            idSchema.validateSync({ id: coachId });

            // Search for contacts of the coach with contactedStatus set to true
            const contacts = await context.db.contact.findMany({
                where: {
                    coachId: coachId,
                    contactedStatus: true,
                    active: true,
                },
            });

            return contacts;
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

export const findMessagesByContactId = queryField('findMessagesByContactId', {
    type: list(Message), // Assuming Message is the type for your messages
    args: {
        contactId: nonNull(intArg()), // The contact ID to filter messages by
    },
    resolve: async (_, { contactId }, context: Context) => {
        // Use Prisma to fetch messages associated with the contact
        const messages = await context.db.message.findMany({
            where: {
                contactId: contactId, // Filter messages by the provided contact ID
            },
        });

        return messages;
    },
});
