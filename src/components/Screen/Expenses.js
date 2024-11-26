import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { format, getDaysInMonth, startOfMonth, addMonths, subMonths } from 'date-fns';

const Expenses = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfCurrentMonth = startOfMonth(currentDate);
  const numberOfDaysInMonth = getDaysInMonth(currentDate);

  const days = [];
  for (let i = 0; i < startOfCurrentMonth.getDay(); i++) {
    days.push(null);
  }
  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    days.push(i);
  }

  // Budget calculations
  const totalBudget = 1000; // Replace with dynamic value
  const totalSpent = 500; // Replace with dynamic value
  const percentageSpent = (totalSpent / totalBudget) * 100;

  const onDayPress = (day) => {
    navigation.navigate('DayExpense', { day });
  };

  const renderDays = () => {
    const rows = [];
    let daysArray = [...days];
    let dayRow = [];

    while (daysArray.length > 0) {
      dayRow = daysArray.splice(0, 7);
      rows.push(dayRow);
    }

    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((day, dayIndex) => (
          <TouchableOpacity
            key={dayIndex}
            style={[styles.dayButton, !day && { backgroundColor: '#f2f2f2' }]}
            onPress={() => day && onDayPress(day)}
            disabled={!day}
          >
            <Text style={styles.dayText}>{day || ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Speed Meter Section */}
      <View style={styles.speedMeterContainer}>
        <AnimatedCircularProgress
          size={150}
          width={15}
          fill={percentageSpent}
          tintColor="#3498db"
          backgroundColor="#E0E0E0"
          rotation={220}
          arcSweepAngle={280}
          lineCap="round"
        >
          {() => (
            <View style={styles.innerCircle}>
              <Text style={styles.percentageText}>{percentageSpent.toFixed(0)}%</Text>
              <Text style={styles.batteryText}>BUDGET</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentDate(subMonths(currentDate, 1))}>
            <Text style={styles.arrow}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthYear}>{format(currentDate, 'MMMM yyyy')}</Text>
          <TouchableOpacity onPress={() => setCurrentDate(addMonths(currentDate, 1))}>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.calendar}>{renderDays()}</ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light background color for a clean look
  },
  speedMeterContainer: {
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 3,
    width: '98%',
    paddingVertical: 15,
    borderRadius: 15,
    borderColor: '#3498db', // Border color matches progress bar color
    backgroundColor: '#ffffff', // White background for a sleek look
    elevation: 5, // Add shadow for depth
    shadowColor: '#000', // Shadow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3498db',
  },
  batteryText: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  detailsText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  calendarContainer: {
    width: '100%',
    padding: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  arrow: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#3498db', // Color for arrows
  },
  monthYear: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', // Dark color for the month and year
  },
  calendar: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  dayButton: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light button color
    borderWidth: 1,
    borderColor: '#ccc', // Light border
    elevation: 3, // Slight shadow to create depth
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Dark color for better contrast
  },
});

export default Expenses;
