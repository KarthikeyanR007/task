import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';

const DayExpense = ({ route }) => {
  const { day } = route.params; // Get the day passed from CalendarScreen
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // For controlling modal visibility

  // Function to add an expense
  const addExpense = () => {
    if (expenseName && expenseAmount) {
      const newExpense = { id: Date.now().toString(), name: expenseName, amount: parseFloat(expenseAmount) };
      setExpenses([...expenses, newExpense]);
      setExpenseName('');
      setExpenseAmount('');
      setModalVisible(false); // Close the modal after adding expense
    }
  };

  // Calculate the total amount for the day
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Render each expense item in the list
  const renderExpense = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseName}>{item.name}</Text>
      <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>Day {day}</Text>
        {/* Open Modal on Add Expense button click */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* List of Expenses */}
      <FlatList
        data={expenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.expensesList}
      />

      {/* Total Amount */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
      </View>

      {/* Modal for adding new expense */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Expense</Text>

            <TextInput
              style={styles.input}
              placeholder="Expense Name"
              value={expenseName}
              onChangeText={setExpenseName}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Add Expense" onPress={addExpense} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  expensesList: {
    flex: 1,
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseName: {
    fontSize: 18,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#007BFF',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
});

export default DayExpense;
