import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function seedDatabase() {
    try {
        // Check if the database is already seeded
        const personCount = await db.person.count();
        const coachCount = await db.coach.count();

        if (personCount > 0 || coachCount > 0) {
            throw new Error('Database is already seeded ❌');
        }

        // Seed Person model
        await db.person.createMany({
            data: [
                {
                    givenName: 'John',
                    familyName: 'Doe',
                },
                {
                    givenName: 'Jane',
                    familyName: 'Smith',
                },
                {
                    givenName: 'Alice',
                    familyName: 'Johnson',
                },
            ],
        });

        // Seed Coach model
        await db.coach.createMany({
            data: [
                {
                    firstName: 'Michael',
                    lastName: 'Jordan',
                    sport: 'Basketball',
                },
                {
                    firstName: 'Serena',
                    lastName: 'Williams',
                    sport: 'Tennis',
                },
                {
                    firstName: 'Lionel',
                    lastName: 'Messi',
                    sport: 'Soccer',
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
