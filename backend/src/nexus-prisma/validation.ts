import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().required('Email is required.'),
    password: yup.string().required('Password is required.'),
});

export const idSchema = yup.object().shape({
    id: yup
        .number()
        .integer('ID must be an integer.')
        .required('ID is required.'),
});

export const idAndStatusSchema = yup.object().shape({
    status: yup
        .string()
        .oneOf(
            ['PENDING', 'COMPLETED', 'UPCOMING', 'CANCELLED'],
            'Status value is invalid.',
        )
        .required('Status is required.'),
    id: yup
        .number()
        .integer('ID must be an integer.')
        .required('ID is required.'),
});

export const sportSchema = yup.object().shape({
    type: yup
        .string()
        .oneOf(
            ['Basketball', 'Tennis', 'Soccer', 'Volleyball', 'Swimming'],
            'Sport value is invalid.',
        )
        .required('Sport is required.'),
});

export const idAndSportSchema = yup.object().shape({
    id: yup
        .number()
        .integer('ID must be an integer')
        .required('ID is required'),
    type: yup
        .string()
        .oneOf(
            ['Basketball', 'Tennis', 'Soccer', 'Volleyball', 'Swimming'],
            'Sport value is invalid.',
        )
        .required('Sport is required'),
});

export const coachSchema = yup.object().shape({
    address: yup.string().required('Address is required.'),
    birthday: yup.date().required('Birthday is required.'),
    email: yup.string().required('Email is required.'),
    firstName: yup.string().required('First name is required.'),
    lastName: yup.string().required('Last name is required.'),
    password: yup.string().required('Password is required.'),
    profilePicture: yup.string().required('Profile picture is required.'),
    bio: yup.string().required('Bio is required.'),
});

export const coacheeSchema = yup.object().shape({
    address: yup.string().required('Address is required.'),
    birthday: yup.date().required('Birthday is required.'),
    email: yup.string().required('Email is required.'),
    firstName: yup.string().required('First name is required.'),
    lastName: yup.string().required('Last name is required.'),
    password: yup.string().required('Password is required.'),
    profilePicture: yup.string().required('Profile picture is required.'),
    bio: yup.string().required('Bio is required.'),
});

export const interestListSchema = yup
    .array()
    .of(
        yup.object().shape({
            type: yup
                .string()
                .oneOf(
                    ['MovieGenre', 'BookGenre', 'MusicGenre'],
                    'Interest type value is invalid.',
                )
                .required('Interest type is required.'),
            name: yup
                .string()
                // .oneOf(
                //     [
                //         'Romance',
                //         'Horror',
                //         'Action',
                //         'Comedy',
                //         'Thriller',
                //         'Drama',
                //         'Science Fiction',
                //         'Young Adult',
                //         'Fantasy',
                //         'Mystery',
                //         'Rock',
                //         'Jazz',
                //         'Classical',
                //         'Pop',
                //         'K-Pop',
                //         'OPM',
                //     ],
                //     'Interest name value is invalid.',
                // )
                .required('Interest name is required.'),
        }),
    )
    .required('Interests are required.');

export const bookingSchema = yup.object().shape({
    coacheeId: yup.number().integer().required('Coachee ID is required.'),
    coachId: yup.number().integer().required('Coach ID is required.'),
    serviceType: yup.string().required('Service type is required.'),
    additionalNotes: yup.string().required('Additional Notes is required.'),
    status: yup
        .string()
        .oneOf(
            ['PENDING', 'COMPLETED', 'UPCOMING', 'CANCELLED'],
            'Invalid booking status value.',
        )
        .required('Booking status is required.'),
});

export const bookingSlotSchema = yup.object().shape({
    date: yup.date().required('Date is required.'),
    startTime: yup.date().required('Start time is required.'), // might cause issues
    endTime: yup.date().required('End time is required.'),
    status: yup
        .string()
        .oneOf(
            ['COMPLETED', 'UPCOMING', 'CANCELLED'],
            'Invalid booking slot status value.',
        )
        .required('Booking slot status is required.'),
});

export const reviewSchema = yup.object().shape({
    starRating: yup
        .number()
        .integer()
        .min(1, 'Star rating must be between  1 and  5.')
        .max(5, 'Star rating must be between  1 and  5.')
        .required('Star rating is required.'),
    comment: yup.string().max(500, 'Comment cannot exceed  500 characters.'),
    coacheeId: yup.number().integer().required('Coachee ID is required.'),
    coachId: yup.number().integer().required('Coach ID is required.'),
});

