import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setBenefits, setAdditionalDetails, setCategory } from '../../Redux/additionalDetailsSlice';
import { useNavigation } from '@react-navigation/native';
const AdditionalDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
 
  const benefits = useSelector((state) => state.additionalDetails.benefits);
  const additionalDetails = useSelector((state) => state.additionalDetails.additionalDetails);
  const category = useSelector((state) => state.additionalDetails.category);

  const handleAddBenefit = () => {
    const updatedBenefits = [...benefits, ""];
    dispatch(setBenefits(updatedBenefits));
  };


  const handleDeleteBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    dispatch(setBenefits(updatedBenefits));
  };


  const handleAddDetail = () => {
    const updatedDetails = [...additionalDetails, { attribute: 'Attribute', value: 'Value' }];
    dispatch(setAdditionalDetails(updatedDetails));
  };


  const handleDeleteDetail = (index) => {
    const updatedDetails = additionalDetails.filter((_, i) => i !== index);
    dispatch(setAdditionalDetails(updatedDetails));
  };


  const handleCategoryChange = (text) => {
    dispatch(setCategory(text));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefits</Text>
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.itemRow}>
            <TextInput
              style={styles.input}
              value={benefit}
              placeholder="Enter benefit"
              onChangeText={(text) => {
                const updatedBenefits = [...benefits];
                updatedBenefits[index] = text;
                dispatch(setBenefits(updatedBenefits));
              }}
            />
            <TouchableOpacity onPress={() => handleDeleteBenefit(index)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={handleAddBenefit} style={styles.addButton}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional details</Text>
        {additionalDetails.map((detail, index) => (
          <View key={index} style={styles.detailRow}>
            <TextInput
              style={styles.input}
              value={detail.attribute}
              placeholder="Attribute"
              onChangeText={(text) => {
                const updatedDetails = [...additionalDetails];
                updatedDetails[index].attribute = text;
                dispatch(setAdditionalDetails(updatedDetails)); 
              }}
            />
            <TextInput
              style={styles.input}
              value={detail.value}
              placeholder="Value"
              onChangeText={(text) => {
                const updatedDetails = [...additionalDetails];
                updatedDetails[index].value = text;
                dispatch(setAdditionalDetails(updatedDetails)); 
              }}
            />
            <TouchableOpacity onPress={() => handleDeleteDetail(index)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={handleAddDetail} style={styles.addButton}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

   
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          placeholder="Select category"
          onChangeText={handleCategoryChange} 
        />
      </View>

    
      <TouchableOpacity style={styles.nextButton} onPress={()=>navigation.navigate('Digital Product')} >
        <Text style={styles.nextButtonText}>Next</Text>
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
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
    color: '#FF6347',
  },
  addButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  addText: {
    fontSize: 16,
    color: '#007BFF',
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

export default AdditionalDetailsScreen;
