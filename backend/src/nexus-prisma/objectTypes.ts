import { objectType } from 'nexus';
import * as gqlTypes from 'nexus-prisma';
import { DateTime } from 'nexus-prisma/scalars';
// import { Context } from './context';

export const custom = DateTime; // this is for the dateTime fields in all files

export const Coachee = objectType({
    name: 'Coachee',
    definition(t) {
        t.field(gqlTypes.Coachee.id);
        t.field(gqlTypes.Coachee.address);
        t.field(gqlTypes.Coachee.birthday);
        t.field(gqlTypes.Coachee.email);
        t.field(gqlTypes.Coachee.firstName);
        t.field(gqlTypes.Coachee.lastName);
        t.field(gqlTypes.Coachee.password);
        t.field(gqlTypes.Coachee.moviesGenres);
        t.field(gqlTypes.Coachee.games);
        t.field(gqlTypes.Coachee.hobbies);
    },
});

export const Coach = objectType({
    name: 'Coach',
    definition(t) {
        t.field(gqlTypes.Coach.id);
        t.field(gqlTypes.Coach.birthday);
        t.field(gqlTypes.Coach.email);
        t.field(gqlTypes.Coach.firstName);
        t.field(gqlTypes.Coach.lastName);
        t.field(gqlTypes.Coach.password);
        t.field(gqlTypes.Coach.workplaceAddress);
        t.field(gqlTypes.Coach.sport);
        t.field(gqlTypes.Coach.moviesGenres);
        t.field(gqlTypes.Coach.games);
        t.field(gqlTypes.Coach.hobbies);
    },
});
