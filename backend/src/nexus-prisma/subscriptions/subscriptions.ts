import { nonNull, stringArg, subscriptionType } from 'nexus';
// import { Message } from '../objectTypes';
// import { Context } from '../context';
import { PubSub } from 'graphql-subscriptions';

// Create a new PubSub instance
const pubsub = new PubSub();

// interface Payload {
//     message: {
//         contactId: number; // Assuming contactId is a string, adjust the type as necessary
//         content: string; // Assuming content is a string, adjust the type as necessary
//         createdAt: Date; // Assuming createdAt is a string, adjust the type as necessary
//         id: number; // Assuming id is a string, adjust the type as necessary
//     };
// }

export const NewMessageSubscription = subscriptionType({
    definition(t) {
        t.field('newMessage', {
            type: 'Message',
            args: {
                channelName: nonNull(stringArg()),
            },
            // subscribe: (_, { channelName }) =>
            //     pubsub.asyncIterator(channelName),

            subscribe: (_, { channelName }) => {
                console.log('Subscribing to channel:', channelName);
                return pubsub.asyncIterator(channelName);
            },
            // resolve: (payload: Payload) => {
            //     // Assuming payload contains a message object with the necessary fields
            //     const { message } = payload;
            //     console.log('Received payload:', payload);
            //     return {
            //         contactId: message.contactId,
            //         content: message.content,
            //         createdAt: message.createdAt,
            //         id: message.id,
            //     };
            // },

            resolve: (payload: {
                newMessage: {
                    contactId: number;
                    content: string;
                    createdAt: Date;
                    id: number;
                };
            }) => {
                console.log('Received payload:', payload);
                const { newMessage: message } = payload;
                console.log('Deconstructed message', message);
                return {
                    contactId: message.contactId,
                    content: message.content,
                    createdAt: message.createdAt,
                    id: message.id,
                };
            },
        });
    },
});

// Function to publish a new message to the subscription
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function publishNewMessage(Message: any) {
//     pubsub.publish('NEW_MESSAGE', { newMessage: Message });
// }

export function publishNewMessage(message: {
    contactId: number;
    content: string;
    createdAt: Date;
    id: number;
}) {
    const channelName = 'ChannelofContact' + message.contactId.toString();
    console.log('channel Name', channelName);
    pubsub.publish(channelName, { newMessage: message });
    // make the Channel name use the CONTACT id number
    // console.log Channel name
}
