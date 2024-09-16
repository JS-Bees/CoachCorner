import { mutationField, nonNull, arg, list, stringArg } from 'nexus';
import { Context } from '../context';
import { supabase } from '../context';
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import {
    CreateBookingInput,
    CreateBookingSlotInput,
    CreateCoacheeInput,
    CreateCoacheeInterestInput,
    CreateCoachInput,
    CreateCoachInterestInput,
    CreateCoachTaskInput,
    CreateSportInput,
    CreateReviewInput,
    CreateCoacheeTaskInput,
    CreateSportsCredentialsInput,
    CreateContactInput,
    CreateNewCoachInterestInput,
    CreateNewCoacheeInterestInput,
    CreateMessageInput,
} from '../inputTypes';
import {
    Coachee,
    Coach,
    Booking,
    Review,
    CoachTask,
    CoacheeTask,
    SportsCredential,
    Contact,
    CoachInterest,
    CoacheeInterest,
    Message,
    CoacheeJwt,
    CoachJwt,
} from '../objectTypes';
import {
    bookingSchema,
    bookingSlotSchema,
    coachSchema,
    coachTaskSchema,
    coacheeSchema,
    coacheeTaskSchema,
    contactSchema,
    interestListSchema,
    interestSchema,
    loginSchema,
    reviewSchema,
    sportSchema,
    sportsCredentialsSchema,
} from '../validation';
import { publishNewMessage } from '../subscriptions/subscriptions';
import jwt from 'jsonwebtoken';


export const createCoachee = mutationField('createCoachee', {
    type: Coachee,
    args: {
        input: nonNull(arg({ type: CreateCoacheeInput })),
        interestsInput: nonNull(
            list(nonNull(arg({ type: CreateCoacheeInterestInput }))),
        ),

    },
    resolve: async (_, { input, interestsInput }, context: Context) => {
        try {
 
            coacheeSchema.validateSync(input);


            const lowerCaseEmail = input.email.toLowerCase();


            interestListSchema.validateSync(interestsInput);

            const hashedPassword = await bcrypt.hash(input.password, 2); 


            const { data, error } = await supabase.auth.signUp({
                email: lowerCaseEmail,
                password: input.password,
            });

            if (error) {

                throw error;
            }

  


            const coacheeData = {
                ...input,
                password: hashedPassword,
                email: lowerCaseEmail,
            };

            const coachee = await context.db.coachee.create({
                data: {
                    ...coacheeData,
                    interests: {
                        create: interestsInput,
                    },
                },
                include: {
                    interests: true,
                },
            });

     
            return coachee;
        } catch (error) {
   
            if (error instanceof yup.ValidationError) {

                throw new Error(error.message);
            }
     

            throw error;
        }
    },
});


export const createCoach = mutationField('createCoach', {
    type: Coach,
    args: {
        input: nonNull(arg({ type: CreateCoachInput })),
        interestsInput: nonNull(
            list(nonNull(arg({ type: CreateCoachInterestInput }))),
        ),
        sportsInput: nonNull(list(nonNull(arg({ type: CreateSportInput })))), 
    },
    resolve: async (
        _,
        { input, interestsInput, sportsInput },
        context: Context,
    ) => {
        try {
          
            coachSchema.validateSync(input);

         
            const lowerCaseEmail = input.email.toLowerCase();

        
            interestListSchema.validateSync(interestsInput);

           
            for (const sport of sportsInput) {
                sportSchema.validateSync(sport);
            }

            const hashedPassword = await bcrypt.hash(input.password, 2); 

          
            const { data, error } = await supabase.auth.signUp({
                email: lowerCaseEmail,
                password: input.password,
            });

            if (error) {
                throw error;
            }



            const coachData = {
                ...input,
                password: hashedPassword,
                email: lowerCaseEmail,
            };

            const coach = await context.db.coach.create({
                data: {
                    ...coachData,
                    interests: {
                        create: interestsInput,
                    },
                    sports: {
                        create: sportsInput,
                    },
                },
                include: {
                    interests: true,
                    sports: true,
                },
            });

     

            return coach;
        } catch (error) {
 
            if (error instanceof yup.ValidationError) {

                throw new Error(error.message);
            }
       
            throw error;
        }
    },
});

