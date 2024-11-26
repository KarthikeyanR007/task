import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'; // Import the gradient library

const Home = ({ navigation }) => {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg" // Random avatar for demo
  };

  // Data for the grid of 3 icons
  const gridData = [
    { id: '1', title: 'Expenses', icon: 'cash', screen: 'Expenses' },
    { id: '2', title: 'Tasks', icon: 'checkbox-outline', screen: 'Tasks' },
    { id: '3', title: 'Settings', icon: 'settings-outline', screen: 'Settings' },
  ];

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      {/* Grid of 3 Icons */}
      <View style={styles.gridContainer}>
        <FlatList
          data={gridData}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Icon name={item.icon} size={40} color="#424949" />
              <Text style={styles.iconLabel}>{ item.title || 'Default Text'}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.gridContentContainer}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
    marginBottom: 32,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
  },
  gridContainer: {
    marginTop: 20,
  },
  gridItem: {
    width: '30%', // Each icon will take up 30% of the screen width
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff', // White background for each grid item
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 6, // Adds space between icons
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#007bff', // Icon text color
  },
  gridContentContainer: {
    justifyContent: 'space-between', // Adds space between the icons
  },
});

export default Home;
