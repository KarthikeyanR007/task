import './gesture-handler';
import '@react-native-firebase/app';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './AuthContext';

import Home from './src/components/Screen/Home';
import Login from './src/Auth/Login';
import SignUp from './src/Auth/SignUp';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './src/Redux/userSlice';
import About from './src/components/Screen/About';
import AdditionalDetailsScreen from './src/components/Screen/AdditionalDetails';
import ProductCard from './src/components/Screen/ProductCard';
import Details from './src/components/Screen/Details';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator   >
    <Stack.Screen name="About" component={About}  options={{ headerShown: true }}/>
    <Stack.Screen name="Additional Details" component={AdditionalDetailsScreen}  options={{ headerShown: true }}/>
    <Stack.Screen name="Digital Product" component={ProductCard}  options={{ headerShown: true }}/>
    <Stack.Screen name="Details" component={Details}  options={{ headerShown: true }}/>
    {/* <Stack.Screen name="ProfileEdit" component={ProfileEdit}  options={{ headerShown: false }}/> */}
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
  </Stack.Navigator>
);

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
  }, []);

   if(isLoading === false){
      user ? dispatch(setUser(user.email)) : null;
   }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large"  />
      </View>
    );
  }

  return (
    <NavigationContainer>
      { user ? <MainStack /> : <AuthStack /> }
    </NavigationContainer>
  );
};

const App = () => (

    <AuthProvider>
      <AppContent />
    </AuthProvider>
);

export default App;


