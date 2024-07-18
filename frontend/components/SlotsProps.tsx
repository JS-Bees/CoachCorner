import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SlotProps {
  startTime: string;
  endTime: string;
  date: string;
}

const Slot: React.FC<SlotProps> = ({ startTime, endTime, date }) => {
  return (
    <View style={styles.slotContainer}>
      <View>
        <Text style={styles.slotText}>{startTime} - {endTime}</Text>
      </View>
      <View>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    top: "1%",
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: "5%"
  },
  slotText: {
    fontSize: 14,
    fontWeight: '400',
    color: "#838086"
  },
  dateText: {
    marginLeft: "10%",
    justifyContent: "flex-start",
    fontSize: 14,
    fontWeight: '400',
    color: "#838086"
  }
});

export default Slot;
