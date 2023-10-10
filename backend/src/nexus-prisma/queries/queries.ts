import { list, queryField } from 'nexus';
// import { Context } from '../context';
import { Coachee, Coach } from '../objectTypes';
// import { PrismaClient } from '@prisma/client';

// const db = new PrismaClient();

export const people = queryField('coachees', {
    type: list(Coachee),
    resolve(_root, _args, ctx) {
        return ctx.db.coachee.findMany();
    },
});

export const coaches = queryField('coaches', {
    type: list(Coach),
    resolve(_root, _args, ctx) {
        return ctx.db.coach.findMany();
    },
});

// export const people = queryField('coachees', {
//     type: list(Coachee),
//     resolve() {
//         return db.coachee.findMany();
//     },
// });

// export const coaches = queryField('coaches', {
//     type: list(Coach),
//     resolve() {
//         return db.coach.findMany();
//     },
// });
