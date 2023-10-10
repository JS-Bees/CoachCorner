// import * as gqlTypes from 'nexus-prisma';
// import { inputObjectType } from 'nexus';

// export const CreateCoacheeInput = inputObjectType({
//     name: 'CreateCoacheeInput',
//     definition(t) {
//         t.field(gqlTypes.Coachee.address);
//         t.field(gqlTypes.Coachee.birthday);
//         t.field(gqlTypes.Coachee.email);
//         t.field(gqlTypes.Coachee.firstName);
//         t.field(gqlTypes.Coachee.lastName);
//         t.field(gqlTypes.Coachee.password);
//         t.field(gqlTypes.Coachee.mantra);
//         t.field(gqlTypes.Coachee.affiliations);
//         t.field(gqlTypes.Coachee.bio);
//         t.field(gqlTypes.Coachee.profilePicture);
//         t.field(gqlTypes.Coachee.moviesGenres);
//         t.field(gqlTypes.Coachee.games);
//         t.field(gqlTypes.Coachee.hobbies);
//     },
// });

// export const CreateCoachInput = inputObjectType({
//     name: 'CreateCoachInput',
//     definition(t) {
//         t.field(gqlTypes.Coach.birthday);
//         t.field(gqlTypes.Coach.email);
//         t.field(gqlTypes.Coach.firstName);
//         t.field(gqlTypes.Coach.lastName);
//         t.field(gqlTypes.Coach.password);
//         t.field(gqlTypes.Coach.workplaceAddress);
//         t.field(gqlTypes.Coach.mantra);
//         t.field(gqlTypes.Coach.affiliations);
//         t.field(gqlTypes.Coach.bio);
//         t.field(gqlTypes.Coach.profilePicture);
//         t.field(gqlTypes.Coach.sport);
//         t.field(gqlTypes.Coach.moviesGenres);
//         t.field(gqlTypes.Coach.games);
//         t.field(gqlTypes.Coach.hobbies);
//     },
// });

// export const UpdateCoacheeProfileInput = inputObjectType({
//     name: 'UpdateCoacheeProfileInput',
//     definition(t) {
//         t.field(gqlTypes.Coachee.address);
//         t.field(gqlTypes.Coachee.affiliations);
//         t.field(gqlTypes.Coachee.bio);
//         t.field(gqlTypes.Coachee.mantra);
//         t.field(gqlTypes.Coachee.profilePicture);
//     },
// });

// export const UpdateCoachProfileInput = inputObjectType({
//     name: 'UpdateCoachProfileInput',
//     definition(t) {
//         t.field(gqlTypes.Coach.workplaceAddress);
//         t.field(gqlTypes.Coach.affiliations);
//         t.field(gqlTypes.Coach.bio);
//         t.field(gqlTypes.Coach.mantra);
//         t.field(gqlTypes.Coach.profilePicture);
//     },
// });

// export const CreateCoachingRelationshipInput = inputObjectType({
//     name: 'CreateCoachingRelationshipInput',
//     definition(t) {
//         t.field(gqlTypes.CoachingRelationship.coachId);
//         t.field(gqlTypes.CoachingRelationship.coacheeId);
//     },
// });

// export const MessagingStartedInput = inputObjectType({
//     name: 'MessagingStartedInput',
//     definition(t) {
//         t.field(gqlTypes.CoachingRelationship.messagingStarted);
//     },
// });

// export const CreateBookingInput = inputObjectType({
//     name: 'CreateBookingInput',
//     definition(t) {
//         t.field(gqlTypes.Booking.coacheeId);
//         t.field(gqlTypes.Booking.coachId);
//         t.field(gqlTypes.Booking.serviceType);
//         t.field(gqlTypes.Booking.status);
//         t.field(gqlTypes.Booking.additionalNotes);
//     },
// });

