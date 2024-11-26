import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons';

const Details = () => {
  const route = useRoute();
  const { aboutDescription, images } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: images && images[0] ? images[0] : 'https://via.placeholder.com/150' }}
          style={styles.image}
        />
        <View style={styles.iconContainer}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Product Details</Text>
        <Text style={styles.description}>{aboutDescription}</Text>
      </View>

      <View style={styles.imagesSection}>
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
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.featureItem}>
          <Text style={styles.featureTitle}>Feature 1: </Text>
          High-Quality Photography
        </Text>
        <Text style={styles.featureItem}>
          <Text style={styles.featureTitle}>Feature 2: </Text>
          Available Worldwide
        </Text>
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={styles.sectionTitle}>Benefits</Text>
        <Text style={styles.benefitItem}>Capture your best moments with high-quality equipment.</Text>
        <Text style={styles.benefitItem}>Fast delivery of images after the event.</Text>
      </View>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy for $1495</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#000',
  },
  imagesSection: {
    marginVertical: 16,
  },
  noImagesText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  featuresContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
  },
  featureItem: {
    fontSize: 14,
    marginVertical: 4,
    color: '#000',
  },
  featureTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  benefitsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  benefitItem: {
    fontSize: 14,
    marginVertical: 4,
    color: '#000',
  },
  buyButton: {
    margin: 16,
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Details;
