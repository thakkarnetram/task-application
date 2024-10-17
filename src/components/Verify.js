import React, {useState} from 'react';
import {
  TextInput,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from '../../constants';

const OtpScreen = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({otp}),
      });

      if (response.ok) {
        await AsyncStorage.setItem('isVerified', 'true');
        Alert.alert('Success', 'OTP verified successfully!');
        navigation.navigate('Home', {isVerified: true});
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
        setOtp('');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Enter OTP</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6}
          placeholderTextColor="#b3b3b3"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={verifyOtp}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  innerContainer: {
    width: wp('85%'),
    padding: wp('6%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp('1%')},
    shadowOpacity: 0.1,
    shadowRadius: wp('2%'),
    elevation: 5,
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: hp('2%'),
  },
  input: {
    height: hp('6%'),
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    fontSize: wp('4%'),
    color: '#333',
    backgroundColor: '#fafafa',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default OtpScreen;
