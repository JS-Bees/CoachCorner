import { queryField, nonNull, stringArg, intArg, list } from 'nexus';
import { Context } from '../context';
import bcrypt from 'bcrypt';
import { Coachee, Coach, Booking } from '../objectTypes';
import { SportEnum, BookingStatusEnum } from '../enums';

export const findCoachByEmailAndPassword = queryField(
    'findCoachByEmailAndPassword',
    {
        type: Coach,
        args: {
            email: nonNull(stringArg()),
            password: nonNull(stringArg()),
        },
        resolve: async (_, { email, password }, context: Context) => {
            // Search for a Coach with the provided email
            const coach = await context.db.coach.findUnique({
                where: { email, active: true }, // Include the 'active' condition
            });

            if (coach) {
                // If a Coach is found, compare the password
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
        },
    },
);

export const findCoachByID = queryField('findCoachByID', {
    type: Coach,
    args: {
        userID: nonNull(intArg()), // Changed the argument to intArg for ID
    },
    resolve: async (_, { userID }, context: Context) => {
        // Search for a Coach by ID
        const coach = await context.db.coach.findUnique({
            where: { id: userID, active: true }, // Include the 'active' condition
        });

        if (coach) {
            return coach;
        } else {
            throw new Error(`Coach with ID ${userID} does not exist.`);
        }
    },
});

export const findCoacheeByID = queryField('findCoacheeByID', {
    type: Coachee,
    args: {
        userID: nonNull(intArg()), // Changed the argument to intArg for ID
    },
    resolve: async (_, { userID }, context: Context) => {
        // Search for a Coachee by ID
        const coachee = await context.db.coachee.findUnique({
            where: { id: userID, active: true }, // Include the 'active' condition
        });
        if (coachee) {
            return coachee;
        } else {
            throw new Error(`Coachee with ID ${userID} does not exist.`);
        }
    },
});

export const findCoachesBySport = queryField('findCoachesBySport', {
    type: list(Coach), // Return a list of coaches
    args: {
        sport: SportEnum,
    },
    resolve: async (_, { sport }, context: Context) => {
        // Search for coaches who are associated with the specified sport
        const coaches = await context.db.coach.findMany({
            where: {
                sport: sport,
                active: true, // Include the 'active' condition
            },
        });

        return coaches;
    },
});

export const findBookingByID = queryField('findBookingByID', {
    type: Booking,
    args: {
        bookingID: nonNull(intArg()),
    },
    resolve: async (_, { bookingID }, context: Context) => {
        // Search for a Booking by ID
        const booking = await context.db.booking.findUnique({
            where: { id: bookingID, active: true }, // Include the 'active' condition
        });

        if (booking) {
            return booking;
        } else {
            throw new Error(`Booking with ID ${bookingID} does not exist.`);
        }
    },
});

export const findUnaddedCoachesBySport = queryField(
    'findUnaddedCoachesBySport',
    {
        type: list(Coach), // Return a list of available coaches
        args: {
            sport: SportEnum, // Required sport argument
            coacheeID: nonNull(intArg()), // Required coacheeID argument
        },
        resolve: async (_, { sport, coacheeID }, context: Context) => {
            // Search for coaches who are associated with the specified sport
            // and do not have a coaching relationship with the given coacheeID
            const coaches = await context.db.coach.findMany({
                where: {
                    sport: sport,
                    active: true, // Include the 'active' condition
                    NOT: {
                        coachingRelationships: {
                            some: {
                                coacheeId: coacheeID,
                                active: true, // Check for an active coaching relationship with coachee
                            },
                        },
                    },
                },
            });

            return coaches;
        },
    },
);

export const findBookingsByStatusAndCoachID = queryField(
    'findBookingsByStatusAndCoachID',
    {
        type: list(Booking),
        args: {
            status: nonNull(BookingStatusEnum), // Argument for BookingStatus
            coachID: nonNull(intArg()), // Argument for Coach ID
        },
        resolve: async (_, { status, coachID }, context: Context) => {
            // Search for bookings based on the where condition
            const bookings = await context.db.booking.findMany({
                where: {
                    status: status,
                    coachId: coachID,
                    active: true, // Include the 'active' condition
                },
            });

            return bookings;
        },
    },
);

export const findBookingsByStatusAndCoacheeID = queryField(
    'findBookingsByStatusAndCoacheeID',
    {
        type: list(Booking),
        args: {
            status: nonNull(BookingStatusEnum), // Argument for BookingStatus
            coacheeID: nonNull(intArg()), // Argument for Coachee ID
        },
        resolve: async (_, { status, coacheeID }, context: Context) => {
            // Search for bookings based on the where condition
            const bookings = await context.db.booking.findMany({
                where: {
                    status: status,
                    coacheeId: coacheeID,
                    active: true, // Include the 'active' condition
                },
            });

            return bookings;
        },
    },
);
