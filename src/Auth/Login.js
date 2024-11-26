import React from 'react';
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
  ImageBackground,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../AuthContext';
import { setUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export default function Login() {
//const screenHeight = Dimensions.get('window').height;
  const { setUsers } = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
  });

  // Form submission handler
  const handleSubmit = async(values, { resetForm }) => {
    const { email, password } = values;
    const userCredential = await auth().signInWithEmailAndPassword(email,password);
    const user = userCredential.user;
    console.log('User signed in!', user);
    await AsyncStorage.setItem('@user_token', user.uid);
    setUsers(userCredential.user);
    const cnEmail = convert(user.email);
    dispatch(setUser(cnEmail));

     if (userCredential) {
       Alert.alert('Login Successful', 'You have successfully logged in.');
       resetForm();
     } else {
       Alert.alert('Login Failed', 'Invalid email or password.');
     }
  };

  const convert = (email) => {
    if(email.lenght === 0 || !email) { return email; }
    return email.charAt(0).toLowerCase() + email.slice(1);
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
            <Text style={styles.headerText}>Welcome Back!</Text>
            <Text style={styles.subHeaderText}>Please log in to continue.</Text>
            <Formik
              initialValues={{ email: '', password: '' }}
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

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Log In</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            {/* <Text style={styles.signNavigation}>
               Don't have Account
                <TouchableOpacity style={styles.signNavigation1} onPress={()=>{navigation.navigate('SignUp');}}>
                  <Text>Sign Up</Text>
                </TouchableOpacity>
            </Text> */}
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
    alignItems:'center',
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
    marginTop:15,
    paddingLeft:15,
  },
});
