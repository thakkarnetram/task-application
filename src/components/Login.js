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
import {SERVER_URL} from '../../constants';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const requestOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });

      if (response.ok) {
        Alert.alert('Success', 'OTP has been sent to your email!');
        navigation.navigate('OtpScreen');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#b3b3b3"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={requestOtp}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Sending OTP...' : 'Request OTP'}
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
    padding: wp('8%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: wp('2%'),
    elevation: 10,
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#666',
    textAlign: 'center',
    marginBottom: hp('3%'),
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
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default Login;
