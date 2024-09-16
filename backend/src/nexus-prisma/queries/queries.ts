import { list, queryField } from 'nexus';
import { Context } from '../context';
import { Coachee, Coach } from '../objectTypes';

export const people = queryField('coachees', {
    type: list(Coachee),
    resolve(_root, _args, ctx: Context) {
        console.log('ctx', ctx);
        return ctx.db.coachee.findMany();
    },
});

export const coaches = queryField('coaches', {
    type: list(Coach),
    resolve(_root, _args, ctx: Context) {
        console.log('ctx', ctx);
        return ctx.db.coach.findMany();
    },
});