export const createBooking = mutationField('createBooking', {
    type: Booking,
    args: {
        input: nonNull(arg({ type: CreateBookingInput })),
        slotsInput: nonNull(list(nonNull(CreateBookingSlotInput))),
    },
    resolve: async (_, { input, slotsInput }, context: Context) => {
        try {
       
            bookingSchema.validateSync(input);
         
            const tokenUserId = context.decoded.userId;
            if (tokenUserId !== input.coachId) {
                throw new Error("ID doesn't match");
            }


            for (const slot of slotsInput) {
                bookingSlotSchema.validateSync(slot);
            }


            const booking = await context.db.booking.create({
                data: {
                    ...input,
                    bookingSlots: {
                        create: slotsInput,
                    },
                },
                include: {
                    bookingSlots: true,
                },
            });

            return booking;
        } catch (error) {
        
            if (error instanceof yup.ValidationError) {
    
                throw new Error(error.message);
            }
   
            throw error;
        }
    },
});

export const createReview = mutationField('createReview', {
    type: Review,
    args: {
        input: nonNull(arg({ type: CreateReviewInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
    
            reviewSchema.validateSync(input);

 
            const tokenUserId = context.decoded.userId;
            if (tokenUserId !== input.coacheeId) {
                throw new Error("ID doesn't match");
            }


            const booking = await context.db.booking.findFirst({
                where: {
                    coachId: input.coachId,
                    coacheeId: input.coacheeId,
                    status: 'COMPLETED',
                },
         
            });


            if (!booking) {
                throw new Error(
                    'A completed booking slot is required to create a review.',
                );
            }

   
            const review = await context.db.review.create({
                data: input,
            });

            return review;
        } catch (error) {
   
            if (error instanceof yup.ValidationError) {
        
                throw new Error(error.message);
            }
   
            throw error;
        }
    },
});


export const createCoachTask = mutationField('createCoachTask', {
    type: CoachTask,
    args: {
        input: nonNull(arg({ type: CreateCoachTaskInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
   
            coachTaskSchema.validateSync(input);

        
            const tokenUserId = context.decoded.userId;
            if (tokenUserId !== input.coachId) {
                throw new Error("ID doesn't match");
            }

       
            const coachTask = await context.db.coachTask.create({
                data: input,
            });

            return coachTask;
        } catch (error) {
       
            if (error instanceof yup.ValidationError) {
             
                throw new Error(error.message);
            }
          
            throw error;
        }
    },
});


export const createCoacheeTask = mutationField('createCoacheeTask', {
    type: CoacheeTask,
    args: {
        input: nonNull(arg({ type: CreateCoacheeTaskInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
            
            coacheeTaskSchema.validateSync(input);

        
            const tokenUserId = context.decoded.userId;
            if (tokenUserId !== input.coacheeId) {
                throw new Error("ID doesn't match");
            }

          
            const coacheeTask = await context.db.coacheeTask.create({
                data: input,
            });

            return coacheeTask;
        } catch (error) {
          
            if (error instanceof yup.ValidationError) {
       
                throw new Error(error.message);
            }
          
            throw error;
        }
    },
});


export const createCoachInterest = mutationField('createCoachInterest', {
    type: CoachInterest,
    args: {
        input: nonNull(arg({ type: CreateNewCoachInterestInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
       
            interestSchema.validateSync(input);

        
            const coachInterest = await context.db.coachInterest.create({
                data: input,
            });

            return coachInterest;
        } catch (error) {

            if (error instanceof yup.ValidationError) {
    
                throw new Error(error.message);
            }
      
            throw error;
        }
    },
});


export const createCoacheeInterest = mutationField('createCoacheeInterest', {
    type: CoacheeInterest,
    args: {
        input: nonNull(arg({ type: CreateNewCoacheeInterestInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
         
            interestSchema.validateSync(input);

         
            const coacheeInterest = await context.db.coacheeInterest.create({
                data: input,
            });

            return coacheeInterest;
        } catch (error) {
  
            if (error instanceof yup.ValidationError) {

                throw new Error(error.message);
            }
      
            throw error;
        }
    },
});


export const createSportsCredentials = mutationField(
    'createSportsCredentials',
    {
        type: SportsCredential,
        args: {
            input: nonNull(arg({ type: CreateSportsCredentialsInput })),
        },
        resolve: async (_, { input }, context: Context) => {
            try {

                sportsCredentialsSchema.validateSync(input);

     
                const sportsCredentials =
                    await context.db.sportsCredential.create({
                        data: input,
                    });

                return sportsCredentials;
            } catch (error) {
    
                if (error instanceof yup.ValidationError) {
              
                    throw new Error(error.message);
                }
          
                throw error;
            }
        },
    },
);


export const createContact = mutationField('createContact', {
    type: Contact,
    args: {
        input: nonNull(arg({ type: CreateContactInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {
           
            contactSchema.validateSync(input);
   
            const tokenUserId = context.decoded.userId;
            if (tokenUserId !== input.coacheeId) {
                throw new Error("ID doesn't match");
            }

            const existingContact = await context.db.contact.findFirst({
                where: {
                    coachId: input.coachId,
                    coacheeId: input.coacheeId,
                    active: true,
                },
            });

            if (existingContact) {
                throw new Error('Already added this coach to contacts!');
            }

   
            const contact = await context.db.contact.create({
                data: input,
            });

            return contact;
        } catch (error) {
      
            if (error instanceof yup.ValidationError) {
       
                throw new Error(error.message);
            }
        
            throw error;
        }
    },
});


export const createMessage = mutationField('createMessage', {
    type: Message,
    args: {
        input: nonNull(arg({ type: CreateMessageInput })),
    },
    resolve: async (_, { input }, context: Context) => {
        try {

            const message = await context.db.message.create({
                data: input,
            });


            publishNewMessage(message);
      

            return message;
        } catch (error) {

            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            
            throw error;
        }
    },
});

export const coachLogin = mutationField('coachLogin', {
    type: Coach,
    args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
    },
    resolve: async (_, { email, password }, context: Context) => {
        try {
   
            loginSchema.validateSync({ email, password });

         
            const lowerCaseEmail = email.toLowerCase();

        
            const { data: user, error } = await supabase
                .from('profiles') 
                .select('*')
                .eq('email', lowerCaseEmail);
      

            if (user) {
      
                if (user[0].email_confirmed_at == null) {
            
                    throw new Error('User email not confirmed.');
                }
            }

            if (error) {
  
                throw new Error('User not found or an error occurred.');
            }

            const coach = await context.db.coach.findUnique({
                where: { email: lowerCaseEmail, active: true },
            });

            if (coach) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    coach.password,
                );
                if (passwordMatch) {
                    const token = jwt.sign(
                        {
                            userId: coach.id,
                            email: coach.email,
                        },
                        process.env.JWT_SECRET,

                        { expiresIn: '5hr' },
                    );
                    return { ...coach, token };
                } else {
                    throw new Error('Incorrect email/password.');
                }
            } else {
                throw new Error('Incorrect email/password.');
            }
        } catch (error) {
  
            if (error instanceof yup.ValidationError) {

                throw new Error(error.message);
            }

            throw error;
        }
    },
});

export const coacheeLogin = mutationField('coacheeLogin', {
    type: Coachee,
    args: {
        email: stringArg(),
        password: stringArg(),
    },
    resolve: async (_, { email, password }, context: Context) => {
        try {
      
            loginSchema.validateSync({ email, password });

    


            const lowerCaseEmail = email.toLowerCase();

         
            const { data: user, error } = await supabase
                .from('profiles') 
                .select('*')
                .eq('email', lowerCaseEmail);
     

            if (user) {
         
                if (user[0].email_confirmed_at == null) {
           
                    throw new Error('User email not confirmed.');
                }
            }

            if (error) {
         
                throw new Error('User not found or an error occurred.');
            }

        
            const coachee = await context.db.coachee.findUnique({
                where: { email: lowerCaseEmail, active: true }, 
            });

            if (coachee) {
        
                const passwordMatch = await bcrypt.compare(
                    password,
                    coachee.password,
                );
                if (passwordMatch) {
                    const token = jwt.sign(
                        {
                            userId: coachee.id,
                            email: coachee.email,
                        },
                        process.env.JWT_SECRET,

                        { expiresIn: '5hr' },
                    );
                    return { ...coachee, token };
                } else {
                    throw new Error('Incorrect email/password.');
                }
            } else {
                throw new Error('Incorrect email/password.');
            }
        } catch (error) {
     
            if (error instanceof yup.ValidationError) {
              
                throw new Error(error.message);
            }
          
            throw error;
        }
    },
});
