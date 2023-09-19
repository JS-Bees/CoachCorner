import * as gqlTypes from 'nexus-prisma';
import { inputObjectType } from 'nexus';

export const CreateCoacheeInput = inputObjectType({
    name: 'CreateCoacheeInput',
    definition(t) {
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

export const CreateCoachInput = inputObjectType({
    name: 'CreateCoachInput',
    definition(t) {
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
