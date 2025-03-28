import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import AppText from '../../components/AppText/AppText';
import CustomTextInput from '../../components/textInput/TextInput';
import {Colors} from '../../constent/theme';
import AppButton from '../../components/AppButton/AppButton';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  return (
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={{marginTop: 100}}>
            <AppText
              text="Sign Up"
              color={Colors.primary}
              fontSize={17}
              fontWeight={600}
              style={{textAlign: 'center'}}
            />
            <AppText
              text="Create a new account"
              fontSize={17}
              fontWeight={600}
              style={{marginTop: 15, textAlign: 'center'}}
            />
            <View style={{marginTop: 50}}>
              <CustomTextInput
                placeholder="Enter your Name"
                labelText="Name"
                style={{marginVertical: 10, width: 300}}
                onChangeText={setName}
                value={name}
              />
              <CustomTextInput
                placeholder="Enter your email"
                labelText="Email"
                style={{marginVertical: 10, width: 300}}
                onChangeText={setEmail}
                value={email}
                keyboardType={'email-address'}
              />
              <CustomTextInput
                placeholder="Enter your Password"
                labelText="Password"
                style={{marginVertical: 10, width: 300}}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
              />
              <CustomTextInput
                placeholder="Image"
                labelText="Image"
                style={{marginVertical: 10, width: 300}}
                onChangeText={setImage}
                value={image}
              />
              <AppButton
                text={'Sign Up'}
                style={{borderRadius: 6, marginTop: 30}}
                // onPress={handleRegister}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 8,
                }}>
                <AppText text={'Do you have any account?'} color="grey" />
                <AppText text={'Sign in'} color={Colors.primary} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
});

// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	KeyboardAvoidingView,
// 	ScrollView,
// 	Platform,
// } from "react-native";
// import React, { useState } from "react";
// import axios from "axios";
// import AppText from "../../components/AppText/AppText";
// import CustomTextInput from "../../components/textInput/TextInput";
// import AppButton from "../../components/AppButton/AppButton";
// import { Colors } from "../../constent/theme";

// export default function RegistrationScreen() {
// 	const [name, setName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [image, setImage] = useState("");
// 	const handleRegister = () => {
//     console.log("register")
// 		const user = {
// 			name: name,
// 			email: email,
// 			password: password,
// 			image: image,
// 		};
// 		axios
// 		.post(
// 			Platform.OS === "ios"
// 			  ? "http://127.0.0.1:8000/register"
// 			  : "http://10.0.2.2:8000/register",
// 			user
// 		  )
// 			.then((response) => console.log("register response", response)).catch((err) =>{
//         console.log('err', err)
//       });
// 	};
// 	return (
// 		<ScrollView>
// 			<View style={styles.container}>
// 				<KeyboardAvoidingView>
// 					<View style={{ marginTop: 100 }}>
// 						<AppText
// 							text="Sign Up"
// 							color={Colors.primary}
// 							fontSize={17}
// 							fontWeight={600}
// 							style={{ textAlign: "center" }}
// 						/>
// 						<AppText
// 							text="Create a new account"
// 							fontSize={17}
// 							fontWeight={600}
// 							style={{ marginTop: 15, textAlign: "center" }}
// 						/>
// 						<View style={{ marginTop: 50 }}>
// 							<CustomTextInput
// 								placeholder="Enter your Name"
// 								labelText="Name"
// 								style={{ marginVertical: 10, width: 300 }}
// 								onChangeText={setName}
// 								value={name}
// 							/>
// 							<CustomTextInput
// 								placeholder="Enter your email"
// 								labelText="Email"
// 								style={{ marginVertical: 10, width: 300 }}
// 								onChangeText={setEmail}
// 								value={email}
// 								keyboardType={"email-address"}
// 							/>
// 							<CustomTextInput
// 								placeholder="Enter your Password"
// 								labelText="Password"
// 								style={{ marginVertical: 10, width: 300 }}
// 								onChangeText={setPassword}
// 								value={password}
// 								secureTextEntry={true}
// 							/>
// 							<CustomTextInput
// 								placeholder="Image"
// 								labelText="Image"
// 								style={{ marginVertical: 10, width: 300 }}
// 								onChangeText={setImage}
// 								value={image}
// 							/>
// 							<AppButton
// 								text={"Sign Up"}
// 								style={{ borderRadius: 6, marginTop: 30 }}
// 								onPress={handleRegister}
// 							/>
// 							<View
// 								style={{
// 									flexDirection: "row",
// 									justifyContent: "center",
// 									marginTop: 8,
// 								}}
// 							>
// 								<AppText
// 									text={"Do you have any account?"}
// 									color="grey"
// 								/>
// 								<AppText
// 									text={"Sign in"}
// 									color={Colors.primary}
// 								/>
// 							</View>
// 						</View>
// 					</View>
// 				</KeyboardAvoidingView>
// 			</View>
// 		</ScrollView>
// 	);
// }
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: "center",
// 		marginBottom: 20,
// 	},
// });