// export const CreateBookingSlotInput = inputObjectType({
//     name: 'CreateBookingSlotInput',
//     definition(t) {
//         t.field(gqlTypes.BookingSlot.date);
//         t.field(gqlTypes.BookingSlot.startTime);
//         t.field(gqlTypes.BookingSlot.endTime);
//     },
// });

// export const UpdateBookingStatusInput = inputObjectType({
//     name: 'UpdateBookingStatusInput',
//     definition(t) {
//         t.field(gqlTypes.Booking.status);
//     },
// });

// export const CreateReviewInput = inputObjectType({
//     name: 'CreateReviewInput',
//     definition(t) {
//         t.field(gqlTypes.Review.starRating);
//         t.field(gqlTypes.Review.comment);
//         t.field(gqlTypes.Review.coachId);
//         t.field(gqlTypes.Review.coacheeId);
//     },
// });

import { inputObjectType } from 'nexus';
// import { DateTime } from 'nexus-prisma/scalars';
import {
    SportEnum,
    MovieGenresEnum,
    HobbiesEnum,
    GamesEnum,
    BookingStatusEnum,
} from './enums';

export const CreateCoacheeInput = inputObjectType({
    name: 'CreateCoacheeInput',
    definition(t) {
        t.string('address');
        t.string('birthday');
        t.string('email');
        t.string('firstName');
        t.string('lastName');
        t.string('password');
        t.string('mantra');
        t.string('affiliations');
        t.string('bio');
        t.string('profilePicture');
        t.list.field('moviesGenres', { type: MovieGenresEnum });
        t.list.field('games', { type: GamesEnum });
        t.list.field('hobbies', { type: HobbiesEnum });
    },
});

export const CreateCoachInput = inputObjectType({
    name: 'CreateCoachInput',
    definition(t) {
        t.string('birthday');
        t.string('email');
        t.string('firstName');
        t.string('lastName');
        t.string('password');
        t.string('workplaceAddress');
        t.string('mantra');
        t.string('affiliations');
        t.string('bio');
        t.string('profilePicture');
        t.field('sport', { type: SportEnum });
        t.list.field('moviesGenres', { type: MovieGenresEnum });
        t.list.field('games', { type: GamesEnum });
        t.list.field('hobbies', { type: HobbiesEnum });
    },
});

export const UpdateCoacheeProfileInput = inputObjectType({
    name: 'UpdateCoacheeProfileInput',
    definition(t) {
        t.string('address');
        t.string('affiliations');
        t.string('bio');
        t.string('mantra');
        t.string('profilePicture');
    },
});

export const UpdateCoachProfileInput = inputObjectType({
    name: 'UpdateCoachProfileInput',
    definition(t) {
        t.string('workplaceAddress');
        t.string('affiliations');
        t.string('bio');
        t.string('mantra');
        t.string('profilePicture');
    },
});

export const CreateCoachingRelationshipInput = inputObjectType({
    name: 'CreateCoachingRelationshipInput',
    definition(t) {
        t.int('coachId');
        t.int('coacheeId');
    },
});

export const MessagingStartedInput = inputObjectType({
    name: 'MessagingStartedInput',
    definition(t) {
        t.boolean('messagingStarted');
    },
});

export const CreateBookingInput = inputObjectType({
    name: 'CreateBookingInput',
    definition(t) {
        t.int('coacheeId');
        t.int('coachId');
        t.string('serviceType');
        t.field('status', { type: BookingStatusEnum });
        t.string('additionalNotes');
    },
});

export const CreateBookingSlotInput = inputObjectType({
    name: 'CreateBookingSlotInput',
    definition(t) {
        t.string('date');
        t.string('startTime');
        t.string('endTime');
    },
});

export const UpdateBookingStatusInput = inputObjectType({
    name: 'UpdateBookingStatusInput',
    definition(t) {
        t.field('status', { type: BookingStatusEnum });
    },
});

export const CreateReviewInput = inputObjectType({
    name: 'CreateReviewInput',
    definition(t) {
        t.int('starRating');
        t.string('comment');
        t.int('coachId');
        t.int('coacheeId');
    },
});
