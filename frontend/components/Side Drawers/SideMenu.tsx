
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SideMenuDrawer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Drawer content here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default SideMenuDrawer;


export default SideMenuDrawer;