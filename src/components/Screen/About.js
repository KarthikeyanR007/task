import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { setAboutDescription, setImages, setAboutName } from '../../Redux/aboutSlice';
import { useNavigation } from '@react-navigation/native';

const About = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const aboutDescription = useSelector((state) => state.about.aboutDescription);
  const images = useSelector((state) => state.about.images);
  const name = useSelector((state) => state.about.aboutName);

  const handleNameChange = (text) => {
    dispatch(setAboutName(text));
  };

  const handleDescriptionChange = (text) => {
    dispatch(setAboutDescription(text));
    console.log('Updated Description:', text); 
  };
  
  const handleImagePick = (index) => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1, selectionLimit: 1 },
      (response) => {
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const newImages = [...images];
          newImages[index] = response.assets[0].uri;
          dispatch(setImages(newImages));
          console.log('Updated Images:', newImages);  
        }
      }
    );
  };
  
  return (
    <ScrollView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Enter name"
          placeholderTextColor="#cacfd2"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={aboutDescription}
          onChangeText={handleDescriptionChange}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={4}
          placeholderTextColor="#cacfd2"
        />
        <Text style={styles.characterCount}>{2000}</Text>

        <Text style={styles.label}>Cover photos</Text>
        <Text style={styles.subLabel}>(Upload up to 5 photos)</Text>
        <View style={styles.photoContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.photoBox}
              onPress={() => handleImagePick(index)}
            >
              {images[index] ? (
                <Image source={{ uri: images[index] }} style={styles.photoBoxImage} />
              ) : (
                <Text style={styles.photoBoxText}>+</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="$0.00"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.nextButton} onPress={()=>{navigation.navigate('Additional Details')}}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  form: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  subLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    color:'black',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginBottom: 16,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  photoBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  photoBoxText: {
    fontSize: 20,
    color: '#888',
  },
  photoBoxImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default About;
