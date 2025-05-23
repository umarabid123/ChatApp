import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import AppButton from '../../components/AppButton/AppButton';
import AppText from '../../components/AppText/AppText';
import CustomTextInput from '../../components/textInput/TextInput';
import { Colors } from '../../constent/theme';
import { AuthContext } from '../../contexts/AuthContext';

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken }: any = useContext(AuthContext);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post('http://10.0.2.2:8000/login',
        user,
      )
      .then(({ data }) => {

        const token = data.token;
        AsyncStorage.setItem('authToken', token);
        setToken(token);
        Alert.alert('Login Successfully');
      })
      .catch(error => {
        Alert.alert('Error Something went wrong in login', error.message);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <KeyboardAvoidingView>
          <AppText
            text="Login to your account"
            fontSize={20}
            fontWeight={600}
            style={{ textAlign: 'center' }}
          />

          <View style={{ marginTop: 30 }}>
            <CustomTextInput
              placeholder="Enter your email"
              labelText="Email"
              style={{ marginVertical: 10, width: 300 }}
              onChangeText={setEmail}
              value={email}
              keyboardType={'email-address'}
            />
            <CustomTextInput
              placeholder="Enter your Password"
              labelText="Password"
              style={{ marginVertical: 10, width: 300 }}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <AppButton
              text={'Login'}
              style={{ borderRadius: 6, marginTop: 30 }}
              onPress={handleLogin}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 8,
              }}>
              <AppText text={"Don't have any account?"} color="grey" />
              <AppText
                text={'Sign Up'}
                color={Colors.primary}
                onPress={() => navigation.navigate('signup')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
