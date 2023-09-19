import { mutationField, nonNull, arg } from 'nexus';
import { Context } from '../context';
import bcrypt from 'bcrypt';
import { CreateCoacheeInput, CreateCoachInput } from '../inputTypes';
import { Coachee, Coach } from '../objectTypes';

// export const createCoachee = mutationField('createCoachee', {
//     type: Coachee,
//     args: {
//         input: nonNull(arg({ type: CreateCoacheeInput })),
//     },
//     resolve: (_, { input }, context: Context) =>
//         context.db.coachee.create({
//             data: input,
//         }),
// });

// export const createCoach = mutationField('createCoach', {
//     type: Coach,
//     args: {
//         input: nonNull(arg({ type: CreateCoachInput })),
//     },
//     resolve: (_, { input }, context: Context) =>
//         context.db.coach.create({
//             data: input,
//         }),
// });

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
