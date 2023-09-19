import { objectType } from 'nexus';
import * as gqlTypes from 'nexus-prisma';
// import { Context } from './context';

export const Coachee = objectType({
    name: 'Coachee',
    definition(t) {
        t.field(gqlTypes.Coachee.id);
        t.field(gqlTypes.Coachee.lastName);
        t.field(gqlTypes.Coachee.firstName);
    },
});

export const Coach = objectType({
    name: 'Coach',
    definition(t) {
        t.field(gqlTypes.Coach.id);
        t.field(gqlTypes.Coach.lastName);
        t.field(gqlTypes.Coach.firstName);
        t.field(gqlTypes.Coach.email);
        t.field(gqlTypes.Coach.sport);
    },
});
