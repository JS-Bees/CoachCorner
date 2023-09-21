import { queryField, nonNull, stringArg, intArg } from 'nexus';
import { Context } from '../context';
import bcrypt from 'bcrypt';
import { Coachee, Coach } from '../objectTypes';

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
                where: { email },
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
                where: { email },
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
            where: { id: userID }, // Assuming the field name is 'id' in the database
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
            where: { id: userID }, // Assuming the field name is 'id' in the database
        });

        if (coachee) {
            return coachee;
        } else {
            throw new Error(`Coachee with ID ${userID} does not exist.`);
        }
    },
});
