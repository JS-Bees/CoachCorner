import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
export interface ListItemProps {
    data: {
        workplaceAddress: string;
        firstName: string;
        lastName: string;
        sport: string;
        id: string;
        bio: string;
        affiliations: string;
    };
    onPress?: () => void;
}

const ListItemComponent: React.FC<ListItemProps> = ({ data, onPress }) => (
    <View>
        <List.Item
            style={style.listcontainer}
            title={data.firstName + ' ' + data.lastName}
            description={data.sport}
            left={(props) => <List.Icon {...props} icon={'account-circle'} />}
            onPress={onPress}
        />
    </View>
);

const style = StyleSheet.create({
    listcontainer: {
        top: '10%',
        width: 'auto',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
});

export default ListItemComponent;
