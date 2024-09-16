import { queryField, nonNull, stringArg, intArg, list } from 'nexus';
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import {
    Coachee,
    Coach,
    Booking,
    Contact,
    Message,
    SlotTime,
} from '../objectTypes';
import { Context } from '../context';
import {
    loginSchema,
    idSchema,
    idAndStatusSchema,
    sportSchema,
    idAndSportSchema,
} from '../validation';

interface LatestMessage {
    contact_id: number;
    latest_message: string;
}

export const findCoachByEmailAndPassword = queryField(
    'findCoachByEmailAndPassword',
    {
        type: Coach,
        args: {
            email: nonNull(stringArg()),
            password: nonNull(stringArg()),
        },
        resolve: async (_, { email, password }, context: Context) => {
            try {

                loginSchema.validateSync({ email, password });

    
                const lowerCaseEmail = email.toLowerCase();

                const coach = await context.db.coach.findUnique({
                    where: { email: lowerCaseEmail, active: true },
                });

                if (coach) {
                    const passwordMatch = await bcrypt.compare(
                        password,
                        coach.password,
                    );
                    if (passwordMatch) {
                        return coach;
                    } else {
                        throw new Error('Incorrect password.');
                    }
                } else {
                    throw new Error('User not found.');
                }
            } catch (error) {
      
                if (error instanceof yup.ValidationError) {
           
                    throw new Error(error.message);
                }
       
                throw error;
            }
        },
    },
);

export const findCoacheeByEmailAndPassword = queryField(
    'findCoacheeByEmailAndPassword',
    {
        type: Coachee,
        args: {
            email: nonNull(stringArg()),
            password: nonNull(stringArg()),
        },
        resolve: async (_, { email, password }, context: Context) => {
            try {
    
                loginSchema.validateSync({ email, password });

                const lowerCaseEmail = email.toLowerCase();


                const coachee = await context.db.coachee.findUnique({
                    where: { email: lowerCaseEmail, active: true }, 
                });

                if (coachee) {
        
                    const passwordMatch = await bcrypt.compare(
                        password,
                        coachee.password,
                    );
                    if (passwordMatch) {
                        return coachee;
                    } else {
                        throw new Error('Incorrect password.');
                    }
                } else {
                    throw new Error('User not found.');
                }
            } catch (error) {
           
                if (error instanceof yup.ValidationError) {
        
                    throw new Error(error.message);
                }
          
                throw error;
            }
        },
    },
);

export const findCoachByID = queryField('findCoachByID', {
    type: Coach,
    args: {
        userID: nonNull(intArg()),
    },
    resolve: async (_, { userID }, context: Context) => {
        try {
      
            idSchema.validateSync({ id: userID });


 
            const coach = await context.db.coach.findUnique({
                where: { id: userID, active: true }, 
            });

            if (coach) {
                return coach;
            } else {
                throw new Error(`Coach with ID ${userID} does not exist.`);
            }
        } catch (error) {
         
            if (error instanceof yup.ValidationError) {

                throw new Error(error.message);
            }
         
            throw error;
        }
    },
});

export const findCoacheeByID = queryField('findCoacheeByID', {
    type: Coachee,
    args: {
        userID: nonNull(intArg()), 
    },
    resolve: async (_, { userID }, context: Context) => {
        try {
      
            idSchema.validateSync({ id: userID });

      
            const coachee = await context.db.coachee.findUnique({
                where: { id: userID, active: true }, 
            });

            if (coachee) {
                return coachee;
            } else {
                throw new Error('Coachee with ID ${userID} does not exist.');
            }
        } catch (error) {
      
            if (error instanceof yup.ValidationError) {
       
                throw new Error(error.message);
            }
      
            throw error;
        }
    },
});

export const findBookingByID = queryField('findBookingByID', {
    type: Booking,
    args: {
        bookingID: nonNull(intArg()),
    },
    resolve: async (_, { bookingID }, context: Context) => {
        try {
   
            idSchema.validateSync({ id: bookingID });

          
            const booking = await context.db.booking.findUnique({
                where: { id: bookingID, active: true }, 
            });

            if (booking) {
                return booking;
            } else {
                throw new Error(`Booking with ID ${bookingID} does not exist.`);
            }
        } catch (error) {
 
            if (error instanceof yup.ValidationError) {
        
                throw new Error(error.message);
            }
     
            throw error;
        }
    },
});

