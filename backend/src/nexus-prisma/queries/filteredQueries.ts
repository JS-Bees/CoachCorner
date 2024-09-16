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
                // Validate arguments using the yup schema
                loginSchema.validateSync({ email, password });

                // Convert email to lowercase
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
                // Handle validation errors
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
                // Validate arguments using the yup schema
                loginSchema.validateSync({ email, password });
                // // @ts-ignore
                // console.log('ctx', context.decoded);

                // console.log(context.db);

                // Convert email to lowercase
                const lowerCaseEmail = email.toLowerCase();

                // Search for a Coachee with the provided email
                const coachee = await context.db.coachee.findUnique({
                    where: { email: lowerCaseEmail, active: true }, // Include the 'active' condition
                });

                if (coachee) {
                    // If a Coachee is found, compare the password
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
                // Handle validation errors
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

export const findCoachByID = queryField('findCoachByID', {
    type: Coach,
    args: {
        userID: nonNull(intArg()), // Changed the argument to intArg for ID
    },
    resolve: async (_, { userID }, context: Context) => {
        try {
            // Validate userID using the idSchema
            idSchema.validateSync({ id: userID });
            // @ts-ignore
            console.log('ctx', context.decoded);

            // Search for a Coach by ID
            const coach = await context.db.coach.findUnique({
                where: { id: userID, active: true }, // Include the 'active' condition
            });

            if (coach) {
                return coach;
            } else {
                throw new Error(`Coach with ID ${userID} does not exist.`);
            }
        } catch (error) {
            // Handle validation errors
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const findCoacheeByID = queryField('findCoacheeByID', {
    type: Coachee,
    args: {
        userID: nonNull(intArg()), // Changed the argument to intArg for ID
    },
    resolve: async (_, { userID }, context: Context) => {
        try {
            // Validate id using the idSchema
            idSchema.validateSync({ id: userID });

            // Search for a Coachee by ID
            const coachee = await context.db.coachee.findUnique({
                where: { id: userID, active: true }, // Include the 'active' condition
            });

            if (coachee) {
                return coachee;
            } else {
                throw new Error('Coachee with ID ${userID} does not exist.');
            }
        } catch (error) {
            // Handle validation errors
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
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
            // Validate bookingID using the idSchema
            idSchema.validateSync({ id: bookingID });

            // Search for a Booking by ID
            const booking = await context.db.booking.findUnique({
                where: { id: bookingID, active: true }, // Include the 'active' condition
            });

            if (booking) {
                return booking;
            } else {
                throw new Error(`Booking with ID ${bookingID} does not exist.`);
            }
        } catch (error) {
            // Handle validation errors
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const findBookingsByStatusAndCoachID = queryField(
    'findBookingsByStatusAndCoachID',
    {
        type: list(Booking),
        args: {
            status: nonNull(stringArg()), // Argument for BookingStatus
            coachID: nonNull(intArg()), // Argument for Coach ID
        },
        resolve: async (_, { status, coachID }, context: Context) => {
            try {
                // Validate arguments using the idAndStatusSchema
                idAndStatusSchema.validateSync({ status, id: coachID });

                // Search for bookings based on the where condition
                const bookings = await context.db.booking.findMany({
                    where: {
                        status: status,
                        coachId: coachID,
                        active: true,
                    },
                });

                return bookings;
            } catch (error) {
                // Handle validation errors
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
                // Validate arguments using the idAndStatusSchema
                idAndStatusSchema.validateSync({ status, id: coacheeID });

                // Search for bookings based on the where condition
                const bookings = await context.db.booking.findMany({
                    where: {
                        status: status,
                        coacheeId: coacheeID,
                        active: true,
                    },
                });

                return bookings;
            } catch (error) {
                // Handle validation errors
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

// findCoachesBySport or findUnaddedCoachesBySport (make both)

export const findCoachesBySport = queryField('findCoachesBySport', {
    type: list(Coach),
    args: {
        sportType: nonNull(stringArg()),
    },
    resolve: async (_, { sportType }, context: Context) => {
        try {
            // Validate sport using the sportSchema
            sportSchema.validateSync({ type: sportType });

            // Search for coaches by sport
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
            // Handle validation errors
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
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
                // Validate id and sport using the idAndSportSchema
                idAndSportSchema.validateSync({
                    id: coacheeID,
                    type: sportType,
                });

                // Search for coaches by sport who are not in contact with the current user
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
                // Handle validation errors
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

export const findContactsOfCoach = queryField('findContactsOfCoach', {
    type: list(Contact),
    args: {
        coachId: nonNull(intArg()),
    },
    resolve: async (_, { coachId }, context: Context) => {
        try {
            // Validate coachId using the idSchema
            idSchema.validateSync({ id: coachId });

            // Search for contacts of the coach with contactedStatus set to true
            const contacts = await context.db.contact.findMany({
                where: {
                    coachId: coachId,
                    contactedStatus: true,
                    active: true,
                },
            });

            return contacts;
        } catch (error) {
            // Handle validation errors
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
            throw error;
        }
    },
});

export const findMessagesByContactId = queryField('findMessagesByContactId', {
    type: list(Message), // Assuming Message is the type for your messages
    args: {
        contactId: nonNull(intArg()), // The contact ID to filter messages by
    },
    resolve: async (_, { contactId }, context: Context) => {
        // Use Prisma to fetch messages associated with the contact
        const messages = await context.db.message.findMany({
            where: {
                contactId: contactId, // Filter messages by the provided contact ID
            },
        });

        return messages;
    },
});

// export const findCoacheeContactsAndMessagesById = queryField(
//     'findCoacheeContactsAndMessagesById',
//     {
//         type: 'Coachee', // Assuming you have a Coachee type defined elsewhere
//         args: {
//             userID: nonNull(intArg()), // Changed the argument to intArg for ID
//         },
//         resolve: async (_, { userID }, context: Context) => {
//             try {
//                 // Validate userID using the idSchema
//                 // Assuming you have an idSchema validation defined elsewhere
//                 // idSchema.validateSync({ id: userID });

//                 // Execute the raw SQL query
//                 const latestMessagesQuery = (
//                     strings: TemplateStringsArray,
//                     userID: number,
//                 ) => {
//                     // Construct the SQL query string with userID
//                     const queryString = strings[0].replace(
//                         '${userID}',
//                         userID.toString(),
//                     );
//                     // Execute the query using Prisma or another database client
//                     // This is a placeholder for the actual query execution
//                     // You need to replace this with the actual code to execute the query
//                     console.log('Executing query:', queryString);
//                     // Return the result of the query execution
//                     // This should be replaced with the actual query result
//                     return [];
//                 };
//                 // Execute the raw SQL query and assign the result to latestMessages
//                 // const latestMessages: LatestMessage[] =
//                 const latestMessages: LatestMessage[] =
//                     await latestMessagesQuery`
//             SELECT c.id AS contact_id, m.content AS latest_message
//             FROM contacts c
//             JOIN (
//                 SELECT contact_id, content, ROW_NUMBER() OVER(PARTITION BY contact_id ORDER BY created_at DESC) AS rn
//                 FROM messages
//             ) m ON c.id = m.contact_id
//             WHERE m.rn = 1 AND c.coachee_id = ${userID}
//         `;

//                 console.log('latest message array', latestMessages);
//                 // Fetch the coachee with their contacts
//                 const coachee = await context.db.coachee.findUnique({
//                     where: { id: userID, active: true },
//                     include: {
//                         contacts: true, // Include contacts without messages
//                     },
//                 });

//                 if (!coachee) {
//                     throw new Error(
//                         `Coachee with ID ${userID} does not exist.`,
//                     );
//                 }

//                 // Transform the data to include the latest message for each contact
//                 coachee.contacts = coachee.contacts.map((contact) => {
//                     // Find the latest message for this contact
//                     const latestMessage =
//                         latestMessages.find(
//                             (msg: LatestMessage) =>
//                                 msg.contact_id === contact.id,
//                         )?.latest_message || 'No messages yet';
//                     // Return the contact with the latest message
//                     return {
//                         ...contact,
//                         latestMessage,
//                     };
//                 });

//                 console.log(coachee);
//                 return coachee;
//             } catch (error) {
//                 // Handle validation errors
//                 if (error instanceof yup.ValidationError) {
//                     // You can customize the error message based on the validation error
//                     throw new Error(error.message);
//                 }
//                 // Rethrow other errors
//                 throw error;
//             }
//         },
//     },
// );

// export const findCoacheeMessagesByID = queryField('findCoacheeMessagesByID', {
//     type: Coachee,
//     args: {
//         userID: nonNull(intArg()), // Changed the argument to intArg for ID
//     },
//     resolve: async (_, { userID }, context: Context) => {
//         try {
//             // Validate id using the idSchema
//             idSchema.validateSync({ id: userID });

//             // Search for a Coachee by ID
//             const coachee = await context.db.coachee.findUnique({
//                 where: { id: userID, active: true }, // Include the 'active' condition
//                 include: {
//                     contacts: {
//                         include: {
//                             messages: {
//                                 take: 1, // Limit to the most recent message
//                                 orderBy: { createdAt: 'desc' }, // Order by creation date in descending order
//                             },
//                         },
//                     },
//                 },
//             });

//             console.log(coachee);

//             if (coachee) {
//                 return coachee;
//             } else {
//                 throw new Error('Coachee with ID ${userID} does not exist.');
//             }
//         } catch (error) {
//             // Handle validation errors
//             if (error instanceof yup.ValidationError) {
//                 // You can customize the error message based on the validation error
//                 throw new Error(error.message);
//             }
//             // Rethrow other errors
//             throw error;
//         }
//     },
// });

export const findFilteredMessagesByContactId = queryField(
    'findfilteredMessagesByContactId',
    {
        type: list(Message), // Assuming Message is the type for your messages
        args: {
            contactId: nonNull(intArg()), // The contact ID to filter messages by
            numberOfMessages: nonNull(intArg()),
        },
        resolve: async (
            _,
            { contactId, numberOfMessages },
            context: Context,
        ) => {
            // Use Prisma to fetch messages associated with the contact
            const messages = await context.db.message.findMany({
                where: {
                    contactId: contactId, // Filter messages by the provided contact ID
                },
                orderBy: {
                    createdAt: 'desc', // Order by creation date in descending order
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
            // Validate coachId using the idSchema
            idSchema.validateSync({ id: coacheeId });

            // FIND MESSAGES WHERE THE CONTACT OBJECT HAS THE COACHEEID ARG FOR THE COACHEEID FIELD

            // Search for contacts of the coach with contactedStatus set to true
            const messages = await context.db.message.findMany({
                where: {
                    contact: {
                        coacheeId: coacheeId, // Filter messages by the provided coachee ID
                    },
                },
                distinct: ['contactId'],
                orderBy: {
                    createdAt: 'desc', // Order by creation date in descending order
                },
                // take: 1, // Limit to the most recent message
            });

            return messages;
        } catch (error) {
            // Handle validation errors
            if (error instanceof yup.ValidationError) {
                // You can customize the error message based on the validation error
                throw new Error(error.message);
            }
            // Rethrow other errors
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
                // Validate coachId using the idSchema
                idSchema.validateSync({ id: coachId });

                // FIND MESSAGES WHERE THE CONTACT OBJECT HAS THE COACHEEID ARG FOR THE COACHEEID FIELD

                // Search for contacts of the coach with contactedStatus set to true
                const messages = await context.db.message.findMany({
                    where: {
                        contact: {
                            coachId: coachId, // Filter messages by the provided coachee ID
                        },
                    },
                    distinct: ['contactId'],
                    orderBy: {
                        createdAt: 'desc', // Order by creation date in descending order
                    },
                    // take: 1, // Limit to the most recent message
                });

                return messages;
            } catch (error) {
                // Handle validation errors
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

export const findContactsOfCoachDespiteContactedStatus = queryField(
    'findContactsOfCoachDespiteContactedStatus',
    {
        type: list(Contact),
        args: {
            coachId: nonNull(intArg()),
        },
        resolve: async (_, { coachId }, context: Context) => {
            try {
                // Validate coachId using the idSchema
                idSchema.validateSync({ id: coachId });

                // Search for contacts of the coach with contactedStatus set to true
                const contacts = await context.db.contact.findMany({
                    where: {
                        coachId: coachId,
                        active: true,
                    },
                });

                return contacts;
            } catch (error) {
                // Handle validation errors
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

export const findOneToOneServiceSlotsByCoachId = queryField(
    'findOneToOneServiceSlotsByCoachId',
    {
        type: nonNull(list(SlotTime)), // Directly returning a list of SlotTime objects
        args: {
            coachId: nonNull(intArg()),
        },
        resolve: async (_, { coachId }, context: Context) => {
            try {
                // Retrieve bookings with serviceType "one-to-one" for the specified coach
                const bookings = await context.db.booking.findMany({
                    where: {
                        coachId: coachId,
                        serviceType: 'one-to-one',
                        status: 'UPCOMING',
                        active: true, // Assuming you want only active bookings
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

                // Extract start and end times from booking slots
                const slotTimes = bookings.flatMap((booking) =>
                    booking.bookingSlots.map((slot) => ({
                        date: slot.date,
                        startTime: slot.startTime, // Assuming startTime and endTime are Date objects
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
