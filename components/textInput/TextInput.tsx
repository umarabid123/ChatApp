import {
	View,
	Text,
	TextInput as RNTextInput,
	KeyboardTypeOptions,
} from "react-native";
import React from "react";
import AppText from "../AppText/AppText";


export default function CustomTextInput({
	placeholder,
	placeholderTextColor = "#000",
	labelText,
	style,
	onChangeText,
	value,
	keyboardType,
    secureTextEntry
}: {
	placeholder?: string;
	placeholderTextColor?: string;
	labelText?: string;
	style?: object;
	onChangeText?: any;
	keyboardType?: KeyboardTypeOptions;
	value?: string;
    secureTextEntry?:any
}) {
	return (
		<View>
			<AppText
				text={labelText}
				fontWeight={600}
				fontSize={18}
				color="gray"
			/>
			<RNTextInput
				keyboardType={keyboardType}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				style={[
					{ borderBottomWidth: 1, borderBottomColor: "gray" },
					style,
				]}
				onChangeText={onChangeText}
				value={value}
                secureTextEntry={secureTextEntry}
			/>
		</View>
	);
}