export const findBookingsByStatusAndCoachID = queryField(
    'findBookingsByStatusAndCoachID',
    {
        type: list(Booking),
        args: {
            status: nonNull(stringArg()), 
            coachID: nonNull(intArg()), 
        },
        resolve: async (_, { status, coachID }, context: Context) => {
            try {
       
                idAndStatusSchema.validateSync({ status, id: coachID });

     
                const bookings = await context.db.booking.findMany({
                    where: {
                        status: status,
                        coachId: coachID,
                        active: true,
                    },
                });

                return bookings;
            } catch (error) {

                if (error instanceof yup.ValidationError) {
               
                    throw new Error(error.message);
                }

                throw error;
            }
        },
    },
);

export const findBookingsByStatusAndCoacheeID = queryField(
    'findBookingsByStatusAndCoacheeID',
    {
        type: list(Booking),
        args: {
            status: nonNull(stringArg()),
            coacheeID: nonNull(intArg()),
        },
        resolve: async (_, { status, coacheeID }, context: Context) => {
            try {
        
                idAndStatusSchema.validateSync({ status, id: coacheeID });

          
                const bookings = await context.db.booking.findMany({
                    where: {
                        status: status,
                        coacheeId: coacheeID,
                        active: true,
                    },
                });

                return bookings;
            } catch (error) {
   
                if (error instanceof yup.ValidationError) {
               
                    throw new Error(error.message);
                }
       
                throw error;
            }
        },
    },
);

export const findCoachesBySport = queryField('findCoachesBySport', {
    type: list(Coach),
    args: {
        sportType: nonNull(stringArg()),
    },
    resolve: async (_, { sportType }, context: Context) => {
        try {
   
            sportSchema.validateSync({ type: sportType });


            const coaches = await context.db.coach.findMany({
                where: {
                    sports: {
                        some: {
                            type: sportType,
                        },
                    },
                    active: true,
                },
            });

            return coaches;
        } catch (error) {
   
            if (error instanceof yup.ValidationError) {

                throw new Error(error.message);
            }

            throw error;
        }
    },
});

export const findNonContactCoachesBySport = queryField(
    'findNonContactCoachesBySport',
    {
        type: list(Coach),
        args: {
            sportType: nonNull(stringArg()),
            coacheeID: nonNull(intArg()),
        },
        resolve: async (_, { sportType, coacheeID }, context: Context) => {
            try {
         
                idAndSportSchema.validateSync({
                    id: coacheeID,
                    type: sportType,
                });

                const coaches = await context.db.coach.findMany({
                    where: {
                        sports: {
                            some: {
                                type: sportType,
                            },
                        },
                        active: true,
                        contacts: {
                            none: {
                                coachee: {
                                    id: coacheeID,
                                },
                            },
                        },
                    },
                });

                return coaches;
            } catch (error) {

                if (error instanceof yup.ValidationError) {
     
                    throw new Error(error.message);
                }

                throw error;
            }
        },
    },
);

export const findContactsOfCoach = queryField('findContactsOfCoach', {
    type: list(Contact),
    args: {
        coachId: nonNull(intArg()),
    },
    resolve: async (_, { coachId }, context: Context) => {
        try {
   
            idSchema.validateSync({ id: coachId });

      
            const contacts = await context.db.contact.findMany({
                where: {
                    coachId: coachId,
                    contactedStatus: true,
                    active: true,
                },
            });

            return contacts;
        } catch (error) {
     
            if (error instanceof yup.ValidationError) {
   
                throw new Error(error.message);
            }
           
            throw error;
        }
    },
});

export const findMessagesByContactId = queryField('findMessagesByContactId', {
    type: list(Message), 
    args: {
        contactId: nonNull(intArg()),
    },
    resolve: async (_, { contactId }, context: Context) => {
       
        const messages = await context.db.message.findMany({
            where: {
                contactId: contactId, 
            },
        });

        return messages;
    },
});



export const findFilteredMessagesByContactId = queryField(
    'findfilteredMessagesByContactId',
    {
        type: list(Message), 
        args: {
            contactId: nonNull(intArg()), 
            numberOfMessages: nonNull(intArg()),
        },
        resolve: async (
            _,
            { contactId, numberOfMessages },
            context: Context,
        ) => {
     
            const messages = await context.db.message.findMany({
                where: {
                    contactId: contactId, 
                },
                orderBy: {
                    createdAt: 'desc', 
                },
                take: numberOfMessages,
            });

            return messages;
        },
    },
);

