import { mutationField, nonNull, arg } from 'nexus';
import * as yup from 'yup';
import { Context } from '../context';
import { CoachTask, CoacheeTask } from '../objectTypes';
import { idSchema } from '../validation';

export const deleteCoachTask = mutationField('deleteCoachTask', {
    type: CoachTask,
    args: {
        id: nonNull(arg({ type: 'Int' })), 
    },
    resolve: async (_, { id }, context: Context) => {
        try {
        
            idSchema.validateSync({ id });

            const existingCoachTask = await context.db.coachTask.findUnique({
                where: { id },
            });

            if (!existingCoachTask) {
                throw new Error(`Coach task with ID ${id} not found.`);
            }


            const updatedCoachTask = await context.db.coachTask.update({
                where: { id },
                data: { active: false },
            });

            return updatedCoachTask;
        } catch (error) {
      
            if (error instanceof yup.ValidationError) {
               
                throw new Error(error.message);
            }
        
            throw error;
        }
    },
});

export const updateCoacheeTaskActiveStatus = mutationField(
    'updateCoacheeTaskActiveStatus',
    {
        type: CoacheeTask,
        args: {
            id: nonNull(arg({ type: 'Int' })), 
        },
        resolve: async (_, { id }, context: Context) => {
            try {
              
                idSchema.validateSync({ id });


                const existingCoacheeTask =
                    await context.db.coacheeTask.findUnique({
                        where: { id },
                    });

                if (!existingCoacheeTask) {
                    throw new Error(`Coachee task with ID ${id} not found.`);
                }

   
                const updatedCoacheeTask = await context.db.coacheeTask.update({
                    where: { id },
                    data: { active: false },
                });

                return updatedCoacheeTask;
            } catch (error) {
           
                if (error instanceof yup.ValidationError) {
      
                    throw new Error(error.message);
                }
        
                throw error;
            }
        },
    },
);
