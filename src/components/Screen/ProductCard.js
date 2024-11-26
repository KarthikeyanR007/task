import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ProductCard = () => {
  const { aboutDescription, images } = useSelector((state) => state.about);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Details', {
      aboutDescription,
      images,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.card}>
        <Text style={styles.description}>{aboutDescription}</Text>

        {images && images.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((imageUri, index) => (
              imageUri ? (
                <Image key={index} source={{ uri: imageUri }} style={styles.image} />
              ) : null
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noImagesText}>No images available</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    marginHorizontal: 16,
    padding: 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  noImagesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ProductCard;
