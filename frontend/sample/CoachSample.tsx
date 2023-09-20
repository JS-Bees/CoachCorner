import React from 'react';
import { GetAllCoachesDocument } from '../generated-gql/graphql';
import { useQuery } from 'urql';
import { Text, StyleSheet } from 'react-native';


export default function CoachSample(): JSX.Element | null {
    const [result] = useQuery({
        query: GetAllCoachesDocument,
    });

    const { data, error, fetching } = result;

    if (fetching) {
        return <Text> Loading ... pls wait ...</Text>;
    }

    if (error) {
        return <Text> Error bruhzz {error.message}</Text>;
    }

    if (!data || !data.coaches) {
        // Handle the case where data or data.coaches is undefined
        return null;
    }

    return (
        <>
            {data.coaches.map((coach) => (
                <React.Fragment key={coach.id}>
                    <Text style={styles.coach}>{coach.firstName}</Text>
                    <Text style={styles.coach}>{coach.sport}</Text>
                </React.Fragment>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    coach: {
        fontWeight: '700',
    },
});