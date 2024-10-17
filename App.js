import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/components/Home';
import Login from './src/components/Login';
import OtpScreen from './src/components/Verify';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackNavigator = createStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const verificationStatus = await AsyncStorage.getItem('isVerified');
        setIsVerified(verificationStatus === 'true');
      } catch (error) {
        console.error('Error checking verification status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkVerification();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName={isVerified ? 'Home' : 'Login'}>
        <StackNavigator.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <StackNavigator.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <StackNavigator.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
});

export default App;
