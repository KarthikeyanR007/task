import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleTheme = () => setDarkThemeEnabled(previousState => !previousState);

  const handleLogOut = async () => {
      try {
          await auth().signOut();
          console.log('User signed out!');
          await AsyncStorage.removeItem('@user_token');
      } catch (error) {
          console.error('Sign out error:', error.message);
      }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Profile Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit')}>
          <Text style={styles.settingLink}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleNotifications}
          value={notificationsEnabled}
        />
      </View>

      {/* Theme Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Theme</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={darkThemeEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={darkThemeEnabled}
        />
      </View>

      {/* Help Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Help</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Text style={styles.settingLink}>Get Help</Text>
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 3, // Shadow effect for depth
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  settingLink: {
    fontSize: 16,
    color: '#3498db', // Link color for actions
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Settings;
