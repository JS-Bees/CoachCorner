import { queryField, nonNull, stringArg } from 'nexus';
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
                }
            }

            // If no coach is found or passwords don't match, return an error message
            return null;
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
                }
            }

            // If no coachee is found or passwords don't match, return an error message
            return null;
        },
    },
);
