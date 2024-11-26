import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const ProfileEdit = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [profilePicture, setProfilePicture] = useState(null);
  const userEmail = useSelector((state) => state.user.user);


  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1, maxWidth: 300, maxHeight: 300 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setProfilePicture(response.assets[0].uri);
        }
      }
    );
  };


  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Please enter both name and email.');
      return;
    }

    // try {
    //   await firestore()
    //     .collection('user')
    //     .add({
    //       email: email,
    //       username: name,
    //     });

    //   console.log('User data added successfully');
    //   Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
    //   navigation.goBack();
    // } catch (error) {
    //   console.error('Error adding user data: ', error);
    //   Alert.alert('Error', 'There was an issue saving your profile. Please try again.');
    // }
    try {
      // Query Firestore collection where email matches the current user's email
      const snapshot = await firestore()
        .collection('user') // Replace with your collection name
        .where('email', '==', "johndoe@example.com")
        .get();

      if (snapshot.empty) {
        console.log('No matching documents found');
        setIsLoading(false);
        return;
      }

      // Assuming there is only one document per user
      snapshot.forEach(doc => {
        const fetchedUserData = doc.data();
        setUserData(fetchedUserData); // Set the fetched user data in the local state
        // Optionally, you can also dispatch to Redux if needed
        // dispatch(setUser(fetchedUserData));
        console.log('Fetched User Data:', fetchedUserData);
      });
      setIsLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false); // Stop loading in case of an error
    }
    console.log(userEmail);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={pickImage}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          ) : (
            <View style={styles.profilePicturePlaceholder}>
              <Text style={styles.profilePictureText}>Pick a picture</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePictureText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProfileEdit;
