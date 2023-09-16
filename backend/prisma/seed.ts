import {
    Games,
    Hobbies,
    MovieGenres,
    PrismaClient,
    Sport,
} from '@prisma/client';

const db = new PrismaClient();

async function seedDatabase() {
    try {
        // Seed Coach data
        await db.coach.createMany({
            data: [
                {
                    email: 'coach1@example.com',
                    firstName: 'Michael',
                    lastName: 'Jordan',
                    password: 'password123',
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
                    password: 'password123',
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
                    password: 'password123',
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
                    password: 'password123',
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
                    password: 'password123',
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
                    password: 'password123',
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
                    password: 'password123',
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
                    password: 'password123',
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
                    password: 'password123',
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
                    password: 'password123',
                    address: 'CoacheeAddress5',
                    birthday: new Date(),
                    games: [Games.STREETFIGHTER, Games.TEKKEN],
                    hobbies: [Hobbies.DANCING, Hobbies.BAKING],
                    moviesGenres: [MovieGenres.HORROR, MovieGenres.MYSTERY],
                },
            ],
        });

        console.log('Database seeding completed successfully ✅');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await db.$disconnect(); // Disconnect Prisma Client
    }
}

seedDatabase();
