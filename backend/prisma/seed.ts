import {
    PrismaClient,
    // Sport,
} from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new PrismaClient();

async function seedDatabase() {
    try {
        const hashedPassword = await bcrypt.hash('password', 10); // Hash the password

        // Coach data
        await db.coach.createMany({
            data: [
                {
                    email: 'coach1@example.com',
                    firstName: 'Michael',
                    lastName: 'Jordan',
                    password: hashedPassword, // Use hashed password
                    address: 'address 1',
                    birthday: new Date(),
                    // add sport and 3 interests
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                },
                {
                    email: 'coach2@example.com',
                    firstName: 'Serena',
                    lastName: 'Williams',
                    password: hashedPassword,
                    address: 'address 2',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                },
                {
                    email: 'coach3@example.com',
                    firstName: 'Lionel',
                    lastName: 'Messi',
                    password: hashedPassword,
                    address: 'address 3',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                },
                {
                    email: 'coach4@example.com',
                    firstName: 'Rafael',
                    lastName: 'Nadal',
                    password: hashedPassword,
                    address: 'address 4',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                },
                {
                    email: 'coach5@example.com',
                    firstName: 'Usain',
                    lastName: 'Bolt',
                    password: hashedPassword,
                    address: 'address 5',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                },
            ],
        });

        // Coachee data
        await db.coachee.createMany({
            data: [
                {
                    email: 'coachee1@example.com',
                    firstName: 'John',
                    lastName: 'Doey',
                    password: hashedPassword,
                    address: 'Coachee Address 1',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                    sport: 'Soccer',
                },
                {
                    email: 'coachee2@example.com',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    password: hashedPassword,
                    address: 'Coachee Address 2',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                    sport: 'Soccer',
                },
                {
                    email: 'coachee3@example.com',
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    password: hashedPassword,
                    address: 'Coachee Address 3',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                    sport: 'Soccer',
                },
                {
                    email: 'coachee4@example.com',
                    firstName: 'Robert',
                    lastName: 'Smith',
                    password: hashedPassword,
                    address: 'Coachee Address 4',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                    sport: 'Soccer',
                },
                {
                    email: 'coachee5@example.com',
                    firstName: 'Emily',
                    lastName: 'Davis',
                    password: hashedPassword,
                    address: 'Coachee Address 5',
                    birthday: new Date(),
                    bio: 'Enter bio here',
                    profilePicture: 'profile picture',
                    sport: 'Soccer',
                },
            ],
        });

        // Contacts
        await db.contact.createMany({
            data: [
                {
                    coachId: 2, // Coach with ID  2
                    coacheeId: 1, // Coachee with ID  1
                    contactedStatus: true,
                },
                {
                    coachId: 2, // Coach with ID  2
                    coacheeId: 2, // Coachee with ID  2
                    contactedStatus: true,
                },
                {
                    coachId: 3, // Coach with ID  3
                    coacheeId: 5, // Coachee with ID  5
                    contactedStatus: true,
                },
                // not contacted
                {
                    coachId: 4, // Coach with ID  4
                    coacheeId: 1, // Coachee with ID  1
                    contactedStatus: false,
                },
                {
                    coachId: 5, // Coach with ID  5
                    coacheeId: 1, // Coachee with ID  1
                    contactedStatus: false,
                },
            ],
        });

        // Sports
        await db.sport.createMany({
            data: [
                {
                    coachId: 1,
                    type: 'Basketball',
                },
                {
                    coachId: 2,
                    type: 'Tennis',
                },
                {
                    coachId: 3,
                    type: 'Soccer',
                },
                {
                    coachId: 4,
                    type: 'Volleyball',
                },
                {
                    coachId: 5,
                    type: 'Swimming',
                },
            ],
        });

        // Sports Credentials
        await db.sportsCredential.createMany({
            data: [
                {
                    sportId: 1,
                    credentialPicture: 'Basketball Cert',
                },
                {
                    sportId: 2,
                    credentialPicture: 'Tennis Cert',
                },
                {
                    sportId: 3,
                    credentialPicture: 'Soccer Cert',
                },
                {
                    sportId: 4,
                    credentialPicture: 'Volleyball Cert',
                },
                {
                    sportId: 5,
                    credentialPicture: 'Swimming Cert',
                },
            ],
        });

        // ^Connect/update these all later since it was edited (see booking and booking slots)

        // Coach Tasks
        await db.coachTask.createMany({
            data: [
                {
                    coachId: 1,
                    title: 'Complete Weekly Report',
                    description:
                        'Submit a weekly report of your coaching activities.',
                    completionStatus: 'COMPLETED',
                    date: new Date('2024-03-05'),
                },
                {
                    coachId: 1,
                    title: 'Prepare for Upcoming Coaching Sessions',
                    description:
                        'Plan and prepare materials for upcoming coaching sessions.',
                    completionStatus: 'UNCOMPLETED',
                    date: new Date('2024-03-06'),
                },
            ],
        });

        // Coachee Tasks
        await db.coacheeTask.createMany({
            data: [
                {
                    coacheeId: 1,
                    title: 'Complete Daily Reflection',
                    description:
                        'Reflect on your progress and set goals for the next day.',
                    completionStatus: 'COMPLETED',
                    date: new Date('2024-03-01'),
                },
                {
                    coacheeId: 1,
                    title: 'Attend Fitness Class',
                    description:
                        'Attend a fitness class to improve physical health.',
                    completionStatus: 'UNCOMPLETED',
                    date: new Date('2024-03-02'),
                },
            ],
        });

        // Coach Interests
        await db.coachInterest.createMany({
            data: [
                {
                    coachId: 1,
                    type: 'Movie Genre',
                    name: 'Romance',
                },
                {
                    coachId: 1,
                    type: 'Movie Genre',
                    name: 'Horror',
                },
                {
                    coachId: 1,
                    type: 'Movie Genre',
                    name: 'Action',
                },
                {
                    coachId: 1,
                    type: 'Music Genre',
                    name: 'Rock',
                },
                {
                    coachId: 1,
                    type: 'Music Genre',
                    name: 'Jazz',
                },
                {
                    coachId: 1,
                    type: 'Music Genre',
                    name: 'Classical',
                },
                {
                    coachId: 1,
                    type: 'Literature Genre',
                    name: 'Science Fiction',
                },
                {
                    coachId: 1,
                    type: 'Literature Genre',
                    name: 'Young Adult',
                },
                {
                    coachId: 1,
                    type: 'Literature Genre',
                    name: 'Fantasy',
                },
            ],
        });

        // Coachee Interests
        await db.coacheeInterest.createMany({
            data: [
                {
                    coacheeId: 1,
                    type: 'Movie Genre',
                    name: 'Romance',
                },
                {
                    coacheeId: 1,
                    type: 'Movie Genre',
                    name: 'Horror',
                },
                {
                    coacheeId: 1,
                    type: 'Movie Genre',
                    name: 'Action',
                },
                {
                    coacheeId: 1,
                    type: 'Music Genre',
                    name: 'Rock',
                },
                {
                    coacheeId: 1,
                    type: 'Music Genre',
                    name: 'Pop',
                },
                {
                    coacheeId: 1,
                    type: 'Music Genre',
                    name: 'K-Pop',
                },
                {
                    coacheeId: 1,
                    type: 'Literature Genre',
                    name: 'Romance',
                },
                {
                    coacheeId: 1,
                    type: 'Literature Genre',
                    name: 'Mystery',
                },
                {
                    coacheeId: 1,
                    type: 'Literature Genre',
                    name: 'Horror',
                },
            ],
        });

        // Bookings (before booking slots)
        await db.booking.createMany({
            data: [
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 1, // Coachee with ID 1
                    serviceType: 'Volleyball Coaching',
                    status: 'COMPLETED',
                    additionalNotes: 'Bring equipment',
                },
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 2, // Coachee with ID 2
                    serviceType: 'Volleyball Coaching',
                    status: 'CANCELLED',
                    additionalNotes: 'Bring equipment',
                },
                {
                    coachId: 3, // Coach with ID 3
                    coacheeId: 5, // Coachee with ID 5
                    serviceType: 'Soccer Coaching',
                    status: 'PENDING',
                    additionalNotes: 'Bring equipment',
                },
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 1, // Coachee with ID 1
                    serviceType: 'Volleyball Coaching Again',
                    status: 'UPCOMING',
                    additionalNotes: 'Bring equipment',
                },
            ],
        });

        // Create booking slots
        await db.bookingSlot.createMany({
            data: [
                {
                    bookingId: 1, // Booking with ID 1
                    date: new Date('2023-08-01'),
                    startTime: new Date('2023-08-01T14:00:00'),
                    endTime: new Date('2023-08-01T15:00:00'),
                    status: 'UPCOMING',
                },
                {
                    bookingId: 1, // Booking with ID 1
                    date: new Date('2023-08-03'),
                    startTime: new Date('2023-08-03T15:00:00'),
                    endTime: new Date('2023-08-03T16:00:00'),
                    status: 'COMPLETED',
                },
                {
                    bookingId: 1, // Booking with ID 1
                    date: new Date('2023-08-05'),
                    startTime: new Date('2023-08-05T14:00:00'),
                    endTime: new Date('2023-08-05T15:00:00'),
                    status: 'CANCELLED',
                },
                {
                    bookingId: 2, // Booking with ID 2
                    date: new Date('2023-09-06'),
                    startTime: new Date('2023-09-06T15:00:00'),
                    endTime: new Date('2023-09-06T16:00:00'),
                    status: 'CANCELLED',
                },
                {
                    bookingId: 2, // Booking with ID 2
                    date: new Date('2023-09-10'),
                    startTime: new Date('2023-09-10T14:00:00'),
                    endTime: new Date('2023-09-10T15:00:00'),
                    status: 'UPCOMING',
                },
                {
                    bookingId: 2, // Booking with ID 2
                    date: new Date('2023-09-11'),
                    startTime: new Date('2023-09-11T15:00:00'),
                    endTime: new Date('2023-09-11T16:00:00'),
                    status: 'CANCELLED',
                },
                {
                    bookingId: 3, // Booking with ID 3
                    date: new Date('2023-10-16'),
                    startTime: new Date('2023-10-16T15:00:00'),
                    endTime: new Date('2023-10-16T16:00:00'),
                    status: 'UPCOMING',
                },
                {
                    bookingId: 3, // Booking with ID 3
                    date: new Date('2023-10-20'),
                    startTime: new Date('2023-10-20T14:00:00'),
                    endTime: new Date('2023-10-20T15:00:00'),
                    status: 'COMPLETED',
                },
                {
                    bookingId: 3, // Booking with ID 3
                    date: new Date('2023-10-21'),
                    startTime: new Date('2023-10-21T15:00:00'),
                    endTime: new Date('2023-10-21T16:00:00'),
                    status: 'COMPLETED',
                },
                {
                    bookingId: 4, // Booking with ID 4
                    date: new Date('2023-11-04'),
                    startTime: new Date('2023-11-04T13:00:00'),
                    endTime: new Date('2023-11-04T14:00:00'),
                    status: 'CANCELLED',
                },
                {
                    bookingId: 4, // Booking with ID 4
                    date: new Date('2023-11-05'),
                    startTime: new Date('2023-11-05T16:00:00'),
                    endTime: new Date('2023-11-05T17:00:00'),
                    status: 'COMPLETED',
                },
            ],
        });

        // Create reviews
        await db.review.createMany({
            data: [
                {
                    starRating: 5,
                    comment: 'Great coaching!',
                    coachId: 2, // Coach with ID 2
                    coacheeId: 1, // Coachee with ID 1
                },
                {
                    starRating: 4,
                    comment: 'Good experience.',
                    coachId: 2, // Coach with ID 2
                    coacheeId: 2, // Coachee with ID 2
                },
                {
                    starRating: 5,
                    comment: 'Looking forward to more sessions.',
                    coachId: 3, // Coach with ID 3
                    coacheeId: 5, // Coachee with ID 5
                },
                {
                    starRating: 4,
                    comment: 'Enjoyed the second coaching session.',
                    coachId: 2, // Coach with ID 2
                    coacheeId: 1, // Coachee with ID 1
                },
            ],
        });

        // ----- CONNECTING/UPDATING -----

        // Connect bookings to booking slots
        await db.booking.update({
            where: { id: 1 }, // Specify the booking you want to update
            data: {
                bookingSlots: {
                    connect: [
                        { id: 1 }, // Booking Slot with ID 1
                        { id: 2 }, // Booking Slot with ID 2
                        { id: 3 }, // Booking Slot with ID 3
                    ],
                },
            },
        });

        await db.booking.update({
            where: { id: 2 },
            data: {
                bookingSlots: {
                    connect: [
                        { id: 4 }, // Booking Slot with ID 4
                        { id: 5 }, // Booking Slot with ID 5
                        { id: 6 }, // Booking Slot with ID 6
                    ],
                },
            },
        });

        await db.booking.update({
            where: { id: 3 },
            data: {
                bookingSlots: {
                    connect: [
                        { id: 7 }, // Booking Slot with ID 7
                        { id: 8 }, // Booking Slot with ID 8
                        { id: 9 }, // Booking Slot with ID 9
                    ],
                },
            },
        });

        await db.booking.update({
            where: { id: 4 },
            data: {
                bookingSlots: {
                    connect: [
                        { id: 10 }, // Booking Slot with ID 10
                        { id: 11 }, // Booking Slot with ID 11
                    ],
                },
            },
        });

        // Connect bookings to coaches
        await db.coach.update({
            where: { id: 2 }, // Coach with ID 2
            data: {
                bookings: {
                    connect: [
                        { id: 1 }, // Booking with ID 1
                        { id: 2 }, // Booking with ID 2
                        { id: 4 }, // Booking with ID 4
                    ],
                },
            },
        });

        await db.coach.update({
            where: { id: 3 }, // Coach with ID 3
            data: {
                bookings: {
                    connect: [
                        { id: 3 }, // Booking with ID 3
                    ],
                },
            },
        });

        // Connect bookings to coachees
        await db.coachee.update({
            where: { id: 1 }, // Coachee with ID 1
            data: {
                bookings: {
                    connect: [
                        { id: 1 }, // Booking with ID 1
                    ],
                },
            },
        });

        await db.coachee.update({
            where: { id: 2 }, // Coachee with ID 2
            data: {
                bookings: {
                    connect: [
                        { id: 2 }, // Booking with ID 2
                    ],
                },
            },
        });

        await db.coachee.update({
            where: { id: 5 }, // Coachee with ID 5
            data: {
                bookings: {
                    connect: [
                        { id: 3 }, // Booking with ID 3
                    ],
                },
            },
        });

        await db.coachee.update({
            where: { id: 1 }, // Coachee with ID 1
            data: {
                bookings: {
                    connect: [
                        { id: 4 }, // Booking with ID 4
                    ],
                },
            },
        });

        console.log('Database seeding completed successfully ✅');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await db.$disconnect(); // Disconnect Prisma Client
    }
}

seedDatabase();
