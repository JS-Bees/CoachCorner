import {
    Games,
    Hobbies,
    MovieGenres,
    PrismaClient,
    Sport,
} from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new PrismaClient();

async function seedDatabase() {
    try {
        const hashedPassword = await bcrypt.hash('password', 10); // Hash the password

        // Seed Coach data
        await db.coach.createMany({
            data: [
                {
                    email: 'coach1@example.com',
                    firstName: 'Michael',
                    lastName: 'Jordan',
                    password: hashedPassword, // Use hashed password
                    workplaceAddress: 'WorkplaceAddress1',
                    birthday: new Date(),
                    sport: Sport.BASKETBALL,
                    games: [Games.MOBILELEGENDS, Games.DOTA],
                    hobbies: [Hobbies.COOKING, Hobbies.PAINTING],
                    moviesGenres: [MovieGenres.ACTION, MovieGenres.COMEDY],
                },
                {
                    email: 'coach2@example.com',
                    firstName: 'Serena',
                    lastName: 'Williams',
                    password: hashedPassword,
                    workplaceAddress: 'WorkplaceAddress2',
                    birthday: new Date(),
                    sport: Sport.VOLLEYBALL,
                    games: [Games.VALORANT, Games.MINECRAFT],
                    hobbies: [Hobbies.WRITING, Hobbies.SINGING],
                    moviesGenres: [MovieGenres.ROMANCE, MovieGenres.DRAMA],
                },
                {
                    email: 'coach3@example.com',
                    firstName: 'Lionel',
                    lastName: 'Messi',
                    password: hashedPassword,
                    workplaceAddress: 'WorkplaceAddress3',
                    birthday: new Date(),
                    sport: Sport.SOCCER,
                    games: [Games.CALLOFDUTY, Games.PUBG],
                    hobbies: [Hobbies.DANCING, Hobbies.TRAVELLING],
                    moviesGenres: [MovieGenres.HORROR, MovieGenres.THRILLER],
                },
                {
                    email: 'coach4@example.com',
                    firstName: 'Rafael',
                    lastName: 'Nadal',
                    password: hashedPassword,
                    workplaceAddress: 'WorkplaceAddress4',
                    birthday: new Date(),
                    sport: Sport.BADMINTON,
                    games: [Games.MOBILELEGENDS, Games.STREETFIGHTER],
                    hobbies: [Hobbies.READING, Hobbies.PHOTOGRAPHY],
                    moviesGenres: [
                        MovieGenres.DOCUMENTARY,
                        MovieGenres.MUSICAL,
                    ],
                },
                {
                    email: 'coach5@example.com',
                    firstName: 'Usain',
                    lastName: 'Bolt',
                    password: hashedPassword,
                    workplaceAddress: 'WorkplaceAddress5',
                    birthday: new Date(),
                    sport: Sport.SWIMMING,
                    games: [Games.CLASHOFCLANS, Games.CANDYCRUSH],
                    hobbies: [Hobbies.HIKING, Hobbies.BAKING],
                    moviesGenres: [MovieGenres.ADVENTURE, MovieGenres.FANTASY],
                },
            ],
        });

        // Seed Coachee data
        await db.coachee.createMany({
            data: [
                {
                    email: 'coachee1@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: hashedPassword,
                    address: 'CoacheeAddress1',
                    birthday: new Date(),
                    games: [Games.VALORANT, Games.MINECRAFT],
                    hobbies: [Hobbies.READING, Hobbies.SINGING],
                    moviesGenres: [MovieGenres.DRAMA, MovieGenres.ROMANCE],
                },
                {
                    email: 'coachee2@example.com',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    password: hashedPassword,
                    address: 'CoacheeAddress2',
                    birthday: new Date(),
                    games: [Games.MOBILELEGENDS, Games.DOTA],
                    hobbies: [Hobbies.COOKING, Hobbies.PAINTING],
                    moviesGenres: [MovieGenres.ACTION, MovieGenres.COMEDY],
                },
                {
                    email: 'coachee3@example.com',
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    password: hashedPassword,
                    address: 'CoacheeAddress3',
                    birthday: new Date(),
                    games: [Games.ARKNIGHTS, Games.AZURELANE],
                    hobbies: [Hobbies.TRAVELLING, Hobbies.WRITING],
                    moviesGenres: [MovieGenres.ANIME, MovieGenres.FANTASY],
                },
                {
                    email: 'coachee4@example.com',
                    firstName: 'Robert',
                    lastName: 'Smith',
                    password: hashedPassword,
                    address: 'CoacheeAddress4',
                    birthday: new Date(),
                    games: [Games.LOL, Games.PUBG],
                    hobbies: [Hobbies.HIKING, Hobbies.PHOTOGRAPHY],
                    moviesGenres: [
                        MovieGenres.DOCUMENTARY,
                        MovieGenres.MUSICAL,
                    ],
                },
                {
                    email: 'coachee5@example.com',
                    firstName: 'Emily',
                    lastName: 'Davis',
                    password: hashedPassword,
                    address: 'CoacheeAddress5',
                    birthday: new Date(),
                    games: [Games.STREETFIGHTER, Games.TEKKEN],
                    hobbies: [Hobbies.DANCING, Hobbies.BAKING],
                    moviesGenres: [MovieGenres.HORROR, MovieGenres.MYSTERY],
                },
            ],
        });

        // Create coaching relationships
        await db.coachingRelationship.createMany({
            data: [
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 1, // Coachee with ID 1
                },
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 3, // Coachee with ID 3
                },
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 5, // Coachee with ID 5
                },
            ],
        });

        // Create bookings (before booking slots)
        await db.booking.createMany({
            data: [
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 1, // Coachee with ID 1
                    serviceType: 'Volleyball Coaching',
                    status: 'COMPLETED',
                },
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 2, // Coachee with ID 2
                    serviceType: 'Volleyball Coaching',
                    status: 'CANCELLED',
                },
                {
                    coachId: 3, // Coach with ID 3
                    coacheeId: 5, // Coachee with ID 5
                    serviceType: 'Soccer Coaching',
                    status: 'PENDING',
                },
                {
                    coachId: 2, // Coach with ID 2
                    coacheeId: 1, // Coachee with ID 1
                    serviceType: 'Volleyball Coaching Again',
                    status: 'PENDING',
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
                },
                {
                    bookingId: 1, // Booking with ID 1
                    date: new Date('2023-08-03'),
                    startTime: new Date('2023-08-03T15:00:00'),
                    endTime: new Date('2023-08-03T16:00:00'),
                },
                {
                    bookingId: 1, // Booking with ID 1
                    date: new Date('2023-08-05'),
                    startTime: new Date('2023-08-05T14:00:00'),
                    endTime: new Date('2023-08-05T15:00:00'),
                },
                {
                    bookingId: 2, // Booking with ID 2
                    date: new Date('2023-09-06'),
                    startTime: new Date('2023-09-06T15:00:00'),
                    endTime: new Date('2023-09-06T16:00:00'),
                },
                {
                    bookingId: 2, // Booking with ID 2
                    date: new Date('2023-09-10'),
                    startTime: new Date('2023-09-10T14:00:00'),
                    endTime: new Date('2023-09-10T15:00:00'),
                },
                {
                    bookingId: 2, // Booking with ID 2
                    date: new Date('2023-09-11'),
                    startTime: new Date('2023-09-11T15:00:00'),
                    endTime: new Date('2023-09-11T16:00:00'),
                },
                {
                    bookingId: 3, // Booking with ID 3
                    date: new Date('2023-10-16'),
                    startTime: new Date('2023-10-16T15:00:00'),
                    endTime: new Date('2023-10-16T16:00:00'),
                },
                {
                    bookingId: 3, // Booking with ID 3
                    date: new Date('2023-10-20'),
                    startTime: new Date('2023-10-20T14:00:00'),
                    endTime: new Date('2023-10-20T15:00:00'),
                },
                {
                    bookingId: 3, // Booking with ID 3
                    date: new Date('2023-10-21'),
                    startTime: new Date('2023-10-21T15:00:00'),
                    endTime: new Date('2023-10-21T16:00:00'),
                },
                {
                    bookingId: 4, // Booking with ID 4
                    date: new Date('2023-11-04'),
                    startTime: new Date('2023-11-04T13:00:00'),
                    endTime: new Date('2023-11-04T14:00:00'),
                },
                {
                    bookingId: 4, // Booking with ID 4
                    date: new Date('2023-11-05'),
                    startTime: new Date('2023-11-05T16:00:00'),
                    endTime: new Date('2023-11-05T17:00:00'),
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

        // CONNECTING/UPDATING

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
