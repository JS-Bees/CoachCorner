import { nonNull, stringArg, subscriptionType } from 'nexus';

import { PubSub } from 'graphql-subscriptions';


const pubsub = new PubSub();



export const NewMessageSubscription = subscriptionType({
    definition(t) {
        t.field('newMessage', {
            type: 'Message',
            args: {
                channelName: nonNull(stringArg()),
            },


            subscribe: (_, { channelName }) => {
                console.log('Subscribing to channel:', channelName);
                return pubsub.asyncIterator(channelName);
            },


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



export function publishNewMessage(message: {
    contactId: number;
    content: string;
    createdAt: Date;
    id: number;
}) {
    const channelName = 'ChannelofContact' + message.contactId.toString();
    console.log('channel Name', channelName);
    pubsub.publish(channelName, { newMessage: message });

}
