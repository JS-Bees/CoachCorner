import { mutationField, nonNull, arg } from 'nexus';
import { Context } from '../context';
import { CoachingRelationship } from '../objectTypes';

export const updateCoachingRelationshipActiveStatus = mutationField(
    'updateCoachingRelationshipActiveStatus',
    {
        type: CoachingRelationship,
        args: {
            id: nonNull(arg({ type: 'Int' })), // ID of the coaching relationship to update
            active: nonNull(arg({ type: 'Boolean' })), // New active status
        },
        resolve: async (_, { id, active }, context: Context) => {
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

            // Update the active status
            const updatedRelationship =
                await context.db.coachingRelationship.update({
                    where: { id },
                    data: { active },
                });

            return updatedRelationship;
        },
    },
);
