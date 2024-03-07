import { mutationField, nonNull, arg } from 'nexus';
import * as yup from 'yup';
import { Context } from '../context';
import { CoachTask, CoacheeTask } from '../objectTypes';
import { idSchema } from '../validation';

export const deleteCoachTask = mutationField('deleteCoachTask', {
    type: CoachTask,
    args: {
        id: nonNull(arg({ type: 'Int' })), // ID of the coach task to update
    },
    resolve: async (_, { id }, context: Context) => {
        try {
            // Validate the ID using the idSchema
            idSchema.validateSync({ id });

            // Check if the coach task with the given ID exists
            const existingCoachTask = await context.db.coachTask.findUnique({
                where: { id },
            });

            if (!existingCoachTask) {
                throw new Error(`Coach task with ID ${id} not found.`);
            }

            // Perform the update using Prisma
            const updatedCoachTask = await context.db.coachTask.update({
                where: { id },
                data: { active: false },
            });

            return updatedCoachTask;
        } catch (error) {
            // Handle validation errors or other exceptions
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const updateCoacheeTaskActiveStatus = mutationField(
    'updateCoacheeTaskActiveStatus',
    {
        type: CoacheeTask,
        args: {
            id: nonNull(arg({ type: 'Int' })), // ID of the coachee task to update
        },
        resolve: async (_, { id }, context: Context) => {
            try {
                // Validate the ID using the idSchema
                idSchema.validateSync({ id });

                // updateTaskSchema.validateSync({ active });

                // Check if the coachee task with the given ID exists
                const existingCoacheeTask =
                    await context.db.coacheeTask.findUnique({
                        where: { id },
                    });

                if (!existingCoacheeTask) {
                    throw new Error(`Coachee task with ID ${id} not found.`);
                }

                // Perform the update using Prisma
                const updatedCoacheeTask = await context.db.coacheeTask.update({
                    where: { id },
                    data: { active: false },
                });

                return updatedCoacheeTask;
            } catch (error) {
                // Handle validation errors or other exceptions
                if (error instanceof yup.ValidationError) {
                    // You can customize the error message based on the validation error
                    throw new Error(error.message);
                }
                // Rethrow other errors
                throw error;
            }
        },
    },
);