export const findMessagesForCoachList = queryField('findMessagesForCoachList', {
    type: list(Message),
    args: {
        coacheeId: nonNull(intArg()),
    },
    resolve: async (_, { coacheeId }, context: Context) => {
        try {
         
            idSchema.validateSync({ id: coacheeId });


            const messages = await context.db.message.findMany({
                where: {
                    contact: {
                        coacheeId: coacheeId, 
                    },
                },
                distinct: ['contactId'],
                orderBy: {
                    createdAt: 'desc', 
                },
        
            });

            return messages;
        } catch (error) {

            if (error instanceof yup.ValidationError) {
              
                throw new Error(error.message);
            }
          
            throw error;
        }
    },
});

export const findMessagesForCoacheeList = queryField(
    'findMessagesForCoacheeList',
    {
        type: list(Message),
        args: {
            coachId: nonNull(intArg()),
        },
        resolve: async (_, { coachId }, context: Context) => {
            try {
              
                idSchema.validateSync({ id: coachId });

  
                const messages = await context.db.message.findMany({
                    where: {
                        contact: {
                            coachId: coachId, 
                        },
                    },
                    distinct: ['contactId'],
                    orderBy: {
                        createdAt: 'desc', 
                    },
              
                });

                return messages;
            } catch (error) {
    
                if (error instanceof yup.ValidationError) {
                  
                    throw new Error(error.message);
                }
            
                throw error;
            }
        },
    },
);

export const findContactsOfCoachDespiteContactedStatus = queryField(
    'findContactsOfCoachDespiteContactedStatus',
    {
        type: list(Contact),
        args: {
            coachId: nonNull(intArg()),
        },
        resolve: async (_, { coachId }, context: Context) => {
            try {
              
                idSchema.validateSync({ id: coachId });

             
                const contacts = await context.db.contact.findMany({
                    where: {
                        coachId: coachId,
                        active: true,
                    },
                });

                return contacts;
            } catch (error) {
           
                if (error instanceof yup.ValidationError) {
                  
                    throw new Error(error.message);
                }
           
                throw error;
            }
        },
    },
);

export const findOneToOneServiceSlotsByCoachId = queryField(
    'findOneToOneServiceSlotsByCoachId',
    {
        type: nonNull(list(SlotTime)), 
        args: {
            coachId: nonNull(intArg()),
        },
        resolve: async (_, { coachId }, context: Context) => {
            try {
               
                const bookings = await context.db.booking.findMany({
                    where: {
                        coachId: coachId,
                        serviceType: 'one-to-one',
                        status: 'UPCOMING',
                        active: true,
                    },
                    select: {
                        bookingSlots: {
                            select: {
                                date: true,
                                startTime: true,
                                endTime: true,
                            },
                        },
                    },
                });

  
                const slotTimes = bookings.flatMap((booking) =>
                    booking.bookingSlots.map((slot) => ({
                        date: slot.date,
                        startTime: slot.startTime, 
                        endTime: slot.endTime,
                    })),
                );

                return slotTimes;
            } catch (error) {
                console.error(
                    'Error fetching one-to-one service slots:',
                    error,
                );
                throw new Error('Failed to fetch one-to-one service slots.');
            }
        },
    },
);


export const findRecommendedCoaches = queryField('findRecommendedCoaches', {
    type: list(Coach),
    args: {
        coacheeId: nonNull(intArg()),
    },
    resolve: async (_, { coacheeId }, context: Context) => {
        const coacheeData = await context.db.coachee.findUnique({
            where: { id: coacheeId, active: true }, 
            include: {
                interests: true,
            },
        });
        const sportType = coacheeData?.sport;


        const coachesSameSport = await context.db.coach.findMany({
            where: {
                active: true,
                sports: {
                    some: {
                        type: sportType,
                    },
                },
            },
            include: {
                interests: true,
            },
        });



        const sortedCoaches = coachesSameSport.sort((a, b) => {
            const aMatches = a.interests.filter((interest) =>
                coacheeData.interests.some((i) => i.name === interest.name),
            ).length;
            const bMatches = b.interests.filter((interest) =>
                coacheeData.interests.some((i) => i.name === interest.name),
            ).length;
            return bMatches - aMatches;
        });

        const coaches = sortedCoaches.slice(0, 4);
        return coaches;
    },
});