export const coachTaskSchema = yup.object().shape({
    coachId: yup.number().integer().required('ID is required.'),
    title: yup.string().required('Title is required.'),
    description: yup.string().required('Description is required.'),
    completionStatus: yup
        .string()
        .oneOf(['COMPLETED', 'UNCOMPLETED'], 'Invalid completion status value.')
        .required('Completion status is required.'),
    date: yup.date().required('Date is required.'),
});

export const coacheeTaskSchema = yup.object().shape({
    coacheeId: yup.number().integer().required('ID is required.'),
    title: yup.string().required('Title is required.'),
    description: yup.string().required('Description is required.'),
    completionStatus: yup
        .string()
        .oneOf(['COMPLETED', 'UNCOMPLETED'], 'Invalid completion status value.')
        .required('Completion status is required.'),
    date: yup.date().required('Date is required.'),
});

export const interestSchema = yup.object().shape({
    type: yup
        .string()
        .oneOf(
            ['MovieGenre', 'BookGenre', 'MusicGenre'],
            'Interest type value is invalid.',
        )
        .required('Interest type is required.'),
    name: yup
        .string()
        // .oneOf(
        //     [
        //         'Romance',
        //         'Horror',
        //         'Action',
        //         'Comedy',
        //         'Thriller',
        //         'Drama',
        //         'Science Fiction',
        //         'Young Adult',
        //         'Fantasy',
        //         'Mystery',
        //         'Rock',
        //         'Jazz',
        //         'Classical',
        //         'Pop',
        //         'K-Pop',
        //         'OPM',
        //     ],
        //     'Interest name value is invalid.',
        // )
        .required('Interest name is required.'),
});

export const sportsCredentialsSchema = yup.object().shape({
    sportId: yup.number().integer().required('Sport ID is required.'),
    credentialPicture: yup.string().required('Credential picture is required.'),
});

export const contactSchema = yup.object().shape({
    coachId: yup.number().integer().required('Coach ID is required.'),
    coacheeId: yup.number().integer().required('Coachee ID is required.'),
    contactedStatus: yup.boolean().required('Contacted status is required.'), // remove this
});

export const updateProfileSchema = yup.object().shape({
    address: yup.string().required('Address is required.'),
    bio: yup
        .string()
        .required('Bio is required.')
        .max(1000, 'Bio cannot exceed 1000 characters.'),
    profilePicture: yup.string().required('Profile picture is required.'),
});

export const updateBookingStatusSchema = yup.object().shape({
    status: yup
        .string()
        .oneOf(
            ['PENDING', 'COMPLETED', 'UPCOMING', 'CANCELLED'],
            'Booking status value is invalid.',
        )
        .required('Booking status is required.'),
});

export const updateBookingSlotStatusSchema = yup.object().shape({
    status: yup
        .string()
        .oneOf(
            ['COMPLETED', 'UPCOMING', 'CANCELLED'],
            'Booking slot status value is invalid.',
        )
        .required('Slot status is required.'),
});

export const updateContactedStatusSchema = yup.object().shape({
    contactedStatus: yup.boolean().required('Contacted status is required.'),
});

export const updateTaskSchema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    description: yup.string().required('Description is required.'),
    completionStatus: yup
        .string()
        .oneOf(['COMPLETED', 'UNCOMPLETED'], 'Invalid completion status value.')
        .required('Completion status is required.'),
    date: yup.date().required('Date is required.'),
});

export const updateBookingSchema = yup.object().shape({
    serviceType: yup
        .string()
        .max(100, 'Service type cannot exceed 100 characters.')
        .required('Service type is required'),
    additionalNotes: yup
        .string()
        .max(1000, 'Additional notes cannot exceed  1000 characters.')
        .required('Additional notes are required'),
});

export const updateBookingSlotSchema = yup.object().shape({
    id: yup.number().integer().required('ID is required'),
    date: yup.date().required('Date is required'),
    startTime: yup.date().required('Start time is required'),
    endTime: yup.date().required('End time is required'),
    status: yup
        .string()
        .oneOf(
            ['COMPLETED', 'UPCOMING', 'CANCELLED'],
            'Invalid booking slot status value',
        )
        .required('Status is required'),
});

export const booleanSchema = yup.boolean().required('Boolean is required.');
