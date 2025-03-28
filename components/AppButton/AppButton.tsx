
import React from "react";
import { Pressable } from "react-native";

import { Colors } from "../../constent/theme";
import AppText from "../AppText/AppText";

export default function AppButton({
	text,
	padding,
	style,
	onPress,
}: {
	text: any;
	padding?: string;
	style?: object;
	onPress?: () => void;
}) {
	return (
		<Pressable
			onPress={onPress}
			style={[
				{
					backgroundColor: Colors.primary,
					width: "200",
					marginHorizontal: "auto",
					padding: 15,
				},
				style,
			]}
		>
			<AppText
				text={text}
				color="#fff"
				style={{ textAlign: "center", fontWeight: 600 }}
			/>
		</Pressable>
	);
}
