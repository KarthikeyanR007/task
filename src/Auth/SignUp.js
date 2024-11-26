import React , {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export default function Register() {
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const signUp = async(email, password) => {
    if (email && password) {
      return true;
    }else{
      try {
          const userCredential = await auth().createUserWithEmailAndPassword(email, password);
          const user = userCredential.user;
          console.log('User signed in!', user);
          await AsyncStorage.setItem('@user_token', user.uid);
          const cr = firestore().collection('user').add({
            email,
          });
          if(cr){
              console.log('pass');
          }else{
              console.log('fail');
          }
      //dispatch(setUser(user.email));
      //console.log(setUser);
      } catch (error) {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
          setError('The email address is already in use by another account.');
          } else {
              setError('An error occurred. Please try again.');
          }
      }
   }
  };
  // Validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // Form submission handler
  const handleSubmit = (values, { resetForm }) => {
    const { email, password } = values;

    // Call signUp function (this is just a dummy function for demo purposes)
    const isValidSignUp = signUp(email, password);

    if (isValidSignUp) {
      Alert.alert('Registration Successful', 'You have successfully registered.');
      resetForm(); // Reset form after successful registration
    } else {
      Alert.alert('Registration Failed', 'Please check your information.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require('../components/Assets/bg.jpg')}
          style={styles.background}
        >
          <View style={styles.container}>
            <Text style={styles.headerText}>Create an Account</Text>
            <Text style={styles.subHeaderText}>Join us and enjoy our services.</Text>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholderTextColor="#aaa"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholderTextColor="#aaa"
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholderTextColor="#aaa"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit} // Form submission
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <Text style={styles.signNavigation}>
               Do Already have Account
                <TouchableOpacity style={styles.signNavigation1} onPress={()=>{navigation.navigate('Login');}}>
                  <Text>Log in</Text>
                </TouchableOpacity>
            </Text>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 380,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signNavigation:{
    marginTop: 20,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:10,
    height:35,
  },
  signNavigation1:{
    justifyContent:'center',
    marginTop:17,
    paddingLeft:15,
  },
});
