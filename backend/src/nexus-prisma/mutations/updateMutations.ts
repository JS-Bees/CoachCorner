import { mutationField, nonNull, arg } from 'nexus';
import { Context } from '../context';
import { Coachee, Coach, CoachingRelationship } from '../objectTypes';
import {
    MessagingStartedInput,
    UpdateCoacheeProfileInput,
    UpdateCoachProfileInput,
} from '../inputTypes';

export const updateCoacheeProfile = mutationField('updateCoacheeProfile', {
    type: Coachee,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the coachee to update
        input: nonNull(arg({ type: UpdateCoacheeProfileInput })), // Input with fields to update
    },
    resolve: async (_, { id, input }, context: Context) => {
        // Check if the coachee with the given ID exists
        const existingCoachee = await context.db.coachee.findUnique({
            where: { id },
        });

        if (!existingCoachee) {
            throw new Error(`Coachee with ID ${id} not found.`);
        }

        // Perform the update using Prisma
        const updatedCoachee = await context.db.coachee.update({
            where: { id },
            data: input,
        });

        return updatedCoachee;
    },
});

export const updateCoachProfile = mutationField('updateCoachProfile', {
    type: Coach,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the coach to update
        input: nonNull(arg({ type: UpdateCoachProfileInput })), // Input with fields to update
    },
    resolve: async (_, { id, input }, context: Context) => {
        // Check if the coach with the given ID exists
        const existingCoach = await context.db.coach.findUnique({
            where: { id },
        });

        if (!existingCoach) {
            throw new Error(`Coach with ID ${id} not found.`);
        }

        // Perform the update using Prisma
        const updatedCoach = await context.db.coach.update({
            where: { id },
            data: input,
        });

        return updatedCoach;
    },
});

// haven't tested
export const updateMessagingStartedCoachingRelationship = mutationField(
    'updateMessagingStartedCoachingRelationship',
    {
        type: CoachingRelationship,
        args: {
            id: nonNull(arg({ type: 'Int' })), // ID of the coaching relationship to update
            input: nonNull(arg({ type: MessagingStartedInput })), // Input with messagingStarted field
        },
        resolve: async (_, { id, input }, context: Context) => {
            // Check if the coaching relationship with the given ID exists
            const existingRelationship =
                await context.db.coachingRelationship.findUnique({
                    where: { id },
                });

            if (!existingRelationship) {
                throw new Error(
                    `Coaching relationship with ID ${id} not found.`,
                );
            }

            // Update the messagingStarted field
            const updatedRelationship =
                await context.db.coachingRelationship.update({
                    where: { id },
                    data: { messagingStarted: input.messagingStarted },
                });

            return updatedRelationship;
        },
    },
);
