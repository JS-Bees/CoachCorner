import { enumType } from 'nexus';

export const SportEnum = enumType({
    name: 'Sport',
    members: {
        BADMINTON: 'BADMINTON',
        BASKETBALL: 'BASKETBALL',
        SOCCER: 'SOCCER',
        SWIMMING: 'SWIMMING',
        VOLLEYBALL: 'VOLLEYBALL',
    },
});

export const MovieGenresEnum = enumType({
    name: 'MovieGenres',
    members: {
        ACTION: 'ACTION',
        ANIME: 'ANIME',
        ADVENTURE: 'ADVENTURE',
        COMEDY: 'COMEDY',
        DRAMA: 'DRAMA',
        FANTASY: 'FANTASY',
        KDrama: 'KDRAMA',
        SCIFI: 'SCIFI',
        HORROR: 'HORROR',
        MYSTERY: 'MYSTERY',
        THRILLER: 'THRILLER',
        ROMANCE: 'ROMANCE',
        DOCUMENTARY: 'DOCUMENTARY',
        MUSICAL: 'MUSICAL',
    },
});

export const HobbiesEnum = enumType({
    name: 'Hobbies',
    members: {
        BAKING: 'BAKING',
        COOKING: 'COOKING',
        DANCING: 'DANCING',
        HIKING: 'HIKING',
        PAINTING: 'PAINTING',
        PHOTOGRAPHY: 'PHOTOGRAPHY',
        READING: 'READING',
        SINGING: 'SINGING',
        TRAVELLING: 'TRAVELLING',
        WRITING: 'WRITING',
    },
});

export const GamesEnum = enumType({
    name: 'Games',
    members: {
        ARKNIGHTS: 'ARKNIGHTS',
        AZURELANE: 'AZURELANE',
        CALLOFDUTY: 'CALLOFDUTY',
        CANDYCRUSH: 'CANDYCRUSH',
        CLASHOFCLANS: 'CLASHOFCLANS',
        COUNTERSTRIKE: 'COUNTERSTRIKE',
        DOTA: 'DOTA',
        GENSHINIMPACT: 'GENSHINIMPACT',
        LOL: 'LOL',
        MINECRAFT: 'MINECRAFT',
        MOBILELEGENDS: 'MOBILELEGENDS',
        OVERWATCH: 'OVERWATCH',
        PUBG: 'PUBG',
        STREETFIGHTER: 'STREETFIGHTER',
        TEKKEN: 'TEKKEN',
        VALORANT: 'VALORANT',
    },
});

export const BookingStatusEnum = enumType({
    name: 'BookingStatus',
    members: {
        PENDING: 'PENDING',
        CONFIRMED: 'CONFIRMED',
        CANCELLED: 'CANCELLED',
        COMPLETED: 'COMPLETED',
    },
});
